import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import NeonButton from './ui/NeonButton';
import { personalData } from '../data';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { MessageCircle } from 'lucide-react';

// Contact Card with equal height layout
const ContactInfoCard = memo(function ContactInfoCard({ icon: Icon, label, value, href, isWhatsApp = false }) {
  const bgColor = isWhatsApp ? 'bg-green-500/10' : 'bg-neon/10';
  const hoverBg = isWhatsApp ? 'group-hover:bg-green-500/20' : 'group-hover:bg-neon/20';
  const textColor = isWhatsApp ? 'text-green-500' : 'text-neon';
  const hoverText = isWhatsApp ? 'group-hover:text-green-400' : 'group-hover:text-neon';
  const borderHover = isWhatsApp ? 'hover:border-green-500/40' : 'hover:border-neon/40';

  const CardInner = (
    <GlassCard
      className="p-5 h-full group cursor-pointer flex flex-col justify-center"
      glowColor={isWhatsApp ? 'neon' : 'neon'} // WhatsApp could be green, but keeping site-consistent neon/purple for now per user rules for symmetry
      hoverEffect={true}
    >
      {/* Icon */}
      <div className={`w-11 h-11 ${bgColor} ${hoverBg} rounded-lg flex items-center justify-center ${textColor} mb-3 transition-all duration-300 group-hover:scale-110 shrink-0`}>
        <Icon size={20} />
      </div>

      {/* Label */}
      <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-1">
        {label}
      </div>

      {/* Value */}
      <div className={`text-white text-sm font-medium ${hoverText} transition-colors duration-300 truncate`}>
        {value}
      </div>
    </GlassCard>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isWhatsApp ? '_blank' : undefined}
        rel={isWhatsApp ? 'noopener noreferrer' : undefined}
        className="block h-full"
      >
        {CardInner}
      </a>
    );
  }

  return CardInner;
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const phoneNumber = personalData.contact.phone;
  const whatsappNumber = phoneNumber.replace(/[\s+]/g, '');

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-dark/30 relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Connect"
          title="Get In Touch"
          subtitle="Let's discuss security, development, or your next big idea."
        />

        {/* Symmetrical Grid Layout - items-stretch ensures equal height */}
        <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Side - Contact Cards (2x2 grid, stretches to match form) */}
          <div className="grid grid-cols-2 gap-4 auto-rows-fr h-full">
            <Reveal delay={0} width="100%" className="h-full">
              <ContactInfoCard
                icon={FiMail}
                label="Email"
                value={personalData.contact.email}
                href={`mailto:${personalData.contact.email}`}
              />
            </Reveal>

            <Reveal delay={0.05} width="100%" className="h-full">
              <ContactInfoCard
                icon={FiPhone}
                label="Phone"
                value={phoneNumber}
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              />
            </Reveal>

            <Reveal delay={0.1} width="100%" className="h-full">
              <ContactInfoCard
                icon={MessageCircle}
                label="WhatsApp"
                value="Chat with me"
                href={`https://wa.me/${whatsappNumber}`}
                isWhatsApp={true}
              />
            </Reveal>

            <Reveal delay={0.15} width="100%" className="h-full">
              <ContactInfoCard
                icon={FiMapPin}
                label="Location"
                value="Jaipur, Rajasthan"
              />
            </Reveal>
          </div>

          {/* Right Side - Contact Form (matches card grid height) */}
          <Reveal width="100%" delay={0.1} className="h-full">
            <GlassCard className="p-6 md:p-8 h-full flex flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-white/60 text-xs font-mono mb-2 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-focus w-full"
                      placeholder="John Doe"
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/60 text-xs font-mono mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-focus w-full"
                      placeholder="john@example.com"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="flex-1 mb-4">
                  <label htmlFor="message" className="block text-white/60 text-xs font-mono mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-focus w-full resize-none h-full min-h-[120px]"
                    placeholder="Hello, I'd like to talk about..."
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <NeonButton
                    type="submit"
                    loading={status === 'loading'}
                    disabled={status === 'loading'}
                    icon={FiSend}
                    iconPosition="left"
                    variant="filled"
                  >
                    Send Message
                  </NeonButton>

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400 flex items-center gap-2 font-mono text-xs"
                    >
                      <FiCheckCircle /> <span>Message Sent!</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 flex items-center gap-2 font-mono text-xs"
                    >
                      <FiAlertCircle /> <span>Failed to send</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
