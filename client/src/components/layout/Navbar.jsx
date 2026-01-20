import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-scroll';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { throttle } from '../../utils/performanceUtils';

const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Certifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' },
];

// Memoized nav link component
const NavLink = memo(function NavLink({ item }) {
  return (
    <Link
      to={item.to}
      smooth={true}
      duration={800}
      spy={true}
      offset={-80}
      activeClass="text-neon active-nav-link"
      className="text-white/70 hover:text-neon cursor-pointer transition-colors duration-300 font-mono text-sm lg:text-[15px] uppercase tracking-wide relative group py-2.5"
    >
      <span className="text-neon opacity-0 group-[.active-nav-link]:opacity-100 group-hover:opacity-100 transition-opacity duration-300 mr-1">&gt;</span>
      {item.name}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-neon transition-all duration-300 group-hover:w-full group-[.active-nav-link]:w-full" />
    </Link>
  );
});

// Memoized mobile nav link
const MobileNavLink = memo(function MobileNavLink({ item, onClose, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
    >
      <Link
        to={item.to}
        smooth={true}
        duration={800}
        offset={-80}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-neon hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-300 font-mono text-sm uppercase tracking-wide group"
      >
        <span className="text-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300">&gt;</span>
        {item.name}
      </Link>
    </motion.li>
  );
});

// Mobile Sidebar Component - Rendered via Portal
const MobileSidebar = memo(function MobileSidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-[#0a192f] md:hidden overflow-y-auto"
            style={{ zIndex: 9999 }}
          >
            {/* Close button */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="text-lg font-display font-bold text-white">
                <span className="text-neon">&lt;</span>Menu<span className="text-neon">/&gt;</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-neon hover:bg-white/5 rounded-lg transition-all duration-300"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute top-20 right-0 w-40 h-40 bg-neon/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Navigation Links */}
            <nav className="px-4 py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <MobileNavLink key={item.name} item={item} onClose={onClose} index={i} />
                ))}
              </ul>
            </nav>

            {/* Divider */}
            <div className="mx-4 h-px bg-white/10" />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="px-4 py-6"
            >
              <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-3 px-4">Connect</p>
              <div className="flex gap-3 px-4">
                <a
                  href="https://github.com/Jashkaran-joshi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-neon bg-white/5 rounded-lg border border-white/10 hover:border-neon/30 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/jaskaran-joshi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-neon bg-white/5 rounded-lg border border-white/10 hover:border-neon/30 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>

              </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 bg-[#0a192f]">
              <p className="text-xs text-white/30 font-mono text-center">© 2024 Jaskaran Joshi</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Throttled scroll handler - updates at most every 100ms
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${scrolled
          ? 'py-2 md:py-3 glass border-b border-white/5'
          : 'py-3 md:py-5 bg-dark/80 backdrop-blur-md'
          }`}
        style={{ zIndex: 100 }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={800}
            className="text-lg md:text-xl lg:text-2xl font-bold font-display text-white cursor-pointer group tracking-tighter"
          >
            <span className="text-neon group-hover:text-white transition-colors duration-300">&lt;</span>
            <span className="relative">
              Jaskaran
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon group-hover:w-full transition-all duration-300" />
            </span>
            <span className="text-neon group-hover:text-white transition-colors duration-300"> /&gt;</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <ul className="flex gap-4 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
            <div className="flex gap-2 lg:gap-3 ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-white/10">
              <a
                href="https://github.com/Jashkaran-joshi"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-neon transition-colors duration-300 p-1.5 lg:p-2 hover:bg-white/5 rounded-lg"
                aria-label="GitHub Profile"
              >
                <FiGithub className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/jaskaran-joshi"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-neon transition-colors duration-300 p-1.5 lg:p-2 hover:bg-white/5 rounded-lg"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white bg-white/10 hover:bg-neon/20 border border-white/20 hover:border-neon/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300"
            onClick={handleToggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={22} className="text-neon" /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
