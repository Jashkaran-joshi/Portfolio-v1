import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import { personalData } from '../../constants/data';
import { FiAward, FiCalendar, FiCopy, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Precomputed issuer colors for performance
const ISSUER_COLORS = {
  'EC-Council': 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
  'Google': 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  'Microsoft': 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  'Coursera': 'from-blue-400/20 to-blue-500/10 border-blue-400/30 text-blue-300',
  'Deloitte': 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  'Amazon Web Services': 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
  'JPMorgan Chase & Co.': 'from-blue-600/20 to-blue-700/10 border-blue-600/30 text-blue-400',
  'Mastercard': 'from-yellow-500/20 to-orange-500/10 border-yellow-500/30 text-yellow-400',
  'Accenture': 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
};

const CertificationCard = memo(function CertificationCard({ cert, index }) {
  const [copied, setCopied] = useState(false);

  const copyCredentialId = useCallback(() => {
    const credentialId = cert.skills.find(s => s.includes('Credential ID'))?.split(': ')[1];
    if (credentialId) {
      navigator.clipboard.writeText(credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [cert.skills]);

  const issuerColorClass = ISSUER_COLORS[cert.issuer] || 'from-neon/20 to-neon/10 border-neon/30 text-neon';
  const skillsToShow = cert.skills.filter(s => !s.includes('Credential ID')).slice(0, 2);
  const hasCredentialId = cert.skills.find(s => s.includes('Credential ID'));

  return (
    <Reveal delay={index * 0.06} width="100%">
      <GlassCard className="h-full group" hoverEffect={true}>
        <div className="p-5 md:p-6 flex flex-col h-[240px] md:h-[260px]">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-neon/20 to-purple-500/20 rounded-lg flex items-center justify-center text-neon group-hover:scale-110 transition-transform duration-300 shrink-0">
              <FiAward size={20} />
            </div>
            <span className={`px-2 py-0.5 text-[10px] md:text-xs font-mono rounded-full bg-gradient-to-r ${issuerColorClass} border shrink-0 truncate max-w-[120px]`}>
              {cert.issuer}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-sm md:text-base font-bold text-white mb-1.5 group-hover:text-neon transition-colors duration-300 line-clamp-2 leading-tight">
              {cert.name}
            </h3>

            <div className="flex items-center gap-1.5 text-white/40 text-[10px] md:text-xs font-mono mb-3">
              <FiCalendar size={10} />
              <span className="truncate">{cert.year}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {skillsToShow.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] md:text-xs text-white/60 bg-white/5 border border-white/10 group-hover:border-neon/30 rounded transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential ID Copy */}
          <div className="mt-auto pt-3 border-t border-white/5">
            {hasCredentialId ? (
              <button
                onClick={copyCredentialId}
                className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-white/40 hover:text-neon transition-colors duration-300"
              >
                {copied ? (
                  <>
                    <FiCheck size={12} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={12} />
                    <span>Copy Credential ID</span>
                  </>
                )}
              </button>
            ) : (
              <span className="text-[10px] md:text-xs font-mono text-white/20">Verified Certificate</span>
            )}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </GlassCard>
    </Reveal>
  );
});

export default function Certifications() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(personalData.certifications.length / itemsPerPage);

  const visibleCerts = personalData.certifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="certifications" className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-dark/30 scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Achievements"
          subtitle="Professional certifications demonstrating expertise in cybersecurity, cloud, and development."
        />

        <div className="mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {visibleCerts.map((cert, index) => (
                <CertificationCard key={cert.name} cert={cert} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-neon hover:border-neon/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Previous page"
              >
                <FiChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentPage
                      ? 'bg-neon shadow-[0_0_10px_rgba(0,243,255,0.5)]'
                      : 'bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-neon hover:border-neon/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Next page"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
