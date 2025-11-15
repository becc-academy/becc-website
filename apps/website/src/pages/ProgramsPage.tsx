import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, TrendingUp, Users } from 'lucide-react';

import {
  BeccFooter,
  Header,
  MetricCard,
  PageTitle,
  ProgramCard,
  ScrollToTop,
  SectionTitle,
} from '@becc/ui';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
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

const ProgramsPage = (): JSX.Element => {
  // Programs data
  const programs = [
    {
      image: '/assets/img/education/education-1.webp',
      title: 'Innovators Program',
      description:
        'A comprehensive program combining technical skills, design thinking, and entrepreneurship. Build real products and launch your own ventures.',
      duration: '1 month/course',
      level: 'Ages 6-30',
      badge: 'Flagship Program',
      stats: {
        students: '50+ Students',
        successRate: '90%',
      },
    },
    {
      image: '/assets/img/education/education-3.webp',
      title: 'Summer Code Camp',
      description:
        'An engaging introduction to coding, robotics, and digital creativity for young learners. Build games, animations, and basic applications.',
      duration: '3 Weeks',
      level: 'Ages 18-35',
      badge: 'Seasonal',
      stats: {
        students: '30+ Students',
        successRate: '95%',
      },
    },
    {
      image: '/assets/img/education/education-5.webp',
      title: 'Foundations Lab',
      description:
        'Master the fundamentals of programming, web development, and software engineering through hands-on projects and real-world applications.',
      duration: '4 Months',
      level: 'Ages 18-30',
      badge: 'Popular',
      stats: {
        students: '40+ Students',
        successRate: '88%',
      },
    },
    {
      image: '/assets/img/education/education-5.webp',
      title: 'Educators Network (Train-the-Trainer)',
      description:
        'Empower educators with modern teaching methodologies, digital tools, and curriculum development skills to inspire the next generation.',
      duration: '2 Months',
      level: 'Educators',
      stats: {
        students: '25+ Teachers',
        successRate: '92%',
      },
    },
  ];

  const metrics = [
    {
      value: '4',
      label: 'Core Programs',
      icon: GraduationCap,
    },
    {
      value: '5:1',
      label: 'Student-Mentor Ratio',
      icon: Users,
    },
    {
      value: '90%',
      label: 'Completion Rate',
      icon: TrendingUp,
    },
    {
      value: '10+',
      label: 'Alumni Network',
      icon: Award,
    },
  ];

  return (
    <>
      <ScrollToTop />

      {/* Header */}
      <Header
        logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Programs', href: '/programs', active: true },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <main>
        {/* Page Title */}
        <PageTitle
          title="Our Programs"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Programs', href: '/programs' },
          ]}
        />

        {/* Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Introduction */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInLeft}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Transform Your Future Through Practical Learning
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Our hands-on programs combine technical skills, creative thinking, and
                  entrepreneurial mindset to prepare learners ages 6-30 for success in the digital
                  age.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you&apos;re starting your coding journey, developing creative skills, or
                  launching a business idea, our project-based curriculum and expert mentorship will
                  help you achieve your goals.
                </p>
                <motion.a
                  href="/contact"
                  className="inline-block px-8 py-3 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.a>
              </motion.div>

              {/* Right Column - Metrics */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                {metrics.map((metric, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <MetricCard
                      value={metric.value}
                      label={metric.label}
                      icon={metric.icon}
                      delay={index * 0.1}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Programs Grid */}
            <div className="mb-12">
              <SectionTitle
                title="Our Academic Programs"
                subtitle="Explore our diverse range of programs designed to unlock your potential"
              />
            </div>

            <motion.div
              className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {programs.map((program, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ProgramCard
                    image={program.image}
                    title={program.title}
                    description={program.description}
                    duration={program.duration}
                    level={program.level}
                    badge={program.badge}
                    stats={program.stats}
                    onLearnMore={() => {
                      // Handle navigation or modal opening
                      window.location.href = '/contact';
                    }}
                    delay={index * 0.1}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mt-16 text-center bg-white rounded-2xl shadow-lg p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers and lives through our
                programs. Get started today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/contact"
                  className="px-8 py-3 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.a>
                <motion.a
                  href="/contact"
                  className="px-8 py-3 bg-white border-2 border-[#e95001] text-[#e95001] rounded-lg font-semibold hover:bg-[#e95001] hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <BeccFooter
        companyInfo={{
          name: 'BECC Academy',
          logo: '/assets/img/logo.png',
          year: new Date().getFullYear(),
        }}
      />
    </>
  );
};

export default ProgramsPage;
