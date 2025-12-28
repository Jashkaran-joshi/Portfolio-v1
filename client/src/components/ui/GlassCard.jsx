import { motion } from 'framer-motion';

/**
 * Standard GlassCard with premium, high-impact hover animations.
 * Provides a consistent, cyber-tech aesthetic with vibrant neon/purple glows.
 */
export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  glowColor = "neon", // 'neon' | 'purple' | 'none'
}) {
  const hoverVariants = hoverEffect ? {
    y: -6,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  } : {};

  // Color theme mapping
  const themes = {
    neon: {
      border: 'hover:border-neon/40',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(0,243,255,0.15)]',
      glow: 'bg-neon',
      accent: 'via-neon/40'
    },
    purple: {
      border: 'hover:border-purple-500/40',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)]',
      glow: 'bg-purple-500',
      accent: 'via-purple-500/40'
    },
    none: {
      border: 'hover:border-white/20',
      shadow: '',
      glow: 'bg-transparent',
      accent: 'via-white/20'
    }
  };

  const theme = themes[glowColor] || themes.none;

  return (
    <motion.div
      whileHover={hoverVariants}
      className={`glass rounded-xl overflow-hidden relative group transition-all duration-500 
        ${hoverEffect ? `${theme.border} ${theme.shadow}` : ''} ${className}`}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Premium Gradient Background - Subtle scanline/shimmer look on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0
          bg-gradient-to-br from-dark-accent/30 via-transparent to-transparent`}
      />

      {/* Intensified Glow Blobs */}
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[90px] pointer-events-none transition-all duration-700
          ${glowColor === 'neon' ? 'bg-neon/15 group-hover:bg-neon/25 group-hover:w-64 group-hover:h-64' :
            glowColor === 'purple' ? 'bg-purple-500/15 group-hover:bg-purple-500/25 group-hover:w-64 group-hover:h-64' : 'bg-transparent'
          }`}
      />
      <div
        className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-[90px] pointer-events-none transition-all duration-700
          ${glowColor === 'neon' ? 'bg-blue-600/15 group-hover:bg-blue-600/25 group-hover:w-64 group-hover:h-64' :
            glowColor === 'purple' ? 'bg-purple-600/15 group-hover:bg-purple-600/25 group-hover:w-64 group-hover:h-64' : 'bg-transparent'
          }`}
      />

      {/* Vibrantly Animated Border Layer on Hover */}
      {hoverEffect && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0">
          <div className={`absolute inset-px rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-500`} />
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${theme.accent} to-transparent shadow-[0_0_15px_${theme.glow === 'bg-neon' ? 'rgba(0,243,255,0.5)' : 'rgba(168,85,247,0.5)'}]`} />
          <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${theme.accent} to-transparent opacity-50`} />
        </div>
      )}

      {/* Content Layer (Ensure it's above absolute decorations) */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
