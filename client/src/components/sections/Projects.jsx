import { useState } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../common/ProjectCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';

// SUGGESTION 2.3: derive unique categories from project data
function getCategories(projects) {
    const cats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
    return cats;
}

// SUGGESTION 3.2: grid-aware stagger — cards in same row enter together as a wave
function gridDelay(index, cols = 3) {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return row * 0.18 + col * 0.05;
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const categories = getCategories(personalData.projects);

    const filtered = activeFilter === 'All'
        ? personalData.projects
        : personalData.projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="section-spacing relative overflow-hidden scroll-mt-20">

            {/* Background decoration */}
            {/* SUGGESTION 4.2: parallax-blob — driven by --scroll-y CSS var from Layout's useParallaxScroll */}
            <div className="absolute top-1/4 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neon/5 rounded-full blur-[150px] pointer-events-none parallax-blob" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">

                <SectionHeading
                    eyebrow="Portfolio"
                    title="Featured Projects"
                    subtitle="Python applications, security-hardened platforms, and full-stack builds — each project solves a real problem."
                />

                {/* SUGGESTION 2.3: Category filter pills */}
                {categories.length > 2 && (
                    <Reveal delay={0.1}>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <Button
                                    key={cat}
                                    pill
                                    selected={activeFilter === cat}
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </Reveal>
                )}

                {/* SUGGESTION 3.2: grid-aware stagger delay via gridDelay() */}
                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                    {filtered.map((project, index) => (
                        <ProjectCard
                            key={project.id || project.name}
                            project={project}
                            index={index}
                            delay={gridDelay(index)}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-20 text-white/30 font-mono text-sm">
                            No projects in this category yet.
                        </div>
                    )}
                </div>

                {/* More Projects Button */}
                <Reveal delay={0.3}>
                    <div className="mt-10 md:mt-14 flex justify-center">
                        <Button
                            href={personalData.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            className="group inline-flex gap-3 px-6 md:px-8 py-3 md:py-4 !tracking-wide text-sm"
                            aria-label="View more projects on Jaskaran Joshi's GitHub profile"
                            title="More projects on GitHub"
                        >
                            <Github size={20} className="text-neon shrink-0" aria-hidden />
                            <span>More Projects on GitHub</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 shrink-0" aria-hidden />
                        </Button>
                    </div>
                </Reveal>

            </div>

        </section>
    );
}
