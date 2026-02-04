import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CustomScrollbar } from '@becc/ui';

import NotFoundPage from '@/pages/404Page';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import EventDetailsPage from '@/pages/EventDetailsPage';
import EventsPage from '@/pages/EventsPage';
import HomePage from '@/pages/HomePage';
import ProgramsPage from '@/pages/ProgramsPage';
import ServicesPage from '@/pages/ServicesPage';

const App = (): JSX.Element => {
  return (
    <>
      <CustomScrollbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
// test
