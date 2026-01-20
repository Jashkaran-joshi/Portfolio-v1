import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-neon/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Profile"
          title="About Me"
          subtitle={personalData.about.subtitle}
        />

        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image Column */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              <Reveal direction="left" width="fit-content">
                <div className="relative w-[280px] sm:w-[320px] lg:w-[380px] aspect-square">
                  {/* Image background glow */}
                  <div className="absolute inset-4 -z-10 bg-neon/5 rounded-2xl blur-2xl" />

                  {/* Main Image Container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-neon/30 transition-colors duration-500 shadow-2xl z-10">
                    <motion.img
                      src="/profile.webp"
                      alt={personalData.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                    />

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Decorative corners - NOW NESTED INSIDE THE IMAGE WRAPPER */}
                  <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-10 h-10 md:w-14 md:h-14 border-b-2 border-r-2 border-neon/50 rounded-br-3xl z-0" />
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-14 md:h-14 border-t-2 border-l-2 border-neon/50 rounded-tl-3xl z-0" />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-5 lg:space-y-7">
            <Reveal>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                I'm <span className="text-neon">Jaskaran Joshi</span> – Full-Stack Developer & Cybersecurity Enthusiast
              </h3>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                I got interested in cybersecurity when I realized how easily small mistakes in code can turn into serious security issues. I enjoy understanding how systems work under the hood and thinking like an attacker to find weak points before someone else does.
              </p>
            </Reveal>

            <Reveal delay={0.3} width="100%">
              <GlassCard className="p-5 md:p-6 lg:p-8">
                <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm">
                  {personalData.about.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col sm:flex-row sm:gap-4 border-b border-white/5 pb-2 md:pb-3 last:border-0 last:pb-0"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <span className="text-neon font-bold whitespace-nowrap min-w-[110px] md:min-w-[120px]">
                        {detail.prompt}
                      </span>
                      <span className="text-white/80 mt-1 sm:mt-0">{detail.text}</span>
                    </motion.div>
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
