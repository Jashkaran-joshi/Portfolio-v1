import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Projects = lazy(() => import('../components/sections/Projects'));
const Experience = lazy(() => import('../components/sections/Experience'));

export default function WorkPage() {
    return (
        <>
            <SEO
                title="Work & Experience"
                description="Explore the professional experience and full-stack projects engineered by Jaskaran Joshi."
                canonical="/work"
            />
            <Suspense fallback={<LoadingSpinner />}>
                {/* Standard navbar clearance: pt-20 (Projects section adds py-12 from section-spacing) */}
                <div className="pt-12">
                    <Projects />
                    <div className="mt-8 border-t border-white/5 py-10">
                        <Experience />
                    </div>
                </div>
            </Suspense>
        </>
    );
}
