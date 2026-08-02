import type { JSX } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Laptop, Star, Users } from 'lucide-react';

import {
  AboutSection,
  Hero,
  ProgramCard,
  SectionTitle,
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
  const shouldReduceMotion = useReducedMotion();

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
      title: 'Learning became fun',
      rating: 5,
      testimonial:
        'I learnt how to create different games and animations.Yes I would recommend for others.',
    },
    {
      image: '/assets/img/person/Eners.jpg',
      name: 'Osei Wendy Laura',
      position: 'Alumni',
      title: 'Confidence through creativity',
      rating: 5,
      testimonial:
        "Learning Scratch has been an exciting journey for me. It helped me understanding coding in fun and simple way. I was able to create animations, tell stories, and even design my own games. Scratch has boosted my creativity and confidence in programming. I'm proud of how far I've come!",
    },
    {
      image: '/assets/img/person/sq.jpg',
      name: 'Sandra Yemoley Quarshie',
      position: 'Alumni',
      title: 'Design principles that stick',
      rating: 5,
      testimonial:
        'I had a good time learning. I learned what it takes to be a good designer, the course stressed on the need for making use of the design principles to achieve great designs. I liked my tutor, he was very professional. Yes! I would 100% recommend BECC Academy.',
    },
    {
      image: '/assets/img/person/ll.jpg',
      name: 'Lartey Lois Lartebea',
      position: 'Alumni',
      title: 'A tutor who made a difference',
      rating: 5,
      testimonial:
        'It was a great experience. Our tutor was the best. His knowledge on the course, his humility and friendliness made the class always interesting. I will always recommend BECC Academy to others. Thank you for this opportunity.',
    },
    {
      image: '/assets/img/person/fe.jpg',
      name: 'Agyepong Felix Okoree',
      position: 'Alumni',
      title: 'From basics to real designs',
      rating: 5,
      testimonial:
        'It was an insightful training program; I had the opportunity to learn the basics of graphic design and implement what I learned in my designs.',
    },
  ];

  return (
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

        {/* Learning approach */}
        <motion.section
          className="bg-[#f4f6f7] py-14 sm:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              variants={fadeInUp}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-becc-accent">
                  Our learning approach
                </span>
                <h2
                  className="mt-3 text-3xl font-bold sm:text-4xl"
                  style={{ color: 'var(--heading-color)' }}
                >
                  From curiosity to capability
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-black/55 sm:text-right">
                A practical learning cycle that develops ideas, real skills, and lasting growth.
              </p>
            </motion.div>

            <motion.div
              className="grid overflow-hidden rounded-2xl border border-black/10 bg-white md:grid-cols-3"
              variants={staggerContainer}
            >
              {[
                {
                  step: '01',
                  icon: Users,
                  title: 'Think',
                  description:
                    'We foster critical thinking and collaborative problem solving through team projects and mentorship.',
                },
                {
                  step: '02',
                  icon: Laptop,
                  title: 'Learn',
                  description:
                    'Practical courses in coding, design, analytics, and entrepreneurship prepare learners for real-world challenges.',
                },
                {
                  step: '03',
                  icon: BookOpen,
                  title: 'Evolve',
                  description:
                    'Project showcases, industry partnerships, and career support create room for continuous growth.',
                },
              ].map(({ step, icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  className={`group relative flex min-h-72 flex-col p-7 sm:p-8 ${
                    index > 0 ? 'border-t border-black/10 md:border-l md:border-t-0' : ''
                  }`}
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-becc-accent/25 text-becc-accent transition-colors group-hover:border-becc-accent group-hover:bg-becc-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-black/35">{step}</span>
                  </div>
                  <div className="mt-auto pt-12">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-7 text-black/65">{description}</p>
                  </div>
                </motion.article>
              ))}
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

        {/* The B.E.C.C. Code */}
        <motion.section
          className="bg-white py-16 sm:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-7 pb-10 sm:pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <motion.div variants={fadeInUp}>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-becc-accent">
                  Our shared principles
                </span>
                <h2
                  className="max-w-3xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl"
                  style={{ color: 'var(--heading-color)' }}
                >
                  The B.E.C.C. Code
                </h2>
              </motion.div>
              <motion.p
                className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end"
                variants={fadeInUp}
              >
                Four principles shape how we teach, mentor, and turn learning into meaningful
                opportunities for people and communities.
              </motion.p>
            </div>

            <motion.div
              className="grid border-y border-black/15 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
            >
              {[
                {
                  number: '01',
                  letter: 'B',
                  title: 'Build',
                  description:
                    'Hands-on projects and portfolio work that demonstrate real skills to employers.',
                },
                {
                  number: '02',
                  letter: 'E',
                  title: 'Evolve',
                  description:
                    'Lifelong learning pathways and mentorship that support continuous growth.',
                },
                {
                  number: '03',
                  letter: 'C',
                  title: 'Create',
                  description:
                    'Creative problem-solving and original solutions developed across disciplines.',
                },
                {
                  number: '04',
                  letter: 'C',
                  title: 'Change',
                  description:
                    'Skills that empower communities and generate lasting social and economic impact.',
                },
              ].map((principle, index) => (
                <motion.article
                  key={principle.title}
                  className={`group min-h-64 border-black/15 px-0 py-7 sm:min-h-72 sm:px-6 sm:py-8 ${
                    index % 2 === 0 ? 'sm:border-r' : ''
                  } ${index > 0 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''} ${
                    index > 1 ? 'sm:border-t lg:border-t-0' : ''
                  } ${
                    index > 0 ? 'lg:border-l' : ''
                  } lg:border-r-0`}
                  variants={fadeInUp}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-black/40">{principle.number}</span>
                    <span className="text-4xl font-bold leading-none text-becc-accent/20 transition-colors group-hover:text-becc-accent">
                      {principle.letter}
                    </span>
                  </div>
                  <div className="mt-16 sm:mt-20">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {principle.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-black/60">
                      {principle.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Programs */}
        <motion.section
          className="py-16"
          style={{ backgroundColor: 'var(--surface-color)' }}
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
          className="overflow-x-hidden py-16"
          style={{ backgroundColor: '#ffffff' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="">
            <motion.div variants={fadeInUp}>
              <SectionTitle
                title="Testimonials"
                description="Stories from students and alumni who transformed their careers with BECC Academy."
                descriptionClassName="max-w-xl"
                centered
              />
            </motion.div>

            <div className="space-y-5 overflow-hidden">
              {[testimonials, [...testimonials.slice(2), ...testimonials.slice(0, 2)]].map(
                (row, rowIndex) => (
                  <div key={rowIndex} className="overflow-hidden py-1">
                    <motion.div
                      className="flex w-max gap-3 sm:gap-5"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { x: rowIndex === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }
                      }
                      transition={{
                        duration: rowIndex === 0 ? 42 : 46,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {[...row, ...row].map((testimonial, index) => (
                        <article
                          key={`${rowIndex}-${testimonial.name}-${index}`}
                          aria-hidden={index >= row.length}
                          className="flex h-[280px] w-[calc(100vw-2rem)] max-w-[460px] shrink-0 flex-col rounded-xl border border-black/[0.06] bg-[#f4f4f2] p-5 text-left sm:w-[400px] sm:p-6 lg:w-[460px]"
                        >
                          <h3
                            className="mb-2 text-base font-bold leading-snug"
                            style={{ color: 'var(--heading-color)' }}
                          >
                            {testimonial.title}
                          </h3>

                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className="flex gap-0.5"
                              aria-label={`${testimonial.rating} out of 5 stars`}
                            >
                              {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className="h-3.5 w-3.5 fill-becc-accent text-becc-accent"
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-black/55">
                              BECC {testimonial.position}
                            </span>
                          </div>

                          <p
                            className="mb-5 line-clamp-5 text-sm leading-relaxed"
                            style={{ color: 'var(--default-color)' }}
                          >
                            {testimonial.testimonial}
                          </p>

                          <div className="mt-auto flex items-center gap-3">
                            <img
                              src={testimonial.image}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover"
                              loading="lazy"
                            />
                            <div className="min-w-0">
                              <h5
                                className="truncate text-sm font-bold"
                                style={{ color: 'var(--heading-color)' }}
                              >
                                {testimonial.name}
                              </h5>
                            </div>
                          </div>
                        </article>
                      ))}
                    </motion.div>
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.section>
    </main>
  );
};

export default HomePage;
