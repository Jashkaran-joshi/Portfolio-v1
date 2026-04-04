import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Skills = lazy(() => import('../components/sections/Skills'));
const Certifications = lazy(() => import('../components/sections/Certifications'));

export default function SkillsPage() {
    return (
        <>
            <SEO
                title="Technical Skills & Stack"
                description="Jaskaran Joshi's technical skillset: React, Node.js, Python, Ethical Hacking, Network Security, and Cloud Computing tools."
                canonical="/skills"
            />
            <Suspense fallback={<LoadingSpinner />}>
                {/* Standard navbar clearance: pt-20 (sections add py-12 from section-spacing) */}
                <div className="pt-12">
                    <Skills />
                    <div className="pb-20">
                        <Certifications />
                    </div>
                </div>
            </Suspense>
        </>
    );
}
