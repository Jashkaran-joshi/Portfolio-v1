import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function Reveal({
  children,
  width = "fit-content",
  delay = 0.25,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 0.6,
  className = "",
  blur = false, // Add subtle blur during reveal
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const mainControls = useAnimation();

  // Direction-based initial state
  const getInitialState = () => {
    const base = { opacity: 0 };
    if (blur) base.filter = 'blur(10px)';

    switch (direction) {
      case 'up': return { ...base, y: 40 };
      case 'down': return { ...base, y: -40 };
      case 'left': return { ...base, x: 40 };
      case 'right': return { ...base, x: -40 };
      case 'none': return base;
      default: return { ...base, y: 40 };
    }
  };

  const getFinalState = () => {
    const base = { opacity: 1, x: 0, y: 0 };
    if (blur) base.filter = 'blur(0px)';
    return base;
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        height: className.includes('h-full') ? '100%' : 'auto',
        overflow: "visible"
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: getInitialState(),
          visible: getFinalState(),
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration,
          ease: [0.16, 1, 0.3, 1],
          delay
        }}
        className={className.includes('h-full') ? 'h-full' : ''}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
