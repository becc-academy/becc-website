import type { JSX } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Book,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Globe,
  Laptop,
  Lightbulb,
  Quote,
  Star,
  Users,
} from 'lucide-react';

import {
  AboutSection,
  BeccFooter,
  FeatureCard,
  Header,
  Hero,
  ProgramCard,
  ScrollToTop,
  SectionTitle,
  ValueCard,
} from '@becc/ui';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
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

interface IProgram {
  image: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  badge?: string;
  stats?: {
    students?: string;
    successRate?: string;
  };
  onLearnMore?: () => void;
}

const HomePage = (): JSX.Element => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const programs: IProgram[] = [
    {
      image: '/assets/img/innovators.jpg',
      title: 'Innovators Program',
      description:
        'A blended accelerator for designers, developers and founders — includes mentorship, portfolio projects and demo day presentations with industry partners.',
      duration: '3 months/course',
      level: 'Professional',
      badge: 'Popular',
      stats: {
        students: '5+ Students',
        successRate: '90% Success Rate',
      },
      onLearnMore: () => {
        // Navigate to Innovators Program registration page
        window.location.href = '/contact';
      },
    },
    {
      image: '/assets/img/education/education-4.webp',
      title: 'Summer Code Camp',
      description:
        'Intensive beginner-to-intermediate coding bootcamp that builds web and mobile development fundamentals.',
      duration: '3 weeks',
      level: 'Bootcamp',
    },
    {
      image: '/assets/img/education/education-6.webp',
      title: 'Digital Marketing',
      description:
        'Practical training in social media, analytics and campaign strategy to grow businesses and portfolios.',
      duration: '1 Month',
      level: 'Certificate',
    },
    {
      image: '/assets/img/education/education-10.webp',
      title: 'Creative Arts',
      description:
        'Studio-based courses in visual and performing arts with exhibition and portfolio development.',
      duration: '6 Weeks',
      level: 'Bootcamp',
    },
  ];

  const testimonials = [
    {
      image: '/assets/img/person/Eners.jpg',
      name: 'Ernestina Asabea',
      position: 'Alumni',
      rating: 5,
      testimonial:
        'I learnt how to create different games and animations.Yes I would recommend for others.',
    },
    {
      image: '/assets/img/person/Eners.jpg',
      name: 'Osei Wendy Laura',
      position: 'Alumni',
      rating: 5,
      testimonial:
        "Learning Scratch has been an exciting journey for me. It helped me understanding coding in fun and simple way. I was able to create animations, tell stories, and even design my own games. Scratch has boosted my creativity and confidence in programming. I'm proud of how far I've come!",
    },
    {
      image: '/assets/img/person/sq.jpg',
      name: 'Sandra Yemoley Quarshie',
      position: 'Alumni',
      rating: 5,
      testimonial:
        'I had a good time learning. I learned what it takes to be a good designer, the course stressed on the need for making use of the design principles to achieve great designs. I liked my tutor, he was very professional. Yes! I would 100% recommend BECC Academy.',
    },
    {
      image: '/assets/img/person/ll.jpg',
      name: 'Lartey Lois Lartebea',
      position: 'Alumni',
      rating: 5,
      testimonial:
        'It was a great experience. Our tutor was the best. His knowledge on the course, his humility and friendliness made the class always interesting. I will always recommend BECC Academy to others. Thank you for this opportunity.',
    },
    {
      image: '/assets/img/person/fe.jpg',
      name: 'Agyepong Felix Okoree',
      position: 'Alumni',
      rating: 5,
      testimonial:
        'It was an insightful training program; I had the opportunity to learn the basics of graphic design and implement what I learned in my designs.',
    },
  ];

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = testimonialIndex * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const handlePrevious = (): void => {
    setDirection('left');
    setTestimonialIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = (): void => {
    setDirection('right');
    setTestimonialIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

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
          description="BECC Academy delivers hands-on, project-based training that equips learners (ages 6-30) with practical digital, creative, and problem-solving skills to succeed in education and the workplace."
          stats={[
            { value: '96%', label: 'Completion Rate' },
            { value: '5:1', label: 'Student-Tutor Ratio' },
            { value: '6+', label: 'Programs' },
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
                  icon={Users}
                  title="Think"
                  description="We foster critical thinking and collaborative problem solving through team projects and mentorship."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <FeatureCard
                  icon={Laptop}
                  title="Learn"
                  description="Practical, skill-focused courses in coding, design, analytics and entrepreneurship prepare learners for real world challenges."
                  active
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <FeatureCard
                  icon={BookOpen}
                  title="Evolve"
                  description="Continuous growth through project showcases, industry partnerships and career support."
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Event Banner */}
        {/* <motion.section
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
        </motion.section> */}

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
                  icon={Book}
                  title="Build"
                  description="Hands-on projects and portfolio work that demonstrate real skills to employers."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon={Users}
                  title="Evolve"
                  description="Lifelong learning pathways and mentorship to support continuous growth."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon={Lightbulb}
                  title="Create"
                  description="Encourage creative problem solving and original solutions across disciplines."
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ValueCard
                  icon={Globe}
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

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {programs.map((program, index) => (
                <motion.div
                  key={`${program.title}-${index}`}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProgramCard
                    image={program.image}
                    title={program.title}
                    description={program.description}
                    duration={program.duration}
                    level={program.level}
                    badge={program.badge}
                    stats={program.stats}
                    onLearnMore={program.onLearnMore}
                  />
                </motion.div>
              ))}
            </motion.div>
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

            <div className="relative min-h-[400px] mb-8 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonialIndex}
                  custom={direction}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                  variants={{
                    enter: (dir: 'left' | 'right') => ({
                      opacity: 0,
                      x: dir === 'right' ? 100 : -100,
                    }),
                    center: { opacity: 1, x: 0 },
                    exit: (dir: 'left' | 'right') => ({
                      opacity: 0,
                      x: dir === 'right' ? -100 : 100,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {currentTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${testimonialIndex}-${index}`}
                      custom={direction}
                      variants={{
                        enter: (dir: 'left' | 'right') => ({
                          opacity: 0,
                          x: dir === 'right' ? 50 : -50,
                        }),
                        center: { opacity: 1, x: 0 },
                        exit: (dir: 'left' | 'right') => ({
                          opacity: 0,
                          x: dir === 'right' ? -50 : 50,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="w-full"
                    >
                      <div className="bg-white p-8 rounded-2xl shadow-lg text-left">
                        {/* Header with Image and Rating */}
                        <div className="flex items-center justify-between mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#e95001]/20"
                            loading="lazy"
                          />
                          <div className="flex space-x-1">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`w-4 h-4 ${
                                  starIndex < testimonial.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 fill-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
                          &ldquo;{testimonial.testimonial}&rdquo;
                        </p>

                        {/* Footer with Name and Role */}
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                          <div>
                            <h5 className="font-bold text-gray-900 text-base">
                              {testimonial.name}
                            </h5>
                            <span className="text-sm text-gray-500">{testimonial.position}</span>
                          </div>
                          <div className="w-10 h-10 bg-[#e95001]/10 rounded-full flex items-center justify-center">
                            <Quote className="w-5 h-5 text-[#e95001]" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <motion.button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-[#e95001] text-white shadow-lg hover:bg-[#d14801] transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#e95001] text-white shadow-lg hover:bg-[#d14801] transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
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
