# Component Usage Guide

This guide explains how to use the reusable components from the `@becc/ui` package in your website project.

## Import Aliases

The monorepo is configured with workspace imports using the `@becc` namespace:

- `@becc/ui` - Shared UI components
- `@becc/shared` - Shared utilities and types
- `@becc/config` - Shared configuration

Within each app, you can also use `@/*` to import from the app's `src` directory.

## Installation

Components are already configured in your `package.json`:

```json
{
  "dependencies": {
    "@becc/ui": "workspace:*"
  }
}
```

## Basic Usage

### Importing Components

```tsx
// Import from the UI package
import { Header, Footer, Hero, FeatureCard } from '@becc/ui';

// Import types if needed
import type { HeaderProps, NavLink } from '@becc/ui';
```

## Component Examples

### 1. Header Component

```tsx
import { Header } from '@becc/ui';

function App() {
  const navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Programs', href: '/programs' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <Header
      logo={{ src: '/logo.png', alt: 'BECC Academy' }}
      siteName="BECC Academy"
      navLinks={navLinks}
    />
  );
}
```

### 2. Footer Component

```tsx
import { Footer } from '@becc/ui';

function App() {
  return (
    <Footer
      logo={{ src: '/logo.png', alt: 'BECC Academy' }}
      contact={{
        location: 'Accra, Ghana',
        phone: '+233 (0)20 123 3215',
        email: 'info@beccacademy.com'
      }}
      socialLinks={[
        { icon: 'bi bi-twitter-x', href: 'https://x.com/BECCAcademy', label: 'Twitter' },
        { icon: 'bi bi-facebook', href: '#', label: 'Facebook' },
        { icon: 'bi bi-instagram', href: 'https://www.instagram.com/beccacademy/', label: 'Instagram' },
        { icon: 'bi bi-linkedin', href: 'https://www.linkedin.com/company/beccacademy/', label: 'LinkedIn' }
      ]}
      sections={[
        {
          title: 'Useful Links',
          links: [
            { label: 'Home', href: '/' },
            { label: 'About us', href: '/about' },
            { label: 'Services', href: '/services' },
            { label: 'Programs', href: '/programs' }
          ]
        },
        {
          title: 'Our Services',
          links: [
            { label: 'Digital Skills Training', href: '/services' },
            { label: 'Corporate Training', href: '/services' },
            { label: 'Mentorship Programs', href: '/services' },
            { label: 'Youth Programs', href: '/services' }
          ]
        }
      ]}
      copyright={{ text: 'BECC Academy' }}
      credits={{ text: 'Ayiks Junior', link: 'https://bootstrapmade.com/' }}
    />
  );
}
```

### 3. Hero Section

```tsx
import { Hero } from '@becc/ui';

function HomePage() {
  return (
    <Hero
      title="Launching Futures Through Experiential Learning"
      description="BECC Academy delivers hands-on, project-based training that equips learners (ages 6–30) with practical digital, creative, and problem-solving skills."
      stats={[
        { value: '90%', label: 'Completion Rate' },
        { value: '5:1', label: 'Student-Tutor Ratio' },
        { value: '5+', label: 'Programs' }
      ]}
      primaryButton={{ label: 'Get Involved', href: '/programs' }}
      secondaryButton={{ label: 'Contact Us', href: '/contact' }}
      images={[
        '/images/hero-1.jpg',
        '/images/hero-2.jpg',
        '/images/hero-3.jpg',
        '/images/hero-4.jpg'
      ]}
    />
  );
}
```

### 4. Feature Cards

```tsx
import { FeatureCard } from '@becc/ui';

function FeaturesSection() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <FeatureCard
        icon="bi bi-people-fill"
        title="Think"
        description="We foster critical thinking and collaborative problem solving through team projects and mentorship."
      />
      <FeatureCard
        icon="bi bi-laptop-fill"
        title="Learn"
        description="Practical, skill-focused courses in coding, design, analytics and entrepreneurship."
        active
      />
      <FeatureCard
        icon="bi bi-book-fill"
        title="Evolve"
        description="Continuous growth through project showcases, industry partnerships and career support."
      />
    </div>
  );
}
```

