import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen, Target, Coins, Activity, Trophy, Rocket } from 'lucide-react';

export default function Overview() {
  const [progress, setProgress] = useState(0);
  const [activeChallenges, setActiveChallenges] = useState(0);
  const [savingsProgress, setSavingsProgress] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Fetch user progress from the backend
    const fetchUserProgress = async () => {
      const response = await fetch('/api/user/progress');
      const data = await response.json();
      setProgress(data.learningProgress);
      setActiveChallenges(data.activeChallenges);
      setSavingsProgress(data.savingsProgress);
      setRecentActivity(data.recentActivity);
    };

    fetchUserProgress();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0.8, rotate: -5 },
    animate: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Bar */}
      <div className="mb-8 relative">
        <motion.div 
          className={`relative max-w-md mx-auto bg-white rounded-full shadow-md transition-all duration-300 ${
            isSearchFocused ? 'ring-2 ring-[#006d77]' : ''
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative flex items-center">
            <Search 
              className={`absolute left-3 w-5 h-5 transition-colors duration-200 ${
                isSearchFocused ? 'text-[#006d77]' : 'text-gray-400'
              }`}
            />
            <input
              type="text"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full py-2 pl-12 pr-12 text-sm rounded-full outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute right-3"
                onClick={clearSearch}
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </motion.button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 py-2 bg-white rounded-lg shadow-lg z-10"
            >
              {/* Example search results */}
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found for "{searchQuery}"
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-gray-500"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Learning Progress Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Learning Progress</h3>
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="p-2 bg-purple-100 rounded-full"
              >
                <BookOpen className="w-6 h-6 text-purple-600" />
              </motion.div>
            </div>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                      Course Progress
                    </span>
                  </motion.div>
                  <div className="text-right">
                    <motion.span 
                      className="text-xs font-semibold inline-block text-purple-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      {progress}%
                    </motion.span>
                  </div>
                </div>
                <motion.div 
                  className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Challenges Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Active Challenges</h3>
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="p-2 bg-yellow-100 rounded-full"
              >
                <Target className="w-6 h-6 text-yellow-600" />
              </motion.div>
            </div>
            <div className="mt-4">
              <motion.p 
                className="text-3xl font-bold text-yellow-500"
                whileHover={{ scale: 1.05 }}
              >
                {activeChallenges} Active
              </motion.p>
              <p className="text-sm text-gray-500">Ongoing challenges</p>
              <div className="mt-4 space-y-2">
                <motion.div 
                  className="flex items-center text-sm text-gray-600"
                  whileHover={{ x: 5 }}
                >
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Complete Daily Quiz</span>
                </motion.div>
                <motion.div 
                  className="flex items-center text-sm text-gray-600"
                  whileHover={{ x: 5 }}
                >
                  <Rocket className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Stake First Token</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Progress Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Savings Progress</h3>
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="p-2 bg-green-100 rounded-full"
              >
                <Coins className="w-6 h-6 text-green-600" />
              </motion.div>
            </div>
            <div className="mt-4">
              <motion.p 
                className="text-3xl font-bold text-green-500"
                whileHover={{ scale: 1.05 }}
              >
                {savingsProgress} Tokens
              </motion.p>
              <p className="text-sm text-gray-500">Total Savings</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="p-2 bg-blue-100 rounded-full"
              >
                <Activity className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>
            <ul className="mt-4 space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm text-gray-600"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  {activity}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 