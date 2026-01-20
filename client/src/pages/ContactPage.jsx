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
                <div className="pt-20">
                    <Contact />
                </div>
            </Suspense>
        </>
    );
}
