import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds fake load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-dark flex items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-t-2 border-b-2 border-neon rounded-full"
            />

            {/* Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 left-2 right-2 bottom-2 border-r-2 border-l-2 border-purple-500 rounded-full"
            />

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-neon text-xs animate-pulse">LOADING</span>
            </div>

            {/* Glitch Effect Background */}
            <div className="absolute -inset-4 bg-neon/5 blur-xl animate-pulse rounded-full"></div>
          </div>

          <div className="absolute bottom-10 font-mono text-white/40 text-xs">
            INITIALIZING SYSTEM...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}