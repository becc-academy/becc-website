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
import { toast } from 'sonner';


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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-color)' }}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--heading-color)' }}>Event Not Found</h2>
            <p className="mb-6" style={{ color: 'var(--default-color)' }}>
              The event you are looking for does not exist or has been removed.
            </p>
            <motion.button
              onClick={() => {
                void navigate('/events');
              }}
              className="px-6 py-3 bg-becc-accent text-white rounded-lg font-semibold transition-colors inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </motion.button>
          </div>
      </div>
    );
  }

  const handleRegister = (): void => {
    window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
        toast.success('Event shared successfully');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Event link copied');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand('copy');
        textArea.remove();

        if (!copied) {
          throw new Error('Unable to copy event link');
        }

        toast.success('Event link copied');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      toast.error('Unable to share this event. Please try again.');
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] overflow-hidden sm:h-[36rem]"
        aria-hidden="true"
      >
        <img
          src={event.image}
          alt=""
          className="h-full w-full scale-105 object-cover opacity-60 blur-md"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            void navigate('/events');
          }}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-becc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent"
          style={{ color: 'var(--heading-color)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </button>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-gray-100 shadow-[0_18px_50px_rgba(20,24,32,0.14)]">
            <img
              src={event.image}
              alt={event.title}
              className="h-[18rem] w-full object-cover sm:h-[25rem]"
            />
            <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-becc-accent shadow-sm sm:right-5 sm:top-5">
              {event.category.label}
            </span>
          </div>

          <header className="px-1 pb-6 pt-7 sm:px-0">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-becc-accent" />
                {event.date.month} {event.date.day}, {event.date.year}
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-becc-accent" />
                {event.time}
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-becc-accent" />
                {event.location}
              </span>
            </div>

            <h1
              className="mb-3 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl"
              style={{ color: 'var(--heading-color)' }}
            >
              {event.title}
            </h1>
            <p className="mb-0 max-w-3xl text-base leading-relaxed text-black/65 sm:text-lg">
              {event.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRegister}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-becc-accent px-6 text-sm font-bold text-white transition-colors hover:bg-becc-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent"
              >
                Register now
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleShare();
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-black/70 transition-colors hover:border-becc-accent/30 hover:text-becc-accent"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setIsSaved((saved) => !saved)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${
                  isSaved
                    ? 'border-becc-accent bg-becc-accent/5 text-becc-accent'
                    : 'border-black/10 bg-white text-black/70 hover:border-becc-accent/30 hover:text-becc-accent'
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </header>

          <nav className="flex gap-7 border-b border-black/10" aria-label="Event details sections">
            <a className="border-b-2 border-becc-accent pb-3 text-sm font-bold text-becc-accent" href="#details">
              Details
            </a>
            <a className="pb-3 text-sm font-medium text-black/45 transition-colors hover:text-becc-accent" href="#highlights">
              Highlights
            </a>
            <a className="pb-3 text-sm font-medium text-black/45 transition-colors hover:text-becc-accent" href="#requirements">
              Requirements
            </a>
          </nav>

          <section id="details" className="scroll-mt-28 border-b border-black/10 py-8">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-becc-accent">
              Description
            </span>
            <p className="mb-0 max-w-4xl text-base leading-8 text-black/70">
              {event.fullDescription}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Calendar, label: 'Date', value: `${event.date.month} ${event.date.day}, ${event.date.year}` },
                { icon: Clock, label: 'Time', value: event.time },
                { icon: MapPin, label: 'Location', value: event.location },
                { icon: Users, label: 'Attendance', value: event.participants },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-black/[0.07] bg-[#f7f7f5] p-4">
                  <Icon className="mb-3 h-5 w-5 text-becc-accent" />
                  <span className="block text-xs font-semibold uppercase tracking-wide text-black/40">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold" style={{ color: 'var(--heading-color)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-10 py-8 md:grid-cols-2">
            <section id="highlights" className="scroll-mt-28">
              <h2 className="mb-5 text-xl font-bold" style={{ color: 'var(--heading-color)' }}>
                Event highlights
              </h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-black/70">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-becc-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section id="requirements" className="scroll-mt-28">
              <h2 className="mb-5 text-xl font-bold" style={{ color: 'var(--heading-color)' }}>
                What to know
              </h2>
              <ul className="space-y-3">
                {event.requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-3 text-sm leading-relaxed text-black/70">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-becc-accent" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="flex flex-col gap-2 rounded-xl border border-black/[0.07] bg-[#f7f7f5] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-black/40">
                Organized by
              </span>
              <span className="mt-1 block font-bold" style={{ color: 'var(--heading-color)' }}>
                {event.organizer}
              </span>
            </div>
            <span className="text-sm font-semibold text-becc-accent">BECC Academy Event</span>
          </footer>
        </motion.article>
      </div>
    </main>
  );
};

export default EventDetailsPage;
