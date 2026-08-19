import { useEffect, useRef } from "react";
import styles from "./Nav.module.css";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import Magnetic from "../UI/Magnetic";

const LINKS = [
  { href: "#about", label: "Sobre" },
  { href: "#projects", label: "Projetos" },
  { href: "#gallery", label: "Galeria" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contato" },
];

export default function Nav() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0 });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <div className={styles.progress} ref={progressRef} />
      <header className={styles.header}>
        <Magnetic strength={0.5}>
          <a href="#top" className={styles.mark} data-cursor="link">
            kenneth<span>.</span>
          </a>
        </Magnetic>
        <nav className={styles.links} aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} data-cursor="link">
              {link.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