### 5. Program Cards

```tsx
import { ProgramCard, ProgramItem } from '@becc/ui';

function ProgramsSection() {
  return (
    <div className="space-y-8">
      {/* Featured Program */}
      <ProgramCard
        image="/images/innovators.jpg"
        title="Innovators Program"
        description="A blended accelerator for designers, developers and founders — includes mentorship, portfolio projects and demo day presentations."
        duration="3 months/course"
        level="Professional"
        badge="Popular"
        stats={{
          students: '5+ Students',
          successRate: '90% Success Rate'
        }}
        onLearnMore={() => window.location.href = '/programs'}
      />

      {/* Program List */}
      <div className="space-y-4">
        <ProgramItem
          image="/images/code-camp.jpg"
          title="Summer Code Camp"
          description="Intensive beginner-to-intermediate coding bootcamp."
          duration="3 weeks"
          level="Bootcamp"
        />
        <ProgramItem
          image="/images/digital-marketing.jpg"
          title="Digital Marketing"
          description="Practical training in social media, analytics and campaign strategy."
          duration="1 Month"
          level="Certificate"
        />
      </div>
    </div>
  );
}
```

### 6. Testimonials

```tsx
import { TestimonialCard } from '@becc/ui';

function TestimonialsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TestimonialCard
        image="/images/testimonial-1.jpg"
        name="Sandra Yemoley Quarshie"
        role="Alumni"
        rating={5}
        testimonial="I had a good time learning. I learned what it takes to be a good designer. I would 100% recommend BECC Academy."
      />
      {/* Add more testimonials */}
    </div>
  );
}
```

### 7. Page Title with Breadcrumbs

```tsx
import { PageTitle } from '@becc/ui';

function AboutPage() {
  return (
    <>
      <PageTitle
        title="About Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]}
      />
      {/* Page content */}
    </>
  );
}
```

### 8. About Section

```tsx
import { AboutSection } from '@becc/ui';

function AboutPage() {
  return (
    <AboutSection
      eyebrow="Our Story"
      title="Educating Minds, Inspiring Hearts"
      description={[
        "B.E.C.C Academy exists to transform how young people THINK, LEARN and CREATE.",
        "We deliver inclusive, experience-driven education across digital literacy, creative practice and entrepreneurship."
      ]}
      image="/images/campus.jpg"
      mission={{
        title: "Our Mission",
        description: "To expand access to practical, creativity-centred learning across Africa."
      }}
      vision={{
        title: "Our Vision",
        description: "To be Africa's leading hub for experiential education."
      }}
    />
  );
}
```

### 9. Timeline

```tsx
import { Timeline } from '@becc/ui';

function HistorySection() {
  return (
    <Timeline
      items={[
        {
          year: '2025',
          description: 'An idea is birthed through Django Girls Koforidua to empower young minds.'
        },
        {
          year: '2025',
          description: 'Hosts our first Summer Code Camp in Scratch Essentials and Graphic Design.'
        },
        {
          year: '2025',
          description: 'BECC Academy officially launches with the Innovators Program.'
        }
      ]}
    />
  );
}
```

### 10. Team Cards

```tsx
import { TeamCard } from '@becc/ui';

function TeamSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TeamCard
        image="/images/team/ceo.jpg"
        name="Edmund N. O. Akogeram"
        position="Chief Executive Officer"
        bio="An experienced educator and tech entrepreneur with over 15 years of experience in digital education."
        socialLinks={[
          { icon: 'bi bi-linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'bi bi-twitter-x', href: '#', label: 'Twitter' },
          { icon: 'bi bi-envelope', href: 'mailto:ceo@beccacademy.com', label: 'Email' }
        ]}
      />
      {/* Add more team members */}
    </div>
  );
}
```

### 11. Metric/Stats Cards

