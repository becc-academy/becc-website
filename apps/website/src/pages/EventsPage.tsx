import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search } from 'lucide-react';

import { EventCard, type IEventCardProps, PageTitle } from '@becc/ui';

const EventsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const events: (IEventCardProps & { id: string })[] = [
    {
      id: 'humble-data-workshop',
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
      id: 'general-annual-meeting',
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

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      categoryFilter === 'all' || event.category.type === categoryFilter;
    const searchableContent = [
      event.title,
      event.description,
      event.location,
      event.category.label,
      event.date.day,
      event.date.month,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && searchableContent.includes(normalizedQuery);
  });

  return (
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
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative w-full lg:max-w-md" htmlFor="event-search">
                <span className="sr-only">Search events</span>
                <Search
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-becc-accent"
                />
                <input
                  id="event-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Find an event..."
                  className="h-14 w-full rounded-full border border-black/5 bg-white pl-14 pr-5 shadow-[0_10px_30px_rgba(20,24,32,0.08)] outline-none transition placeholder:text-black/40 focus:border-becc-accent/40 focus:ring-4 focus:ring-becc-accent/10"
                />
              </label>

              <div
                className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:justify-end"
                role="group"
                aria-label="Filter events by category"
              >
                {[
                  { value: 'all', label: 'All' },
                  { value: 'academic', label: 'Workshops' },
                  { value: 'community', label: 'Community' },
                  { value: 'sports', label: 'Sports' },
                  { value: 'arts', label: 'Arts' },
                ].map((category) => {
                  const isActive = categoryFilter === category.value;

                  return (
                    <button
                      key={category.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setCategoryFilter(category.value)}
                      className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-all focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f14e05] ${
                        isActive
                          ? 'bg-becc-accent text-white'
                          : 'border border-black/5 bg-white text-black/65 hover:border-becc-accent/30 hover:text-becc-accent'
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(({ id, ...event }, index) => (
                  <motion.div
                    key={`${event.title}-${index}`}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard
                      {...event}
                      onDetails={() => {
                        void navigate(`/events/${id}`);
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center md:col-span-2"
                >
                  <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--default-color)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--heading-color)' }}>No matching events</h3>
                  <p style={{ color: 'var(--default-color)' }}>Try another search term or category.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
    </main>
  );
};

export default EventsPage;
