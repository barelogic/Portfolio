import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import photoUrl from '../../assets/self.jpg';

const SAMPLE = 200; // heightmap resolution (px across)
const WORLD_W = 4.8; // world width of the relief
const RELIEF = 0.95; // max relief depth
const SEG = 190; // mesh segments across

function boxBlur(src, w, h, passes = 2) {
  let a = src;
  let b = new Float32Array(w * h);
  for (let p = 0; p < passes; p += 1) {
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        let sum = 0;
        let n = 0;
        for (let oy = -1; oy <= 1; oy += 1) {
          for (let ox = -1; ox <= 1; ox += 1) {
            const xx = x + ox;
            const yy = y + oy;
            if (xx >= 0 && xx < w && yy >= 0 && yy < h) {
              sum += a[yy * w + xx];
              n += 1;
            }
          }
        }
        b[y * w + x] = sum / n;
      }
    }
    const tmp = a;
    a = b;
    b = tmp;
  }
  return a;
}

function ReliefPortrait() {
  const texture = useLoader(THREE.TextureLoader, photoUrl);
  const group = useRef();
  const { pointer } = useThree();

  const { geometry, map, alphaMap } = useMemo(() => {
    /* eslint-disable-next-line react-hooks/immutability -- three.js texture setup is intentionally imperative */
    texture.colorSpace = THREE.SRGBColorSpace;
    const img = texture.image;
    const aspect = img.height / img.width;
    const w = SAMPLE;
    const h = Math.round(SAMPLE * aspect);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const src = ctx.getImageData(0, 0, w, h).data;

    // luminance heightfield + high-contrast grayscale map
    const lum = new Float32Array(w * h);
    const gray = ctx.createImageData(w, h);
    for (let i = 0; i < w * h; i += 1) {
      const r = src[i * 4] / 255;
      const g = src[i * 4 + 1] / 255;
      const b = src[i * 4 + 2] / 255;
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      lum[i] = l;
      const c = Math.max(0, Math.min(255, Math.round(((l - 0.5) * 1.3 + 0.5) * 255)));
      gray.data[i * 4] = c;
      gray.data[i * 4 + 1] = c;
      gray.data[i * 4 + 2] = c;
      gray.data[i * 4 + 3] = 255;
    }
    const smoothH = boxBlur(lum, w, h, 2);

    const grayCanvas = document.createElement('canvas');
    grayCanvas.width = w;
    grayCanvas.height = h;
    grayCanvas.getContext('2d').putImageData(gray, 0, 0);
    const grayMap = new THREE.CanvasTexture(grayCanvas);
    grayMap.colorSpace = THREE.SRGBColorSpace;
    grayMap.anisotropy = 4;

    // feathered elliptical alpha mask — sculpted medallion edge
    const mCanvas = document.createElement('canvas');
    mCanvas.width = 256;
    mCanvas.height = 256;
    const mctx = mCanvas.getContext('2d');
    const grad = mctx.createRadialGradient(128, 128, 84, 128, 128, 127);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.78, '#ffffff');
    grad.addColorStop(1, '#000000');
    mctx.fillStyle = grad;
    mctx.fillRect(0, 0, 256, 256);
    const mask = new THREE.CanvasTexture(mCanvas);

    // relief mesh
    const segY = Math.round(SEG * aspect);
    const geo = new THREE.PlaneGeometry(WORLD_W, WORLD_W * aspect, SEG, segY);
    const posA = geo.attributes.position;
    const uvA = geo.attributes.uv;
    for (let i = 0; i < posA.count; i += 1) {
      const u = uvA.getX(i);
      const v = uvA.getY(i);
      const sx = Math.max(0, Math.min(w - 1, Math.round(u * (w - 1))));
      const sy = Math.max(0, Math.min(h - 1, Math.round((1 - v) * (h - 1))));
      const height = smoothH[sy * w + sx];
      // ellipse falloff: 1 inside, feathered to 0 at rim
      const ex = (u - 0.5) * 2;
      const ey = (v - 0.5) * 2;
      const d = ex * ex + ey * ey;
      const m = THREE.MathUtils.smoothstep(1 - d, 0, 0.22);
      posA.setZ(i, (height - 0.5) * RELIEF * m - (1 - m) * 0.6);
    }
    geo.computeVertexNormals();

    return { geometry: geo, map: grayMap, alphaMap: mask };
  }, [texture]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      map.dispose();
      alphaMap.dispose();
    };
  }, [geometry, map, alphaMap]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    g.rotation.y = Math.sin(t * 0.25) * 0.3 + pointer.x * 0.4;
    g.rotation.x = Math.cos(t * 0.2) * 0.06 + pointer.y * -0.12;
    g.position.y = Math.sin(t * 0.6) * 0.09;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={map}
          metalness={0.32}
          roughness={0.38}
          alphaMap={alphaMap}
          alphaTest={0.5}
          envMapIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    /* eslint-disable-next-line react-hooks/immutability -- three.js scene environment setup is intentionally imperative */
    scene.environment = envTex;
    return () => {
      scene.environment = null;
      envTex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function OrbitRing() {
  const ring = useRef();
  useFrame((state) => {
    ring.current.rotation.z = state.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={ring} position={[0, 0, -1.4]}>
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
    <mesh ref={dot} position={[3.9, 0, -1.4]}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color="#161513" />
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
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-6, 2, -3]} intensity={1.1} color="#dfe6f5" />
      <Suspense fallback={null}>
        <StudioEnv />
        <ReliefPortrait />
        <OrbitRing />
        <AccentDot />
      </Suspense>
    </Canvas>
  );
}
