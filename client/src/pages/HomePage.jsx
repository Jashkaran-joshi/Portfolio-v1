import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const About = lazy(() => import('../components/sections/About'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Contact = lazy(() => import('../components/sections/Contact'));

export default function HomePage() {
    return (
        <>
            <SEO
                title="Web Developer & Full-Stack Engineer"
                description="Jaskaran Joshi is a Full-Stack Web Developer in India specializing in secure React and Node.js applications. View portfolio and projects."
                keywords="Web Developer, Full Stack Developer, React Developer, Node.js, India, Portfolio"
            />
            <Helmet>
                <script type="application/ld+json">
                    {`
                {
                    "@context": "https://schema.org",
                    "@graph": [
                    {
                        "@type": "WebSite",
                        "@id": "https://jaskaranjoshi.online/#website",
                        "url": "https://jaskaranjoshi.online",
                        "name": "Jaskaran Joshi - Web Developer Portfolio",
                        "description": "Portfolio of Jaskaran Joshi, a Full-Stack Web Developer and Security Enthusiast.",
                        "publisher": {
                        "@id": "https://jaskaranjoshi.online/#person"
                        },
                        "inLanguage": "en-US"
                    },
                    {
                        "@type": "Person",
                        "@id": "https://jaskaranjoshi.online/#person",
                        "name": "Jaskaran Joshi",
                        "jobTitle": "Full-Stack Web Developer",
                        "url": "https://jaskaranjoshi.online",
                        "image": "https://jaskaranjoshi.online/profile.webp",
                        "sameAs": [
                        "https://www.linkedin.com/in/jaskaran-joshi/",
                        "https://github.com/Jashkaran-joshi"
                        ],
                        "worksFor": {
                        "@type": "Organization",
                        "name": "Freelance"
                        },
                        "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Jaipur",
                        "addressRegion": "Rajasthan",
                        "addressCountry": "IN"
                        },
                        "email": "jashkaranjoshi@gmail.com",
                        "nationality": "India"
                    }
                    ]
                }
                `}
                </script>
            </Helmet>
            <Hero />
            <Suspense fallback={<LoadingSpinner />}>
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Certifications />
                <Contact />
            </Suspense>
        </>
    );
}
