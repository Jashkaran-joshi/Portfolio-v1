import { useEffect, useRef, memo } from 'react';
import { prefersReducedMotion, getOptimalParticleCount, debounce } from '../../utils/performanceUtils';

const CyberBackground = memo(function CyberBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Skip animation entirely if reduced motion is preferred
    if (prefersReducedMotion()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let width, height;
    let isVisible = true;

    // Particle class with optimized draw
    class Particle {
      constructor(w, h) {
        this.reset(w, h);
      }

      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.isNeon = Math.random() > 0.5;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Reinitialize particles on resize
      const particleCount = getOptimalParticleCount();
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(width, height));
      }
    };

    const debouncedResize = debounce(resize, 150);
    window.addEventListener('resize', debouncedResize);
    resize();

    // Page Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationRef.current) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optimized animation loop
    const animate = () => {
      if (!isVisible) {
        animationRef.current = null;
        return;
      }

      // Clear with dark background
      ctx.fillStyle = '#020c1b';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const len = particles.length;

      // Draw particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.update(width, height);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isNeon ? '#00f3ff' : '#ccd6f6';
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Connect nearby particles (optimized with distance check)
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;

          // Quick x-axis check first
          if (Math.abs(dx) > 80) continue;

          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Use squared distance to avoid sqrt
          if (distSq < 6400) { // 80^2
            const alpha = 0.04 * (1 - distSq / 6400);
            ctx.beginPath();
            ctx.strokeStyle = p.isNeon ? '#00f3ff' : '#ccd6f6';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Render static background for reduced motion
  if (prefersReducedMotion()) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-dark"
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
});

export default CyberBackground;
