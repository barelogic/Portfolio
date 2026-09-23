import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { Reveal } from './motion/Effects';

const STATEMENT =
  'I build responsive interfaces, robust APIs and optimised databases — turning complex problems into elegant, functional products.';

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

const CAPABILITIES = [
  ['Responsive interfaces', 'React.js, Tailwind, motion design'],
  ['RESTful APIs', 'Django, DRF, Node.js / Express'],
  ['Data modelling', 'PostgreSQL, MongoDB, optimisation'],
  ['Shipping & scale', 'Docker, cloud deploys, CI basics'],
];

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  });
  const words = STATEMENT.split(' ');

  return (
    <section id="about" className="section-pad">
      <Reveal>
        <div className="flex items-center justify-between border-b rule pb-4">
          <span className="label-mono text-smoke">(02) — About</span>
          <span className="label-mono hidden text-smoke sm:block">Full-stack developer</span>
        </div>
      </Reveal>

      <p ref={ref} className="display-lg mt-8 max-w-6xl text-3xl normal-case leading-[1.08] tracking-normal sm:text-5xl lg:text-6xl">
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
          >
            {word}
          </Word>
        ))}
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="max-w-md leading-relaxed text-ink/80">
            I&apos;m a full-stack developer working across the MERN stack, Django
            and PostgreSQL — from pixel-faithful frontends to server
            architectures that hold up in production. I thrive on owning a
            feature end to end: data model, API, interface, deploy.
          </p>
          <div className="mt-8 flex gap-6">
            {[
              { Icon: FaGithub, href: 'https://github.com/barelogic', label: 'GitHub' },
              { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/venkatesh-rathinasabapathy-671491322/', label: 'LinkedIn' },
              { Icon: FaInstagram, href: 'https://instagram.com/yourprofile', label: 'Instagram' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline label-mono flex items-center gap-1.5"
              >
                {label} <FaArrowRight className="-rotate-45 text-[10px]" />
              </a>
            ))}
          </div>
        </Reveal>

        <div>
          {CAPABILITIES.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="flex items-baseline justify-between gap-4 border-t rule py-4 last:border-b">
                <span className="font-display text-lg font-bold uppercase tracking-tight sm:text-xl">
                  <span className="mr-3 text-accent">0{i + 1}</span>
                  {title}
                </span>
                <span className="text-right text-sm text-smoke">{desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
