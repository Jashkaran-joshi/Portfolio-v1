import { useState, memo, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import SectionHeading from '../common/SectionHeading';

import GlassCard from '../ui/GlassCard';

import Reveal from '../ui/Reveal';

import { personalData } from '../../constants/data';

import { Award, Calendar, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

import Button, { IconButton } from '../ui/Button';



// ISSUE 7.1 FIX: EC-Council changed from red (#ef4444) to purple (#a855f7)
// Red is reserved for errors/warnings (see 404 page). Positive achievements should use brand colors.
// Google changed to neon (#00f3ff) to match the primary brand accent.
const ISSUER_COLORS = {
  'EC-Council': '#a855f7',         // Purple — security/expertise
  'Google': '#00f3ff',             // Neon cyan — primary accent
  'Microsoft': '#06b6d4',          // Cyan
  'Coursera': '#3b82f6',           // Blue
  'Deloitte': '#22c55e',           // Green
  'Amazon Web Services': '#f97316', // Orange
  'JPMorgan Chase & Co.': '#2563eb', // Link Blue
  'Mastercard': '#f59e0b',         // Yellow/Orange
  'Accenture': '#a855f7',          // Purple
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



  const isoColor = ISSUER_COLORS[cert.issuer] || '#00f3ff';

  const skillsToShow = cert.skills.filter(s => !s.includes('Credential ID')).slice(0, 2);

  const hasCredentialId = cert.skills.find(s => s.includes('Credential ID'));



  return (

    <Reveal delay={index * 0.06} width="100%">

      <GlassCard className="h-full group" hoverEffect={true} isoColor={isoColor}>

        <div className="p-5 md:p-6 flex flex-col h-[240px] md:h-[260px]">

          {/* Header */}

          <div className="flex items-start justify-between gap-3 mb-3">

            <div

              className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center transition-transform duration-300 shrink-0 group-hover:scale-110"

              style={{ backgroundColor: `${isoColor}26`, color: isoColor }} // 15% opacity bg

            >

              <Award size={20} />

            </div>

            <span

              className="px-2 py-0.5 text-[10px] md:text-xs font-mono rounded-full border shrink-0 truncate max-w-[120px]"

              style={{

                borderColor: `${isoColor}4d`, // 30% opacity

                backgroundColor: `${isoColor}1a`, // 10% opacity

                color: isoColor

              }}

            >

              {cert.issuer}

            </span>

          </div>



          {/* Content */}

          <div className="flex-1 flex flex-col min-h-0">

            <h3

              className="text-sm md:text-base font-bold text-white mb-1.5 transition-colors duration-300 line-clamp-2 leading-tight group-hover:text-[var(--accent-color)]"

              style={{ '--accent-color': isoColor }}

            >

              {cert.name}

            </h3>



            <div className="flex items-center gap-1.5 text-white/40 text-[10px] md:text-xs font-mono mb-3">

              <Calendar size={10} />

              <span className="truncate">{cert.year}</span>

            </div>



            {/* Skills */}

            <div className="flex flex-wrap gap-1.5">

              {skillsToShow.map((skill, i) => (

                <span

                  key={i}

                  className="px-2 py-0.5 text-[10px] md:text-xs text-white/60 bg-white/5 border border-white/10 rounded transition-colors duration-300"

                  style={{ '--hover-color': isoColor }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.borderColor = `${isoColor}4d`; // 30%

                    e.currentTarget.style.color = 'white';

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.borderColor = '';

                    e.currentTarget.style.color = '';

                  }}

                >

                  {skill}

                </span>

              ))}

            </div>

          </div>



          {/* Credential ID Copy */}

          <div className="mt-auto pt-3 border-t border-white/5">

            {hasCredentialId ? (

              <Button

                variant="secondary"

                type="button"

                onClick={copyCredentialId}

                className="!shadow-none !border-transparent !bg-transparent !justify-start gap-1.5 text-[10px] md:text-xs font-mono text-white/40 min-h-[44px] -ml-1 px-2 w-full !normal-case !tracking-normal hover:!bg-white/[0.04]"

                onMouseEnter={(e) => { e.currentTarget.style.color = isoColor; }}

                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}

              >

                {copied ? (

                  <>

                    <Check size={12} className="text-green-400" />

                    <span className="text-green-400">Copied!</span>

                  </>

                ) : (

                  <>

                    <Copy size={12} />

                    <span>Copy Credential ID</span>

                  </>

                )}

              </Button>

            ) : (

              <span className="text-[10px] md:text-xs font-mono text-white/20">Verified Certificate</span>

            )}

          </div>

        </div>



        {/* Bottom Accent */}

        <div

          className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"

          style={{ background: `linear-gradient(90deg, transparent, ${isoColor}, transparent)` }}

        />

      </GlassCard>



      {/* Global Toast for Copy */}

      <AnimatePresence>

        {copied && hasCredentialId && (

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: 20 }}

            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-dark/90 border border-green-500/30 text-green-400 px-4 py-2 flex items-center gap-2 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-md"

          >

            <Check size={16} />

            <span className="text-sm font-mono tracking-wide">Credential ID copied to clipboard</span>

          </motion.div>

        )}

      </AnimatePresence>

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

    <section id="certifications" className="section-spacing relative overflow-hidden scroll-mt-20">

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

              <IconButton

                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}

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

                    onClick={() => setCurrentPage(i)}

                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"

                    aria-label={`Go to certifications page ${i + 1} of ${totalPages}`}

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

                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}

                disabled={currentPage === totalPages - 1}

                aria-label="Next page"

              >

                <ChevronRight size={20} />

              </IconButton>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}

