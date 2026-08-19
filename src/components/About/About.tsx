import { useEffect, useRef } from "react";
import styles from "./About.module.css";
import { gsap } from "../../animations/gsap";
import KennethPhoto from "../../assets/images/kenneth.jpg";

const PROFILE = {
  name: "Kenneth Anderson",
  year: "2026",
  role: "Frontend Developer • Roblox Developer",

  city: "Sertãozinho - SP, BR",
  purpose: "Transformar ideias aleatórias em projetos de verdade.",
  stack: "C · C++ · C# · MySQL · LUA/LUAU · Python · HTML · CSS · Java",
  availability: "Aberto somento para projetos em conjunto.",
};

const LEAD_LINES = [
  "Eu gosto de mexer em coisa que eu não sei fazer,",
  "Aprendo no caminho, erro pra caramba",
  "e eventualmente faço funcionar!!",
];

const DETAILS = [
  { label: "Cidade", value: PROFILE.city },
  { label: "Propósito", value: PROFILE.purpose },
  { label: "Stack", value: PROFILE.stack },
  { label: "Disponibilidade", value: PROFILE.availability },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-lead-line", {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".about-lead",
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".about-detail").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });

      if (frameInnerRef.current) {
        gsap.to(frameInnerRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className={`section ${styles.about}`}
      ref={sectionRef}
    >
      <div className={styles.sticky}>
        <span className={`eyebrow ${styles.index}`}>
          01 — Sobre
        </span>

        <div className={styles.frame}>
          <div
            className={styles.frameInner}
            ref={frameInnerRef}
          >
            <img
              src={KennethPhoto}
              alt="Kenneth Anderson"
            />
          </div>

          <div className={styles.frameCaption}>
            <span className="mono-label">
              {PROFILE.name} / {PROFILE.year}
            </span>

            <span className="mono-label">
              Euzinho
            </span>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p className={`${styles.lead} display-md about-lead`}>
          {LEAD_LINES.map((line, i) => (
            <span
              className={styles.line}
              key={i}
            >
              <span
                className={`${styles.lineInner} about-lead-line`}
              >
                {line}
              </span>
            </span>
          ))}
        </p>

        <p
          className="body-lg"
          style={{
            maxWidth: "48ch",
            marginBottom: "2rem",
          }}
        >
          Sou Kenneth Anderson, tenho 16 anos e sou estudante de
          Desenvolvimento de Sistemas no SENAI. Gosto de transformar
          ideias em projetos que misturam programação, design e
          experiências interativas.

          Atualmente desenvolvo o VHS, um jogo de terror multiplayer
          no Roblox, onde trabalho com sistemas de matchmaking,
          interfaces, cutscenes e mecânicas em Lua. Também curto criar
          sites com React e TypeScript utilizando IA (Vibecode),
          sempre buscando um visual mais imersivo e bem acabado.

          Estou sempre aprendendo coisas novas e gosto de construir
          projetos que desafiem minha criatividade e minhas habilidades
          como desenvolvedor.
        </p>

        <dl className={styles.details}>
          {DETAILS.map((d) => (
            <div
              className={`${styles.detail} about-detail`}
              key={d.label}
            >
              <dt className="mono-label">
                {d.label}
              </dt>

              <dd>
                {d.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}