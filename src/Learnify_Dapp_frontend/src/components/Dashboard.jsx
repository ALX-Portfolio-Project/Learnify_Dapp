import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Learning from './Learning';
import Achievements from './Achievements';
import Wallet from './Wallet';
import Staking from './Staking';
import Community from './Community';
import Analytics from './Analytics';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
} 