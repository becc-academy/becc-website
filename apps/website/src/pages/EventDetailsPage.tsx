import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  MapPin,
  Share2,
  Users,
} from 'lucide-react';

import { BeccFooter, Header, ScrollToTop } from '@becc/ui';

interface IEventDetails {
  id: string;
  image: string;
  date: { day: string; month: string; year: string };
  category: { label: string; type: 'academic' | 'sports' | 'arts' | 'community' };
  time: string;
  title: string;
  description: string;
  fullDescription: string;
  location: string;
  participants: string;
  registrationLink: string;
  organizer: string;
  highlights: string[];
  requirements: string[];
}

const eventDetailsData: Record<string, IEventDetails> = {
  'humble-data-workshop': {
    id: 'humble-data-workshop',
    image: '/assets/img/education/events-5.webp',
    date: { day: '22', month: 'Nov', year: '2025' },
    category: { label: 'Workshop', type: 'academic' },
    time: '09:00 AM - 04:00 PM',
    title: 'Humble Data Workshop',
    description:
      'A day of introduction to Data Analysis, where Participants will be taught how to prepare and position themselves as Data Analysts, from beginners to advance.',
    fullDescription:
      'Join us for an intensive, hands-on data analysis workshop designed to transform beginners into proficient data analysts. This comprehensive program covers everything from data collection and cleaning to advanced visualization and statistical analysis. Our expert instructors will guide you through real-world datasets and industry-standard tools.',
    location: 'Virtual Event',
    participants: 'Open to all',
    registrationLink: 'https://forms.gle/example-registration',
    organizer: 'BECC Academy Data Science Department',
    highlights: [
      'Introduction to Data Analysis fundamentals',
      'Hands-on practice with real-world datasets',
      'Data visualization techniques',
      'Statistical analysis basics',
      'Career guidance for aspiring data analysts',
      'Certificate of completion',
    ],
    requirements: [
      'Basic computer literacy',
      'Laptop with internet connection',
      'No prior programming experience required',
      'Enthusiasm to learn',
    ],
  },
  'general-annual-meeting': {
    id: 'general-annual-meeting',
    image: '/assets/img/education/events-6.webp',
    date: { day: '22', month: 'Dec', year: '2025' },
    category: { label: 'Meeting', type: 'community' },
    time: '12:00 PM - 07:00 PM',
    title: 'General Annual Meeting',
    description:
      'Join us for our annual general meeting to review achievements, discuss plans, and celebrate our community success together.',
    fullDescription:
      'Our Annual General Meeting is a celebration of achievements and a platform for planning the future. Join fellow members, stakeholders, and supporters as we reflect on the past year, share success stories, and outline our vision for the coming year. This is your opportunity to engage, contribute ideas, and network with like-minded individuals.',
    location: 'University Grand Hall',
    participants: '150+ Expected',
    registrationLink: 'https://forms.gle/example-agm',
    organizer: 'BECC Academy Board of Directors',
    highlights: [
      'Annual achievements review',
      'Financial report presentation',
      'Strategic plan for next year',
      'Community awards ceremony',
      'Networking opportunities',
      'Refreshments and dinner',
    ],
    requirements: [
      'RSVP required',
      'Members and stakeholders welcome',
      'Formal attire recommended',
    ],
  },
  'career-development-seminar': {
    id: 'career-development-seminar',
    image: '/assets/img/education/events-1.webp',
    date: { day: '15', month: 'Jan', year: '2026' },
    category: { label: 'Seminar', type: 'academic' },
    time: '10:00 AM - 02:00 PM',
    title: 'Career Development Seminar',
    description:
      'Learn essential career skills, networking strategies, and professional development techniques from industry experts.',
    fullDescription:
      'Elevate your career with insights from industry leaders and career development professionals. This seminar covers resume building, interview techniques, personal branding, and effective networking strategies. Whether you are starting your career or looking to advance, this event provides valuable guidance and practical tools.',
    location: 'Main Auditorium',
    participants: '200+ Expected',
    registrationLink: 'https://forms.gle/example-career',
    organizer: 'BECC Academy Career Services',
    highlights: [
      'Resume and cover letter workshop',
      'Interview preparation techniques',
      'Personal branding strategies',
      'Networking best practices',
      'Industry trends and insights',
      'Q&A with career experts',
    ],
    requirements: [
      'Bring your current resume',
      'Notepad for taking notes',
      'Open to students and recent graduates',
    ],
  },
  'inter-college-sports-day': {
    id: 'inter-college-sports-day',
    image: '/assets/img/education/events-2.webp',
    date: { day: '28', month: 'Jan', year: '2026' },
    category: { label: 'Competition', type: 'sports' },
    time: '08:00 AM - 06:00 PM',
    title: 'Inter-College Sports Day',
    description:
      'Annual sports competition featuring various athletic events, team sports, and individual competitions across multiple disciplines.',
    fullDescription:
      'Get ready for an action-packed day of athletic excellence! Our Inter-College Sports Day brings together talented athletes from various institutions to compete in track and field events, team sports, and individual competitions. Celebrate sportsmanship, teamwork, and healthy competition.',
    location: 'Sports Complex',
    participants: '500+ Athletes',
    registrationLink: 'https://forms.gle/example-sports',
    organizer: 'BECC Academy Sports Department',
    highlights: [
      'Track and field events',
      'Basketball, volleyball, and football tournaments',
      'Individual competitions (100m, 200m, relay)',
      'Team spirit competitions',
      'Awards for winners and participants',
      'Food and refreshments',
    ],
    requirements: [
      'Valid student ID',
      'Sports attire required',
      'Medical fitness certificate',
      'Registration per event required',
    ],
  },
  'student-art-exhibition': {
    id: 'student-art-exhibition',
    image: '/assets/img/education/events-3.webp',
    date: { day: '10', month: 'Feb', year: '2026' },
    category: { label: 'Exhibition', type: 'arts' },
    time: '11:00 AM - 05:00 PM',
    title: 'Student Art Exhibition',
    description:
      'Showcase of creative works by talented students featuring paintings, sculptures, digital art, and multimedia installations.',
    fullDescription:
      'Immerse yourself in creativity at our Student Art Exhibition. This event showcases the incredible talent of our students through paintings, sculptures, digital art, photography, and multimedia installations. Experience diverse artistic expressions and support emerging artists in our community.',
    location: 'Art Gallery',
    participants: 'Open to public',
    registrationLink: 'https://forms.gle/example-art',
    organizer: 'BECC Academy Arts Department',
    highlights: [
      'Paintings and drawings exhibition',
      'Sculpture displays',
      'Digital art and photography',
      'Live art demonstrations',
      'Artist meet and greet',
      'Art sales and auctions',
    ],
    requirements: [
      'Free entry for all',
      'Photography allowed (no flash)',
      'Respect artworks and artists',
    ],
  },
};

const EventDetailsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [isSaved, setIsSaved] = useState(false);

  const event = eventId ? eventDetailsData[eventId] : null;

  if (!event) {
    return (
      <>
        <Header
          logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
          siteName="BECC Academy"
          navLinks={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Services', href: '/services' },
            { label: 'Programs', href: '/programs' },
            { label: 'Events', href: '/events', active: true },
            { label: 'Contact', href: '/contact' },
          ]}
        />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">
              The event you are looking for does not exist or has been removed.
            </p>
            <motion.button
              onClick={() => {
                void navigate('/events');
              }}
              className="px-6 py-3 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </motion.button>
          </div>
        </div>
        <BeccFooter />
      </>
    );
  }

  const categoryColors = {
    academic: 'bg-blue-500',
    sports: 'bg-green-500',
    arts: 'bg-purple-500',
    community: 'bg-orange-500',
  };

  const handleRegister = (): void => {
    window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        console.warn('Error sharing:', err);
      }
    } else {
      void navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <Header
        logo={{ src: '/assets/img/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Programs', href: '/programs' },
          { label: 'Events', href: '/events', active: true },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Back Button */}
        <div className="container mx-auto max-w-7xl px-4 pt-24 pb-8">
          <motion.button
            onClick={() => {
              void navigate('/events');
            }}
            className="flex items-center text-gray-600 hover:text-[#e95001] transition-colors font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </motion.button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto max-w-7xl px-4 pb-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Event Image */}
                <div className="relative h-96 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-white rounded-lg p-4 text-center shadow-lg">
                    <div className="text-3xl font-bold text-[#e95001]">{event.date.day}</div>
                    <div className="text-sm font-semibold text-gray-600 uppercase">
                      {event.date.month}
                    </div>
                    <div className="text-xs text-gray-500">{event.date.year}</div>
                  </div>
                  <span
                    className={`absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-semibold ${categoryColors[event.category.type]}`}
                  >
                    {event.category.label}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

                  {/* Event Meta Info */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 text-[#e95001] mr-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 text-[#e95001] mr-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 text-[#e95001] mr-3" />
                      <span>{event.participants}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 text-[#e95001] mr-3" />
                      <span>
                        {event.date.month} {event.date.day}, {event.date.year}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">{event.fullDescription}</p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Event Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-2 h-2 bg-[#e95001] rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-6 sticky top-24">
                {/* Registration Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Register Now</h3>
                  <p className="text-gray-600 mb-6">
                    Secure your spot for this amazing event. Registration is quick and easy!
                  </p>
                  <motion.button
                    onClick={handleRegister}
                    className="w-full px-6 py-4 bg-[#e95001] text-white rounded-lg font-bold text-lg hover:bg-[#d14801] transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233, 80, 1, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </motion.button>

                  <div className="flex gap-3 mt-4">
                    <motion.button
                      onClick={() => {
                        void handleShare();
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-[#e95001] hover:text-[#e95001] transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </motion.button>
                    <motion.button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`flex-1 px-4 py-2 border-2 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                        isSaved
                          ? 'border-[#e95001] text-[#e95001] bg-orange-50'
                          : 'border-gray-300 text-gray-700 hover:border-[#e95001] hover:text-[#e95001]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Organizer Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Organized By</h4>
                  <p className="text-gray-700">{event.organizer}</p>
                </motion.div>

                {/* Event Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-[#e95001] to-[#d14801] rounded-2xl shadow-lg p-6 text-white"
                >
                  <h4 className="text-lg font-bold mb-4">Event Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">Category:</span>
                      <span className="font-semibold">{event.category.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Duration:</span>
                      <span className="font-semibold">{event.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Venue:</span>
                      <span className="font-semibold">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Expected:</span>
                      <span className="font-semibold">{event.participants}</span>
                    </div>
                  </div>
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

export default EventDetailsPage;
