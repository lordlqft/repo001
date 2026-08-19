import { useEffect, useRef } from "react";
import styles from "./Background.module.css";
import { gsap, ScrollTrigger } from "../../animations/gsap";

export default function Background() {
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ambientRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(el, { "--ambient-y": `${15 + self.progress * 70}%` });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <div className={styles.ambient} ref={ambientRef} />
      <div className={styles.vignette} />
    </>
  );
}
