import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import { LocalTime } from './motion/Effects';

const navItems = [
  { name: 'Work', id: 'work' },
  { name: 'About', id: 'about' },
  { name: 'Stack', id: 'stack' },
  { name: 'Journal', id: 'journal' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] border-b transition-colors duration-300 ${
          isScrolled ? 'border-ink/10 bg-paper/90 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 md:h-20 lg:px-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-lg font-black uppercase tracking-tight"
          >
            Venkatesh R<sup className="text-accent">®</sup>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="link-underline label-mono text-ink/80 hover:text-ink"
              >
                <span className="mr-1 text-accent">0{i + 1}</span> {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="label-mono hidden text-smoke lg:block">
              <LocalTime />
            </span>
            <button onClick={() => go('contact')} className="btn-pill hidden !px-6 !py-2.5 sm:inline-flex">
              Contact <FaArrowRight className="-rotate-45 text-xs" />
            </button>
            <button
              className="text-2xl md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] flex flex-col justify-end bg-ink p-6 pb-10 text-paper"
          >
            <div className="flex flex-col">
              {[...navItems, { name: 'Contact', id: 'contact' }].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  onClick={() => go(item.id)}
                  className="group flex items-baseline gap-4 border-b border-paper/15 py-3 text-left"
                >
                  <span className="label-mono text-accent">0{i + 1}</span>
                  <span className="display-lg text-5xl transition-colors group-hover:text-accent">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
            <p className="label-mono mt-8 text-paper/50">
              <LocalTime />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
