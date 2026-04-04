import { useEffect, useRef, useState } from 'react';

// Reverted: blur=false (suggestion 4.4 removed per user request)
export default function Reveal({
  children,
  width = "fit-content",
  delay = 0.25,
  direction = "up",
  duration = 0.5,
  className = "",
  blur = false,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-80px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Direction-based transform
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      case 'none': return 'none';
      default: return 'translateY(40px)';
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(10px)') : undefined,
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s${blur ? `, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` : ''}`,
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };

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
      <div
        style={style}
        className={className.includes('h-full') ? 'h-full' : ''}
      >
        {children}
      </div>
    </div>
  );
}
