import React from 'react';
import LandingPage from './components/Landingpage.jsx';
import Features from './components/Features.jsx';

const App = () => {
  return (
    <div className="min-h-screen">
      <LandingPage />
      <div className="bg-white">
        <Features />
      </div>
    </div>
  );
};

export default App;