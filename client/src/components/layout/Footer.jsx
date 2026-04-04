import { memo, createElement } from 'react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowUp, Mail, ExternalLink } from 'lucide-react';
import { personalData } from '../../constants/data';

// Social Icon Link Component
const SocialLink = memo(({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/60 hover:text-neon transition-all duration-300 ease-premium p-3 bg-white/[0.03] hover:bg-neon/10 rounded-xl border border-white/5 hover:border-neon/30 hover:shadow-glow-subtle btn-premium-interact"
      aria-label={label}
      title={label}
    >
      {createElement(icon, { size: 18 })}
    </a>
  );
});

// Footer Navigation Link Component
const FooterLink = memo(function FooterLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-white/50 hover:text-neon transition-colors duration-300 text-sm font-sans flex items-center gap-2 group w-max"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon transition-colors" />
      {children}
    </Link>
  );
});

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 md:pt-20 pb-8 border-t border-white/5 bg-dark relative z-10 overflow-hidden">
      {/* Original Website Background Texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      
      {/* Premium Ethereal Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-neon/[0.05] to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10 flex flex-col gap-8 md:gap-20">
        
        {/* Top Section: Brand & Socials (Same row on mobile) */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Brand Logo & Socials - Row on mobile */}
          <div className="md:col-span-5 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start text-left">
            <Link to="/" onClick={scrollToTop} className="font-display text-xl md:text-3xl font-bold tracking-tight text-white hover:text-neon transition-colors">
              <span className="text-neon">&lt;</span>Jaskaran <span className="text-neon">/&gt;</span>
            </Link>
            
            {/* Tagline - Hidden on Mobile */}
            <p className="hidden md:block text-white/50 text-sm md:text-base leading-relaxed max-w-xs mt-6 mb-8 font-sans">
              Architecting secure digital perimeters and scalable full-stack ecosystems. Code with purpose, secure by design.
            </p>

            {/* Socials - Appears next to Logo on Mobile */}
            <div className="flex md:hidden gap-3">
              <a href={personalData.contact.github} target="_blank" rel="noreferrer" className="text-white/40 p-2 hover:text-neon transition-colors"><Github size={18} /></a>
              <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer" className="text-white/40 p-2 hover:text-neon transition-colors"><Linkedin size={18} /></a>
            </div>

            {/* Desktop Connect CTA */}
            <a 
              href={`mailto:${personalData.contact.email}`} 
              className="hidden md:inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-neon/50 group-hover:bg-neon/10 group-hover:shadow-glow-subtle transition-all duration-300">
                <Mail size={18} className="group-hover:text-neon transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Ready to innovate?</span>
                <span className="text-sm font-medium tracking-wide">Let's build something.</span>
              </div>
            </a>
          </div>

          {/* Middle Columns: Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex md:col-span-4 justify-start">
            <div className="grid grid-cols-2 gap-12 md:gap-16 w-full max-w-sm">
              <div className="flex flex-col gap-5 items-start">
                <h4 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Navigation</h4>
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/work">Work</FooterLink>
                <FooterLink to="/skills">Skills</FooterLink>
                <FooterLink to="/blog">Write-ups</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </div>
              <div className="flex flex-col gap-5 items-start">
                <h4 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Resources</h4>
                <FooterLink to="/resume">Resume</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <a href={personalData.contact.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-neon transition-colors duration-300 text-sm font-sans flex items-center gap-2 group w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon transition-colors" />
                  GitHub <ExternalLink size={12} className="opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Socials & Back to Top (Hidden on Mobile) */}
          <div className="hidden md:flex md:col-span-3 flex-col items-end justify-between">
            <div className="flex flex-col items-end gap-5">
              <h4 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.2em] mb-2">Connect</h4>
              <div className="flex gap-4">
                <SocialLink href={personalData.contact.github} icon={Github} label="GitHub" />
                <SocialLink href={personalData.contact.linkedin} icon={Linkedin} label="LinkedIn" />
              </div>
            </div>

            <Button
              onClick={scrollToTop}
              variant="secondary"
              size="sm"
              icon={ArrowUp}
              iconPosition="right"
              className="!normal-case tracking-widest text-white/80 border-white/10 bg-transparent hover:bg-white/[0.06]"
              aria-label="Scroll to top"
            >
              Back to Top
            </Button>
          </div>

        </div>

        {/* Bottom Section: Copyright (Unified on Mobile) */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-row justify-between items-center text-[10px] md:text-[11px] font-sans tracking-wide">
          <div className="text-white/40">
            © {new Date().getFullYear()} <span className="text-white/70 font-medium">{personalData.name}</span>. All rights reserved.
          </div>
          
          {/* Metadata Pill - Only on Desktop */}
          <div className="hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/[0.05]">
            <div className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-white/30 group-hover:text-white/50 transition-colors text-[9px] font-mono uppercase tracking-[0.2em]">System Online</span>
            </div>
            <span className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-glow-subtle" />
              <span className="text-white/30 group-hover:text-white/50 transition-colors text-[9px] font-mono uppercase tracking-[0.2em]">Updated: Apr 2026</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
