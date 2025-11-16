import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Linkedin, Mail, Shield, Star, TrendingUp, Twitter, Users } from 'lucide-react';

import { BeccFooter, Header, PageTitle, ScrollToTop } from '@becc/ui';

interface ILeadershipMember {
  name: string;
  position: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

const AboutPage = (): JSX.Element => {
  const leadershipTeam: ILeadershipMember[] = [
    {
      name: 'Edmund N. O. Akogeram',
      position: 'Chief Executive Officer',
      image: '/assets/img/person/ed.jpeg',
      bio: "An experienced educator and tech entrepreneur with over 15 years of experience in digital education. Leads BECC's vision to transform learning across Africa.",
    },
    {
      name: 'Barbara O. Asiamah',
      position: 'Chief Finance Officer & Training Specialist',
      image: '/assets/img/person/ba.jpg',
      bio: 'Brings extensive experience in financial management and educational program development, ensuring sustainable growth while maintaining educational excellence.',
    },
    {
      name: 'Clifford O. Yeboah',
      position: 'Chief Operations Officer',
      image: '/assets/img/person/co.jpg',
      bio: 'Oversees daily operations and program delivery, ensuring seamless execution of our experiential learning initiatives across all campuses.',
    },
    {
      name: 'Clifford N. Sarpong',
      position: 'Chief Marketing Officer & Product Designer',
      image: '/assets/img/person/cs.png',
      bio: "A creative strategist focused on building BECC's brand and developing innovative learning products that meet evolving market needs.",
    },
  ];

  const coreValues = [
    {
      icon: Star,
      title: 'Excellence',
      description:
        'We strive for the highest standards in everything we do, from curriculum design to student support.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'We embrace new ideas and technologies to create cutting-edge learning experiences.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description:
        'We believe education should be accessible to everyone, regardless of background or circumstance.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We foster a community where students, instructors, and partners work together.',
    },
    {
      icon: TrendingUp,
      title: 'Impact',
      description: 'We measure our success by the positive change our students create in the world',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description:
        'We operate with honesty, transparency, and accountability in all our interactions.',
    },
  ];

  const timeline = [
    {
      year: '2025',
      description:
        'An idea is birthed through Django Girls Koforidua to empower young minds and push experience learning across Africa',
    },
    {
      year: '2025',
      description: 'Hosts our first Summer Code Camp in Scratch Essentials and Graphic Design.',
    },
    {
      year: '2025',
      description:
        'BECC Academy officially launches, offering its first program, Innovators Program, a continuous experiential learning platform for people aged 6 - 30.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Header
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/', active: false },
          { label: 'About', href: '/about', active: true },
          { label: 'Services', href: '/services', active: false },
          { label: 'Programs', href: '/programs', active: false },
          { label: 'Events', href: '/events', active: false },
          { label: 'Contact', href: '/contact', active: false },
        ]}
        logo={{
          src: '/assets/img/logo.png',
          alt: 'BECC Academy Logo',
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Page Title */}
        <PageTitle
          title="About"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
        />

        {/* Our Story Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                  Educating Minds, Inspiring Hearts
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    BECC Academy was founded with a vision to transform education through hands-on,
                    project-based learning experiences. We believe that learning should be engaging,
                    practical, and relevant to the real world.
                  </p>
                  <p>
                    Since our inception, we&apos;ve helped thousands of learners from children to
                    professionals develop the digital, creative, and problem-solving skills they
                    need to thrive in today&apos;s rapidly evolving world.
                  </p>
                  <p>
                    Our approach combines expert instruction, collaborative learning, and real-world
                    projects to create meaningful learning experiences that stick.
                  </p>
                </div>

                {/* Timeline */}
                <div className="mt-10 space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-orange-500 flex-shrink-0" />
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-orange-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.year}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Image & Mission/Vision */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
                  <img
                    src="/assets/img/IMG_1154_Original.JPG"
                    alt="BECC Academy Campus"
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Mission & Vision Cards */}
                <div className="space-y-4">
                  <motion.div
                    className="relative bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 overflow-hidden group"
                    whileHover={{
                      x: 10,
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        Our Mission
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        To provide accessible, high-quality learning experiences that empower
                        individuals of all ages to develop the skills and confidence needed to
                        succeed in the digital age.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 overflow-hidden group"
                    whileHover={{
                      x: 10,
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        Our Vision
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        To be the leading provider of experiential learning programs in Africa,
                        creating a generation of innovative thinkers and problem solvers who drive
                        positive change in their communities.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Core Values Section */}
            <motion.div
              className="mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900">Core Values</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500 overflow-hidden group"
                      variants={fadeInUp}
                      whileHover={{
                        y: -8,
                        scale: 1.03,
                        boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                          {value.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                Meet Our Distinguished Leadership
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our leadership team brings together diverse expertise in education, technology, and
                business to drive innovation in experiential learning across Africa. Each member is
                committed to our mission of transforming education through practical, hands-on
                learning experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[450px] group cursor-pointer">
                    <div className="h-64 overflow-hidden">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                      <p className="text-orange-500 font-medium mb-3 text-sm">{member.position}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {member.bio}
                      </p>
                      <div className="flex justify-center gap-3 pt-2">
                        {member.linkedin && (
                          <motion.a
                            href={member.linkedin}
                            className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                            whileHover={{ scale: 1.15, backgroundColor: '#ea580c' }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <Linkedin className="w-4 h-4" />
                          </motion.a>
                        )}
                        <motion.a
                          href="#"
                          className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                          whileHover={{ scale: 1.15, backgroundColor: '#ea580c' }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Twitter className="w-4 h-4" />
                        </motion.a>
                        {member.email && (
                          <motion.a
                            href={`mailto:${member.email}`}
                            className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                            whileHover={{ scale: 1.15, backgroundColor: '#ea580c' }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <Mail className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BeccFooter />
      <ScrollToTop />
    </>
  );
};

export default AboutPage;
