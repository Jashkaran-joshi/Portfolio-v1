import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const About = lazy(() => import('../components/sections/About'));

export default function AboutPage() {
    return (
        <>
            <SEO
                title="About Jaskaran Joshi | Web Developer"
                description="Learn more about Jaskaran Joshi, a Full-Stack Web Developer and Cybersecurity Enthusiast from India. Expert in React, Node.js, and secure coding."
                canonical="/about"
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div className="pt-20">
                    <About />
                </div>
            </Suspense>
        </>
    );
}
