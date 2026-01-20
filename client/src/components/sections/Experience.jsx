import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';
import { GraduationCap, Briefcase } from 'lucide-react';

const TimelineCard = memo(function TimelineCard({ item, index, color = 'neon' }) {
  return (
    <Reveal delay={index * 0.1} width="100%" className="h-full">
      <GlassCard
        className="h-full group"
        hoverEffect={true}
        glowColor={color === 'neon' ? 'neon' : 'purple'}
      >
        {/* Content with left padding to avoid line overlap */}
        <div className="relative z-10 p-5 md:p-6 pl-6 md:pl-7">
          <span className={`font-mono text-xs ${color === 'neon' ? 'text-neon' : 'text-purple-400'} block mb-2`}>{item.meta}</span>
          <h4 className="text-base md:text-lg font-bold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors duration-300">
            {item.title}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
        </div>
      </GlassCard>
    </Reveal>
  );
});

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-dark/30 scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-blue-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Timeline"
          title="Education & Experience"
          subtitle="My academic and professional journey."
        />

        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Education Column */}
          <div className="relative">
            {/* Section Header with Icon */}
            <Reveal width="100%">
              <div className="flex items-center gap-4 mb-8">
                {/* Icon container - no connecting line */}
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <GraduationCap size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Education</h3>
              </div>
            </Reveal>

            {/* Timeline Cards with continuous line */}
            <div className="relative pl-6 ml-6">
              {/* Vertical line - starts from first dot, not from icon */}
              <div className="absolute left-0 top-6 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

              {/* Cards with dot markers */}
              <div className="space-y-6">
                {personalData.education.map((edu, index) => (
                  <div key={index} className="relative">
                    {/* Circle marker - centered on the line */}
                    <motion.div
                      className="absolute -left-6 top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-dark shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      style={{ transform: 'translateX(-50%)' }}
                      whileHover={{ scale: 1.4 }}
                      transition={{ duration: 0.2 }}
                    />
                    <TimelineCard item={edu} index={index} color="purple" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Column */}
          <div className="relative">
            {/* Section Header with Icon */}
            <Reveal width="100%" delay={0.15}>
              <div className="flex items-center gap-4 mb-8">
                {/* Icon container - no connecting line */}
                <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center">
                  <Briefcase size={24} className="text-neon" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Professional Experience</h3>
              </div>
            </Reveal>

            {/* Timeline Cards with continuous line */}
            <div className="relative pl-6 ml-6">
              {/* Vertical line - starts from first dot, not from icon */}
              <div className="absolute left-0 top-6 bottom-0 w-px bg-gradient-to-b from-neon/40 via-neon/20 to-transparent" />

              {/* Cards with dot markers */}
              <div className="space-y-6">
                {personalData.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Circle marker - centered on the line */}
                    <motion.div
                      className="absolute -left-6 top-6 w-3 h-3 rounded-full border-2 border-neon bg-dark shadow-[0_0_8px_rgba(0,243,255,0.4)]"
                      style={{ transform: 'translateX(-50%)' }}
                      whileHover={{ scale: 1.4 }}
                      transition={{ duration: 0.2 }}
                    />
                    <TimelineCard item={exp} index={index} color="neon" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
