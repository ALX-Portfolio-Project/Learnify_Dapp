import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { Settings as SettingsIcon } from 'lucide-react';

// Import dashboard pages
import Overview from './Overview';
import Learning from './Learning';
import Achievements from './Achievements';
import Wallet from './Wallet';
import Staking from './Staking';
import Community from './Community';
import Analytics from './Analytics';
import Settings from './Settings';
import ICPLearningWheel from './ICPLearningWheel';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="py-12 px-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/icp-wheel" element={<ICPLearningWheel />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
} 