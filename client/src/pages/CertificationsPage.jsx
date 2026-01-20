import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEO from '../components/SEO';

const Certifications = lazy(() => import('../components/sections/Certifications'));

export default function CertificationsPage() {
    return (
        <>
            <SEO
                title="Certifications & Achievements"
                description="Certifications held by Jaskaran Joshi: Certified Ethical Hacker (CEH), Network Defender (CND), and various Web Development credentials."
                canonical="/certifications"
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div className="pt-20">
                    <Certifications />
                </div>
            </Suspense>
        </>
    );
}
