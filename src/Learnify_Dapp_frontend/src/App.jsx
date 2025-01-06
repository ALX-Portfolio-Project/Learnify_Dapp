import React from 'react';
import LandingPage from './components/Landingpage.jsx';
import Features from './components/Features.jsx';
import LearnyFi from './components/LearnyFi.jsx';
import CallToAction from './components/CallToAction.jsx';

const App = () => {
  return (
    <div className="min-h-screen">
      <LandingPage />
      <div className="bg-white">
        <LearnyFi />
        <Features />
        <CallToAction />
      </div>
     
      
    </div>
  );
};

export default App;