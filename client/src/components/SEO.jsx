import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, type = 'website', keywords }) {
    const siteUrl = 'https://jaskaranjoshi.online';
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

    // Default SEO Values (Optimized for Tri-Role)
    const defaultTitle = "Jaskaran Joshi | Python Developer, Cybersecurity Analyst & Full Stack Engineer";
    const defaultDescription = "Python Developer, Cybersecurity Analyst, and Full Stack Engineer based in India. CEH Certified with expertise in secure application development, penetration testing, and modern web technologies.";
    const defaultKeywords = "Python Developer, Cybersecurity Analyst, Full Stack Engineer, Ethical Hacker, Penetration Testing, VAPT, React, Node.js, Django, CEH Certified, Security Researcher";

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | Jaskaran Joshi` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content="Jaskaran Joshi" />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title ? `${title} | Jaskaran Joshi` : defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content="https://jaskaranjoshi.online/og-image.png" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={title ? `${title} | Jaskaran Joshi` : defaultTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content="https://jaskaranjoshi.online/og-image.png" />

            {/* Geo Tags for "Cybersecurity Professional in India" */}
            <meta name="geo.region" content="IN-RJ" />
            <meta name="geo.placename" content="Jaipur" />
            <meta name="geo.position" content="26.9124;75.7873" />
            <meta name="ICBM" content="26.9124, 75.7873" />
        </Helmet>
    );
}
