import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark z-50">
            <div className="relative flex flex-col items-center gap-8">
                {/* Spinner */}
                <div className="relative w-24 h-24">
                    {/* Outer Ring */}
                    <motion.div
                        className="absolute inset-0 border-2 border-neon/20 border-t-neon rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Ring */}
                    <motion.div
                        className="absolute inset-4 border-2 border-purple-500/20 border-b-purple-500 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center Pulse */}
                    <motion.div
                        className="absolute inset-[38px] bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-neon font-mono text-sm tracking-[0.2em] font-bold">
                        INITIALIZING
                    </span>
                    <motion.div
                        className="h-1 bg-neon/30 rounded-full overflow-hidden w-32"
                    >
                        <motion.div
                            className="h-full bg-neon w-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
