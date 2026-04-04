import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

/**
 * TextScramble — matrix-style character scramble that settles to the final text.
 * Suggestion 4.1: runs ONCE on mount, 400ms total, only on initial page load.
 * Respects prefers-reduced-motion by skipping to final text immediately.
 */
export default function TextScramble({ text, className = '', duration = 400 }) {
  const [display, setDisplay] = useState(text);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // Respect user accessibility preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frames = 18;
    const frameMs = duration / frames;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / frames;

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            // Each character resolves to its final value progressively
            if (i / text.length < progress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (frame >= frames) {
        clearInterval(interval);
        setDisplay(text); // guarantee final state
      }
    }, frameMs);

    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={className}>{display}</span>;
}
