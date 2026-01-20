import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scroller } from 'react-scroll';
import NeonButton from '../ui/NeonButton';
import { FiDownload, FiChevronRight } from 'react-icons/fi';
import { Shield, Lock, Activity, Database, Globe, Cpu, Code, Key } from 'lucide-react';

// Typing animation component - fixed to avoid re-render issues
const TypingText = memo(function TypingText({ text, delay = 0, speed = 50, className = '', onComplete, showCursor = true }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Reset state
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);

    const startTimer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayedText(text.slice(0, indexRef.current));
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsComplete(true);
          // Use ref to call onComplete
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, delay, speed]); // Removed onComplete from deps - using ref instead

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span
          className="inline-block ml-0.5 text-neon font-normal"
          style={{ animation: 'blink 0.8s step-end infinite' }}
        >
          |
        </span>
      )}
    </span>
  );
});

// Hero typing sequence component
function HeroTypingContent({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [linesCompleted, setLinesCompleted] = useState([]);

  const handleLineComplete = useCallback((lineId) => {
    setLinesCompleted(prev => {
      if (prev.includes(lineId)) return prev;
      return [...prev, lineId];
    });

    const delays = [200, 300, 400, 0];
    setTimeout(() => {
      if (lineId < 3) {
        setCurrentLine(prev => Math.max(prev, lineId + 1));
      } else {
        onComplete?.();
      }
    }, delays[lineId]);
  }, [onComplete]);

  return (
    <>
      {/* Line 1: Hello, World! I am */}
      <div className="font-mono text-neon text-sm md:text-base mb-4 flex items-center gap-2 min-h-[24px]">
        <span className="w-6 md:w-8 h-px bg-neon flex-shrink-0" />
        {currentLine >= 0 && (
          <TypingText
            text="Hello, World! I am"
            delay={600}
            speed={40}
            showCursor={currentLine === 0 && !linesCompleted.includes(0)}
            onComplete={() => handleLineComplete(0)}
          />
        )}
      </div>

      {/* Line 2 & 3: Jaskaran Joshi */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
        <span className="text-white">
          {currentLine >= 1 ? (
            <TypingText
              text="Jaskaran "
              delay={0}
              speed={80}
              showCursor={currentLine === 1 && !linesCompleted.includes(1)}
              onComplete={() => handleLineComplete(1)}
            />
          ) : (
            <span className="opacity-0">Jaskaran</span>
          )}
        </span>
        <br className="hidden sm:block" />
        <span className="text-white/50">
          {currentLine >= 2 ? (
            <TypingText
              text="Joshi"
              delay={0}
              speed={60}
              showCursor={currentLine === 2 && !linesCompleted.includes(2)}
              onComplete={() => handleLineComplete(2)}
            />
          ) : (
            <span className="opacity-0">Joshi</span>
          )}
        </span>
      </h1>

      {/* Line 4: CyberSecurity Student | Security Researching */}
      <div className="text-white/70 font-mono text-sm md:text-lg mb-8 md:mb-10 max-w-xl min-h-[28px] leading-relaxed">
        {currentLine >= 3 ? (
          <>
            <span className="text-neon">&gt;</span>{' '}
            <TypingText
              text="Full-Stack Developer & Cybersecurity Enthusiast"
              delay={0}
              speed={30}
              showCursor={currentLine === 3 && !linesCompleted.includes(3)}
              onComplete={() => handleLineComplete(3)}
            />
          </>
        ) : (
          <span className="opacity-0">&gt; Full-Stack Developer & Cybersecurity Enthusiast</span>
        )}
      </div>
    </>
  );
}

// Memoized dashboard stats
const DashboardStats = memo(function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Activity size={10} className="text-green-400 sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/40 font-mono">UPTIME</span>
        <span className="text-[8px] sm:text-[10px] text-white font-bold">99.9%</span>
      </div>
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Shield size={10} className="text-neon sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/40 font-mono">STATUS</span>
        <span className="text-[8px] sm:text-[10px] text-neon font-bold">SECURE</span>
      </div>
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Database size={10} className="text-purple-400 sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/40 font-mono">DATA</span>
        <span className="text-[8px] sm:text-[10px] text-white font-bold">ENCRYPTED</span>
      </div>
    </div>
  );
});

