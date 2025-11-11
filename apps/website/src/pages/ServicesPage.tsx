import { motion } from 'framer-motion';

import { BeccFooter, Header, PageTitle, ScrollToTop, ServiceCard, Slider } from '@becc/ui';

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

const ServicesPage = (): JSX.Element => {
  const sliderData = [
    {
      id: 1,
      title: 'Digital Skills for the Future',
      description:
        'Empowering the next generation with cutting-edge technology training and hands-on experience.',
      image: '/assets/img/education/education-1.webp',
      cta: {
        label: 'Explore Programs',
        href: '/programs',
      },
    },
    {
      id: 2,
      title: 'Transform Your Team',
      description:
        'Corporate training solutions designed to upskill your workforce and drive innovation.',
      image: '/assets/img/education/education-3.webp',
      cta: {
        label: 'Get Quote',
        href: '/contact',
      },
    },
    {
      id: 3,
      title: 'Youth Programs',
      description:
        'Engaging and fun tech programs for young learners aged 6-18 to explore their creativity.',
      image: '/assets/img/education/students-1.webp',
      cta: {
        label: 'View Programs',
        href: '/programs',
      },
    },
  ];

  const services = [
    {
      icon: 'bi bi-code-square',
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
      icon: 'bi bi-briefcase',
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
      icon: 'bi bi-people',
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
      icon: 'bi bi-stars',
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
      icon: 'bi bi-palette',
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
      icon: 'bi bi-lightbulb',
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Empowering Growth Through Digital Education & Partnerships
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  At BECC Academy, we provide comprehensive learning solutions that combine
                  practical skills development with creative thinking and entrepreneurial mindset.
                  Our services are designed to meet the diverse needs of learners aged 6-30, from
                  coding basics to advanced professional development.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether you&apos;re starting your digital journey, enhancing your creative
                  capabilities, or seeking specialized corporate training, our expert-led programs
                  and personalized approach ensure meaningful learning outcomes that translate to
                  real-world success.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Slider slides={sliderData} autoPlay autoPlayInterval={6000} />
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#e95001] to-[#d14801] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Learning Journey?
                </h3>
                <p className="text-lg text-white/90">
                  Connect with our team to learn more about our programs and find the perfect
                  learning path for your goals.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-[#e95001] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Schedule a Visit
                </a>
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#e95001] transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
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
