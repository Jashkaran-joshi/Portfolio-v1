import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

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
  success = false,
  disabled = false,
  type = "button",
  iconClassName = "",
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

  // If success, we force Filled variant for better visibility
  const activeVariant = success ? 'filled' : variant;
  const activeDisabled = loading || success || disabled;

  return (
    <Component
      href={href}
      onClick={!activeDisabled ? onClick : undefined}
      type={!href ? type : undefined}
      whileHover={!activeDisabled ? { scale: 1.02 } : {}}
      whileTap={!activeDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative font-mono uppercase tracking-widest 
        transition-all duration-300 overflow-hidden rounded-sm
        flex items-center gap-2 justify-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-dark
        ${sizeClasses[size]}
        ${variantClasses[activeVariant]}
        ${success ? 'border-green-500 text-green-500 bg-green-500/10' : ''}
        ${activeDisabled ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer hover:shadow-glow'}
        ${className}
      `}
      disabled={activeDisabled}
      style={{ willChange: 'transform' }}
    >
      {/* Sweep effect */}
      {!activeDisabled && (
        <span className="absolute top-0 left-0 w-full h-full bg-neon/10 -translate-x-full skew-x-12 transition-transform duration-500 group-hover:translate-x-0 hover:translate-x-0" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <Loader2 className={`animate-spin ${iconClassName}`} size={18} />
              <span>Sending...</span>
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 font-bold"
            >
              <Check size={18} />
              <span>Sent Successfully</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              {Icon && iconPosition === 'left' && <Icon size={18} className={iconClassName} />}
              {children}
              {Icon && iconPosition === 'right' && <Icon size={18} className={iconClassName} />}
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </Component>
  );
}
