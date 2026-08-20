import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const dot = dotRef.current;
    if (!dot) return;

    const target = { x: 0, y: 0 };
    let raf = 0;

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setHidden(false);

      const element = event.target as HTMLElement;

    };

    const handleLeave = () => setHidden(true);

    const tick = () => {
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} data-hidden={hidden} />
    </>
  );
}
