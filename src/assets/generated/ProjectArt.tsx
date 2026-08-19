interface ProjectArtProps {
  seed: number;
  from: string;
  to: string;
}

/**
 * A generated "poster" for a project card: a soft directional
 * gradient plus a handful of deterministic line/shape marks derived
 * from `seed`, so every project reads as a distinct composition
 * without needing sourced photography.
 */
export default function ProjectArt({ seed, from, to }: ProjectArtProps) {
  const angle = (seed * 47) % 360;
  const lines = Array.from({ length: 5 }, (_, i) => {
    const y = 60 + ((seed * 37 + i * 83) % 380);
    const w = 80 + ((seed * 19 + i * 61) % 260);
    const x = (seed * 29 + i * 97) % 300;
    return { x, y, w, opacity: 0.06 + ((i * seed) % 10) / 100 };
  });

  return (
    <svg
      viewBox="0 0 600 700"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient
          id={`grad-${seed}`}
          gradientTransform={`rotate(${angle} 0.5 0.5)`}
        >
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={`vg-${seed}`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width="600" height="700" fill={`url(#grad-${seed})`} />
      {lines.map((l, i) => (
        <rect
          key={i}
          x={l.x}
          y={l.y}
          width={l.w}
          height="1"
          fill="#f5f3ef"
          opacity={l.opacity}
        />
      ))}
      <rect width="600" height="700" fill={`url(#vg-${seed})`} />
    </svg>
  );
}
