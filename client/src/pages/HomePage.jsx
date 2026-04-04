import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight, Github, Code2, Award, Clock, ShieldCheck } from 'lucide-react';
import Hero from '../components/sections/Hero';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import About from '../components/sections/About';
import ProjectCard from '../components/common/ProjectCard';
import SecurityScanner from '../components/ui/SecurityScanner';
import { personalData } from '../constants/data';

function HomeHighlights() {
    const featuredProjects = personalData.projects.slice(0, 3);

    return (
        <section className="py-24 relative overflow-hidden">
            
            <div className="container-custom relative z-10">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                                <span className="text-neon">&gt;</span> Featured <span className="text-neon">Work</span>
                            </h2>
                            <p className="text-white/60 font-sans max-w-xl text-lg">
                                Applications and security tools engineered for performance, resilience, and scale.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredProjects.map((project, idx) => (
                        <ProjectCard key={project.name} project={project} index={idx} />
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div className="flex justify-center mb-24">
                        <Button href="/work" variant="secondary" icon={ArrowRight} className="px-12 py-4">
                            Explore Full Portfolio
                        </Button>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    <GlassCard 
                        isoColor="#8b5cf6" 
                        hoverEffect={true} 
                        className="border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl relative overflow-hidden group"
                    >
                        <div className="p-8 md:p-12 lg:p-16">
                            {/* Decorative glow background - keeping but refining */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#8b5cf61a] rounded-full blur-[100px] group-hover:bg-[#8b5cf626] transition-all duration-700" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="flex flex-col items-start text-left relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                                    <div 
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                                        style={{ backgroundColor: `#8b5cf61a`, color: '#8b5cf6', border: `1px solid #8b5cf633` }}
                                    >
                                        <Github size={32} className="md:w-10 md:h-10" />
                                    </div>
                                    <h2 
                                        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight transition-colors duration-300 group-hover:text-[var(--accent-color)]"
                                        style={{ '--accent-color': '#8b5cf6' }}
                                    >
                                        Read My <span className="text-white">Technical</span> <br />Write-ups
                                    </h2>
                                    <p className="text-white/60 font-sans max-w-2xl mb-10 text-lg leading-relaxed">
                                        Dive into my thought process on system architecture, zero-day research, and CTF walkthroughs in my dedicated security blog.
                                    </p>
                                    <Button href="/blog" icon={ChevronRight} size="lg" variant="primary" className="w-full sm:w-auto shadow-lg shadow-[#8b5cf61a]">
                                        Access Security Blog
                                    </Button>
                                </div>
                                
                                <div className="hidden lg:block relative z-10 scale-110 transition-transform duration-700 group-hover:scale-[1.15]">
                                    <SecurityScanner />
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>
            </div>
        </section>
    );
}

// SUGGESTION 2.2: Stats trust-signal banner
const STATS = [
    { icon: Code2,       value: '6+',  label: 'Projects'       },
    { icon: Award,       value: '10+', label: 'Certifications' },
    { icon: Clock,       value: '3',   label: 'Yrs Experience' },
    { icon: ShieldCheck, value: 'CEH', label: 'Certified'      },
];

function StatsBanner() {
    return (
        <section aria-label="Key stats" className="relative z-10 py-10 md:py-14">
            <div className="container-custom">
                <Reveal delay={0.1} width="100%">
                    {/* max-w-3xl + mx-auto centres the card on wide screens */}
                    <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                        {STATS.map((stat, i) => {
                            const StatIcon = stat.icon;
                            return (
                            <div
                                key={stat.label}
                                className={`flex flex-col sm:flex-row items-center justify-center gap-3 py-5 px-4 group hover:bg-neon/5 transition-colors duration-300 ${
                                    i < STATS.length - 1 ? 'md:border-r border-white/8' : ''
                                }`}
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neon/10 text-neon shrink-0">
                                    <StatIcon size={17} />
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="text-neon font-bold font-display text-2xl leading-none">{stat.value}</div>
                                    <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest mt-1">{stat.label}</div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default function HomePage() {
    return (
        <>
            <SEO
                title="Python Developer, Cybersecurity Analyst &amp; Full Stack Engineer"
                description="Python Developer, Cybersecurity Analyst, and Full Stack Engineer based in India. CEH Certified with hands-on experience in Django, Flask, penetration testing, VAPT, React, and Node.js."
                keywords="Python Developer, Cybersecurity Analyst, Full Stack Engineer, Django, Flask, Penetration Testing, VAPT, India"
            />
            <Helmet>
                <script type="application/ld+json">
                    {`
                {
                    "@context": "https://schema.org",
                    "@graph": [
                    {
                        "@type": "WebSite",
                        "@id": "https://jaskaranjoshi.online/#website",
                        "url": "https://jaskaranjoshi.online",
                        "name": "Jaskaran Joshi - Python Developer, Cybersecurity Analyst & Full Stack Engineer",
                        "description": "Portfolio of Jaskaran Joshi — Python Developer, Cybersecurity Analyst, and Full Stack Engineer.",
                        "publisher": {
                        "@id": "https://jaskaranjoshi.online/#person"
                        },
                        "inLanguage": "en-US"
                    },
                    {
                        "@type": "Person",
                        "@id": "https://jaskaranjoshi.online/#person",
                        "name": "Jaskaran Joshi",
                        "jobTitle": "Python Developer, Cybersecurity Analyst & Full Stack Engineer",
                        "url": "https://jaskaranjoshi.online",
                        "image": "https://jaskaranjoshi.online/profile.webp",
                        "sameAs": [
                        "https://www.linkedin.com/in/jaskaran-joshi/",
                        "https://github.com/Jashkaran-joshi"
                        ],
                        "worksFor": {
                        "@type": "Organization",
                        "name": "Freelance"
                        },
                        "email": "jashkaranjoshi@gmail.com",
                        "nationality": "India"
                    }
                    ]
                }
                `}
                </script>
            </Helmet>
            <Hero />
            {/* SUGGESTION 2.2: Stats trust-signal banner */}
            <StatsBanner />
            <Suspense fallback={null}>
                <About />
            </Suspense>
            <HomeHighlights />
        </>
    );
}
