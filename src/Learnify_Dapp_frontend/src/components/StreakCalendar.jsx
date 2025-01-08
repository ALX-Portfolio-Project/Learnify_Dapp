import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Shield,
  RotateCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="fixed top-8 right-8 z-[70]"
      >
        <motion.div
          className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-[240px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: [0.9, 1.1, 1],
                rotate: [-5, 5, 0]
              }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-3xl"
            >
              😢
            </motion.div>
            <h3 className="text-base font-medium text-gray-900 mb-1">Reset Streak?</h3>
            <p className="text-xs text-gray-500 text-center mb-3">
              This action cannot be undone
            </p>
            <div className="flex gap-2 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-500 
                  text-xs font-medium hover:bg-red-50 transition-all duration-200"
                onClick={onConfirm}
              >
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs 
                  font-medium hover:bg-gray-100 transition-all duration-200"
                onClick={onClose}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const FreezeConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="fixed top-8 right-8 z-[70]"
      >
        <motion.div
          className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-[240px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: [0.9, 1.1, 1],
                rotate: [-5, 5, 0]
              }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-3xl"
            >
              ❄️
            </motion.div>
            <h3 className="text-base font-medium text-gray-900 mb-1">Freeze Streak?</h3>
            <div className="flex items-center gap-1.5 mb-3 bg-blue-50 px-2 py-1 rounded-full">
              <span className="text-xs font-medium text-blue-600">Cost: </span>
              <span className="text-xs font-bold text-blue-700">10</span>
              <span className="text-xs text-blue-600">LEARNY</span>
            </div>
            <p className="text-xs text-gray-500 text-center mb-3">
              Protect today's streak from breaking
            </p>
            <div className="flex gap-2 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-500 
                  text-xs font-medium hover:bg-blue-50 transition-all duration-200
                  flex items-center justify-center gap-1"
                onClick={onConfirm}
              >
                <span>Freeze</span>
                <span className="text-[10px]">(-10)</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs 
                  font-medium hover:bg-gray-100 transition-all duration-200"
                onClick={onClose}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function StreakCalendar({ isOpen, onClose, streakData, onStreakUpdate }) {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isFrozen, setIsFrozen] = useState(false);
  const [streakHistory, setStreakHistory] = useState(() => {
    // Initialize with last 30 days of streak data
    const history = {};
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      history[date.toISOString().split('T')[0]] = Math.random() > 0.2; // 80% chance of streak
    }
    return history;
  });
  const [stats, setStats] = useState({
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    totalDays: streakData.lessonsCompleted
  });
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showFreezeConfirmation, setShowFreezeConfirmation] = useState(false);
  const [lastCheckedDate, setLastCheckedDate] = useState(new Date().toDateString());

  // Handle streak freeze
  const handleStreakFreeze = () => {
    if (!isFrozen) {
      setShowFreezeConfirmation(true);
    } else {
      setIsFrozen(false);
      toast.error('Streak protection removed');
    }
  };

  // Handle streak reset
  const handleStreakReset = () => {
    setShowResetConfirmation(true);
  };

  // Function to check if day has changed
  const checkDayChange = () => {
    const currentDate = new Date().toDateString();
    if (currentDate !== lastCheckedDate) {
      updateStreakForNewDay();
      setLastCheckedDate(currentDate);
    }
  };

  // Function to update streak for new day
  const updateStreakForNewDay = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString().split('T')[0];

    // If yesterday had a streak but today doesn't yet
    if (streakHistory[yesterday] && !streakHistory[today]) {
      if (!isFrozen) {
        // Break the streak if not frozen
        setStreakHistory(prev => ({
          ...prev,
          [today]: false
        }));
      } else {
        // Maintain streak if frozen and consume the freeze
        setStreakHistory(prev => ({
          ...prev,
          [today]: true
        }));
        setIsFrozen(false);
        toast.success('Freeze protection used! ❄️');
      }
      updateStreakStats();
    }
  };

  // Add interval to check for day change
  useEffect(() => {
    checkDayChange();
    const interval = setInterval(checkDayChange, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastCheckedDate, streakHistory, isFrozen]);

  // Update parent component when streak changes
  useEffect(() => {
    if (onStreakUpdate) {
      onStreakUpdate({
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        totalDays: stats.totalDays,
        isFrozen,
        streakHistory
      });
    }
  }, [stats, isFrozen, streakHistory]);

  // Calculate streak stats
  const updateStreakStats = () => {
    let current = 0;
    let longest = 0;
    let tempStreak = 0;
    let total = 0;

    // Sort dates in descending order
    const sortedDates = Object.entries(streakHistory)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));

    // Calculate streaks
    sortedDates.forEach(([date, hasStreak], index) => {
      if (hasStreak) {
        total++;
        tempStreak++;
        if (index === 0) current = tempStreak;
        longest = Math.max(longest, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    setStats({
      currentStreak: current,
      longestStreak: longest,
      totalDays: total
    });
  };

  useEffect(() => {
    updateStreakStats();
  }, [streakHistory]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === currentDate.toDateString();
      const hasStreak = streakHistory[dateStr];
      const isFutureDate = date > currentDate;

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          className={`h-12 flex items-center justify-center rounded-lg relative
            ${isToday ? 'bg-yellow-50 border-yellow-200' : ''}
            ${hasStreak ? 'bg-green-50' : 'bg-gray-50'}
            ${isFutureDate ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
            border transition-all duration-300
            ${isToday && isFrozen ? 'ring-2 ring-blue-300' : ''}
          `}
          onClick={() => {
            if (!isFutureDate && !isFrozen) {
              setStreakHistory(prev => ({
                ...prev,
                [dateStr]: !prev[dateStr]
              }));
            }
          }}
        >
          <span className={`
            ${isToday ? 'font-bold' : ''}
            ${isFutureDate ? 'text-gray-400' : 'text-gray-700'}
          `}>
            {day}
          </span>
          {hasStreak && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
          )}
          {isToday && isFrozen && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-blue-50/50 rounded-lg backdrop-blur-[1px]"
            >
              <motion.span
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-xl"
              >
                ❄️
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  const iceVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      filter: 'brightness(1)'
    },
    frozen: { 
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -10, 0],
      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const confirmFreeze = () => {
    const userTokens = 100; // This should come from your state/backend
    
    if (userTokens >= 10) {
      const today = new Date().toISOString().split('T')[0];
      const newStreakHistory = {
        ...streakHistory,
        [today]: true
      };

      setIsFrozen(true);
      setStreakHistory(newStreakHistory);
      updateStreakStats();

      // Notify parent component
      if (onStreakUpdate) {
        onStreakUpdate({
          ...stats,
          isFrozen: true,
          streakHistory: newStreakHistory
        });
      }

      toast.success('Streak protected for today! ❄️');
      setShowFreezeConfirmation(false);
    } else {
      toast.error('Not enough LEARNY tokens!');
      setShowFreezeConfirmation(false);
    }
  };

  const confirmReset = () => {
    const resetData = {
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0,
      isFrozen: false,
      streakHistory: {}
    };

    setStreakHistory({});
    setStats({
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0
    });
    setIsFrozen(false);

    // Notify parent component
    if (onStreakUpdate) {
      onStreakUpdate(resetData);
    }

    toast.success('Streak history has been reset');
    setShowResetConfirmation(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl
              shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-7 h-7 text-yellow-500" />
                <h2 className="text-2xl font-medium text-gray-900">Streak Calendar</h2>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStreakFreeze}
                  className={`p-2 rounded-xl transition-all duration-300 relative ${
                    isFrozen 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Freeze Streak"
                >
                  <motion.div
                    variants={iceVariants}
                    initial="initial"
                    animate={isFrozen ? "frozen" : "initial"}
                    className="relative"
                  >
                    <motion.div
                      className="absolute inset-0 opacity-50 blur-sm"
                      style={{ 
                        background: isFrozen ? 'radial-gradient(circle, #60A5FA 0%, transparent 70%)' : 'none'
                      }}
                    />
                    <span className="text-xl">❄️</span>
                  </motion.div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStreakReset}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                  title="Reset to Current Month"
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (selectedMonth === 0) {
                      setSelectedMonth(11);
                      setSelectedYear(selectedYear - 1);
                    } else {
                      setSelectedMonth(selectedMonth - 1);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-xl font-medium text-gray-900 min-w-[200px] text-center">
                  {months[selectedMonth]} {selectedYear}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (selectedMonth === 11) {
                      setSelectedMonth(0);
                      setSelectedYear(selectedYear + 1);
                    } else {
                      setSelectedMonth(selectedMonth + 1);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">Active Streak</span>
                </div>
                {isFrozen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50"
                  >
                    <motion.span
                      animate={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="text-lg"
                    >
                      ❄️
                    </motion.span>
                    <span className="text-sm text-blue-600">Streak Protected</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {generateCalendarDays()}
            </div>

            {/* Streak Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100
                  hover:bg-gray-100 transition-all duration-300"
              >
                <div className="text-sm text-gray-500 mb-1">Current Streak</div>
                <div className="text-2xl font-bold text-yellow-500">{stats.currentStreak} Days</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100
                  hover:bg-gray-100 transition-all duration-300"
              >
                <div className="text-sm text-gray-500 mb-1">Longest Streak</div>
                <div className="text-2xl font-bold text-green-500">{stats.longestStreak} Days</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100
                  hover:bg-gray-100 transition-all duration-300"
              >
                <div className="text-sm text-gray-500 mb-1">Total Active Days</div>
                <div className="text-2xl font-bold text-purple-500">{stats.totalDays} Days</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <ResetConfirmationModal 
        isOpen={showResetConfirmation}
        onClose={() => setShowResetConfirmation(false)}
        onConfirm={confirmReset}
      />
      <FreezeConfirmationModal 
        isOpen={showFreezeConfirmation}
        onClose={() => setShowFreezeConfirmation(false)}
        onConfirm={confirmFreeze}
      />
    </AnimatePresence>
  );
} 