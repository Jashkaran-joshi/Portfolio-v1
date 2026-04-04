import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import SectionHeading from '../components/common/SectionHeading';

export default function PrivacyPolicyPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO 
                title="Privacy Policy | Jaskaran Joshi" 
                description="Privacy Policy detailing data collection, processing, and handling practices for jaskaranjoshi.online."
            />
            <div className="pt-12">
                <section className="section-spacing container-custom relative z-10 min-h-screen">
                    <Button
                        navLink
                        onClick={() => navigate(-1)}
                        className="mb-10 hero-fade-in group"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-300" /> Back
                    </Button>

                    <header className="mb-14 border-b border-white/10 pb-10">
                        <SectionHeading 
                            title="Privacy Policy"
                            subtitle="Last Updated: April 2026"
                        />
                    </header>

                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-invert prose-neon max-w-none font-sans">
                    <p className="text-white/80 leading-relaxed mb-8">
                        This Privacy Policy outlines how your information is collected, used, and protected when you 
                        visit jaskaranjoshi.online (**"I"**, **"me"**, or **"my website"**). I am committed to protecting 
                        your personal data and respecting your privacy rights.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4 font-display">1. Information Collection</h2>
                    <p className="text-white/80 leading-relaxed mb-4">
                        When you use the contact form on this website, the following information is collected:
                    </p>
                    <ul className="list-disc pl-6 text-white/80 mb-8 space-y-2">
                        <li><strong>Identity Data:</strong> First name, last name (as provided)</li>
                        <li><strong>Contact Data:</strong> Email address</li>
                        <li><strong>Communication Data:</strong> The message content and subject line</li>
                        <li><strong>Technical Data:</strong> Your public IP address is temporarily logged exclusively for the purpose of spam prevention and rate limiting.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4 font-display">2. How Data is Used</h2>
                    <p className="text-white/80 leading-relaxed mb-8">
                        The collected information is used solely to respond to your professional inquiries. Your IP address is processed 
                        momentarily to restrict malicious behavior and prevent automated spam submissions to the database. None of this 
                        data is ever sold, leased, or distributed to third parties for marketing purposes.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4 font-display">3. Data Storage and Security</h2>
                    <p className="text-white/80 leading-relaxed mb-8">
                        Data submitted through the contact form is securely stored in a heavily restricted MongoDB database endpoint. 
                        All communications between your browser and the server occur over modern encrypted TLS connections. Standard 
                        security protocols, including request validation and input sanitization, are employed to protect the integrity 
                        of submitted data.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4 font-display">4. Your Rights (GDPR / DPDPA)</h2>
                    <p className="text-white/80 leading-relaxed mb-4">
                        Under applicable data protection laws (such as GDPR and India's DPDPA), you retain the right to:
                    </p>
                    <ul className="list-disc pl-6 text-white/80 mb-8 space-y-2">
                        <li>Request access to the personal data I hold about you.</li>
                        <li>Request correction of any incomplete or inaccurate data.</li>
                        <li>Request erasure of your personal data when it is no longer necessary.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4 font-display">5. Contact Information</h2>
                    <p className="text-white/80 leading-relaxed mb-8">
                        If you have any questions relating to this Privacy Policy or wish to exercise any of your data rights, 
                        please contact me securely through the <a href="/contact" className="text-neon hover:underline">Contact Form</a> or 
                        directly via the professional email listed on my profiles.
                    </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
