import type { ReactNode } from "react";

/**
 * Splits text into `<span class="word"><span class="word-inner">…`
 * pairs so callers can animate the inner span's translateY inside an
 * overflow-hidden outer span — a classic mask reveal without pulling
 * in GSAP's (paid) SplitText plugin.
 */
export function splitWords(text: string, className = "word"): ReactNode[] {
  return text.split(" ").map((word, i) => (
    <span className={`${className}-mask`} key={`${word}-${i}`}>
      <span className={className}>
        {word}
        {i < text.split(" ").length - 1 ? "\u00A0" : ""}
      </span>
    </span>
  ));
}
