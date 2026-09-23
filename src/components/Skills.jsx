import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import skillsData from '../data/skills.json';
import { SectionHeading, Reveal } from './motion/Effects';

const GROUPS = [
  ['Frontend', skillsData.frontend],
  ['Backend', skillsData.backend],
  ['Data', skillsData.database],
  ['Tools', skillsData.tools],
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="section-pad">
      <motion.div ref={ref}>
        <SectionHeading index="03" label="Capabilities" title="Stack" sub="(Skills & tools)" />

        {GROUPS.map(([title, skills], gi) => (
          <Reveal key={title} delay={gi * 0.04}>
            <div className="grid gap-2 border-t rule py-8 last:border-b md:grid-cols-[220px_1fr] md:gap-10">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                <span className="mr-2 text-smoke">0{gi + 1}</span>
                {title}
              </h3>
              <div>
                {skills.map((skill, i) => (
                  <div key={skill.name} className="group flex items-center gap-4 py-2.5">
                    <span className="w-40 shrink-0 text-[15px] font-medium sm:w-56">{skill.name}</span>
                    <div className="h-[5px] flex-1 bg-ink/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: skill.level / 100 } : {}}
                        transition={{ delay: gi * 0.1 + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full origin-left bg-ink transition-colors group-hover:bg-accent"
                      />
                    </div>
                    <span className="label-mono w-10 shrink-0 text-right text-smoke">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
