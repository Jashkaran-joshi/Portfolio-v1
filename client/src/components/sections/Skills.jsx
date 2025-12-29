import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';

const SkillBar = memo(function SkillBar({ label, value, index }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-white/90 font-mono text-xs sm:text-sm group-hover:text-white transition-colors duration-300">{label}</span>
        <span className="text-neon font-mono text-xs sm:text-sm">{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 sm:h-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-neon/5" />
        <motion.div
          className="bg-gradient-to-r from-neon to-purple-500 h-full rounded-full relative"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-0.5 sm:w-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>
    </div>
  );
});

const SkillTag = memo(function SkillTag({ item, delay }) {
  return (
    <motion.span
      className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-lg text-xs md:text-sm text-white/70 hover:border-neon hover:text-white hover:bg-neon/10 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      {item}
    </motion.span>
  );
});

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-dark/30 scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-purple-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Expertise"
          subtitle="A focused toolkit for building secure, production-ready web applications."
        />

        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Tech Stack Tags */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            {personalData.skills.map((group, index) => (
              <Reveal key={index} delay={index * 0.08} width="100%">
                <GlassCard className="p-4 md:p-6 lg:p-8 border-l-4 border-l-neon/50 h-full group" glowColor="neon">
                  <h3 className="text-white font-bold text-sm md:text-base lg:text-lg mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-neon font-mono">0{index + 1}.</span> {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {group.items.map((item, i) => (
                      <SkillTag key={item} item={item} delay={i * 0.03} />
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Progress Bars */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <Reveal width="100%" delay={0.1}>
              <GlassCard className="p-5 md:p-6 lg:p-8 group" glowColor="purple">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-5 md:mb-6 lg:mb-8 flex items-center gap-3">
                  <span className="w-1 md:w-1.5 h-5 md:h-6 lg:h-8 bg-neon rounded-full" />
                  Proficiency Metrics
                </h3>
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  {personalData.skillProgress.map((skill, index) => (
                    <SkillBar key={index} label={skill.label} value={skill.value} index={index} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
