import { Button } from '@becc/ui';
import { ReactElement } from 'react';

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
