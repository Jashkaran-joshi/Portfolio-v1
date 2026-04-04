import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../../utils/performanceUtils';
import Button from '../ui/Button';
import TextScramble from '../ui/TextScramble';
import { Shield, Lock, Activity, Database, Globe, Cpu, Code, Key, Download, ChevronRight, Folder } from 'lucide-react';

// Memoized dashboard stats
const DashboardStats = memo(function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Activity size={10} className="text-green-400 sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/60 font-mono">UPTIME</span>
        <span className="text-[8px] sm:text-[10px] text-white font-bold">99.9%</span>
      </div>
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Shield size={10} className="text-neon sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/60 font-mono">STATUS</span>
        <span className="text-[8px] sm:text-[10px] text-neon font-bold">SECURE</span>
      </div>
      <div className="bg-white/5 p-1.5 sm:p-2 rounded border border-white/5 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <Database size={10} className="text-purple-400 sm:w-3 sm:h-3" />
        <span className="text-[6px] sm:text-[8px] text-white/60 font-mono">DATA</span>
        <span className="text-[8px] sm:text-[10px] text-white font-bold">ENCRYPTED</span>
      </div>
    </div>
  );
});

// Traffic bars with CSS animation instead of framer-motion
const TrafficBars = memo(function TrafficBars() {
  return (
    <div className="flex items-end justify-between gap-0.5 sm:gap-1 h-full px-0.5 sm:px-1 pb-0.5 sm:pb-1">
      {[25, 35, 45, 30, 40, 35, 28, 42].map((h, i) => (
        <div
          key={i}
          className="w-full bg-neon/30 rounded-t-sm traffic-bar"
          style={{
            height: `${h + 20}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
});

// Deferred orbits - only mount after LCP
const DeferredOrbits = memo(function DeferredOrbits({ shouldReduceMotion }) {
  if (shouldReduceMotion) return null;

  return (
    <>
      {/* ORBIT 1 - Inner dashed ring */}
      <div
        className="absolute inset-2 sm:inset-4 border border-neon/10 rounded-full border-dashed z-10 pointer-events-none orbit-spin-slow"
      />

      {/* ORBIT 2 - Globe satellite */}
      <div
        className="absolute inset-[-25px] sm:inset-[-35px] z-10 pointer-events-none hidden sm:block orbit-spin-medium"
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-4 bg-dark border border-neon/50 p-1 sm:p-1.5 rounded-full text-neon shadow-[0_0_15px_rgba(0,243,255,0.4)] orbit-counterspin-medium"
        >
          <Globe size={12} className="sm:w-[14px] sm:h-[14px]" />
        </div>
      </div>

      {/* ORBIT 3 - CPU satellite */}
      <div
        className="absolute inset-[-50px] sm:inset-[-65px] z-10 pointer-events-none hidden sm:block orbit-spin-slow-reverse"
      >
        <div
          className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-dark border border-purple-500/50 p-1 sm:p-1.5 rounded-full text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] orbit-counterspin-slow-reverse"
        >
          <Cpu size={12} className="sm:w-[14px] sm:h-[14px]" />
        </div>
      </div>

      {/* ORBIT 4 - Code satellite */}
      <div
        className="absolute inset-[-80px] sm:inset-[-100px] z-10 pointer-events-none hidden md:block orbit-spin-slower"
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-4 bg-dark border border-green-500/50 p-1 sm:p-1.5 rounded-full text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)] orbit-counterspin-slower"
        >
          <Code size={12} className="sm:w-[14px] sm:h-[14px]" />
        </div>
      </div>

      {/* ORBIT 5 - Key satellite */}
      <div
        className="absolute inset-[-105px] sm:inset-[-130px] z-10 pointer-events-none hidden md:block orbit-spin-slowest-reverse"
      >
        <div
          className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-dark border border-yellow-500/50 p-1 sm:p-1.5 rounded-full text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)] orbit-counterspin-slowest-reverse"
        >
          <Key size={12} className="sm:w-[14px] sm:h-[14px]" />
        </div>
      </div>

      {/* Outer decorative ring */}
      <div
        className="absolute inset-[-16px] sm:inset-[-20px] border border-purple-500/10 rounded-full z-0 pointer-events-none orbit-spin-slowest-reverse"
      />
    </>
  );
});

export default function Hero() {
  const shouldReduceMotion = prefersReducedMotion();
  const [orbitsReady, setOrbitsReady] = useState(false);

  const navigate = useNavigate();
  const scrollToProjects = useCallback(() => {
    navigate('/work');
  }, [navigate]);

  // Defer orbital animations until after LCP
  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => setOrbitsReady(true), { timeout: 1500 })
      : setTimeout(() => setOrbitsReady(true), 300);

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 md:pt-20"
    >
      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-0">

        {/* Text Content – renders INSTANTLY for LCP */}
        <div className="order-2 lg:order-1">
          {/* SUGGESTION 2.1: "Available for Work" status indicator */}
          <div className="hero-fade-in mb-4" style={{ animationDelay: '0.05s' }}>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </span>
          </div>

          {/* Greeting line with CSS typing cursor */}
          <div className="font-mono text-neon text-sm md:text-base mb-4 flex items-center gap-2 min-h-[24px] hero-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-6 md:w-8 h-px bg-neon flex-shrink-0" />
            <span>
              Hello, World! I am
              <span
                className="inline-block ml-0.5 text-neon font-normal"
                style={{ animation: 'blink 0.8s step-end infinite' }}
              >
                |
              </span>
            </span>
          </div>

          {/* h1 – LCP element, renders immediately with NO animation blocking */}
          {/* SUGGESTION 4.1: TextScramble applied to first name only — settles after 400ms */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
            <TextScramble text="Jaskaran" className="text-white" />{' '}
            <br className="hidden sm:block" />
            <span className="text-white/50">Joshi</span>
          </h1>

          {/* Role subtitle — wraps cleanly on mobile via flex-wrap + whitespace-nowrap per span */}
          <h2 className="text-white/70 font-mono text-xs sm:text-sm md:text-lg mb-6 md:mb-10 min-h-[28px] leading-relaxed hero-fade-in flex flex-wrap items-center gap-x-1.5 overflow-hidden" style={{ animationDelay: '0.15s' }}>
            <span className="text-neon">&gt;</span>
            <span className="whitespace-nowrap">Python Developer</span>
            <span className="text-neon/40 text-[10px]">|</span>
            <span className="whitespace-nowrap">Cybersecurity Analyst</span>
            <span className="text-neon/40 text-[10px]">|</span>
            <span className="whitespace-nowrap">Full Stack Engineer</span>
          </h2>

          {/* SUGGESTION 5.3: CSS-only typewriter cycling 3 role descriptions every 4s.
              Uses animating width + overflow:hidden (no JS typing lib required). */}
          <div
            className="hidden md:block text-white/60 text-sm sm:text-base md:text-lg max-w-xl mb-6 md:mb-8 leading-relaxed hero-fade-in font-mono"
            style={{ animationDelay: '0.25s' }}
          >
            <span className="typewriter-cycle" aria-label="Python developer building production-grade APIs. Cybersecurity analyst breaking systems before others do. Full-stack engineer shipping from idea to deployment." />
          </div>

          {/* Buttons – CSS fade-in, no JS gating */}
          <div className="hero-fade-in" style={{ animationDelay: '0.35s' }}>
            {/* Desktop Buttons (Text + Icon) */}
            <div className="hidden md:flex flex-wrap gap-4">
              <Button icon={ChevronRight} onClick={scrollToProjects} variant="primary">
                View Projects
              </Button>

              <Button href="/resume" variant="secondary" icon={Download}>
                Resume
              </Button>
            </div>

            {/* Mobile Buttons (Capsule Style) */}
            <div className="flex md:hidden gap-4 mt-6 w-full max-w-[340px]">
              <Button
                onClick={scrollToProjects}
                variant="primary"
                icon={Folder}
                className="flex-1 justify-center"
              >
                PROJECTS
              </Button>

              <Button
                href="/resume.pdf"
                download="Jaskaran_Joshi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={Download}
                className="flex-1 justify-center"
              >
                RESUME
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Content with Deferred Orbits */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative" style={{ perspective: "1000px" }}>
          <div
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center hero-scale-in"
          >
            {/* Floating Animation Wrapper – CSS animation */}
            <div
              className={`relative z-20 will-change-transform ${shouldReduceMotion ? '' : 'hero-float'}`}
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
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/60">vapt_terminal</span>
                  </div>
                </div>

                {/* Window Body */}
                <div className="flex-1 p-3 sm:p-4 relative overflow-hidden flex flex-col gap-2 sm:gap-3">
                  {/* Scanning Line Effect – CSS only */}
                  {!shouldReduceMotion && (
                    <div className="absolute left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-neon/10 to-transparent w-full z-10 pointer-events-none -skew-y-12 scan-line" />
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
                    <TrafficBars />
                  </div>

                  {/* Terminal Footer */}
                  <div className="h-6 sm:h-8 bg-black/40 rounded border border-white/5 p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 font-mono text-[6px] sm:text-[8px] text-white/60 overflow-hidden">
                    <span className="text-neon">$</span>
                    <span className="terminal-blink">scanning_for_vulnerabilities...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deferred Orbits – mounted after LCP via requestIdleCallback */}
            {orbitsReady && <DeferredOrbits shouldReduceMotion={shouldReduceMotion} />}

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 via-purple-500/10 to-transparent rounded-full blur-3xl -z-20" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator – CSS animation */}
      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex hero-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-neon to-transparent scroll-indicator-line" />
      </div>
    </section>
  );
}
