import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { gsap } from "../../animations/gsap";
import { splitWords } from "../../utils/splitWords";
import Magnetic from "../UI/Magnetic";

const CONTACTS = [
  { label: "GitHub", href: "https://github.com/lordlqft/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kennethanderson0/" },
  { label: "Instagram", href: "https://www.instagram.com/okkennethhh/" },
  { label: "Roblox", href: "https://www.roblox.com/users/9832747333/profile" },
  { label: "E-mail", href: "mailto:kennethandersoncontato@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/5516997796595" },
  { label: "TikTok", href: "https://www.tiktok.com/@okkennethh" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/3137wdbscb2zdftnucq6yq62mxfe?si=f916fda7e85c4173",
  },
  { label: "YouTube", href: "https://www.youtube.com/@moribundosgames" },
  { label: "Steam", href: "https://steamcommunity.com/id/folotefolote/" },
];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        defaults: { ease: "power4.out" },
      });

      tl.to(".contact-eyebrow-word", { y: "0%", duration: 0.8 })
        .to(".contact-title-word", { y: "0%", duration: 0.9, stagger: 0.04 }, 0.1)
        .to(".contact-email", { opacity: 1, duration: 0.6 }, 0.55)
        .to(".contact-social", { opacity: 1, duration: 0.6 }, 0.7)
        .to(".contact-footer", { opacity: 1, duration: 0.6 }, 0.85);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className={styles.contact} ref={rootRef}>
      <div className={styles.glow} aria-hidden="true" />

      <span className={`eyebrow ${styles.eyebrow}`}>
        <span className={`${styles.eyebrowInner} contact-eyebrow-word`}>
          05 — Vamos conversar
        </span>
      </span>

      <h2 className={styles.title}>
        {splitWords("Sente que precisa de mim?", "contact-title-word")}
        <br />
        <span className="accent-italic">
          {splitWords("Entre em contato.", "contact-title-word")}
        </span>
      </h2>

      <Magnetic className="contact-email" strength={0.25}>
        <a
          href="mailto:kennethandersoncontato@gmail.com"
          className={styles.emailLink}
          data-cursor="link"
        >
          kennethandersoncontato@gmail.com
        </a>
      </Magnetic>

      <div className={`${styles.social} contact-social`}>
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            className={styles.socialLink}
            data-cursor="link"
          >
            {contact.label}
          </a>
        ))}
      </div>

      <div className={`${styles.footer} contact-footer`}>
        <span className="mono-label">© 2026 Kenneth</span>
        <a href="#top" className={styles.backToTop} data-cursor="link">
          Voltar ao topo <span className={styles.backToTopArrow}>↑</span>
        </a>
      </div>
    </section>
  );
}
