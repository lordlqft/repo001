import { useEffect, useRef, useState } from "react";
import styles from "./Loader.module.css";
import { gsap } from "../../animations/gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const progress = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(progress, {
      value: 100,
      duration: prefersReducedMotion ? 0.2 : 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(progress.value));
        if (barRef.current) {
          gsap.set(barRef.current, { width: `${progress.value}%` });
        }
      },
    })
      .to(rootRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" }, "+=0.15")
      .set(rootRef.current, { display: "none" })
      .to(
        curtainRef.current,
        { scaleY: 0, duration: 0.9, ease: "power4.inOut" },
        "-=0.1"
      )
      .set(curtainRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.loader} ref={rootRef}>
        <span className={styles.mark}>
          kenneth<span>.</span>
        </span>
        <div className={styles.track}>
          <div className={styles.bar} ref={barRef} />
        </div>
        <span className={styles.count}>{String(count).padStart(3, "0")}%</span>
      </div>
      <div className={styles.curtain} ref={curtainRef} aria-hidden="true" />
    </>
  );
}
