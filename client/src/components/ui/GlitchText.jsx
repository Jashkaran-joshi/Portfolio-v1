import { motion } from 'framer-motion';

export default function GlitchText({
  text,
  className = "",
  intensity = "subtle", // 'subtle' | 'medium' | 'strong'
  hoverOnly = true, // Only show glitch on hover
}) {
  const intensityConfig = {
    subtle: {
      translate: '1px',
      blur: '0.5px',
      opacity: 0.5,
    },
    medium: {
      translate: '2px',
      blur: '0px',
      opacity: 0.7,
    },
    strong: {
      translate: '3px',
      blur: '0px',
      opacity: 0.8,
    },
  };

  const config = intensityConfig[intensity];
  const hoverClass = hoverOnly ? 'group-hover:' : '';

  return (
    <motion.span
      className={`relative inline-block group ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Cyan glitch layer */}
      <span
        className={`absolute top-0 left-0 -z-10 w-full h-full text-neon opacity-0 ${hoverClass}opacity-${Math.round(config.opacity * 100)} ${hoverClass}animate-glitch pointer-events-none`}
        style={{
          transform: `translateX(${config.translate})`,
          filter: config.blur !== '0px' ? `blur(${config.blur})` : 'none',
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Purple glitch layer */}
      <span
        className={`absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 ${hoverClass}opacity-${Math.round(config.opacity * 100)} ${hoverClass}animate-glitch animation-delay-100 pointer-events-none`}
        style={{
          transform: `translateX(-${config.translate})`,
          filter: config.blur !== '0px' ? `blur(${config.blur})` : 'none',
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </motion.span>
  );
}
