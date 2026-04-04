export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark z-50">
            <div className="relative flex flex-col items-center gap-8">
                {/* Spinner */}
                <div className="relative w-24 h-24">
                    {/* Outer Ring */}
                    <div
                        className="absolute inset-0 border-2 border-neon/20 border-t-neon rounded-full css-spinner-outer"
                    />

                    {/* Inner Ring */}
                    <div
                        className="absolute inset-4 border-2 border-purple-500/20 border-b-purple-500 rounded-full css-spinner-inner"
                    />

                    {/* Center Pulse */}
                    <div
                        className="absolute inset-[38px] bg-white rounded-full css-spinner-pulse"
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-neon font-mono text-sm tracking-[0.2em] font-bold">
                        INITIALIZING
                    </span>
                    <div className="h-1 bg-neon/30 rounded-full overflow-hidden w-32">
                        <div className="h-full bg-neon w-full origin-left css-spinner-bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}
