import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

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
    unlocked: false,
    rarity: 'Intermediate'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    description: 'Learn Bitcoin protocol fundamentals and Lightning Network',
    icon: '₿',
    category: 'Layer 1',
    unlocked: false,
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
  const navigate = useNavigate();

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

  const handleICPClick = () => {
    navigate('/dashboard/learning/icp-wheel');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blockchain Courses</h1>
      </div>

      <motion.div 
        className="grid grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {BLOCKCHAIN_COURSES.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.2 } 
            }}
            onClick={() => course.id === 'icp' && handleICPClick()}
            className={`relative p-6 rounded-2xl h-[280px] overflow-hidden
              ${course.unlocked 
                ? 'bg-white shadow-lg cursor-pointer' 
                : 'bg-gray-50/80 backdrop-blur-sm'
              }
              transition-all duration-300 group`}
          >
            {!course.unlocked && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm 
                  flex flex-col items-center justify-center gap-3 p-6
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Lock className="w-8 h-8 text-white" />
                <p className="text-white text-center text-sm">
                  Coming soon! This course is currently under development.
                </p>
              </motion.div>
            )}

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