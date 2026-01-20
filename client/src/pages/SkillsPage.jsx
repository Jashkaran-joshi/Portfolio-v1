import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Skills = lazy(() => import('../components/sections/Skills'));

export default function SkillsPage() {
    return (
        <>
            <SEO
                title="Technical Skills & Stack"
                description="Jaskaran Joshi's technical skillset: React, Node.js, Python, Ethical Hacking, Network Security, and Cloud Computing tools."
                canonical="/skills"
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div className="pt-20">
                    <Skills />
                </div>
            </Suspense>
        </>
    );
}
