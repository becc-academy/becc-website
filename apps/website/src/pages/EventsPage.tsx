import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search } from 'lucide-react';

import {
  BeccFooter,
  EventBanner,
  EventCard,
  EventRegistrationModal,
  formatCountdown,
  Header,
  type IEventCardProps,
  type IEventRegistrationFormData,
  PageTitle,
  ScrollToTop,
  useCountdown,
} from '@becc/ui';

const EventsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    registrationUrl?: string;
  } | null>(null);

  const humbleDataEventDate = new Date('2025-11-22T09:00:00');
  const countdown = useCountdown(humbleDataEventDate);
  const countdownText = formatCountdown(countdown);

  const handleRegisterClick = (
    title: string,
    registrationUrl?: string,
    shouldNavigate?: boolean,
  ): void => {
    if (shouldNavigate) {
      // For events with detail pages
      const slug = title.toLowerCase().replace(/\s+/g, '-');
      void navigate(`/events/${slug}`);
    } else {
      // Open registration modal
      setSelectedEvent({ title, registrationUrl });
      setIsModalOpen(true);
    }
  };

  const handleRegistrationSubmit = (data: IEventRegistrationFormData): void => {
    console.warn('Registration data:', data);
    // Here you would typically send the data to your backend
  };

  const events: IEventCardProps[] = [
    {
      image: '/assets/img/education/events-5.webp',
      date: { day: '22', month: 'Nov' },
      category: { label: 'Workshop', type: 'academic' },
      time: '09:00 AM - 04:00 PM',
      title: 'Humble Data Workshop',
      description:
        'A day of introduction to Data Analysis, where Participants will be taught how to prepare and position themselves as Data Analysts, from beginners to advance.',
      location: 'Virtual Event',
      participants: 'Open to all',
      registrationUrl: 'https://bit.ly/HDW1025',
      onRegister: () =>
        handleRegisterClick('Humble Data Workshop', 'https://bit.ly/HDW1025', false),
      delay: 0,
    },
    {
      image: '/assets/img/education/events-6.webp',
      date: { day: '22', month: 'Dec' },
      category: { label: 'Meeting', type: 'community' },
      time: '12:00 PM - 07:00 PM',
      title: 'General Annual Meeting',
      description:
        'Join us for our annual general meeting to review achievements, discuss plans, and celebrate our community success together.',
      location: 'University Grand Hall',
      participants: '150+ Expected',
      onRegister: () => handleRegisterClick('General Annual Meeting', undefined, false),
      delay: 0.1,
    },
    {
      image: '/assets/img/education/events-1.webp',
      date: { day: '15', month: 'Jan' },
      category: { label: 'Seminar', type: 'academic' },
      time: '10:00 AM - 02:00 PM',
      title: 'Career Development Seminar',
      description:
        'Learn essential career skills, networking strategies, and professional development techniques from industry experts.',
      location: 'Main Auditorium',
      participants: '200+ Expected',
      onRegister: () => handleRegisterClick('Career Development Seminar', undefined, false),
      delay: 0.2,
    },
    {
      image: '/assets/img/education/events-2.webp',
      date: { day: '28', month: 'Jan' },
      category: { label: 'Competition', type: 'sports' },
      time: '08:00 AM - 06:00 PM',
      title: 'Inter-College Sports Day',
      description:
        'Annual sports competition featuring various athletic events, team sports, and individual competitions across multiple disciplines.',
      location: 'Sports Complex',
      participants: '500+ Athletes',
      onRegister: () => handleRegisterClick('Inter-College Sports Day', undefined, false),
      delay: 0.3,
    },
    {
      image: '/assets/img/education/events-3.webp',
      date: { day: '10', month: 'Feb' },
      category: { label: 'Exhibition', type: 'arts' },
      time: '11:00 AM - 05:00 PM',
      title: 'Student Art Exhibition',
      description:
        'Showcase of creative works by talented students featuring paintings, sculptures, digital art, and multimedia installations.',
      location: 'Art Gallery',
      participants: 'Open to public',
      onRegister: () => handleRegisterClick('Student Art Exhibition', undefined, false),
      delay: 0.4,
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        <PageTitle
          title="Events"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Events', href: '/events' },
          ]}
        />

        {/* Featured Event Banner */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <EventBanner
              date={{ day: '22', month: 'Nov' }}
              title="Humble Data Workshop"
              description="Join us for an intensive data analysis workshop. Register now and start your journey!"
              buttonText="Register Now"
              countdown={countdownText}
              onButtonClick={() =>
                handleRegisterClick('Humble Data Workshop', 'https://bit.ly/HDW1025', false)
              }
            />
          </div>
        </section>

        {/* Events Listing */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - Events List */}
              <div className="lg:col-span-2">
                {/* Events Grid */}
                <div className="grid gap-6">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <motion.div
                        key={`${event.title}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <EventCard {...event} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6 sticky top-24">
                  {/* Search Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Search Events</h4>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search Events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all"
                      />
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#e95001] text-white rounded-lg hover:bg-[#d14801] transition-colors"
                        aria-label="Search"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Upcoming Featured Event */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <h4 className="text-lg font-bold text-gray-900 p-6 pb-4">
                      Upcoming Featured Event
                    </h4>
                    <div className="relative">
                      <img
                        src="/assets/img/education/events-5.webp"
                        alt="Humble Data Workshop"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h5 className="text-xl font-bold text-gray-900 mb-2">Humble Data Workshop</h5>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2 text-[#e95001]" />
                        <span className="text-sm">November 22, 2025</span>
                      </div>
                      <motion.button
                        onClick={() =>
                          handleRegisterClick(
                            'Humble Data Workshop',
                            'https://bit.ly/HDW1025',
                            false,
                          )
                        }
                        className="w-full px-6 py-3 bg-[#e95001] text-white rounded-lg font-semibold hover:bg-[#d14801] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Register Now
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Event Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#e95001] to-[#d14801] rounded-2xl shadow-lg p-6 text-white"
                  >
                    <h4 className="text-lg font-bold mb-4">Event Statistics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Total Events</span>
                        <span className="text-2xl font-bold">{events.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">This Month</span>
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Registered</span>
                        <span className="text-2xl font-bold">850+</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BeccFooter />
      <ScrollToTop />

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          eventTitle={selectedEvent.title}
          externalRegistrationUrl={selectedEvent.registrationUrl}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </>
  );
};

export default EventsPage;
