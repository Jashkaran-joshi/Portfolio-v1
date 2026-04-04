import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ISSUE 8.1 FIX: LazyMotion reduces Framer Motion bundle by ~36% by limiting to domAnimation features
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy-load sub-pages — never needed on initial load
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="skills" element={<Suspense fallback={null}><SkillsPage /></Suspense>} />
              <Route path="work" element={<Suspense fallback={null}><WorkPage /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={null}><ContactPage /></Suspense>} />
              <Route path="privacy" element={<Suspense fallback={null}><PrivacyPolicyPage /></Suspense>} />
              <Route path="resume" element={<Suspense fallback={null}><ResumePage /></Suspense>} />
              <Route path="projects/:id" element={<Suspense fallback={null}><ProjectDetailPage /></Suspense>} />
              <Route path="blog" element={<Suspense fallback={null}><BlogPage /></Suspense>} />
              <Route path="blog/:id" element={<Suspense fallback={null}><BlogPostPage /></Suspense>} />
              <Route path="*" element={<Suspense fallback={null}><NotFoundPage /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </LazyMotion>
  );
}

export default App;
