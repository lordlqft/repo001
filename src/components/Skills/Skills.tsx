import { useEffect, useRef } from "react";
import styles from "./Skills.module.css";
import { gsap } from "../../animations/gsap";

interface SkillRow {
  name: string;
  meta: string;
}

const SKILLS: SkillRow[] = [
  { name: "Figma", meta: "Design" },
  { name: "Roblox Studio", meta: "Desenvolvimento" },
  { name: ".NET", meta: "Desenvolvimento" },
  { name: "MySQL", meta: "Banco de dados" },
  { name: "Notion", meta: "Organização" },
  { name: "C", meta: "Linguagem" },
  { name: "C++", meta: "Linguagem" },
  { name: "C#", meta: "Linguagem" },
  { name: "Lua / Luau", meta: "Linguagem" },
  { name: "Python", meta: "Linguagem" },
  { name: "HTML", meta: "Web" },
  { name: "CSS", meta: "Web" },
  { name: "Java", meta: "Linguagem" },
];

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 92%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={rootRef}>
      <div className={styles.header}>
        <span className="eyebrow">04 — Skills</span>
        <h2 className="display-lg" style={{ marginTop: "1rem" }}>
          Ferramentas <span className="accent-italic">com intenção.</span>
        </h2>
      </div>

      <div className={styles.list}>
        {SKILLS.map((skill, i) => (
          <div key={skill.name} className={`${styles.row} skill-row`}>
            <span className={`${styles.rowIndex} mono-label`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.rowName}>{skill.name}</span>
            <div className={styles.rowMeta}>
              <span className="mono-label">{skill.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
