import { motion } from 'framer-motion';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import MagneticButton from './motion/MagneticButton';

function MaskedLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function RotatingBadge() {
  return (
    <div className="relative h-28 w-28 shrink-0 md:h-36 md:w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink text-[10.5px] font-semibold uppercase" style={{ letterSpacing: '2.6px' }}>
          <textPath href="#badge-circle">open to work • open to work •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper md:h-14 md:w-14">
          <FaArrowDown />
        </span>
      </span>
    </div>
  );
}

const Hero = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* kicker row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-2 border-b rule py-4"
        >
          <span className="label-mono text-smoke">(Folio — 2026)</span>
          <span className="label-mono hidden text-smoke sm:block">Based in India, working worldwide</span>
          <span className="label-mono flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            Available for work
          </span>
        </motion.div>

        {/* giant headline */}
        <h1 className="display-giant mt-6 text-[17.5vw] sm:text-[15vw] lg:text-[11.5vw]">
          <MaskedLine delay={0.3}>Full-Stack</MaskedLine>
          <MaskedLine delay={0.42}>
            <span className="text-outline">Developer</span>
            <sup className="font-display text-[4vw] text-accent lg:text-[2.5vw]" style={{ WebkitTextStroke: '0' }}>®</sup>
          </MaskedLine>
        </h1>

        {/* intro row */}
        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-lg leading-relaxed md:text-xl">
              I&apos;m <strong>Venkatesh R</strong> — I build scalable web apps with{' '}
              <strong>React, Django &amp; PostgreSQL</strong>, blending clean
              engineering with bold, editorial interfaces.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <button onClick={() => go('work')} className="btn-pill">
                  View selected work <FaArrowRight className="-rotate-45 text-xs" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button onClick={() => go('contact')} className="btn-pill-outline">
                  Get in touch
                </button>
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <RotatingBadge />
          </motion.div>
        </div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 grid grid-cols-2 border-t rule md:grid-cols-4"
        >
          {[
            ['10+', 'Projects shipped'],
            ['MERN · Django', 'Core stack'],
            ['PostgreSQL', 'Data layer'],
            ['Scroll ↓', 'See the work'],
          ].map(([big, small]) => (
            <div key={small} className="border-r rule px-4 py-5 first:pl-0 last:border-r-0">
              <div className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{big}</div>
              <div className="label-mono mt-1 text-smoke">{small}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
