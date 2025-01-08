import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, Star, Users, Target, Calendar, Filter } from 'lucide-react';
import StreakCalendar from './StreakCalendar';

export default function Achievements() {
  // Sample data - In a real app, this would come from your backend
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: 'Early Adopter',
      description: 'Joined during platform launch',
      icon: '🌟',
      rarity: 'Rare',
      earned: true,
    },
    {
      id: 2,
      name: 'Quick Learner',
      description: 'Completed 5 lessons in a day',
      icon: '📚',
      rarity: 'Common',
      earned: true,
    },
    {
      id: 3,
      name: 'Staking Master',
      description: 'Successfully staked tokens for 30 days',
      icon: '💎',
      rarity: 'Epic',
      earned: false,
    },
    // Add more badges as needed
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'CryptoMaster', points: 1250, rank: 1 },
    { id: 2, name: 'BlockchainPro', points: 980, rank: 2 },
    { id: 3, name: 'TokenWizard', points: 875, rank: 3 },
    // Add more leaderboard entries
  ]);

  const [streakData, setStreakData] = useState({
    currentStreak: 15,
    longestStreak: 30,
    totalDays: 45,
    isFrozen: false,
    streakHistory: {}
  });

  const handleStreakUpdate = (newStreakData) => {
    setStreakData(newStreakData);
    // Here you can also persist the data to your backend
    // updateStreakDataInBackend(newStreakData);
  };

  // Add search/filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStreakCalendarOpen, setIsStreakCalendarOpen] = useState(false);

  // Add filtered badges computation
  const filteredBadges = badges.filter(badge => 
    badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enhanced motion variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="p-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.h1 
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Achievements
          </motion.h1>
          <motion.div 
            className="relative flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl backdrop-blur-md bg-white/40 border-2 border-white/20
                hover:border-yellow-500/50 cursor-pointer shadow-lg hover:shadow-xl 
                transition-all duration-300"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5 text-yellow-500" />
            </motion.div>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 top-12 w-[300px] p-4 rounded-xl
                  backdrop-blur-lg bg-white/40 border-2 border-white/20
                  shadow-lg"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter achievements..."
                  className="w-full px-4 py-2 rounded-lg 
                    bg-white/60 backdrop-blur-md border border-white/20
                    focus:outline-none focus:border-yellow-500/50
                    transition-all duration-300"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {/* Streak Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 } 
          }}
          onClick={() => setIsStreakCalendarOpen(true)}
          className="backdrop-blur-lg bg-white/30 rounded-2xl overflow-hidden 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            border border-white/20
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] 
            hover:border-orange-500/20
            transition-all duration-300
            cursor-pointer"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Current Streak</h3>
              <div className="p-2 bg-orange-500/10 rounded-full backdrop-blur-sm">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <motion.div 
              className="mt-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-4xl font-bold text-orange-500">{streakData.currentStreak} Days</p>
              <p className="text-sm text-gray-600">Longest: {streakData.longestStreak} days</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Points Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 } 
          }}
          className="backdrop-blur-lg bg-white/30 rounded-2xl overflow-hidden 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            border border-white/20
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] 
            hover:border-purple-500/20
            transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Total Points</h3>
              <div className="p-2 bg-purple-500/10 rounded-full backdrop-blur-sm">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <motion.div 
              className="mt-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-4xl font-bold text-purple-500">{streakData.totalDays}</p>
              <p className="text-sm text-gray-600">Rank #{streakData.rank} globally</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 } 
          }}
          className="backdrop-blur-lg bg-white/30 rounded-2xl overflow-hidden 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            border border-white/20
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] 
            hover:border-green-500/20
            transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Completion</h3>
              <div className="p-2 bg-green-500/10 rounded-full backdrop-blur-sm">
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <motion.div 
              className="mt-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-4xl font-bold text-green-500">{streakData.totalDays}</p>
              <p className="text-sm text-gray-600">Lessons completed</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Badges Section */}
      <div className="space-y-6">
        <motion.h2 
          className="text-xl font-medium text-gray-900 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Award className="w-6 h-6 mr-2 text-yellow-500" />
          Earned Badges {filteredBadges.length > 0 && `(${filteredBadges.length})`}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBadges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
              className={`relative p-6 rounded-2xl backdrop-blur-lg
                ${badge.earned 
                  ? 'bg-white/30 border border-white/20 hover:border-yellow-500/20' 
                  : 'bg-gray-100/30 border border-white/10 opacity-50'
                }
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]
                transition-all duration-300`}
            >
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {badge.icon}
              </motion.div>
              <h3 className="font-medium mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm
                ${badge.rarity === 'Rare' ? 'bg-purple-500/10 text-purple-700' :
                  badge.rarity === 'Epic' ? 'bg-yellow-500/10 text-yellow-700' :
                  'bg-blue-500/10 text-blue-700'
                }`}>
                {badge.rarity}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Leaderboard Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <motion.h2 
          className="text-xl font-medium text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Global Leaderboard
        </motion.h2>
        
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              whileHover={{ 
                x: 8, 
                scale: 1.01,
                transition: { duration: 0.2 } 
              }}
              className="flex items-center justify-between p-4 rounded-xl
                backdrop-blur-lg bg-white/30 border border-white/20
                hover:border-yellow-500/20 hover:bg-white/40
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]
                transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm
                  ${entry.rank === 1 ? 'bg-yellow-500/10 text-yellow-700' :
                    entry.rank === 2 ? 'bg-gray-500/10 text-gray-700' :
                    entry.rank === 3 ? 'bg-orange-500/10 text-orange-700' :
                    'bg-blue-500/10 text-blue-700'
                  }`}>
                  {entry.rank}
                </div>
                <span className="font-medium">{entry.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{entry.points}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* StreakCalendar component */}
      <StreakCalendar 
        isOpen={isStreakCalendarOpen}
        onClose={() => setIsStreakCalendarOpen(false)}
        streakData={streakData}
        onStreakUpdate={handleStreakUpdate}
      />
    </motion.div>
  );
} 