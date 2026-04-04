import { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Folder, ChevronRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { PROJECT_ACCENT_COLORS } from '../../constants/theme';

const ProjectCard = memo(function ProjectCard({ project, index, delay = 0 }) {
  const color = PROJECT_ACCENT_COLORS[index % PROJECT_ACCENT_COLORS.length];
  const navigate = useNavigate();
  
  const projectSlug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <Reveal delay={delay || index * 0.1} width="100%">
      <GlassCard 
        className="h-full group flex flex-col cursor-pointer transition-all duration-500 overflow-hidden" 
        hoverEffect={true} 
        isoColor={color}
      >
        <div 
          className="p-5 md:p-6 lg:p-7 flex flex-col h-full min-h-[320px]"
          onClick={(e) => {
            // Prevent navigation if clicking on external links like github/live
            if (e.target.closest('a')) return;
            navigate(`/projects/${projectSlug}`);
          }}
        >
          {/* Top Header: Icon + Links */}
          <div className="flex items-start justify-between mb-5">
            <div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
              style={{ backgroundColor: `${color}1a`, color: color, border: `1px solid ${color}33` }}
            >
              <Folder size={20} className="md:w-6 md:h-6" />
            </div>
            
            <div className="flex items-center gap-2">
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all duration-300 p-2 hover:bg-white/5 rounded-lg flex items-center gap-1.5 border border-transparent hover:border-white/10"
                  aria-label={`View ${project.name} Source`}
                  title="Source Code"
                >
                  {project.live === '#' && <span className="text-[10px] font-mono hidden sm:inline opacity-70">SOURCE ONLY</span>}
                  <Github size={18} />
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all duration-300 p-2 hover:bg-white/5 rounded-lg flex items-center gap-1.5 bg-white/5 border border-white/10"
                  aria-label={`View ${project.name} Live`}
                  title="Live Demo"
                  onMouseEnter={(e) => e.currentTarget.style.color = color}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <span className="text-[10px] font-mono font-medium hidden sm:inline">LIVE DEMO</span>
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Image Thumbnail with Aspect Ratio */}
          <div className="w-full aspect-video rounded-lg bg-dark/50 border border-white/5 mb-5 overflow-hidden relative group/img shadow-inner">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.name} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
              />
            ) : (
              /* ISSUE 5.1 FIX: themed gradient placeholder instead of flat gray box  */
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                {/* Themed gradient background */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}0d 0%, transparent 60%)` }} />
                {/* Subtle grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-12 h-px" style={{ backgroundColor: `${color}50` }} />
                <div className="absolute top-0 left-0 w-px h-12" style={{ backgroundColor: `${color}50` }} />
                <div className="absolute bottom-0 right-0 w-12 h-px" style={{ backgroundColor: `${color}50` }} />
                <div className="absolute bottom-0 right-0 w-px h-12" style={{ backgroundColor: `${color}50` }} />
                {/* Icon + label */}
                <Folder size={28} style={{ color: `${color}60` }} className="relative z-10" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] relative z-10" style={{ color: `${color}40` }}>
                  {project.category || 'Project'}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity duration-500" />
          </div>

          {/* Project Content */}
          <div className="flex-1 flex flex-col">
            <h3 
              className="text-lg md:text-xl font-display font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[var(--accent-color)] line-clamp-1"
              style={{ '--accent-color': color }}
            >
              {project.name}
            </h3>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-sans">
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
              {project.tech.slice(0, 4).map((t, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 text-[10px] font-mono rounded-md border transition-all duration-300"
                  style={{ 
                    color: `${color}cc`, 
                    borderColor: `${color}33`, 
                    backgroundColor: `${color}0d` 
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-[10px] font-mono text-white/30 self-center">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>

            {/* Analysis Footer */}
            <div 
              className="text-xs font-mono flex items-center gap-1 transition-all duration-300 group-hover:translate-x-2 group-hover:font-bold border-t border-white/5 pt-4"
              style={{ color }}
            >
              READ CASE STUDY <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
});

export default ProjectCard;
