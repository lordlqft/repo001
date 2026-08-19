import { useEffect, useRef } from "react";

export interface PointerPosition {
  /** -1 (left/top) to 1 (right/bottom), 0 at center */
  x: number;
  y: number;
}

/**
 * Tracks the pointer as a value normalized to the viewport center,
 * exposed through a ref (not state) so consumers can read it inside a
 * rAF loop without triggering React re-renders on every mouse move.
 */
export function usePointerParallax() {
  const position = useRef<PointerPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      position.current = { x, y };
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
