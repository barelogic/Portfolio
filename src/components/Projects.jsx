import ProjectCard from './ProjectCard';
import projectsData from '../data/projects.json';
import { SectionHeading, Reveal } from './motion/Effects';

const Projects = () => {
  return (
    <section id="work" className="section-pad">
      <SectionHeading
        index="01"
        label="Selected work"
        title="Work"
        sub={`(${String(projectsData.length).padStart(2, '0')}) 2024 — 2026`}
      />
      <Reveal>
        <div>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <p className="label-mono mt-6 text-smoke">Hover a row — click to view the code ↗</p>
      </Reveal>
    </section>
  );
};

export default Projects;
