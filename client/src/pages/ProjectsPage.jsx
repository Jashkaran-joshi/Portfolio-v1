import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Projects = lazy(() => import('../components/sections/Projects'));

export default function ProjectsPage() {
    return (
        <>
            <SEO
                title="Web Development Projects"
                description="Explore web development projects by Jaskaran Joshi. Featuring secure Full-Stack applications built with React, Node.js, and Express."
                canonical="/projects"
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div className="pt-20">
                    <Projects />
                </div>
            </Suspense>
        </>
    );
}
