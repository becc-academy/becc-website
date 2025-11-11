import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFoundPage from '@/pages/404Page';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import EventsPage from '@/pages/EventsPage';
import HomePage from '@/pages/HomePage';
import ProgramsPage from '@/pages/ProgramsPage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// test
