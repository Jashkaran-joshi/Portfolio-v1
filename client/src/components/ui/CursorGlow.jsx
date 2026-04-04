import { useEffect, useRef } from 'react';

/**
 * CursorGlow — trailing neon dot that follows the cursor with inertia.
 * Suggestion 4.3: disabled on touch devices and prefers-reduced-motion.
 * Uses transform (GPU) only — zero layout repaints.
 * Picks up the --glow-color CSS variable from hovered GlassCards if set.
 */
export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    // Disable on touch devices and reduced-motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      dot.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      ring.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot — snaps directly to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon pointer-events-none z-[9998] mix-blend-screen"
        style={{ willChange: 'transform', boxShadow: '0 0 6px #00f3ff, 0 0 12px #00f3ff66' }}
      />
      {/* Outer ring — lags behind with lerp for inertia feel */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon/40 pointer-events-none z-[9997]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
