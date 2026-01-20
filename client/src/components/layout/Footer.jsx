import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowUp, FiHeart } from 'react-icons/fi';
import { animateScroll as scroll } from 'react-scroll';
import { personalData } from '../../constants/data';

const SocialLink = memo(function SocialLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/60 hover:text-neon transition-all duration-300 text-lg md:text-xl p-2.5 md:p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 hover:border-neon/30 hover:shadow-glow-subtle"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon />
    </motion.a>
  );
});

export default function Footer() {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <footer className="py-10 md:py-12 border-t border-white/5 bg-dark relative z-10 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left - Copyright */}
        <div className="text-center md:text-left">
          <div className="text-white/40 text-xs md:text-sm font-mono mb-1">
            © {new Date().getFullYear()} <span className="text-white/90 font-bold">{personalData.name}</span>
          </div>
          <p className="text-white/20 text-[10px] md:text-xs flex items-center justify-center md:justify-start gap-1">
            Built with <FiHeart className="text-red-400/60 w-3 h-3" /> using React, Tailwind & Framer Motion
          </p>
        </div>

        {/* Right - Social & Back to Top */}
        <div className="flex items-center gap-3 md:gap-4">
          <SocialLink
            href={personalData.contact.github}
            icon={FiGithub}
            label="GitHub Profile"
          />
          <SocialLink
            href={personalData.contact.linkedin}
            icon={FiLinkedin}
            label="LinkedIn Profile"
          />


          <motion.button
            onClick={scrollToTop}
            className="text-neon hover:text-white transition-all duration-300 text-lg md:text-xl p-2.5 md:p-3 bg-neon/10 hover:bg-neon/20 rounded-full border border-neon/30 hover:border-neon hover:shadow-glow ml-2 md:ml-4 group"
            aria-label="Back to Top"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowUp className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
