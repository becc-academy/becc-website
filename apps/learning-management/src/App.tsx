import { ReactElement } from 'react';

import { Button } from '@becc/ui';

const App = (): ReactElement => {
  return (
    <div className="app">
      <h1>BECC Learning Management System</h1>
      <p>Welcome to the Learning Management System</p>
      <Button variant="primary">Get Started</Button>
    </div>
  );
};

export default App;
