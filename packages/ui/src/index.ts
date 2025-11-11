// Shared UI components for BECC monorepo
export { Button } from './components/Button';

// Website Components
export { Header } from './website/Header';
export type { HeaderProps, NavLink } from './website/Header';

export { Footer } from './website/Footer';
export type { FooterProps, FooterSection, FooterLink, SocialLink } from './website/Footer';

export { Hero } from './website/Hero';
export type { HeroProps, HeroStat } from './website/Hero';

export { FeatureCard } from './website/FeatureCard';
export type { FeatureCardProps } from './website/FeatureCard';

export { ProgramCard, ProgramItem } from './website/ProgramCard';
export type { ProgramCardProps, ProgramItemProps } from './website/ProgramCard';

export { TestimonialCard } from './website/TestimonialCard';
export type { TestimonialCardProps } from './website/TestimonialCard';

export { ValueCard } from './website/ValueCard';
export type { ValueCardProps } from './website/ValueCard';

export { EventBanner } from './website/EventBanner';
export type { EventBannerProps } from './website/EventBanner';

export { PageTitle } from './website/PageTitle';
export type { PageTitleProps, Breadcrumb } from './website/PageTitle';

export { AboutSection } from './website/AboutSection';
export type { AboutSectionProps } from './website/AboutSection';

export { Timeline } from './website/Timeline';
export type { TimelineProps, TimelineItem } from './website/Timeline';

export { TeamCard } from './website/TeamCard';
export type { TeamCardProps } from './website/TeamCard';

export { MetricCard } from './website/MetricCard';
export type { MetricCardProps } from './website/MetricCard';

export { SectionTitle } from './website/SectionTitle';
export type { SectionTitleProps } from './website/SectionTitle';

export { ServiceCard } from './website/ServiceCard';
export type { ServiceCardProps } from './website/ServiceCard';

export { Gallery } from './website/Gallery';
export type { GalleryProps, GalleryImage } from './website/Gallery';

export { EventCard } from './website/EventCard';
export type { EventCardProps } from './website/EventCard';

export { ScrollToTop } from './website/ScrollToTop';
export type { ScrollToTopProps } from './website/ScrollToTop';

export { Preloader } from './website/Preloader';
export type { PreloaderProps } from './website/Preloader';

export { CTASection } from './website/CTASection';
export type { CTASectionProps } from './website/CTASection';

export { ContactForm } from './website/ContactForm';
export type { ContactFormProps, FormData } from './website/ContactForm';

export { OptimizedImage } from './website/OptimizedImage';
export type { IOptimizedImageProps } from './website/OptimizedImage';

export { LazyImage } from './website/LazyImage';
export type { ILazyImageProps } from './website/LazyImage';

// Utilities
export { cn } from './lib/utils';

// Styles
import './styles.css';
