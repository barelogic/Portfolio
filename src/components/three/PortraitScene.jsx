import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import photoUrl from '../../assets/self.jpg';

const SAMPLE_W = 210;
const WORLD_W = 4.8;
const DEPTH = 1.15;

function PortraitPoints() {
  const texture = useLoader(THREE.TextureLoader, photoUrl);
  const group = useRef();
  const { pointer } = useThree();

  const { positions, colors } = useMemo(() => {
    /* eslint-disable-next-line react-hooks/immutability -- three.js texture setup is intentionally imperative */
    texture.colorSpace = THREE.SRGBColorSpace;
    const img = texture.image;
    const aspect = img.height / img.width;
    const w = SAMPLE_W;
    const h = Math.round(w * aspect);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const pos = [];
    const col = [];
    const worldH = WORLD_W * aspect;
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        // elliptical medallion mask — drops corners so it floats on the paper
        const nx = (x / w - 0.5) * 2;
        const ny = (y / h - 0.5) * 2;
        if (nx * nx + ny * ny > 1) continue;
        const i = (y * w + x) * 4;
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        const bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        pos.push((x / w - 0.5) * WORLD_W, (0.5 - y / h) * worldH, (1 - bright) * DEPTH);
        col.push(Math.min(1, r * 1.07), Math.min(1, g * 1.05), Math.min(1, b * 1.03));
      }
    }
    return { positions: new Float32Array(pos), colors: new Float32Array(col) };
  }, [texture]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    g.rotation.y = Math.sin(t * 0.25) * 0.3 + pointer.x * 0.4;
    g.rotation.x = Math.cos(t * 0.2) * 0.06 + pointer.y * -0.12;
    g.position.y = Math.sin(t * 0.6) * 0.09;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.034} vertexColors sizeAttenuation />
      </points>
    </group>
  );
}

function OrbitRing() {
  const ring = useRef();
  useFrame((state) => {
    ring.current.rotation.z = state.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={ring} position={[0, 0, -1.2]}>
      <torusGeometry args={[3.9, 0.014, 8, 160]} />
      <meshBasicMaterial color="#161513" transparent opacity={0.4} />
    </mesh>
  );
}

function AccentDot() {
  const dot = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    dot.current.position.x = Math.cos(t * 0.4) * 3.9;
    dot.current.position.y = Math.sin(t * 0.4) * 3.9;
  });
  return (
    <mesh ref={dot} position={[3.9, 0, -1.2]}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color="#ff4d00" />
    </mesh>
  );
}

export default function PortraitScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <PortraitPoints />
        <OrbitRing />
        <AccentDot />
      </Suspense>
    </Canvas>
  );
}
