import { useState } from 'react';

import { motion } from 'framer-motion';

import { Send, Mail, MapPin, User, FileText, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../common/SectionHeading';
import { api } from '../../utils/api';



const Contact = () => {

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    subject: '',

    message: '',

    website: ''

  });



  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const [errorMessage, setErrorMessage] = useState('');



  const [errors, setErrors] = useState({});



  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {

      newErrors.email = 'Email is required';

    } else if (!emailRegex.test(formData.email)) {

      newErrors.email = 'Please enter a valid email';

    }



    if (!formData.message.trim()) {

      newErrors.message = 'Message is required';

    } else if (formData.message.length < 10) {

      newErrors.message = 'Message must be at least 10 characters';

    }



    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };



  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types

    if (errors[name]) {

      setErrors(prev => ({ ...prev, [name]: null }));

    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    // Haptic feedback removed by user request



    if (!validateForm()) {

      return;

    }



    setStatus('loading');

    setErrorMessage('');



    try {
      await api.post('contact', formData);

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      // Clean error handling for production
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
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

          <motion.div variants={fadeInUp} className="flex flex-col h-full justify-between gap-6">

            {/* ISSUE 9.1 FIX: replaced manual eyebrow+h2 with SectionHeading component.
                Previously the eyebrow line was w-8 h-px bg-neon (full opacity).
                SectionHeading uses w-6 sm:w-8 h-px bg-neon/50 — now consistent with all other sections. */}
            <div>
              <SectionHeading
                eyebrow="Get In Touch"
                title="Let's Work Together"
                subtitle="Need a Python developer, a security audit, or a full-stack build? Let's talk — I'm always open to interesting problems."
              />
            </div>



            <div className="flex flex-col gap-4 flex-1 justify-end">

              {/* Email Card */}

              <a href="mailto:jashkaranjoshi@gmail.com" className="block group">

                <GlassCard className="p-5 md:p-6 h-full flex flex-col gap-4 group overflow-hidden" hoverEffect={true} isoColor="#00f3ff">

                  {/* Header - alignment only, no pill background */}

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00f3ff]/10 text-[#00f3ff] shrink-0">

                      <Mail size={20} />

                    </div>

                    <h3 className="text-white text-lg font-bold leading-none tracking-wide">Email Me</h3>

                  </div>



                  <div className="flex flex-col gap-1.5">

                    <p className="text-white/90 text-sm md:text-base font-medium">jashkaranjoshi@gmail.com</p>

                    <p className="text-xs text-white/40 font-mono tracking-wider">Response time: Within 24 hours</p>

                  </div>

                </GlassCard>

              </a>



              {/* Location Card */}

              <div className="block group">

                <GlassCard className="p-5 md:p-6 h-full flex flex-col gap-4 group overflow-hidden" hoverEffect={true} isoColor="#a855f7">

                  {/* Header - alignment only, no pill background */}

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#a855f7]/10 text-[#a855f7] shrink-0">

                      <MapPin size={20} />

                    </div>

                    <h3 className="text-white text-lg font-bold leading-none tracking-wide">Location</h3>

                  </div>



                  <div className="flex flex-col gap-1.5">

                    <p className="text-white/90 text-sm md:text-base font-medium">Jaipur, Rajasthan, India</p>

                    <p className="text-xs text-white/40 font-mono tracking-wider">Available for remote work worldwide</p>

                  </div>

                </GlassCard>

              </div>

            </div>

          </motion.div>



          {/* Right Column: Contact Form */}

          <motion.div

            variants={fadeInUp}

            className="relative h-full"

          >

            <GlassCard className="p-8 md:p-10 h-full flex flex-col justify-center" isoColor="#00f3ff">

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

                  <Button onClick={() => setStatus('idle')} variant="secondary">

                    Send Another

                  </Button>

                </motion.div>

              )}



              <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 flex-1 justify-center">

                <div className="absolute w-px h-px overflow-hidden -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Leave blank</label>
                  <input
                    type="text"
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

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

                        autoComplete="name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                        className="w-full bg-dark/50 border border-white/10 text-white outline-none transition-all duration-300 focus:border-neon focus:ring-2 focus:ring-neon/20 placeholder:text-white/20 py-3 pl-12 pr-4"

                        style={{ borderRadius: '8px' }}

                        placeholder="John Doe"

                      />

                    </div>

                    {errors.name && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}

                  </div>

                  <div className="space-y-2">

                    <label htmlFor="email" className="text-xs font-mono text-white/40 uppercase tracking-wider ml-1">EMAIL</label>

                    <div className="relative">

                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />

                      <input

                        type="email"

                        id="email"

                        name="email"

                        autoComplete="email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                        className="w-full bg-dark/50 border border-white/10 text-white outline-none transition-all duration-300 focus:border-neon focus:ring-2 focus:ring-neon/20 placeholder:text-white/20 py-3 pl-12 pr-4"

                        style={{ borderRadius: '8px' }}

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

                      autoComplete="off"

                      value={formData.subject}

                      onChange={handleChange}

                      className="w-full bg-dark/50 border border-white/10 text-white outline-none transition-all duration-300 focus:border-neon focus:ring-2 focus:ring-neon/20 placeholder:text-white/20 py-3 pl-12 pr-4"

                      style={{ borderRadius: '8px' }}

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

                      autoComplete="off"

                      value={formData.message}

                      onChange={handleChange}

                      required

                      rows="4"

                      className="w-full bg-dark/50 border border-white/10 text-white outline-none transition-all duration-300 focus:border-neon focus:ring-2 focus:ring-neon/20 placeholder:text-white/20 resize-none py-3 pl-12 pr-4"

                      style={{ borderRadius: '8px' }}

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

                  <Button

                    type="submit"

                    variant="primary"

                    loading={status === 'loading'}

                    success={status === 'success'}

                    className="w-full justify-center"

                    icon={Send}

                  >

                    Send Message

                  </Button>

                </div>

              </form>

            </GlassCard>

          </motion.div>

        </motion.div>

      </div>

    </section>

  );

};



export default Contact;

