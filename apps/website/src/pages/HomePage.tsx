import type { JSX } from 'react';
import { motion } from 'framer-motion';

import {
  AboutSection,
  BeccFooter,
  EventBanner,
  FeatureCard,
  Header,
  Hero,
  ProgramCard,
  ProgramItem,
  ScrollToTop,
  SectionTitle,
  TestimonialCard,
  ValueCard,
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

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HomePage = (): JSX.Element => {
  return (
    <>
      {/* Header */}
      <Header
        logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/', active: true },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Programs', href: '/programs' },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <main>
        {/* Hero Section */}
        <Hero
          title="Launching Futures Through Experiential Learning"
          description="BECC Academy delivers hands-on, project-based training that equips learners (ages 6–30) with practical digital, creative, and problem-solving skills to succeed in education and the workplace."
          stats={[
            { value: '90%', label: 'Completion Rate' },
            { value: '5:1', label: 'Student-Tutor Ratio' },
            { value: '5+', label: 'Programs' },
          ]}
          primaryButton={{ label: 'Get Involved', href: '/programs' }}
          secondaryButton={{ label: 'Contact Us', href: '/contact' }}
          images={[
            '/assets/img/boy-doing-homework-with-use-laptop 2 (1).jpg',
            '/assets/img/businessman-working-laptop 2.jpg',
            '/assets/img/medium-shot-hard-working-student 2 (1).jpg',
            '/assets/img/portrait-black-child-while-doing-homework 1.jpg',
          ]}
        />

        {/* Feature Cards */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div className="grid lg:grid-cols-3 gap-6" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <FeatureCard
                  icon="bi bi-people-fill"
                  title="Think"
                  description="We foster critical thinking and collaborative problem solving through team projects and mentorship."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <FeatureCard
                  icon="bi bi-laptop-fill"
                  title="Learn"
                  description="Practical, skill-focused courses in coding, design, analytics and entrepreneurship prepare learners for real world challenges."
                  active
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <FeatureCard
                  icon="bi bi-book-fill"
                  title="Evolve"
                  description="Continuous growth through project showcases, industry partnerships and career support."
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Event Banner */}
        <motion.section
          className="py-8 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <EventBanner
              date={{ day: '22', month: 'NOV' }}
              title="Humble Data Workshop"
              description="Hands-on introduction to data analytics tools and workflows."
              buttonText="RSVP soon"
              buttonDisabled
              countdown="Starts in 4 weeks"
            />
          </div>
        </motion.section>

        {/* About Section */}
        <AboutSection
          eyebrow="Our Story"
          title="Educating Minds, Inspiring Hearts"
          description={[
            'B.E.C.C Academy exists to transform how young people THINK, LEARN and CREATE. We deliver inclusive, experience-driven education across digital literacy, creative practice and entrepreneurship for learners aged 6–30.',
            'Beginning as a summer code camp, our programs now span short courses, bootcamps and diploma pathways that help learners build portfolios, secure internships and start careers.',
          ]}
          image="/assets/img/WhatsApp Image 2025-09-24 at 16.00.52.jpeg"
          mission={{
            title: 'Our Mission',
            description:
              'To expand access to practical, creativity-centred learning across Africa so young people can build sustainable careers and businesses.',
          }}
          vision={{
            title: 'Our Vision',
            description:
              "To be Africa's leading hub for experiential education — nurturing tech-savvy, creative and entrepreneurial leaders ready to innovate and solve tomorrow's problems.",
          }}
        />

        {/* Core Values */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h3 className="text-3xl font-bold text-center mb-12" variants={fadeInUp}>
              The B.E.C.C. Code
            </motion.h3>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon="bi bi-book"
                  title="Build"
                  description="Hands-on projects and portfolio work that demonstrate real skills to employers."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon="bi bi-people"
                  title="Evolve"
                  description="Lifelong learning pathways and mentorship to support continuous growth."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon="bi bi-lightbulb"
                  title="Create"
                  description="Encourage creative problem solving and original solutions across disciplines."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon="bi bi-globe"
                  title="Change"
                  description="Empower communities with skills that generate social and economic impact."
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Programs */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp}>
              <SectionTitle
                title="Featured Programs"
                description="Explore our most popular programs designed to build practical skills, industry connections and job-ready portfolios."
                centered
              />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Featured Program */}
              <motion.div variants={fadeInLeft} transition={{ duration: 0.6, delay: 0.1 }}>
                <ProgramCard
                  image="/assets/img/innovators.jpg"
                  title="Innovators Program"
                  description="A blended accelerator for designers, developers and founders — includes mentorship, portfolio projects and demo day presentations with industry partners."
                  duration="3 months/course"
                  level="Professional"
                  badge="Popular"
                  stats={{
                    students: '5+ Students',
                    successRate: '90% Success Rate',
                  }}
                  onLearnMore={() => (window.location.href = '/programs')}
                />
              </motion.div>

              {/* Program List */}
              <motion.div className="space-y-4" variants={staggerContainer}>
                <motion.div variants={fadeInRight}>
                  <ProgramItem
                    image="/assets/img/education/education-4.webp"
                    title="Summer Code Camp"
                    description="Intensive beginner-to-intermediate coding bootcamp that builds web and mobile development fundamentals."
                    duration="3 weeks"
                    level="Bootcamp"
                  />
                </motion.div>
                <motion.div variants={fadeInRight}>
                  <ProgramItem
                    image="/assets/img/education/education-6.webp"
                    title="Digital Marketing"
                    description="Practical training in social media, analytics and campaign strategy to grow businesses and portfolios."
                    duration="1 Month"
                    level="Certificate"
                  />
                </motion.div>
                <motion.div variants={fadeInRight}>
                  <ProgramItem
                    image="/assets/img/education/education-10.webp"
                    title="Creative Arts"
                    description="Studio-based courses in visual and performing arts with exhibition and portfolio development."
                    duration="6 Weeks"
                    level="Bootcamp"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp}>
              <SectionTitle
                title="Testimonials"
                description="Stories from students and alumni who transformed their careers with BECC Academy."
                centered
              />
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <TestimonialCard
                  image="/assets/img/person/sq.jpg"
                  name="Sandra Yemoley Quarshie"
                  role="Alumni" // eslint-disable-line jsx-a11y/aria-role
                  rating={5}
                  testimonial="I had a good time learning. I learned what it takes to be a good designer, the course stressed on the need for making use of the design principles to achieve great designs. I liked my tutor, he was very professional. Yes! I would 100% recommend BECC Academy."
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <TestimonialCard
                  image="/assets/img/person/ll.jpg"
                  name="Lartey Lois Lartebea"
                  role="Alumni" // eslint-disable-line jsx-a11y/aria-role
                  rating={5}
                  testimonial="It was a great experience. Our tutor was the best. His knowledge on the course, his humility and friendliness made the class always interesting. I will always recommend BECC Academy to others. Thank you for this opportunity."
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <TestimonialCard
                  image="/assets/img/person/fe.jpg"
                  name="Agyepong Felix Okoree"
                  role="Alumni" // eslint-disable-line jsx-a11y/aria-role
                  rating={5}
                  testimonial="It was an insightful training program; I had the opportunity to learn the basics of graphic design and implement what I learned in my designs."
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <BeccFooter />

      <ScrollToTop />
    </>
  );
};

export default HomePage;
