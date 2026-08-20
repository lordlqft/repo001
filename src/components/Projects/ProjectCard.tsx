import { useEffect, useRef } from "react";
import styles from "./Projects.module.css";
import { gsap } from "../../animations/gsap";
import ProjectArt from "../../assets/generated/ProjectArt";
import type { ProjectEntry } from "./projectsData";

interface ProjectCardProps {
  project: ProjectEntry;
  seed: number;
}

export default function ProjectCard({ project, seed }: ProjectCardProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow zoom: media starts scaled up, eases down to 1 as the
      // card crosses the viewport — reads as a lens settling.
      if (mediaInnerRef.current) {
        gsap.to(mediaInnerRef.current, {
          scale: project.featured ? 1.02 : 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      gsap.to(titleRef.current, {
        y: "0%",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });

      gsap.from(`.project-fade-${project.id}`, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project.featured, project.id]);

  return (
    <article
      ref={rootRef}
      className={`${styles.project} ${project.featured ? styles.featured : ""
        }`}
      id={`project-${project.id}`}
    >
      <div className={styles.projectInner}>
        <div className={styles.media}>
          <div className={styles.mediaLabel}>
            <span className="mono-label">{project.index}</span>
            <span className="mono-label">{project.year}</span>
          </div>

          <div className={styles.mediaInner} ref={mediaInnerRef}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={`${styles.projectImage} ${styles[`image-${project.id}`]}`}
              />
            ) : (
              <ProjectArt
                seed={seed}
                from={project.palette.from}
                to={project.palette.to}
              />
            )}
          </div>
        </div>

        <div className={styles.info}>
          {project.featured && (
            <span
              className={`${styles.featuredBadge} mono-label project-fade-${project.id}`}
            >
              Projeto em destaque
            </span>
          )}

          <div className={`${styles.infoTop} project-fade-${project.id}`}>
            <span className="eyebrow">{project.category}</span>
          </div>

          <div className={styles.titleMask}>
            <h3 className={styles.title} ref={titleRef}>
              {project.title}
            </h3>
          </div>

          <p
            className={`${styles.description} body-lg project-fade-${project.id}`}
          >
            {project.description}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={`${styles.cta} project-fade-${project.id}`}
            data-cursor="link"
          >
            Ver projeto <span className={styles.arrow}>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}