// Traffic bars with animation
const TrafficBars = memo(function TrafficBars({ shouldReduceMotion }) {
  const barData = [
    { h1: 25, h2: 55 },
    { h1: 35, h2: 65 },
    { h1: 45, h2: 75 },
    { h1: 30, h2: 60 },
    { h1: 40, h2: 70 },
    { h1: 35, h2: 55 },
    { h1: 28, h2: 58 },
    { h1: 42, h2: 68 },
  ];

  return (
    <div className="flex items-end justify-between gap-0.5 sm:gap-1 h-full px-0.5 sm:px-1 pb-0.5 sm:pb-1">
      {barData.map((bar, i) => (
        <motion.div
          key={i}
          className="w-full bg-neon/30 rounded-t-sm"
          animate={shouldReduceMotion ? {} : {
            height: [`${bar.h1}%`, `${bar.h2}%`]
          }}
          transition={{
            duration: 1 + i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ height: shouldReduceMotion ? '50%' : undefined }}
        />
      ))}
    </div>
  );
});

// Floating code particles
const FloatingParticles = memo(function FloatingParticles({ shouldReduceMotion }) {
  if (shouldReduceMotion) return null;

  const particles = [
    { text: '</>', angle: 0, delay: 0 },
    { text: '{API}', angle: 90, delay: 0.7 },
    { text: 'SECURE', angle: 180, delay: 1.4 },
    { text: 'KEY', angle: 270, delay: 2.1 },
  ];

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute z-10 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(particle.angle * (Math.PI / 180)) * 140,
            y: Math.sin(particle.angle * (Math.PI / 180)) * 140,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: particle.delay
          }}
        >
          <div className="bg-dark/80 backdrop-blur border border-white/10 p-1.5 rounded text-[10px] font-mono text-neon/80 shadow-lg">
            {particle.text}
          </div>
        </motion.div>
      ))}
    </>
  );
});

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [typingComplete, setTypingComplete] = useState(false);

  const scrollToProjects = useCallback(() => {
    scroller.scrollTo('projects', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80,
    });
  }, []);

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 md:pt-20 overflow-hidden">
      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-0">

        {/* Text Content */}
        <div className="order-2 lg:order-1">
          {/* Typing Animation Section */}
          <HeroTypingContent onComplete={() => setTypingComplete(true)} />

          {/* Description - Fades in after typing */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mb-6 md:mb-8 leading-relaxed text-balance"
          >
            I build web applications that work smoothly and stay secure. I enjoy writing clean code and testing systems to find vulnerabilities before they become problems.
          </motion.p>

          {/* Buttons - Fade in after typing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <NeonButton icon={FiChevronRight} onClick={scrollToProjects} variant="filled">
              View Projects
            </NeonButton>

            <a href="/resume.pdf" download="Jaskaran_Joshi_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <NeonButton variant="ghost" icon={FiDownload}>
                Resume
              </NeonButton>
            </a>
          </motion.div>
        </div>

        {/* Visual Content with Multiple Orbits */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center"
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={floatAnimation}
              className="relative z-20"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-neon/5 blur-2xl -z-10 scale-90 rounded-full" />

              {/* The Secure Web App Interface */}
              <div className="w-64 h-52 sm:w-72 sm:h-56 md:w-80 md:h-64 bg-dark/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative flex flex-col group">

                {/* Window Header */}
                <div className="h-7 sm:h-8 bg-white/5 border-b border-white/5 flex items-center px-3 sm:px-4 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 bg-black/40 rounded-full border border-white/5">
                    <Lock size={8} className="text-neon sm:w-[10px] sm:h-[10px]" />
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/60">secure_admin_panel</span>
                  </div>
                </div>

                {/* Window Body */}
                <div className="flex-1 p-3 sm:p-4 relative overflow-hidden flex flex-col gap-2 sm:gap-3">
                  {/* Scanning Line Effect */}
                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ top: ['-100%', '200%'], opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="absolute left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-neon/10 to-transparent w-full z-10 pointer-events-none transform -skew-y-12"
                    />
                  )}

                  {/* Dashboard Stats Row */}
                  <DashboardStats />

                  {/* Live Traffic Visualization */}
                  <div className="flex-1 bg-black/20 rounded border border-white/5 p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[6px] sm:text-[8px] font-mono text-white/40">NETWORK TRAFFIC</span>
                      <div className="flex gap-1 items-center">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[6px] sm:text-[8px] font-mono text-green-500">LIVE</span>
                      </div>
                    </div>
                    <TrafficBars shouldReduceMotion={shouldReduceMotion} />
                  </div>

                  {/* Terminal Footer */}
                  <div className="h-6 sm:h-8 bg-black/40 rounded border border-white/5 p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 font-mono text-[6px] sm:text-[8px] text-white/60 overflow-hidden">
                    <span className="text-neon">$</span>
                    <motion.span
                      animate={shouldReduceMotion ? {} : { opacity: [1, 1, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, times: [0, 0.8, 0.9, 1] }}
                    >
                      analyzing_threats...
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ORBIT 1 - Inner dashed ring (decorative, no satellite) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 sm:inset-4 border border-neon/10 rounded-full border-dashed z-10 pointer-events-none"
            />

            {/* ORBIT 2 - First satellite ring with Globe (radius: 40px) - positioned at RIGHT */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-25px] sm:inset-[-35px] z-10 pointer-events-none hidden sm:block"
              >
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-4 bg-dark border border-neon/50 p-1 sm:p-1.5 rounded-full text-neon shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <Globe size={12} className="sm:w-[14px] sm:h-[14px]" />
                </motion.div>
              </motion.div>
            )}

            {/* ORBIT 3 - Second satellite ring with CPU (radius: 65px) - positioned at BOTTOM */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50px] sm:inset-[-65px] z-10 pointer-events-none hidden sm:block"
              >
                <motion.div
                  className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-dark border border-purple-500/50 p-1 sm:p-1.5 rounded-full text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu size={12} className="sm:w-[14px] sm:h-[14px]" />
                </motion.div>
              </motion.div>
            )}

            {/* ORBIT 4 - Third satellite ring with Code (radius: 95px) - positioned at LEFT */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-80px] sm:inset-[-100px] z-10 pointer-events-none hidden md:block"
              >
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-4 bg-dark border border-green-500/50 p-1 sm:p-1.5 rounded-full text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                >
                  <Code size={12} className="sm:w-[14px] sm:h-[14px]" />
                </motion.div>
              </motion.div>
            )}

            {/* ORBIT 5 - Fourth satellite ring with Key (radius: 120px) - positioned at TOP */}
            {!shouldReduceMotion && (
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-105px] sm:inset-[-130px] z-10 pointer-events-none hidden md:block"
              >
                <motion.div
                  className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-dark border border-yellow-500/50 p-1 sm:p-1.5 rounded-full text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <Key size={12} className="sm:w-[14px] sm:h-[14px]" />
                </motion.div>
              </motion.div>
            )}

            {/* Outer decorative ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: -360, scale: [1, 1.02, 1] }}
              transition={{
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-[-16px] sm:inset-[-20px] border border-purple-500/10 rounded-full z-0 pointer-events-none"
            />

            {/* Floating Code Particles */}
            <FloatingParticles shouldReduceMotion={shouldReduceMotion} />

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 via-purple-500/10 to-transparent rounded-full blur-3xl -z-20" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: typingComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
      >
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-neon to-transparent" />
      </motion.div>
    </section>
  );
}
