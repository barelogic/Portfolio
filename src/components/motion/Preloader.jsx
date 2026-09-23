import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 18 + 6;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onDone?.(), 500);
        }, 350);
      }
      setProgress(Math.min(100, Math.floor(v)));
    }, 150);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-paper p-5 sm:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-tight">Venkatesh R®</span>
            <span className="label-mono text-smoke">Folio — 2026</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="label-mono mb-4 text-smoke">Loading experience</p>
            <div className="display-giant text-[22vw] leading-none tabular-nums md:text-[14vw]">
              {progress}
            </div>
          </div>
          <div className="h-[6px] w-full bg-ink/10">
            <div className="h-full bg-ink transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
