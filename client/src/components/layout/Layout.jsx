import { lazy, Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ErrorBoundary from '../common/ErrorBoundary';
import TerminalOverlay from '../sections/TerminalOverlay';

// Lazy-load below-fold and non-LCP components
const CyberBackground = lazy(() => import('../common/CyberBackground'));
const Footer = lazy(() => import('./Footer'));

/**
 * SUGGESTION 4.2: Passive scroll listener to drive --scroll-y CSS variable.
 * Multiplied by 0.05 so blobs with .parallax-blob move 5px per 100px scroll.
 * Zero layout repaints — only CSS custom property assignment.
 */
function useParallaxScroll() {
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY * 0.05;
      document.documentElement.style.setProperty('--scroll-y', `${y}px`);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

export default function Layout() {
  useParallaxScroll();

  return (
    <div className="min-h-screen text-white selection:bg-neon/30 selection:text-neon">
      <ErrorBoundary>

        <Suspense fallback={null}>
          <CyberBackground />
        </Suspense>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-dark focus:text-neon focus:border focus:border-neon focus:rounded-md glass"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="relative z-10 pt-2" tabIndex="-1">
          <Outlet />
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <TerminalOverlay />
      </ErrorBoundary>
    </div>
  );
}
