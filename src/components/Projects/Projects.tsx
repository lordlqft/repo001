import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "./projectsData";

export default function Projects() {
  return (
    <section id="projects" aria-label="Projetos">
      <div className={styles.projectsHeader}>
        <span className="eyebrow">02 — Projetos selecionados</span>
        <h2 className="display-lg" style={{ marginTop: "1rem", maxWidth: "16ch" }}>
          Trabalho que <span className="accent-italic">assume um ponto de vista.</span>
        </h2>
      </div>

      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.id} project={project} seed={i + 1} />
      ))}
    </section>
  );
}
