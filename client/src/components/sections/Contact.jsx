import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, User, FileText, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const apiUrl = baseUrl.endsWith('/api') ? `${baseUrl}/contact` : `${baseUrl}/api/contact`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // Reset status after 5 seconds

    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 -right-64 w-96 h-96 bg-neon/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch"
        >
          {/* Left Column: Contact Info */}
          <motion.div variants={fadeInUp} className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-neon"></span>
                <span className="text-neon font-mono text-sm tracking-widest">GET IN TOUCH</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                Let's Work Together
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Got a project idea or want to talk about web development or security? I’m always open to a conversation.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-end">
              {/* Email Card */}
              <a
                href="mailto:jashkaranjoshi@gmail.com"
                className="interactive-card hover-lift p-6 flex items-center gap-5 group cursor-pointer"
              >
                <div className="p-4 bg-neon/10 rounded-full text-neon group-hover:bg-neon/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1 group-hover:text-neon transition-colors">Email Me</h3>
                  <p className="text-white/60 mb-1">jashkaranjoshi@gmail.com</p>
                  <p className="text-xs text-white/40 font-mono">Response time: Within 24 hours</p>
                </div>
              </a>


              {/* Location Card */}
              <div className="interactive-card hover-lift p-6 flex items-center gap-5 group">
                <div className="p-4 bg-purple-500/10 rounded-full text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors">Location</h3>
                  <p className="text-white/60 mb-1">Jaipur, Rajasthan, India</p>
                  <p className="text-xs text-white/40 font-mono">Available for remote work worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeInUp}
            className="glass p-8 md:p-10 rounded-2xl border border-white/10 relative h-full flex flex-col justify-center"
          >
            {/* Form Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 rounded-2xl"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 mb-6">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <NeonButton onClick={() => setStatus('idle')} variant="ghost">
                  Send Another
                </NeonButton>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 justify-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-white/40 uppercase tracking-wider ml-1">NAME</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-white/40 uppercase tracking-wider ml-1">EMAIL</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder:text-white/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono text-white/40 uppercase tracking-wider ml-1">SUBJECT (OPTIONAL)</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder:text-white/20"
                    placeholder="Project Collaboration"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-white/40 uppercase tracking-wider ml-1">MESSAGE</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-white/30" size={18} />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder:text-white/20 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle size={18} />
                  <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                </div>
              )}

              <div className="pt-2">
                <NeonButton
                  type="submit"
                  loading={status === 'loading'}
                  success={status === 'success'}
                  className="w-full justify-center"
                  icon={Send}
                >
                  Send Message
                </NeonButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
