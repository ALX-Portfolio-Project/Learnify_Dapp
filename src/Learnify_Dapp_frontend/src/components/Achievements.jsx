import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Flame, Star, Users, Target, Calendar, Filter, X, Lock, Search, Layers, GraduationCap, Check } from 'lucide-react';
import StreakCalendar from './StreakCalendar';
import Badges from './Badges';

// Add this tier configuration
const TIERS = [
  {
    name: "Crypto Novice",
    requiredTokens: 0,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: "🌱",
    description: "Starting your blockchain journey"
  },
  {
    name: "Web3 Explorer",
    requiredTokens: 50,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "🚀",
    description: "Exploring the decentralized world"
  },
  {
    name: "DeFi Alchemist",
    requiredTokens: 100,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: "⚗️",
    description: "Mastering decentralized finance"
  },
  {
    name: "Chain Architect",
    requiredTokens: 200,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: "🏗️",
    description: "Building the future of Web3"
  },
  {
    name: "Blockchain Sage",
    requiredTokens: 500,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icon: "🔮",
    description: "Ultimate crypto wisdom achieved"
  }
];

// Add this animation keyframe to your CSS or use framer-motion animate prop
const lockPulseAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Add this component for the Tier Modal
const TierModal = ({ isOpen, onClose, currentTokens }) => {
  if (!isOpen) return null;

  const getCurrentTier = () => {
    return TIERS.reduce((acc, tier) => {
      if (currentTokens >= tier.requiredTokens) return tier;
      return acc;
    }, TIERS[0]);
  };

  const getNextTier = () => {
    return TIERS.find(tier => tier.requiredTokens > currentTokens);
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progress = nextTier 
    ? ((currentTokens - currentTier.requiredTokens) / (nextTier.requiredTokens - currentTier.requiredTokens)) * 100
    : 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-sm relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="p-6 pb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">LEARNY Tiers</h3>
              <p className="text-sm text-gray-500">Earn 2 LEARNY tokens per active day</p>
            </div>

            {/* Current Progress */}
            <div className={`mx-6 mt-4 p-3 rounded-lg ${currentTier.bgColor} ${currentTier.borderColor} border`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentTier.icon}</span>
                  <div>
                    <span className={`font-medium ${currentTier.color}`}>{currentTier.name}</span>
                    <div className="text-xs text-gray-500">
                      Active for {Math.floor(currentTokens / 2)} days
                    </div>
                  </div>
                </div>
                <span className="font-medium text-gray-700">{currentTokens} LEARNY</span>
              </div>
              {nextTier && (
                <>
                  <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className={`h-full ${currentTier.bgColor} border ${currentTier.borderColor}`}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-500 text-right">
                    {Math.ceil((nextTier.requiredTokens - currentTokens) / 2)} days to next tier
                  </div>
                </>
              )}
            </div>

            {/* Tiers List */}
            <div className="p-6 pt-4 grid grid-cols-2 gap-3">
              {TIERS.map((tier, index) => {
                const isLocked = currentTokens < tier.requiredTokens;
                const daysRequired = Math.ceil(tier.requiredTokens / 2);
                const daysActive = Math.floor(currentTokens / 2);
                const daysForThisTier = isLocked 
                  ? daysRequired - daysActive 
                  : daysActive - (index > 0 ? Math.ceil(TIERS[index - 1].requiredTokens / 2) : 0);

                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-3 rounded-lg border ${
                      isLocked 
                        ? 'bg-gray-50 border-gray-100' 
                        : `${tier.bgColor} ${tier.borderColor}`
                    } group hover:scale-[1.02] transition-all duration-200`}
                  >
                    <div className="flex flex-col items-center text-center gap-1">
                      <div className="relative">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {tier.icon}
                        </span>
                        {isLocked && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="absolute -top-1 -right-1 bg-gray-900/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Lock className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium text-sm ${isLocked ? 'text-gray-400' : tier.color}`}>
                          {tier.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {tier.requiredTokens} LEARNY
                        </div>
                        <div className={`text-xs mt-1 ${
                          isLocked ? 'text-red-500' : 'text-green-500'
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                          {isLocked 
                            ? `${daysForThisTier} days needed` 
                            : `Active for ${daysForThisTier} days`
                          }
                        </div>
                      </div>
                    </div>
                    {isLocked && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        className="absolute inset-0 bg-gray-500 rounded-lg opacity-0 transition-opacity duration-200"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [showTierModal, setShowTierModal] = useState(false);
  const [tokens, setTokens] = useState(streakData.totalDays * 2); // 2 tokens per active day
  const [selectedCategories, setSelectedCategories] = useState([]);

  const FILTER_CATEGORIES = [
    { 
      id: 'all', 
      label: 'Show All', 
      icon: <Layers className="w-4 h-4" />,
      color: 'text-gray-600'
    },
    { 
      id: 'badges', 
      label: 'Badges', 
      icon: <Award className="w-4 h-4" />,
      color: 'text-yellow-600'
    },
    { 
      id: 'streaks', 
      label: 'Streaks', 
      icon: <Flame className="w-4 h-4" />,
      color: 'text-orange-600'
    },
    { 
      id: 'tokens', 
      label: 'Tokens', 
      icon: <Star className="w-4 h-4" />,
      color: 'text-purple-600'
    },
    { 
      id: 'learning', 
      label: 'Learning', 
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'text-blue-600'
    },
  ];

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

  // Calculate tokens whenever streakData changes
  useEffect(() => {
    setTokens(streakData.totalDays * 2);
  }, [streakData.totalDays]);

  // Add this effect to handle token updates
  useEffect(() => {
    const updateTokens = () => {
      const newTokens = streakData.totalDays * 2;
      setTokens(newTokens);
    };
    updateTokens();
  }, [streakData]);

  // Add this function to filter content based on categories and search
  const filterContent = () => {
    let visibleContent = {
      showBadges: true,
      showStreaks: true,
      showTokens: true,
      showLearning: true
    };

    if (selectedCategories.length > 0) {
      visibleContent = {
        showBadges: selectedCategories.includes('badges'),
        showStreaks: selectedCategories.includes('streaks'),
        showTokens: selectedCategories.includes('tokens'),
        showLearning: selectedCategories.includes('learning')
      };
    }

    return visibleContent;
  };

  // Use the filtered content in your render
  const visibleContent = filterContent();

  return (
    <AnimatePresence>
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
              className="relative flex items-center gap-3 z-[100]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl backdrop-blur-md bg-white/40 border-2 border-white/20
                  hover:border-yellow-500/50 cursor-pointer shadow-lg hover:shadow-xl 
                  transition-all duration-300"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-5 w-5 text-yellow-500" />
              </motion.button>
              
              <AnimatePresence>
              {isFilterOpen && (
                  <>
                    {/* Add overlay to handle clicks outside */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[90]"
                      onClick={() => setIsFilterOpen(false)}
                    />
                    
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-[220px] p-2 rounded-xl
                    bg-white/10 backdrop-blur-xl border border-white/20
                        shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[100]"
                    onClick={e => e.stopPropagation()}
                >
                  <div className="space-y-1">
                          {FILTER_CATEGORIES.map((category) => (
                            <motion.button
                              key={category.id}
                        whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                if (category.id === 'all') {
                                  setSelectedCategories([]);
                                } else {
                                  setSelectedCategories(prev => 
                                    prev.includes(category.id)
                                      ? prev.filter(id => id !== category.id)
                                      : [...prev, category.id]
                                  );
                                }
                              }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                ${selectedCategories.includes(category.id) || (category.id === 'all' && selectedCategories.length === 0)
                            ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                            : 'hover:bg-white/10 border border-transparent'
                                } transition-all duration-200`}
                            >
                        <div className={`${category.color} transition-colors duration-200
                          ${selectedCategories.includes(category.id) || (category.id === 'all' && selectedCategories.length === 0)
                            ? 'opacity-100'
                            : 'opacity-60'
                          }`}>
                          {category.icon}
                        </div>
                        <span className={`font-medium ${
                          selectedCategories.includes(category.id) || (category.id === 'all' && selectedCategories.length === 0)
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}>
                          {category.label}
                        </span>
                        {(selectedCategories.includes(category.id) || (category.id === 'all' && selectedCategories.length === 0)) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                            </motion.button>
                          ))}

                    {selectedCategories.length > 0 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                          onClick={() => setSelectedCategories([])}
                        className="w-full mt-1 px-3 py-2 text-xs text-gray-400 
                          hover:text-gray-300 flex items-center gap-2 rounded-lg
                          hover:bg-white/5 transition-all duration-200"
                      >
                        <X className="w-3 h-3" />
                        Clear filters
                      </motion.button>
                      )}
                    </div>
                </motion.div>
                  </>
              )}
              </AnimatePresence>
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
          {visibleContent.showStreaks && (
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
          )}

          {visibleContent.showTokens && (
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.2 } 
            }}
            onClick={() => setShowTierModal(true)}
            className="backdrop-blur-lg bg-white/30 rounded-2xl overflow-hidden 
              shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
              border border-white/20
              hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] 
              hover:border-purple-500/20
              transition-all duration-300
              cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">LEARNY Tokens</h3>
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
                <p className="text-4xl font-bold text-purple-500">{tokens}</p>
                <p className="text-sm text-gray-600">Click to view tiers</p>
              </motion.div>
            </div>
          </motion.div>
          )}

          {visibleContent.showLearning && (
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
          )}
        </motion.div>

        {visibleContent.showBadges && (
        <div className="space-y-6">
          <motion.h2 
            className="text-xl font-medium text-gray-900 flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
          >
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Earned Badges
          </motion.h2>
          <Badges searchQuery={searchQuery} />
        </div>
        )}

        {/* StreakCalendar component */}
        <AnimatePresence>
          {isStreakCalendarOpen && (
            <StreakCalendar 
              isOpen={isStreakCalendarOpen}
              onClose={() => setIsStreakCalendarOpen(false)}
              streakData={streakData}
              onStreakUpdate={handleStreakUpdate}
            />
          )}
          {showTierModal && (
            <TierModal 
              isOpen={showTierModal}
              onClose={() => setShowTierModal(false)}
              currentTokens={tokens}
            />
          )}
        </AnimatePresence>
    </motion.div>
    </AnimatePresence>
  );
} 