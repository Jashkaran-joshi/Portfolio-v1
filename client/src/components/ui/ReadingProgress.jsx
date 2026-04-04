import { useState, useEffect } from 'react';

/**
 * ReadingProgress — fixed top reading indicator bar.
 * Suggestion 1.1: thin neon progress bar for long-form pages.
 * Uses a passive scroll listener to avoid layout jank.
 */
export default function ReadingProgress({ color = '#00f3ff' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      if (total > 0) {
        setProgress(Math.min(100, (scrollTop / total) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[2px] z-[9999] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        boxShadow: `0 0 8px ${color}80`,
        transition: 'width 80ms linear',
      }}
    />
  );
}
