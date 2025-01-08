import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landingpage.jsx';
import Features from './components/Features.jsx';
import LearnyFi from './components/LearnyFi.jsx';
import CallToAction from './components/CallToAction.jsx';
import Footer from './components/Footer.jsx';
import HowItWorks from './components/Howitworks.jsx';
import Dashboard from './components/Dashboard.jsx';
import Achievements from './components/Achievements';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <div className="bg-white">
              <LandingPage />
              <HowItWorks />
              <Features />
              <CallToAction />
              <LearnyFi />
              <Footer />
            </div>
          } />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;