/**
 * Abstract single-line portrait, generated in-code rather than sourced
 * as a photo. Reads as an editorial line illustration under low
 * opacity + grain, in keeping with the site's "premium negative
 * space" direction.
 */
export default function PortraitArt() {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="portraitGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1c1c20" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <linearGradient id="portraitLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c21f42" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5f3ef" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#portraitGlow)" />
      <path
        d="M 150 120
           C 130 150, 125 190, 140 230
           C 120 245, 118 270, 132 288
           C 118 300, 118 320, 140 330
           C 150 360, 175 378, 205 380
           C 240 382, 270 365, 285 335
           C 300 330, 308 315, 300 300
           C 312 285, 310 262, 292 250
           C 298 210, 282 165, 245 142
           C 215 122, 178 118, 150 120 Z"
        fill="none"
        stroke="url(#portraitLine)"
        strokeWidth="1.4"
        opacity="0.75"
      />
      <path
        d="M 170 260 C 185 270, 210 270, 225 258"
        fill="none"
        stroke="url(#portraitLine)"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <circle cx="178" cy="215" r="2.4" fill="#f5f3ef" opacity="0.5" />
      <circle cx="232" cy="212" r="2.4" fill="#f5f3ef" opacity="0.5" />
      <path
        d="M 60 60 L 60 420"
        stroke="#f5f3ef"
        strokeOpacity="0.06"
        strokeWidth="1"
      />
      <path
        d="M 340 40 L 340 460"
        stroke="#f5f3ef"
        strokeOpacity="0.06"
        strokeWidth="1"
      />
    </svg>
  );
}
