import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Reveal({ children, delay = 0, y = 36, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, label, title, sub }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="flex items-center justify-between border-b rule pb-4">
          <span className="label-mono text-smoke">({index}) — {label}</span>
          {sub && <span className="label-mono hidden text-smoke sm:block">{sub}</span>}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display-lg mt-6 text-[13vw] sm:text-[9vw] lg:text-[6.5vw]">{title}</h2>
      </Reveal>
    </div>
  );
}

export function Ticker({ items, fast = false, accent = false }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y py-4 md:py-5 ${accent ? 'border-accent bg-accent text-paper' : 'border-ink bg-ink text-paper'}`}>
      <div className={`flex w-max items-center gap-8 pr-8 ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-xl font-bold uppercase tracking-tight md:text-3xl">
            {t}
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${accent ? 'bg-paper' : 'bg-accent'}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">CHN — {time}</span>;
}
