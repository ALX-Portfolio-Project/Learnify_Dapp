import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Lock, Trophy, Star, ChevronUp, Sparkles, Timer, Users, Zap, Search } from 'lucide-react';

export default function Learning() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Card color schemes
  const cardThemes = [
    {
      gradient: 'from-[#006d77] to-[#83c5be]',
      iconBg: 'bg-white/10',
    },
    {
      gradient: 'from-[#2a9d8f] to-[#264653]',
      iconBg: 'bg-white/10',
    },
    {
      gradient: 'from-[#e9c46a] to-[#f4a261]',
      iconBg: 'bg-white/10',
    }
  ];

  const generateGameData = (start, count) => {
    return Array.from({ length: count }, (_, i) => {
      const theme = cardThemes[Math.floor(Math.random() * cardThemes.length)];
      return {
        id: start + i,
        title: `Lesson ${start + i}`,
        gradient: theme.gradient,
        iconBg: theme.iconBg,
        difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
        rewards: Math.floor(Math.random() * 100) + 50,
        duration: Math.floor(Math.random() * 30) + 15,
        players: Math.floor(Math.random() * 1000) + 100,
        isLocked: Math.random() > 0.7,
        description: 'Master the fundamentals through interactive challenges.',
      };
    });
  };

  useEffect(() => {
    setGames(generateGameData(1, 10));
  }, []);

  const loadMoreGames = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newGames = generateGameData(games.length + 1, 5);
      setGames([...games, ...newGames]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !isLoading) {
      loadMoreGames();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 border-b">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="search"
              placeholder="Search lessons..."
              className="w-full bg-gray-100 rounded-full py-2.5 px-5 pl-12 text-gray-700 focus:outline-none"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        <div 
          className="relative overflow-y-auto hide-scrollbar py-4"
          onScroll={handleScroll}
        >
          <AnimatePresence mode="wait">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative h-32 rounded-xl overflow-hidden bg-gradient-to-r ${game.gradient} p-4 shadow-lg`}
                >
                  {/* Content */}
                  <div className="flex justify-between h-full">
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-white/90 flex items-center">
                            <Timer className="w-3 h-3 mr-1" />
                            {game.duration}min
                          </span>
                          <span className="text-xs text-white/90 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {game.players}
                          </span>
                          <span className="text-xs text-white/90">
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-white/90" />
                        <span className="text-sm text-white/90">{game.rewards} Tokens</span>
                      </div>
                    </div>

                    {/* Right side play button */}
                    <div className="flex items-center">
                      {game.isLocked ? (
                        <div className="p-3 bg-white/10 rounded-full">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white/10 rounded-full cursor-pointer"
                        >
                          <Play className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <div className="flex justify-center py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-3 border-[#006d77] border-t-transparent rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 