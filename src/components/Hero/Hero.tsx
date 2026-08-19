import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import { splitWords } from "../../utils/splitWords";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(".hero-title-word", { willChange: "transform" })
        .to(".hero-eyebrow", { opacity: 1, duration: 0.8 }, 0.15)
        .to(".hero-title-word", {
          y: "0%",
          duration: 1.3,
          stagger: 0.06,
        }, 0.25)
        .to(".hero-sub-line", {
          y: "0%",
          duration: 1,
          stagger: 0.05,
        }, 0.75)
        .to(".hero-scroll-cue", { opacity: 1, duration: 1 }, 1.3)
        .fromTo(
          backdropRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
          0
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Lightweight scroll-driven scale/fade; no continuous pointer animation.
  useEffect(() => {
    const backdrop = backdropRef.current;
    const root = rootRef.current;
    if (!backdrop || !root) return;

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(backdrop, {
          scale: 1 + progress * 0.22,
          opacity: 1 - progress * 0.8,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="top" ref={rootRef} className={styles.hero} aria-label="Abertura">
      <div className={styles.backdrop} ref={backdropRef} aria-hidden="true">
        <span className={styles.backdropGlyph}>K</span>
      </div>

      <div className={styles.eyebrowRow}>
        <span className={`${styles.eyebrowDot}`} />
        <span className={`eyebrow hero-eyebrow`} style={{ opacity: 0 }}>
          Portfólio — 2026
        </span>
      </div>

      <h1 className={styles.title}>
        {splitWords("Kenneth", "hero-title-word").map((node, i) => (
          <span key={i}>{node}</span>
        ))}
        <br />
        <span className={styles.titleAccent}>
          {splitWords("Anderson", "hero-title-word")}
        </span>
      </h1>

      <div className={styles.footer}>
        <p className={`${styles.subtitle} body-lg`}>
          {["Design de produto e desenvolvimento front-end", "para marcas que querem ser lembradas."].map(
            (line, i) => (
              <span className="sub-mask" key={i}>
                <span className="hero-sub-line sub">{line}</span>
              </span>
            )
          )}
        </p>

        <div className={`${styles.scrollCue} hero-scroll-cue`}>
          <span className={styles.scrollLabel}>Role para explorar</span>
          <span className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
