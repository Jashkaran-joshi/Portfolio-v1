import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Experience = lazy(() => import('../components/sections/Experience'));

export default function ExperiencePage() {
    return (
        <>
            <SEO
                title="Professional Experience"
                description="Professional experience of Jaskaran Joshi, including roles as a C++ Programming Intern and Freelance Web Developer."
                canonical="/experience"
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div className="pt-20">
                    <Experience />
                </div>
            </Suspense>
        </>
    );
}
