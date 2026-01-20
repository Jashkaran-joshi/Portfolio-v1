import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';
import { FiGithub, FiExternalLink, FiFolder, FiArrowRight } from 'react-icons/fi';

const ProjectCard = memo(function ProjectCard({ project, index }) {
    return (
        <Reveal delay={index * 0.08} width="100%">
            <GlassCard className="h-full group" hoverEffect={true}>
                <div className="p-5 md:p-6 flex flex-col h-full min-h-[280px]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 md:w-11 md:h-11 bg-neon/10 rounded-lg flex items-center justify-center text-neon group-hover:bg-neon/20 transition-colors duration-300">
                            <FiFolder size={20} />
                        </div>
                        <div className="flex items-center gap-2">
                            {project.github && project.github !== '#' && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-neon transition-colors duration-300 p-1.5 hover:bg-white/5 rounded-lg"
                                    aria-label="View GitHub Repository"
                                >
                                    <FiGithub size={18} />
                                </a>
                            )}
                            {project.live && project.live !== '#' && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-neon transition-colors duration-300 p-1.5 hover:bg-white/5 rounded-lg"
                                    aria-label="View Live Demo"
                                >
                                    <FiExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-neon transition-colors duration-300 line-clamp-2">
                            {project.name}
                        </h3>
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.tech.slice(0, 4).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 text-[10px] md:text-xs font-mono text-neon/80 bg-neon/5 border border-neon/20 group-hover:border-neon/40 rounded-full transition-colors duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </GlassCard>
        </Reveal>
    );
});

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-20 lg:py-24 relative overflow-hidden scroll-mt-20">
            {/* Background decoration */}
            <div className="absolute top-1/4 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <SectionHeading
                    eyebrow="Portfolio"
                    title="Featured Projects"
                    subtitle="A collection of projects that showcase my skills in full-stack development and secure application design."
                />

                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {personalData.projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* More Projects Button */}
                <Reveal delay={0.3}>
                    <div className="mt-10 md:mt-14 flex justify-center">
                        <motion.a
                            href={personalData.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm uppercase tracking-wide hover:border-neon/50 hover:bg-neon/5 transition-all duration-300"
                        >
                            <FiGithub size={20} className="text-neon" />
                            <span>More Projects on GitHub</span>
                            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