```tsx
import { MetricCard } from '@becc/ui';

function StatsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon="bi bi-mortarboard-fill"
        value={90}
        label="Success Rate"
        description="Participants who fully complete program"
        suffix="%"
        animated
      />
      <MetricCard
        icon="bi bi-building"
        value={8}
        label="Campus Locations"
        description="Across the country serving students"
        animated
      />
    </div>
  );
}
```

### 12. Section Title

```tsx
import { SectionTitle } from '@becc/ui';

function ProgramsPage() {
  return (
    <>
      <SectionTitle
        subtitle="What We Offer"
        title="Featured Programs"
        description="Explore our most popular programs designed to build practical skills, industry connections and job-ready portfolios."
        centered
      />
      {/* Section content */}
    </>
  );
}
```

### 13. Service Cards

```tsx
import { ServiceCard } from '@becc/ui';

function ServicesPage() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard
        icon="bi bi-code-slash"
        title="Digital Skills Training"
        description="Comprehensive coding and digital literacy programs for all skill levels."
        features={[
          'Web Development',
          'Mobile App Development',
          'Data Analytics',
          'UI/UX Design'
        ]}
        link={{ label: 'Learn More', href: '/services/digital-skills' }}
      />
      {/* Add more services */}
    </div>
  );
}
```

### 14. Gallery

```tsx
import { Gallery } from '@becc/ui';

function GallerySection() {
  return (
    <Gallery
      images={[
        { src: '/images/event-1.jpg', alt: 'Event', title: 'Student Events', size: 'large' },
        { src: '/images/event-2.jpg', alt: 'Campus', title: 'Campus Life' },
        { src: '/images/event-3.jpg', alt: 'Workshop', title: 'Workshops' }
      ]}
    />
  );
}
```

### 15. Event Cards

```tsx
import { EventCard } from '@becc/ui';

function EventsPage() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard
        image="/images/events/workshop.jpg"
        date={{ day: '22', month: 'NOV' }}
        category={{ label: 'Academic', type: 'academic' }}
        time="2:00 PM"
        title="Humble Data Workshop"
        description="Hands-on introduction to data analytics tools and workflows."
        location="Room 205, Science Building"
        participants="25 Participants"
        onRegister={() => console.log('Register clicked')}
      />
    </div>
  );
}
```

### 16. Event Banner

```tsx
import { EventBanner } from '@becc/ui';

function HomePage() {
  return (
    <EventBanner
      date={{ day: '22', month: 'NOV' }}
      title="Humble Data Workshop"
      description="Hands-on introduction to data analytics tools and workflows."
      buttonText="RSVP soon"
      buttonDisabled
      countdown="Starts in 4 weeks"
    />
  );
}
```

### 17. Value Cards

```tsx
import { ValueCard } from '@becc/ui';

function ValuesSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ValueCard
        icon="bi bi-book"
        title="Build"
        description="Hands-on projects and portfolio work that demonstrate real skills to employers."
      />
      <ValueCard
        icon="bi bi-people"
        title="Evolve"
        description="Lifelong learning pathways and mentorship to support continuous growth."
      />
    </div>
  );
}
```

### 18. Contact Form

```tsx
import { ContactForm } from '@becc/ui';

function ContactPage() {
  const handleSubmit = async (data: FormData) => {
    // Send to your API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to send message');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}
```

### 19. CTA Section

```tsx
import { CTASection } from '@becc/ui';

function CTAExample() {
  return (
    <CTASection
      title="Ready to Start Your Learning Journey?"
      description="Join thousands of students who have transformed their careers through our programs."
      primaryButton={{ label: 'Enroll Now', href: '/programs' }}
      secondaryButton={{ label: 'Learn More', href: '/about' }}
      backgroundImage="/images/cta-bg.jpg"
    />
  );
}
```

### 20. Scroll to Top

```tsx
import { ScrollToTop } from '@becc/ui';

function App() {
  return (
    <>
      {/* Your content */}
      <ScrollToTop threshold={100} />
    </>
  );
}
```

### 21. Preloader

