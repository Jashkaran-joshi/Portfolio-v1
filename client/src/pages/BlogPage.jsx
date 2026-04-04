import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Calendar, Clock, Tag, Terminal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button, { IconButton } from '../components/ui/Button';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import Reveal from '../components/ui/Reveal';

import { blogs } from '../constants/blogs';

function getCategories(blogPosts) {
    const cats = ['All', ...new Set(blogPosts.map(p => p.category).filter(Boolean))];
    return cats;
}

export default function BlogPage() {
    const navigate = useNavigate();
    const blogGridRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const setFilter = (cat) => {
        setActiveFilter(cat);
        setCurrentPage(0);
    };

    const categories = getCategories(blogs);
    const filteredBlogs = activeFilter === 'All'
        ? blogs
        : blogs.filter(post => post.category === activeFilter);

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const visibleBlogs = filteredBlogs.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        if (blogGridRef.current) {
            const yOffset = -100; // Adjust for header
            const element = blogGridRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            <SEO 
                title="Security Write-ups & Blog | Jaskaran Joshi" 
                description="Technical cybersecurity write-ups, CTF walkthroughs, and software engineering articles by Jaskaran Joshi."
            />
            <div className="pt-12">
                <section className="section-spacing container-custom relative z-10 min-h-screen">
                <header className="mb-14 border-b border-white/10 pb-10">
                    <SectionHeading 
                        eyebrow="Journal"
                        title="Technical Write-ups"
                        subtitle="Detailed security analysis, zero-day research documentation, and full-stack engineering logs from the lab."
                    />

                    {/* Category Filter Pills (Derived from Projects UI format) */}
                    {categories.length > 1 && (
                        <Reveal delay={0.1}>
                            <div className="mt-8 flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <Button
                                        key={cat}
                                        pill
                                        selected={activeFilter === cat}
                                        onClick={() => setFilter(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </Reveal>
                    )}
                </header>

                <div ref={blogGridRef} className="scroll-mt-32">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentPage + activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {visibleBlogs.map((post, idx) => (
                                <Reveal key={post.id} delay={idx * 0.05}>
                                    <GlassCard 
                                        isoColor={post.color} 
                                        hoverEffect={true} 
                                        className="group cursor-pointer h-full"
                                    >
                                        <div 
                                            className="p-6 md:p-7 flex flex-col h-full gap-5 transition-transform duration-500 group-hover:translate-y-[-4px]"
                                            onClick={() => navigate(`/blog/${post.id}`)}
                                        >
                                            {/* Metadata & Icon */}
                                            <div className="flex items-start justify-between">
                                                <div 
                                                    className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shrink-0"
                                                    style={{ backgroundColor: `${post.color}1a`, color: post.color, border: `1px solid ${post.color}33` }}
                                                >
                                                    <Terminal size={18} className="md:w-5 md:h-5" />
                                                </div>
                                                
                                                <div className="flex flex-col items-end gap-1 text-[10px] font-mono tracking-wider text-right uppercase">
                                                    <span 
                                                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5"
                                                        style={{ color: post.color }}
                                                    >
                                                        {post.category}
                                                    </span>
                                                    <span className="text-white/30 flex items-center gap-1"><Calendar size={10}/> {post.date}</span>
                                                    {post.readTime && (
                                                        <span className="text-white/30 flex items-center gap-1"><Clock size={10}/> {post.readTime}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Category-themed thumbnail */}
                                            <div 
                                                className="w-full aspect-video rounded-lg overflow-hidden relative flex items-center justify-center"
                                                style={{ background: `linear-gradient(135deg, ${post.color}0d 0%, transparent 60%)` }}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                                <div className="absolute top-0 left-0 w-16 h-px" style={{ background: `${post.color}50` }} />
                                                <div className="absolute top-0 left-0 w-px h-16" style={{ background: `${post.color}50` }} />
                                                <div className="absolute bottom-0 right-0 w-16 h-px" style={{ background: `${post.color}50` }} />
                                                <div className="absolute bottom-0 right-0 w-px h-16" style={{ background: `${post.color}50` }} />
                                                <span 
                                                    className="font-mono text-[10px] uppercase tracking-[0.3em] select-none"
                                                    style={{ color: `${post.color}60` }}
                                                >
                                                    {post.category}
                                                </span>
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                <h3 
                                                    className="text-lg md:text-xl font-display font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[var(--accent-color)] line-clamp-2 min-h-[3rem]"
                                                    style={{ '--accent-color': post.color }}
                                                >
                                                    {post.title}
                                                </h3>
                                                
                                                <p className="text-white/50 text-sm leading-relaxed font-sans line-clamp-3 mb-6">
                                                    {post.excerpt}
                                                </p>

                                                <div 
                                                    className="text-[10px] font-mono flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1 border-t border-white/5 pt-4 mt-auto uppercase tracking-widest"
                                                    style={{ color: post.color }}
                                                >
                                                    READ ARTICLE <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Reveal>
                            ))}
                            
                            {visibleBlogs.length === 0 && (
                                <div className="col-span-full text-center py-20 text-white/30 font-mono text-sm">
                                    No write-ups in this category yet.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination (Matched with Certifications UI) */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-4">
                        <IconButton
                            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                            disabled={currentPage === 0}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={20} />
                        </IconButton>

                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handlePageChange(i)}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                                    aria-label={`Go to blog page ${i + 1} of ${totalPages}`}
                                >
                                    <span
                                        className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentPage
                                            ? 'bg-neon shadow-[0_0_10px_rgba(0,243,255,0.5)]'
                                            : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <IconButton
                            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                            disabled={currentPage === totalPages - 1}
                            aria-label="Next page"
                        >
                            <ChevronRight size={20} />
                        </IconButton>
                    </div>
                )}
                
                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="font-mono text-white/30 text-xs">
                        <span className="text-neon">$</span> New write-ups published monthly
                    </p>
                    <Button href="/contact" variant="secondary" icon={ArrowRight} size="sm">
                        Discuss a topic
                    </Button>
                </div>
                </section>
            </div>
        </>
    );
}

