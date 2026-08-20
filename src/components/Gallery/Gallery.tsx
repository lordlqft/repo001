import { useEffect, useRef } from "react";
import styles from "./Gallery.module.css";
import { gsap } from "../../animations/gsap";
import ProjectArt from "../../assets/generated/ProjectArt";

interface Tile {
  span: keyof typeof styles;
  seed: number;
  from: string;
  to: string;
  label: string;
  tag: string;
}

const TILES: Tile[] = [
  { span: "span-a", seed: 11, from: "#241019", to: "#050505", label: "VHS — still", tag: "horror" },
  { span: "span-b", seed: 22, from: "#18201c", to: "#050505", label: "Semáforo — processo", tag: "iot" },
  { span: "span-c", seed: 33, from: "#171c24", to: "#050505", label: "POO 01 — classes", tag: "c#" },
  { span: "span-d", seed: 44, from: "#241019", to: "#0b0b0d", label: "VHS — tracking", tag: "roblox" },
];

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.05,
            scrollTrigger: { trigger: tile, start: "top 88%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="section" ref={rootRef}>
      <div className={styles.header}>
        <div>
          <span className="eyebrow">03 — Galeria</span>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Fragmentos
          </h2>
        </div>
        <p className={`${styles.headerNote} body-lg`}>
          Fotos extra dos de outros projetos.
        </p>
      </div>

      <div className={styles.grid}>
        {TILES.map((tile, i) => (
          <div
            key={i}
            className={`${styles.tile} ${styles[tile.span]} gallery-tile`}
            tabIndex={0}
          >
            <ProjectArt seed={tile.seed} from={tile.from} to={tile.to} />
            <div className={styles.tileCaption}>
              <span className="mono-label">{tile.label}</span>
              <span className="mono-label">{tile.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
