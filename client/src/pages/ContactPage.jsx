import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Contact = lazy(() => import('../components/sections/Contact'));

export default function ContactPage() {
    return (
        <>
            <SEO
                title="Contact Jaskaran Joshi"
                description="Get in touch with Jaskaran Joshi for Web Development projects, Security Audits, or Full-Stack engineering roles."
                canonical="/contact"
            />
            <Suspense fallback={<LoadingSpinner />}>
                {/* Standard navbar clearance: pt-20 (Contact section adds py-12 from section-spacing) */}
                <div className="pt-12">
                    <Contact />
                </div>
            </Suspense>
        </>
    );
}
