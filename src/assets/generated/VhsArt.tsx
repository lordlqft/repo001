import { useEffect, useRef } from "react";

/**
 * The VHS project's hero: a canvas-driven tape aesthetic — scanlines,
 * chromatic tracking error, and a slow red key light sweeping through
 * fog. All generated procedurally; no source footage required.
 */
export default function VhsArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += prefersReducedMotion ? 0 : 0.012;

      // Base fog gradient
      const fog = ctx.createRadialGradient(
        width * 0.5,
        height * (0.32 + Math.sin(t * 0.4) * 0.03),
        0,
        width * 0.5,
        height * 0.4,
        width * 0.85
      );
      fog.addColorStop(0, "#241019");
      fog.addColorStop(0.45, "#120a0d");
      fog.addColorStop(1, "#050505");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, width, height);

      // Sweeping key light
      const lightX = width * (0.5 + Math.sin(t * 0.3) * 0.18);
      const light = ctx.createRadialGradient(
        lightX,
        height * 0.28,
        0,
        lightX,
        height * 0.28,
        width * 0.5
      );
      light.addColorStop(0, "rgba(194, 31, 66, 0.35)");
      light.addColorStop(1, "rgba(194, 31, 66, 0)");
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, width, height);

      // Scanlines
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = "#000";
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1);
      }
      ctx.globalAlpha = 1;

      // Occasional tracking-error glitch band
      if (!prefersReducedMotion && Math.random() > 0.965) {
        const bandY = Math.random() * height;
        const bandH = 6 + Math.random() * 18;
        const offset = (Math.random() - 0.5) * 30;
        const slice = ctx.getImageData(0, Math.max(bandY - bandH / 2, 0), width, bandH);
        ctx.putImageData(slice, offset, Math.max(bandY - bandH / 2, 0));
        ctx.fillStyle = "rgba(194, 31, 66, 0.12)";
        ctx.fillRect(0, bandY - bandH / 2, width, bandH);
      }

      // Vignette
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
