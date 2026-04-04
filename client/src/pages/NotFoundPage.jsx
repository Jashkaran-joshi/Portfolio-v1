import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MonitorX, ChevronLeft, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';

export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Fix scroll position if routed from middle of another page
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO 
                title="404: Access Denied | Jaskaran Joshi" 
                description="The page you requested could not be found."
            />
            <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-dark/95 z-0" />
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
                </div>
                
                <div className="max-w-2xl w-full flex flex-col items-center justify-center text-center z-10 glass border-red-500/20 border p-8 md:p-16 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.05)]">
                    <MonitorX size={80} className="text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                    
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-wider">
                        4<span className="text-red-500">0</span>4
                    </h1>
                    
                    <h2 className="text-xl md:text-2xl font-mono text-white/80 mb-6 uppercase tracking-widest">
                        Endpoint Not Found
                    </h2>
                    
                    <p className="text-white/60 mb-10 max-w-md font-sans">
                        The requested resource does not exist or has been moved to a classified location.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            icon={ChevronLeft}
                            iconPosition="left"
                        >
                            Go Back
                        </Button>
                        <Button href="/" icon={Home} variant="primary">
                            Return Home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
