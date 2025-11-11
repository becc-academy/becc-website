import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CustomScrollbar } from '@becc/ui';

import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';

const App = () => {
  return (
    <>
      <CustomScrollbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