```tsx
import { Preloader } from '@becc/ui';

function App() {
  return (
    <>
      <Preloader duration={1000} />
      {/* Your content */}
    </>
  );
}
```

## Complete Page Example

Here's a complete example of building the home page:

```tsx
// src/pages/Home.tsx
import {
  Header,
  Hero,
  FeatureCard,
  ProgramCard,
  ProgramItem,
  TestimonialCard,
  EventBanner,
  Footer,
  ScrollToTop
} from '@becc/ui';

export function HomePage() {
  return (
    <>
      <Header
        logo={{ src: '/logo.png', alt: 'BECC Academy' }}
        siteName="BECC Academy"
        navLinks={[
          { label: 'Home', href: '/', active: true },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Programs', href: '/programs' },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' }
        ]}
      />

      <main>
        <Hero
          title="Launching Futures Through Experiential Learning"
          description="BECC Academy delivers hands-on, project-based training."
          stats={[
            { value: '90%', label: 'Completion Rate' },
            { value: '5:1', label: 'Student-Tutor Ratio' },
            { value: '5+', label: 'Programs' }
          ]}
          primaryButton={{ label: 'Get Involved', href: '/programs' }}
          secondaryButton={{ label: 'Contact Us', href: '/contact' }}
          images={[
            '/images/hero-1.jpg',
            '/images/hero-2.jpg',
            '/images/hero-3.jpg',
            '/images/hero-4.jpg'
          ]}
        />

        {/* Feature Cards Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6">
              <FeatureCard
                icon="bi bi-people-fill"
                title="Think"
                description="We foster critical thinking and collaborative problem solving."
              />
              <FeatureCard
                icon="bi bi-laptop-fill"
                title="Learn"
                description="Practical, skill-focused courses in coding and design."
                active
              />
              <FeatureCard
                icon="bi bi-book-fill"
                title="Evolve"
                description="Continuous growth through project showcases."
              />
            </div>
          </div>
        </section>

        {/* Event Banner */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <EventBanner
              date={{ day: '22', month: 'NOV' }}
              title="Humble Data Workshop"
              description="Hands-on introduction to data analytics tools."
              buttonText="RSVP soon"
              countdown="Starts in 4 weeks"
            />
          </div>
        </section>
      </main>

      <Footer
        logo={{ src: '/logo.png', alt: 'BECC Academy' }}
        contact={{
          location: 'Accra, Ghana',
          phone: '+233 (0)20 123 3215',
          email: 'info@beccacademy.com'
        }}
        socialLinks={[
          { icon: 'bi bi-twitter-x', href: 'https://x.com/BECCAcademy', label: 'Twitter' },
          { icon: 'bi bi-instagram', href: 'https://www.instagram.com/beccacademy/', label: 'Instagram' }
        ]}
        sections={[
          {
            title: 'Useful Links',
            links: [
              { label: 'Home', href: '/' },
              { label: 'About us', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Programs', href: '/programs' }
            ]
          }
        ]}
        copyright={{ text: 'BECC Academy' }}
        credits={{ text: 'Ayiks Junior' }}
      />

      <ScrollToTop />
    </>
  );
}
```

## Styling

All components use Tailwind CSS and are already styled. Make sure you have:

1. Tailwind CSS configured in your project
2. Bootstrap Icons loaded (for icons)
3. AOS library loaded (for animations - optional)

## TypeScript Support

All components come with full TypeScript support. Import types as needed:

```tsx
import type { 
  HeaderProps, 
  NavLink, 
  FooterProps,
  HeroProps 
} from '@becc/ui';
```

## Tips

1. **Responsive**: All components are responsive by default
2. **Customizable**: Use the `className` prop to add custom styles
3. **Accessible**: Components follow WCAG accessibility guidelines
4. **Performance**: Components use lazy loading for images
5. **Animation**: Use `data-aos` attributes for scroll animations

## Need Help?

- Check the component's TypeScript interface for all available props
- Look at the HTML files in `becc-website-html` for reference
- Components are documented with JSDoc comments in the source code
