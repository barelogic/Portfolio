import { FaArrowUp, FaArrowRight } from 'react-icons/fa';
import { LocalTime } from './motion/Effects';

const Footer = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-14 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-2xl font-black uppercase tracking-tight">
              Venkatesh R<sup className="text-accent">®</sup>
            </p>
            <p className="label-mono mt-3 text-paper/50">Full-stack developer — Folio 2026</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="label-mono mb-4 text-paper/40">Sitemap</p>
              <ul className="space-y-2.5">
                {[
                  ['Work', 'work'],
                  ['About', 'about'],
                  ['Stack', 'stack'],
                  ['Journal', 'journal'],
                ].map(([label, id]) => (
                  <li key={id}>
                    <button onClick={() => go(id)} className="link-underline text-[15px] font-medium">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-mono mb-4 text-paper/40">Socials</p>
              <ul className="space-y-2.5">
                {[
                  ['GitHub', 'https://github.com/barelogic'],
                  ['LinkedIn', 'https://www.linkedin.com/in/venkatesh-rathinasabapathy-671491322/'],
                  ['Instagram', 'https://instagram.com/yourprofile'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-[15px] font-medium">
                      {label} <FaArrowRight className="-rotate-45 text-[10px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-mono mb-4 text-paper/40">Contact</p>
              <a href="mailto:venkateshr.work@gmail.com" className="link-underline break-all text-[15px] font-medium">
                venkateshr.work@gmail.com
              </a>
              <p className="label-mono mt-4 text-paper/40">
                <LocalTime />
              </p>
            </div>
          </div>
        </div>

        <div className="display-giant mt-12 select-none text-[18vw] leading-none text-paper/10 lg:text-[13vw]">
          Venkatesh®
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
          <p className="label-mono text-paper/40">© {new Date().getFullYear()} Venkatesh R — All rights reserved</p>
          <p className="label-mono hidden text-paper/40 sm:block">React · Tailwind · Motion</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-accent hover:bg-accent"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
