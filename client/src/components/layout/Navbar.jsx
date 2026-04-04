import { useState, useEffect, memo } from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Menu, X, Github, Linkedin, ExternalLink } from 'lucide-react';
import { IconButton } from '../ui/Button';
import { personalData } from '../../constants/data';

const navItems = [
  { name: 'Home',    to: '/',        end: true  },
  { name: 'Skills',  to: '/skills',  end: true  },
  { name: 'Work',    to: '/work',    end: false },
  { name: 'Blog',    to: '/blog',    end: false },
  { name: 'Contact', to: '/contact', end: true  },
];

// Helper: detect if current path matches this nav item's "territory"
function useIsNavActive(item) {
  const location = useLocation();
  const path = location.pathname;
  if (item.to === '/work') return path === '/work' || path.startsWith('/projects/');
  if (item.to === '/blog') return path === '/blog' || path.startsWith('/blog/');
  if (item.end) return path === item.to;
  return path.startsWith(item.to);
}

/* ─── Desktop NavLink (unchanged) ─── */
const NavLink = memo(function NavLink({ item }) {
  const isActive = useIsNavActive(item);
  return (
    <RouterNavLink
      to={item.to}
      end={item.end}
      className={`text-sm lg:text-[15px] uppercase tracking-wide relative group py-2.5 bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded font-mono transition-colors duration-300 ${
        isActive ? 'text-neon font-bold' : 'text-white/70 hover:text-neon'
      }`}
    >
      <span className={`transition-opacity duration-300 mr-1 ${isActive ? 'text-neon opacity-100' : 'text-neon opacity-0 group-hover:opacity-100'}`}>
        &gt;
      </span>
      {item.name}
      <span className={`absolute bottom-0 left-0 h-px bg-neon transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </RouterNavLink>
  );
});

/* ─── Mobile NavLink — redesigned ─── */
const MobileNavLink = memo(function MobileNavLink({ item, index, onClose }) {
  const isActive = useIsNavActive(item);
  return (
    <li>
      <RouterNavLink
        to={item.to}
        end={item.end}
        onClick={onClose}
        className={`group flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neon ${
          isActive
            ? 'bg-neon/10 border border-neon/20 text-neon'
            : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
        }`}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {/* Index number — always visible, styled by active state */}
        <span
          className={`font-mono text-[11px] w-6 shrink-0 transition-colors duration-200 ${
            isActive ? 'text-neon' : 'text-white/25 group-hover:text-white/50'
          }`}
        >
          0{index + 1}
        </span>

        {/* Label */}
        <span className="font-display font-semibold text-xl tracking-tight flex-1">
          {item.name}
        </span>

        {/* Active indicator bar */}
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
        )}
      </RouterNavLink>
    </li>
  );
});

/* ─── Mobile Sidebar — full redesign ─── */
const MobileSidebar = memo(function MobileSidebar({ isOpen, onClose }) {
  // Prevent body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden={!isOpen}
        className={`fixed inset-0 md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto bg-dark/80 backdrop-blur-sm'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9998 }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-[300px] md:hidden flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          zIndex: 9999,
          background: 'linear-gradient(160deg, #0d2240 0%, #0a192f 60%, #07111f 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              Navigation
            </span>
          </div>
          <IconButton
            onClick={onClose}
            className="!min-h-9 !min-w-9 !p-0 text-white/50 hover:text-neon"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </IconButton>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {isOpen && navItems.map((item, i) => (
              <MobileNavLink key={item.name} item={item} index={i} onClose={onClose} />
            ))}
          </ul>
        </nav>

        {/* Footer — socials + résumé */}
        <div className="shrink-0 px-5 py-5 border-t border-white/5 space-y-4">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-neon hover:border-neon/30 hover:bg-neon/5 transition-all duration-200 font-mono text-xs uppercase tracking-wider"
              aria-label="GitHub profile"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-neon hover:border-neon/30 hover:bg-neon/5 transition-all duration-200 font-mono text-xs uppercase tracking-wider"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center font-mono text-[10px] text-white/20 tracking-widest">
            © {new Date().getFullYear()} Jaskaran Joshi
          </p>
        </div>
      </div>
    </>,
    document.body
  );
});

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 navbar-slide-down ${
          scrolled ? 'py-2 glass border-b border-white/5' : 'py-5 bg-dark/80 backdrop-blur-md'
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="container-custom flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold font-display text-white cursor-pointer group bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-neon rounded px-1"
          >
            <span className="text-neon">&lt;</span>Jaskaran<span className="text-neon"> /&gt;</span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.name}><NavLink item={item} /></li>
              ))}
            </ul>
            <div className="flex gap-3 ml-4 pl-4 border-l border-white/10">
              <a href={personalData.contact.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-neon transition-colors duration-300 p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="GitHub Profile"><Github size={20} /></a>
              <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-neon transition-colors duration-300 p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="LinkedIn Profile"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <IconButton
            className="lg:hidden !text-white hover:!text-neon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen
              ? <X size={22} className="text-neon" />
              : <Menu size={22} />
            }
          </IconButton>
        </div>
      </nav>
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
