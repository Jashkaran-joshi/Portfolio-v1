import { useEffect } from 'react';
import { Download, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';

export default function ResumePage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO 
                title="Resume | Jaskaran Joshi" 
                description="View and download the professional resume of Jaskaran Joshi, Python Developer and Cybersecurity Analyst."
            />
            <div className="pt-12">
                <section className="section-spacing container-custom relative z-10 min-h-screen flex flex-col">
                    <Button
                        navLink
                        onClick={() => navigate(-1)}
                        className="mb-10 hero-fade-in group"
                        style={{ animationDelay: '0.1s' }}
                        type="button"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-300" /> Back
                    </Button>

                    <header className="mb-14 border-b border-white/10 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div className="flex-1">
                            {/* Force mb-0 on SectionHeading's internal p by using a wrapper, or just pass it as subtitle */}
                            <SectionHeading 
                                title="Standard Resume"
                                subtitle="View and download my professional resume."
                            />
                        </div>
                        
                        <div className="flex shrink-0 mb-2 sm:mb-4">
                            <Button href="/resume.pdf" icon={Download} download="Jaskaran_Joshi_Resume.pdf" variant="primary">
                                Download PDF
                            </Button>
                        </div>
                    </header>

                    <div className="max-w-5xl mx-auto w-full glass rounded-lg border border-white/5 overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    {/* Fallback for mobile browsers that don't support PDF embedding well */}
                    <div className="bg-dark/80 p-4 border-b border-white/5 flex items-center justify-between text-sm md:hidden">
                        <span className="text-white/70 font-mono">Mobile View</span>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-neon underline">
                            Open in New Tab
                        </a>
                    </div>
                    
                    {/* Desktop/Tablet PDF Viewer */}
                    <iframe
                        src="/resume.pdf#view=Fit&scrollbar=0&toolbar=0&navpanes=0"
                        title="Resume"
                        className="w-full hidden md:block h-[85vh] rounded-b-lg border-0 bg-white"
                        scrolling="no"
                        frameBorder="0"
                    />
                    
                    {/* Native mobile PDF fallback */}
                    <iframe 
                        src="/resume.pdf#view=Fit&scrollbar=0&toolbar=0&navpanes=0" 
                        title="Resume Mobile"
                        className="w-full md:hidden h-[75vh] rounded-b-lg border-0 bg-white"
                        scrolling="no"
                        frameBorder="0"
                    />
                </div>
                </section>
            </div>
        </>
    );
}
