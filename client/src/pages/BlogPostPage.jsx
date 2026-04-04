import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, Tag } from 'lucide-react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import ReadingProgress from '../components/ui/ReadingProgress';
import Breadcrumb from '../components/common/Breadcrumb';
import { blogs } from '../constants/blogs';

export default function BlogPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = useMemo(() => blogs.find((b) => b.id === id), [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <>
            {/* SUGGESTION 1.1: Reading progress bar */}
            <ReadingProgress color={post.color || '#00f3ff'} />
            <SEO 
                title={`${post.title} | Security Blog`} 
                description={post.excerpt}
            />
            <div className="pt-12">
                <section className="section-spacing container-custom relative z-10 min-h-screen">
                {/* Breadcrumb + back button */}
                <div className="hero-fade-in" style={{ animationDelay: '0.05s' }}>
                    <Breadcrumb crumbs={[
                        { label: 'Blog', to: '/blog' },
                        { label: post.title, to: '#' },
                    ]} />
                </div>
                <Button
                    navLink
                    onClick={() => navigate('/blog')}
                    className="mb-10 hero-fade-in group"
                    style={{ animationDelay: '0.1s' }}
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-300" /> Back to Blog
                </Button>
                
                <header className="mb-12 border-b border-white/10 pb-10 relative">
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-[11px] md:text-xs font-mono tracking-widest uppercase text-white/50">
                        <span 
                            className="px-3 py-1 rounded bg-white/5 border border-white/5"
                            style={{ color: post.color }}
                        >
                            <Tag size={12} className="inline mr-1.5 mb-0.5" />
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={12} className="opacity-60" /> {post.date}
                        </span>
                        <div className="hidden sm:block h-3 w-px bg-white/10" />
                        <span className="flex items-center gap-2">
                            <Clock size={12} className="opacity-60" /> {post.readTime}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight text-balance">
                        {post.title}
                    </h1>
                </header>

                <div className="max-w-4xl mx-auto">
                    <div 
                        className="prose prose-invert prose-neon max-w-none font-sans text-white/80 blog-content mb-20 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                    />

                    <footer>
                        <GlassCard 
                            isoColor={post.color} 
                            hoverEffect={false} 
                            className="bg-gradient-to-br from-white/[0.03] to-transparent border-white/5"
                        >
                            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                                <div className="text-left flex-1">
                                    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">Continue Learning</h3>
                                    <p className="text-white/40 text-sm font-mono max-w-xl leading-relaxed">
                                        If you found this technical analysis useful, explore my other write-ups or connect with me on LinkedIn for further discussion on cybersecurity and software engineering.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Button
                                        onClick={() => navigate('/blog')}
                                        variant="secondary"
                                        icon={ChevronRight}
                                        className="!normal-case tracking-[0.2em] text-xs px-8 py-3"
                                    >
                                        Explore Posts
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    </footer>
                </div>
                </section>
            </div>
        </>
    );
}
