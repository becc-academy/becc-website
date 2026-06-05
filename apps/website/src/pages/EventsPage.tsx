import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { JSX } from 'react';

import {
  BeccFooter,
  EventCard,
  type IEventCardProps,
  Header,
  PageTitle,
  ScrollToTop,
} from '@becc/ui';

const EventsPage = (): JSX.Element => {
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
      delay: 0,
    },
    {
      image: '/assets/img/education/events-6.webp',
      date: { day: '22', month: 'Dec' },
      category: { label: 'Meeting', type: 'community' },
      time: 'All Day',
      title: 'General Annual Meeting',
      description:
        'Join us for our annual general meeting to review achievements, discuss plans, and celebrate our community success together.',
      location: 'To be decided',
      participants: 'Open to all members',
      delay: 0.1,
    },
  ];

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
      <main className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
        <PageTitle
          title="Events"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Events', href: '/events' },
          ]}
        />

        {/* Events Listing */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-6">
              {events.length > 0 ? (
                events.map((event, index) => (
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
                  <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--default-color)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--heading-color)' }}>No Events Found</h3>
                  <p style={{ color: 'var(--default-color)' }}>Check back soon for upcoming events.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      <BeccFooter />
      <ScrollToTop />
    </>
  );
};

export default EventsPage;
