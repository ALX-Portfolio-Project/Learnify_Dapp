import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar } from 'lucide-react';

const BLOCKCHAIN_COURSES = [
  {
    id: 'icp',
    name: 'Internet Computer',
    description: 'Build decentralized applications that run on the Internet Computer blockchain',
    icon: '⚡',
    category: 'Layer 1',
    unlocked: true,
    rarity: 'Advanced'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    description: 'Master Solidity and Web3.js for Ethereum smart contract development',
    icon: '💎',
    category: 'Layer 1',
    unlocked: true,
    rarity: 'Intermediate'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    description: 'Learn Bitcoin protocol fundamentals and Lightning Network',
    icon: '₿',
    category: 'Layer 1',
    unlocked: true,
    rarity: 'Beginner'
  },
  {
    id: 'sui',
    name: 'Sui Network',
    description: 'Explore Move programming language and Sui blockchain development',
    icon: '🌊',
    category: 'Layer 1',
    unlocked: false,
    rarity: 'Advanced'
  },
  {
    id: 'sol',
    name: 'Solana',
    description: 'Build high-performance applications with Rust on Solana',
    icon: '🚀',
    category: 'Layer 1',
    unlocked: false,
    rarity: 'Advanced'
  },
  {
    id: 'pol',
    name: 'Polygon',
    description: 'Learn to build and deploy on Polygon scaling solutions',
    icon: '🔷',
    category: 'Layer 2',
    unlocked: false,
    rarity: 'Intermediate'
  }
];

const RARITY_COLORS = {
  Beginner: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  Intermediate: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  Advanced: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  }
};

export default function Learning() {
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="p-8">
      {/* Search and Header Section */}
      <div className="mb-8">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
    <motion.div
            className="relative flex-1 max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 
                bg-white/30 backdrop-blur-md border border-white/20 rounded-xl 
                focus:outline-none focus:border-blue-500/50 
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-2 py-2 bg-white/80 backdrop-blur-xl 
                    rounded-lg shadow-lg border border-white/20 z-10"
                >
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
              </motion.div>
        </div>
          
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Blockchain Courses</h1>
              <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Calendar className="h-4 w-4" />
            Last updated: {new Date().toLocaleDateString()}
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <motion.div 
        className="grid grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {BLOCKCHAIN_COURSES
          .filter(course => 
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className={`relative p-6 rounded-2xl h-[280px]
                ${course.unlocked 
                  ? 'bg-white shadow-lg' 
                  : 'bg-gray-50/80 backdrop-blur-sm'
                }
                transition-all duration-300`}
            >
              <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-gray-100">
                {course.category}
              </div>

              <div className="space-y-4">
                <span className="text-3xl block">
                  {course.icon}
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <span className={`inline-block text-sm px-3 py-1 rounded-full
                  ${RARITY_COLORS[course.rarity].bg} ${RARITY_COLORS[course.rarity].text}`}
                >
                  {course.rarity}
                </span>
              </div>
            </motion.div>
          ))}
    </motion.div>
    </div>
  );
} 