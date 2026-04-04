import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Standard GlassCard with premium, high-impact hover animations.
 * Provides a consistent, cyber-tech aesthetic with vibrant neon/purple glows.
 */
const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  isoColor = "#00f3ff", // Default neon cyan
}) => {
  const hoverVariants = hoverEffect ? {
    y: -6,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  } : {};

  // Disable hover animation on touch devices via CSS or by checking capability, but simplest is to keep it uniform or use media query in JS. 
  // For now, we rely on the fact that 'whileHover' usually requires a pointer.

  // Convert hex to rgb for opacity handling if needed, 
  // but for simplicity we can use the hex directly in borders/shadows 
  // or assume the user passes a valid CSS color string.

  return (
    <motion.div
      whileHover={hoverVariants}
      className={`glass rounded-xl overflow-hidden relative group transition-all duration-400 ease-premium md:hover:shadow-glow-subtle will-change-transform ${className}`}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        '--accent-color': isoColor,
        '--accent-shadow': `${isoColor}40`, // 25% opacity
        '--accent-glow': `${isoColor}26`,   // 15% opacity
      }}
    >
      {/* Premium Gradient Background - Subtle scanline/shimmer look on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0
          bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent`}
      />

      {/* Intensified Glow Blobs using the Accent Color */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[90px] pointer-events-none transition-all duration-700
          bg-transparent group-hover:bg-[var(--accent-glow)] group-hover:w-64 group-hover:h-64"
      />
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-[90px] pointer-events-none transition-all duration-700
          bg-transparent group-hover:bg-[var(--accent-glow)] group-hover:w-64 group-hover:h-64"
      />

      {/* Vibrantly Animated Border Layer on Hover */}
      {hoverEffect && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0">
          <div className="absolute inset-px rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent shadow-[0_0_15px_var(--accent-color)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-50" />
        </div>
      )}

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default memo(GlassCard);
