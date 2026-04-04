import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, Github, ExternalLink, Activity, Server, Shield, Layers } from 'lucide-react';
import { personalData } from '../constants/data';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import ReadingProgress from '../components/ui/ReadingProgress';
import Breadcrumb from '../components/common/Breadcrumb';
import { PROJECT_ACCENT_COLORS } from '../constants/theme';

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = useMemo(
        () =>
            personalData.projects.find(
                (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
            ),
        [id]
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return <Navigate to="/404" replace />;
    }

    const idx = personalData.projects.findIndex((p) => p.name === project.name);
    const color = PROJECT_ACCENT_COLORS[idx % PROJECT_ACCENT_COLORS.length];

    return (
        <>
            {/* SUGGESTION 1.1: Reading progress bar (accent color per project) */}
            <ReadingProgress color={color} />
            <SEO 
                title={`${project.name} | Jaskaran Joshi`} 
                description={project.description}
            />
            <div className="pt-12">
                <section className="section-spacing container-custom relative z-10 min-h-screen">
                
                {/* Breadcrumb + back button */}
                <div className="hero-fade-in" style={{ animationDelay: '0.05s' }}>
                    <Breadcrumb crumbs={[
                        { label: 'Work', to: '/work' },
                        { label: project.name, to: '#' },
                    ]} />
                </div>
                <Button
                    navLink
                    onClick={() => navigate('/work')}
                    className="mb-10 hero-fade-in"
                    style={{ animationDelay: '0.1s' }}
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-300" /> Back to Work
                </Button>

                {/* Hero Content Part of the Site Grid */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span 
                                    key={i} 
                                    className="px-3 py-1 text-[11px] font-mono rounded-md border border-white/5 bg-white/5 text-white/40 uppercase tracking-wider"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] text-balance">
                            {/* ISSUE 2.3 FIX: use accentWord field to highlight specific word, not hardcoded index */}
                            {project.name.split(' ').map((word, i) => (
                                <span key={i} className={project.accentWord && word === project.accentWord ? 'text-neon' : ''}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-xl text-white/60 max-w-3xl leading-relaxed font-sans text-balance">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0">
                        {project.github && project.github !== '#' && (
                            <Button href={project.github} icon={Github} variant="outline" size="md" target="_blank" rel="noopener noreferrer">
                                Source Code
                            </Button>
                        )}
                        {project.live && project.live !== '#' ? (
                            <Button href={project.live} icon={ExternalLink} size="md" variant="primary" target="_blank" rel="noopener noreferrer">
                                Live Demo
                            </Button>
                        ) : (
                            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white/30 font-mono text-xs flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                                PROTOTYPE ONLY
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-white/10 pt-16">
                    {/* Left Column - Detailed Analysis */}
                    <div className="lg:col-span-8 space-y-16">
                        {project.image ? (
                            <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl group relative shadow-[0_0_50px_-12px_rgba(0,243,255,0.15)]">
                                <img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                        ) : (
                            <div className="aspect-video w-full rounded-2xl bg-dark/50 border border-white/5 flex items-center justify-center flex-col gap-6 text-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                                <span className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-neon group-hover:border-neon/30 transition-all duration-500 bg-white/5">
                                    <Layers size={40} />
                                </span>
                                <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-40">Architectural Diagram Pending</p>
                            </div>
                        )}

                        {/* ISSUE 3.1 FIX: render real per-project architecture + security content */}
                        <div className="prose prose-invert prose-neon max-w-none prose-lg">
                            {project.architecture && (
                                <>
                                    <h3 className="flex items-center gap-3">
                                        <Activity size={24} style={{ color }} className="opacity-70" /> 
                                        Technical Architecture
                                    </h3>
                                    <p>{project.architecture}</p>
                                </>
                            )}
                            
                            {project.securityMeasures && project.securityMeasures.length > 0 && (
                                <>
                                    <h3 className="flex items-center gap-3">
                                        <Shield size={24} style={{ color }} className="opacity-70" /> 
                                        Security & Hardening
                                    </h3>
                                    <ul>
                                        {project.securityMeasures.map((measure, i) => (
                                            <li key={i}>{measure}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Engineering Checklist */}
                    <aside className="lg:col-span-4 space-y-10">
                        <GlassCard className="p-8 md:p-10 space-y-10 border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent" hoverEffect={false}>
                            {/* ISSUE 3.2 FIX: sidebar previously duplicated the header tech chips. Now shows richer metadata instead. */}
                            <div>
                                <h4 className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white/90">
                                    <Server size={14} className="text-neon" /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] uppercase tracking-wider text-white/60">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 border-t border-white/5 pt-8">
                                <div>
                                    <h4 className="text-white/40 font-mono font-bold uppercase tracking-widest text-[10px] mb-3">Project Status</h4>
                                    <div className="flex items-center gap-2.5 text-white/90 font-display font-bold text-sm">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
                                        {project.live !== '#' ? 'Active / Deployed' : 'Development / Archival'}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white/40 font-mono font-bold uppercase tracking-widest text-[10px] mb-3">Principal Domain</h4>
                                    <p className="text-white/90 font-display font-bold text-sm">{project.category || 'Engineering'}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button 
                                    href="/contact" 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-center opacity-80 hover:opacity-100"
                                >
                                    Discussion Needed?
                                </Button>
                            </div>
                        </GlassCard>

                        <div className="p-1 rounded-2xl bg-gradient-to-r from-neon/20 via-transparent to-purple-500/20">
                            <div className="bg-dark/80 backdrop-blur-xl p-8 rounded-[15px] border border-white/5">
                                <h5 className="text-white font-display font-bold mb-3 tracking-wide">Looking for custom architecture?</h5>
                                <p className="text-white/40 text-xs leading-relaxed mb-6 font-mono">
                                    If you need a system designed with the same security-first mindset, let's connect and build something resilient.
                                </p>
                                <Button
                                    onClick={() => navigate('/contact')}
                                    variant="secondary"
                                    icon={ExternalLink}
                                    iconPosition="right"
                                    className="!normal-case tracking-[0.2em] text-xs w-full justify-center sm:w-auto"
                                >
                                    Initialize Contact
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
                </section>
            </div>
        </>
    );
}
