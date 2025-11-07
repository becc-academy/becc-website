import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
