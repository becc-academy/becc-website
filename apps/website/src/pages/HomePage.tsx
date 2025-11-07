const HomePage = (): JSX.Element => {
  return (
    <div className="container">
      <h1>Welcome to BECC</h1>
      <p>Professional TypeScript React Vite Monorepo</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>✅ TypeScript with strict mode</li>
          <li>✅ React 18 with Vite</li>
          <li>✅ ESLint with professional rules</li>
          <li>✅ Prettier formatting</li>
          <li>✅ Conventional commits with Commitlint</li>
          <li>✅ Import sorting and @ aliases</li>
          <li>✅ Arrow functions enforced</li>
          <li>✅ camelCase naming convention</li>
          <li>✅ Monorepo with pnpm & Turbo</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
