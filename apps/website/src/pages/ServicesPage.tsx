import { motion } from 'framer-motion';
import { Briefcase, Code, Lightbulb, Palette, Sparkles, Users } from 'lucide-react';

import { BeccFooter, Header, PageTitle, ScrollToTop, ServiceCard } from '@becc/ui';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ServicesPage = () => {
  const services = [
    {
      icon: Code,
      title: 'Digital Skills Training',
      description:
        'Comprehensive programs covering coding, web development, digital literacy, and essential tech skills for the modern workforce.',
      features: [
        'Python, JavaScript, and Web Development',
        'Mobile App Development',
        'Data Analysis & Visualization',
        'Digital Marketing Basics',
        'Cloud Computing Fundamentals',
      ],
      link: {
        label: 'Explore Programs',
        href: '/programs',
      },
    },
    {
      icon: Briefcase,
      title: 'Corporate Training',
      description:
        'Customized learning solutions for organizations seeking to upskill their teams in digital technologies and creative problem-solving.',
      features: [
        'Team Skills Assessment',
        'Customized Learning Paths',
        'On-site or Virtual Delivery',
        'Progress Tracking & Reporting',
        'Post-Training Support',
      ],
      link: {
        label: 'Get Quote',
        href: '/contact',
      },
    },
    {
      icon: Users,
      title: 'Mentorship Programs',
      description:
        'One-on-one guidance from industry professionals to help you navigate your career path and achieve your goals.',
      features: [
        'Career Counseling',
        'Technical Mentorship',
        'Project Guidance',
        'Industry Networking',
        'Portfolio Development',
      ],
      link: {
        label: 'Find a Mentor',
        href: '/programs',
      },
    },
    {
      icon: Sparkles,
      title: 'Youth Programs',
      description:
        'Engaging programs designed specifically for young learners (ages 6-18) to explore technology and creativity in a fun, supportive environment.',
      features: [
        'Coding for Kids (Ages 6-12)',
        'Teen Tech Bootcamps',
        'STEAM Workshops',
        'Digital Storytelling',
        'Game Development',
      ],
      link: {
        label: 'View Youth Programs',
        href: '/programs',
      },
    },
    {
      icon: Palette,
      title: 'Creative Workshops',
      description:
        'Hands-on workshops that blend creativity with technology, including graphic design, video editing, and content creation.',
      features: [
        'Graphic Design with Adobe Suite',
        'Video Production & Editing',
        'UI/UX Design Basics',
        'Content Creation for Social Media',
        '3D Modeling & Animation',
      ],
      link: {
        label: 'Join Workshop',
        href: '/events',
      },
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Entrepreneurship',
      description:
        'Programs focused on developing entrepreneurial mindset, innovation thinking, and business skills for aspiring tech entrepreneurs.',
      features: [
        'Design Thinking Workshops',
        'Startup Fundamentals',
        'Pitch Development',
        'Business Model Canvas',
        'Product Development',
      ],
      link: {
        label: 'Start Building',
        href: '/programs',
      },
    },
  ];

  return (
    <>
      {/* Header */}
      <Header
        logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services', active: true },
          { label: 'Programs', href: '/programs' },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <main className="main">
        {/* Page Title */}
        <PageTitle
          title="Services"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
          ]}
        />

        {/* Services Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInRight}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="/assets/img/service.jpeg"
                  alt="BECC Academy Services"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-left"
              >
                <h3
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: 'var(--heading-color)' }}
                >
                  Empowering Growth Through Digital Education & Partnerships
                </h3>
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{ color: 'var(--default-color)' }}
                >
                  At BECC Academy, we provide comprehensive learning solutions that combine
                  practical skills development with creative thinking and entrepreneurial mindset.
                  Our services are designed to meet the diverse needs of learners aged 6-30, from
                  coding basics to advanced professional development.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--default-color)' }}>
                  Whether you&apos;re starting your digital journey, enhancing your creative
                  capabilities, or seeking specialized corporate training, our expert-led programs
                  and personalized approach ensure meaningful learning outcomes that translate to
                  real-world success.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <BeccFooter />
      {}

      {/* Scroll to Top */}
      <ScrollToTop />
    </>
  );
};

export default ServicesPage;
