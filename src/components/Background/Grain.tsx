import { useEffect, useRef } from "react";

interface GrainProps {
  /** 0–1, kept very low for a premium, near-subliminal texture */
  opacity?: number;
}

/**
 * Renders a small tile of animated noise at low resolution and lets
 * CSS upscale it — far cheaper than drawing full-resolution noise
 * every frame, and the pixelation is invisible at this opacity.
 */
export default function Grain({ opacity = 0.05 }: GrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TILE = 128;
    canvas.width = TILE;
    canvas.height = TILE;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let frame = 0;
    const imageData = ctx.createImageData(TILE, TILE);

    const draw = () => {
      const buffer = imageData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 255;
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      frame += 1;
      // Redraw every other frame — grain flicker reads fine at 30fps
      // and it halves the cost.
      if (!prefersReducedMotion && frame % 2 === 0) {
        raf = requestAnimationFrame(draw);
      } else if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    draw();
    if (prefersReducedMotion) return;

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        zIndex: 60,
        imageRendering: "pixelated",
      }}
    />
  );
}
