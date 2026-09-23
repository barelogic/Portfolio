import { FaArrowRight } from 'react-icons/fa';

const YEARS = { 1: '2025', 2: '2025', 3: '2024', 4: '2024' };

const ProjectCard = ({ project, index }) => {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t rule px-2 py-7 transition-colors duration-300 last:border-b hover:bg-ink hover:text-paper sm:gap-8 sm:px-4 md:py-9"
    >
      <span className="label-mono text-smoke transition-colors group-hover:text-paper/60">
        /{String(index + 1).padStart(2, '0')}
      </span>

      <span>
        <span className="display-lg block text-2xl transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
          {project.title}
        </span>
        <span className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="label-mono border border-ink/20 px-2.5 py-1 text-ink/70 transition-colors group-hover:border-paper/30 group-hover:text-paper/80"
            >
              {tech}
            </span>
          ))}
          {project.featured && (
            <span className="label-mono bg-accent px-2.5 py-1 text-paper">Featured</span>
          )}
        </span>
      </span>

      <span className="flex flex-col items-end gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:h-14 md:w-14">
          <FaArrowRight className="-rotate-45" />
        </span>
        <span className="label-mono text-smoke transition-colors group-hover:text-paper/60">
          {YEARS[project.id] ?? '2025'}
        </span>
      </span>
    </a>
  );
};

export default ProjectCard;
