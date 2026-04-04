import { memo } from 'react';
import { motion } from 'framer-motion';

const SecurityScanner = memo(function SecurityScanner() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-8 overflow-hidden pointer-events-none">
      <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
        
        {/* Soft, ethereal backlight - No harsh neon, just smooth ambiance */}
        <div className="absolute inset-0 bg-gradient-radial from-neon/[0.08] via-transparent to-transparent blur-[50px]" />
        
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full relative z-10"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="premiumWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="premiumAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.1" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Abstract Morphing Topological Mesh */}
          <motion.g 
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
            style={{ originX: '250px', originY: '250px' }}
          >
            {[...Array(16)].map((_, i) => (
              <motion.ellipse
                key={i}
                cx="250" cy="250"
                rx="150" ry="40"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={0.05 + (i * 0.015)}
                fill="none"
                style={{ rotate: `${i * (180 / 16)}deg`, originX: '250px', originY: '250px' }}
                initial={{ ry: 40 }}
                animate={{ ry: [40, 150, 40] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              />
            ))}
          </motion.g>

          {/* 2. High-precision Outer Scopes (Replacing scanning bars) */}
          <motion.circle
            cx="250" cy="250" r="190"
            stroke="url(#premiumAccent)" strokeWidth="1" strokeOpacity="0.4"
            strokeDasharray="1 14"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            style={{ originX: '250px', originY: '250px' }}
          />

          <motion.circle
            cx="250" cy="250" r="220"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.15"
            strokeDasharray="120 60 40 60"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ originX: '250px', originY: '250px' }}
          />

          {/* 3. Central Monolith - Sleek Architectural Diamond */}
          <motion.g 
            filter="url(#softGlow)" 
            className="origin-center" 
            animate={{ scale: [1, 1.03, 1] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: '250px', originY: '250px' }}
          >
            {/* Outer Shell */}
            <path
              d="M 250 160 L 300 250 L 250 340 L 200 250 Z"
              fill="rgba(255,255,255,0.015)"
              stroke="url(#premiumWhite)"
              strokeWidth="1.5"
            />
            {/* Inner Refraction */}
            <path
              d="M 250 190 L 275 250 L 250 310 L 225 250 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            {/* Core Spark */}
            <circle cx="250" cy="250" r="2" fill="white" />
          </motion.g>

          {/* 4. Precision Axial Scanner Lines (Data Axis) */}
          <motion.line
            x1="40" y1="250" x2="460" y2="250"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.15"
            animate={{ rotate: 180 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: '250px', originY: '250px' }}
          />
          <motion.circle
            cx="250" cy="250" r="40"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.2"
            fill="none"
          />

          {/* 5. Minimalist Ambient Sub-particles */}
          {[
            { angle: 45, r: 160, d: 2 },
            { angle: 135, r: 180, d: 1 },
            { angle: 225, r: 170, d: 3 },
            { angle: 315, r: 150, d: 4 },
          ].map((pt, i) => {
            const x = 250 + Math.cos(pt.angle * Math.PI/180) * pt.r;
            const y = 250 + Math.sin(pt.angle * Math.PI/180) * pt.r;
            return (
              <motion.circle
                key={`spark-${i}`}
                cx={x} cy={y} r="1"
                fill="white"
                className="origin-center"
                animate={{ opacity: [0, 0.7, 0], scale: [1, 1.5, 1] }}
                transition={{ duration: 5, delay: pt.d, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Minimalist Premium Typographic Readout */}
        <div className="absolute -bottom-8 left-0 w-full flex justify-between px-4 uppercase opacity-30 select-none">
          <span className="text-[7.5px] font-sans tracking-[0.4em] font-medium">Arch.01</span>
          <span className="text-[7.5px] font-sans tracking-[0.4em] font-medium text-right">Process_A</span>
        </div>

      </div>
    </div>
  );
});

export default SecurityScanner;
