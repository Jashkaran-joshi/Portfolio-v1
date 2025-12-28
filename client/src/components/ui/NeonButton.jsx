import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

export default function NeonButton({
  children,
  onClick,
  href,
  className = "",
  icon: Icon,
  iconPosition = "right", // 'left' | 'right'
  variant = "outline", // 'outline' | 'filled' | 'ghost'
  size = "md", // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  type = "button",
}) {
  const Component = href ? motion.a : motion.button;

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    outline: 'bg-transparent border border-neon text-neon hover:bg-neon/10',
    filled: 'bg-neon/10 border border-neon text-neon hover:bg-neon/20',
    ghost: 'bg-transparent border border-transparent text-neon hover:bg-white/5',
  };

  const isDisabled = loading || disabled;

  return (
    <Component
      href={href}
      onClick={!isDisabled ? onClick : undefined}
      type={!href ? type : undefined}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative font-mono uppercase tracking-widest 
        transition-all duration-300 overflow-hidden rounded-sm
        flex items-center gap-2 justify-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-dark
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-glow'}
        ${className}
      `}
      disabled={isDisabled}
      style={{ willChange: 'transform' }}
    >
      {/* Sweep effect */}
      {!isDisabled && (
        <span className="absolute top-0 left-0 w-full h-full bg-neon/10 -translate-x-full skew-x-12 transition-transform duration-500 group-hover:translate-x-0 hover:translate-x-0" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="text-lg" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="text-lg" />}
          </>
        )}
      </span>
    </Component>
  );
}
