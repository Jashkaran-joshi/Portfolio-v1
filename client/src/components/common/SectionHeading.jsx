import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleSize = 'default', // 'default' | 'large'
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center items-center flex flex-col',
    right: 'text-right items-end flex flex-col',
  };

  const titleSizeClasses = {
    default: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    large: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  };

  return (
    <div className={`space-y-2 md:space-y-3 ${alignClasses[align]}`}>
      {eyebrow && (
        <Reveal width="100%" direction={align === 'right' ? 'right' : 'left'}>
          <div className={`font-mono text-neon text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 ${align === 'center' ? 'justify-center' :
            align === 'right' ? 'justify-end flex-row-reverse' : ''
            }`}>
            <motion.span
              className="w-6 sm:w-8 h-px bg-neon/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ originX: align === 'right' ? 1 : 0 }}
            />
            {eyebrow}
          </div>
        </Reveal>
      )}

      <Reveal width="100%">
        <h2 className={`${titleSizeClasses[titleSize]} font-bold font-display text-white relative inline-block pb-2 md:pb-3`}>
          {title}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-gradient-to-r from-neon to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '33%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal width="100%" delay={0.1}>
          <p className={`text-white/60 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${align === 'center' ? 'mx-auto' : ''
            }`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
