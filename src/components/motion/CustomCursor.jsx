import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

export default function CustomCursor() {
  const [enabled] = useState(isFinePointer);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28 });
  const ry = useSpring(y, { stiffness: 300, damping: 28 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      const work = t?.closest?.('[data-cursor="view"]');
      setHovering(!!t?.closest?.('a,button'));
      setLabel(work ? 'VIEW' : '');
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full bg-accent"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 84 : hovering ? 52 : 0,
          height: label ? 84 : hovering ? 52 : 0,
          opacity: label || hovering ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        {label && <span className="font-display text-xs font-bold tracking-widest text-paper">{label}</span>}
      </motion.div>
    </>
  );
}
