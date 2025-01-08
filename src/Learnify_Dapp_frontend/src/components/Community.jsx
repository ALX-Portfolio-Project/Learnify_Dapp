import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Code, Book, Rocket, Target, Zap, Award } from 'lucide-react';

// Helper function to format PID
const formatPID = (pid) => {
  const start = pid.slice(0, 6);
  const end = pid.slice(-4);
  return `${start}...${end}`;
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const highestReputation = [
    { 
      id: 1, 
      name: 'Ido Shamun', 
      points: 124700,
      pid: '2vxsx-fae-etc...',
      verified: true,
      badge: '🏆',
      tags: ['Developer', 'Mentor'],
      icon: <Code className="w-4 h-4" />,
      streakHistory: '3 months',
      level: 'Expert'
    },
    { 
      id: 2, 
      name: 'Nimrod Kramer', 
      points: 95600,
      pid: '3bxsx-fae-etc...',
      verified: true,
      badge: '🥈',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '2 months',
      level: 'Advanced'
    },
    { 
      id: 3, 
      name: 'Bobby Iliev', 
      points: 48000,
      pid: '7vxsx-fae-etc...',
      verified: true,
      badge: '🥉',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '1 month',
      level: 'Advanced'
    },
    { 
      id: 4, 
      name: 'Randy', 
      points: 47200,
      pid: '8vxsx-fae-etc...',
      verified: true,
      badge: '✨',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '1 month',
      level: 'Advanced'
    },
    { 
      id: 5, 
      name: 'Ole-Martin', 
      points: 45600,
      pid: '9vxsx-fae-etc...',
      verified: true,
      badge: '✨',
      tags: ['Full Stack', 'DeFi'],
      icon: <Zap className="w-4 h-4" />,
      streakHistory: '24 weeks',
      level: 'Master'
    },
    { 
      id: 6, 
      name: 'Denis Bolkovskis', 
      points: 39600,
      pid: '1axsx-fae-etc...',
      verified: true,
      badge: '✨',
      tags: ['Developer', 'Mentor'],
      icon: <Code className="w-4 h-4" />,
      streakHistory: '1 month',
      level: 'Advanced'
    },
    { 
      id: 7, 
      name: 'Chris Bongers', 
      points: 39400,
      pid: '1bxsx-fae-etc...',
      verified: true,
      badge: '✨',
      tags: ['Developer', 'Mentor'],
      icon: <Code className="w-4 h-4" />,
      streakHistory: '1 month',
      level: 'Advanced'
    }
  ];

  const longestStreak = [
    { 
      id: 1, 
      name: 'Ole-Martin', 
      streak: 721,
      pid: '9vxsx-fae-etc...',
      verified: true,
      points: 45600,
      badge: '🔥',
      tags: ['Full Stack', 'DeFi'],
      icon: <Zap className="w-4 h-4" />,
      streakHistory: '24 weeks',
      level: 'Master'
    },
    { 
      id: 2, 
      name: 'Do Hoang Dinh Tien', 
      streak: 665,
      pid: '4vxsx-fae-etc...',
      verified: true,
      points: 38000,
      badge: '⚡',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '20 weeks',
      level: 'Advanced'
    },
    { 
      id: 3, 
      name: 'Dan', 
      streak: 662,
      pid: '5vxsx-fae-etc...',
      verified: true,
      points: 35000,
      badge: '⚡',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '18 weeks',
      level: 'Advanced'
    },
    { 
      id: 4, 
      name: 'Tam', 
      streak: 613,
      pid: '6vxsx-fae-etc...',
      verified: true,
      points: 32000,
      badge: '⚡',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '16 weeks',
      level: 'Advanced'
    },
    { 
      id: 5, 
      name: 'Ido Shamun', 
      streak: 559,
      pid: '2vxsx-fae-etc...',
      verified: true,
      points: 124700,
      badge: '⚡',
      tags: ['Developer', 'Mentor'],
      icon: <Code className="w-4 h-4" />,
      streakHistory: '14 weeks',
      level: 'Advanced'
    },
    { 
      id: 6, 
      name: 'Narciso Caldas', 
      streak: 492,
      pid: '7vxsx-fae-etc...',
      verified: true,
      points: 28000,
      badge: '⚡',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '12 weeks',
      level: 'Advanced'
    },
    { 
      id: 7, 
      name: 'Donald Nwokoro', 
      streak: 488,
      pid: '8vxsx-fae-etc...',
      verified: true,
      points: 27000,
      badge: '⚡',
      tags: ['Blockchain', 'ICP'],
      icon: <Rocket className="w-4 h-4" />,
      streakHistory: '10 weeks',
      level: 'Advanced'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {/* Highest Reputation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">Highest reputation</h2>
            </div>
            <div className="space-y-2">
              {highestReputation.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/60
                    hover:bg-white/80 transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className="text-xl">{user.badge}</span>
                        <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                          {user.icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{user.name}</span>
                          {user.verified && (
                            <motion.span
                              whileHover={{ scale: 1.2 }}
                              className="text-blue-500 text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                            {user.level}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">
                          {formatPID(user.pid)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {user.points.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {user.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {user.streakHistory}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Longest Streak */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
            className="col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">Longest streak</h2>
            </div>
            <div className="space-y-2">
              {longestStreak.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/60
                    hover:bg-white/80 transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className="text-xl">{user.badge}</span>
                        <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                          {user.icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{user.name}</span>
                          {user.verified && (
                            <motion.span
                              whileHover={{ scale: 1.2 }}
                              className="text-blue-500 text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                            {user.level}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">
                          {formatPID(user.pid)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">
                        {user.streak}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {user.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {user.streakHistory}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
    </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community; 