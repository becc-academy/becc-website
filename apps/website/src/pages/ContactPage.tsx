import type { JSX } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

import { BeccFooter, Header, PageTitle, ScrollToTop } from '@becc/ui';

// Validation schema
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject cannot exceed 200 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ContactFormData = yup.InferType<typeof contactSchema>;

const ContactPage = (): JSX.Element => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      setSubmitStatus('submitting');
      setErrorMessage('');

      // Send email using mailto or API endpoint
      // For now, we'll use a mailto link approach
      const mailtoLink = `mailto:info@beccacademy.com?subject=${encodeURIComponent(
        data.subject,
      )}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      )}`;

      // Open mailto link
      window.location.href = mailtoLink;

      // Mark as success after a short delay
      setTimeout(() => {
        setSubmitStatus('success');
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }, 1000);
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Header
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/', active: false },
          { label: 'About', href: '/about', active: false },
          { label: 'Services', href: '/services', active: false },
          { label: 'Programs', href: '/programs', active: false },
          { label: 'Events', href: '/events', active: false },
          { label: 'Contact', href: '/contact', active: true },
        ]}
        logo={{
          src: '/assets/img/logo.png',
          alt: 'BECC Academy Logo',
        }}
      />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Page Title Section */}
        <PageTitle
          title="Contact"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]}
        />

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map Section */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl h-[500px] lg:h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.72272930245!2d-0.26213332336422485!3d5.591373811872939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1761308009901!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BECC Academy Location"
                  className="w-full h-full"
                />
              </motion.div>

              {/* Contact Content */}
              <div className="space-y-8">
                {/* Contact Cards */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                    },
                  }}
                >
                  <motion.div
                    className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg border-2 border-orange-100 overflow-hidden group"
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)' 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <MapPin size={24} className="drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">Location</h4>
                      <p className="text-gray-600 text-sm">Accra, Ghana</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg border-2 border-orange-100 overflow-hidden group"
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)' 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Mail size={24} className="drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">Email</h4>
                      <p className="text-gray-600 text-sm break-words">info@beccacademy.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg border-2 border-orange-100 overflow-hidden group"
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)' 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Phone size={24} className="drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">Call</h4>
                      <p className="text-gray-600 text-sm">+1 (212) 555-7890</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg border-2 border-orange-100 overflow-hidden group"
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)' 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Clock size={24} className="drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">Open Hours</h4>
                      <p className="text-gray-600 text-sm">Monday-Friday: 9AM - 6PM</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  className="relative bg-gradient-to-br from-white via-orange-50/30 to-white p-8 rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 mb-3">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Need to make any enquiry or want to partner with us? We are just a mail away!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <input
                          type="text"
                          id="name"
                          placeholder="Your Name"
                          {...register('name')}
                          className={`w-full px-4 py-3 rounded-lg border-2 bg-white ${
                            errors.name
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300'
                          } focus:ring-2 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md`}
                        />
                        {errors.name && (
                          <motion.span
                            className="text-red-500 text-sm block"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.name.message}
                          </motion.span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="email"
                          id="email"
                          placeholder="Your Email"
                          {...register('email')}
                          className={`w-full px-4 py-3 rounded-lg border-2 bg-white ${
                            errors.email
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300'
                          } focus:ring-2 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md`}
                        />
                        {errors.email && (
                          <motion.span
                            className="text-red-500 text-sm block"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email.message}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        id="subject"
                        placeholder="Subject"
                        {...register('subject')}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-white ${
                          errors.subject
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300'
                        } focus:ring-2 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md`}
                      />
                      {errors.subject && (
                        <motion.span
                          className="text-red-500 text-sm block"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.subject.message}
                        </motion.span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Message"
                        {...register('message')}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-white ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300'
                        } focus:ring-2 focus:outline-none transition-all duration-300 resize-none shadow-sm hover:shadow-md`}
                      />
                      {errors.message && (
                        <motion.span
                          className="text-red-500 text-sm block"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.message.message}
                        </motion.span>
                      )}
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Your message has been sent. Thank you!
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errorMessage || 'Something went wrong. Please try again.'}
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                      <button
                        type="submit"
                        className="relative w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base rounded-full disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden group shadow-[0_4px_15px_rgba(255,107,53,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,107,53,0.4)]"
                        disabled={isSubmitting || submitStatus === 'submitting'}
                      >
                        <span className="relative z-10">
                          {submitStatus === 'submitting'
                            ? 'Sending...'
                            : submitStatus === 'success'
                              ? 'Message Sent!'
                              : 'Send Message'}
                        </span>
                        {/* Expanding circle ripple effect from center on hover */}
                        <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-[600ms] ease-out group-hover:w-[300px] group-hover:h-[300px]" />
                      </button>
                      <div className="flex items-center gap-4">
                        <a
                          href="https://x.com/BECCAcademy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
                        >
                          <Twitter size={20} className="relative z-10" />
                          <span className="absolute -inset-[3px] bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-0 blur-[8px] -z-10 transition-opacity duration-300 hover:opacity-60" />
                        </a>
                        <a
                          href="#"
                          className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
                        >
                          <Facebook size={20} className="relative z-10" />
                          <span className="absolute -inset-[3px] bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-0 blur-[8px] -z-10 transition-opacity duration-300 hover:opacity-60" />
                        </a>
                        <a
                          href="https://www.instagram.com/beccacademy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
                        >
                          <Instagram size={20} className="relative z-10" />
                          <span className="absolute -inset-[3px] bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-0 blur-[8px] -z-10 transition-opacity duration-300 hover:opacity-60" />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/beccacademy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
                        >
                          <Linkedin size={20} className="relative z-10" />
                          <span className="absolute -inset-[3px] bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-0 blur-[8px] -z-10 transition-opacity duration-300 hover:opacity-60" />
                        </a>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BeccFooter />
      <ScrollToTop />
    </>
  );
};

export default ContactPage;
