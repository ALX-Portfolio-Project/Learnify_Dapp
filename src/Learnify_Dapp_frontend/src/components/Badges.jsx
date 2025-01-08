import React from 'react';
import { motion } from 'framer-motion';

const BADGES = [
  {
    id: 1,
    name: 'Early Adopter',
    description: 'Joined during platform launch',
    icon: '🌟',
    rarity: 'Rare',
    earned: true,
    category: 'Platform'
  },
  {
    id: 2,
    name: 'Quick Learner',
    description: 'Completed 5 lessons in a day',
    icon: '📚',
    rarity: 'Common',
    earned: true,
    category: 'Learning'
  },
  {
    id: 3,
    name: 'Staking Master',
    description: 'Successfully staked tokens for 30 days',
    icon: '💎',
    rarity: 'Epic',
    earned: false,
    category: 'DeFi'
  },
  {
    id: 4,
    name: 'Social Butterfly',
    description: 'Connected with 10 other learners',
    icon: '🦋',
    rarity: 'Common',
    earned: true,
    category: 'Social'
  },
  {
    id: 5,
    name: 'Perfect Week',
    description: 'Completed all daily tasks for 7 days',
    icon: '🎯',
    rarity: 'Rare',
    earned: true,
    category: 'Achievement'
  },
  {
    id: 6,
    name: 'NFT Explorer',
    description: 'Minted your first NFT',
    icon: '🎨',
    rarity: 'Epic',
    earned: false,
    category: 'NFT'
  },
  {
    id: 7,
    name: 'Smart Contract Wizard',
    description: 'Deployed your first smart contract',
    icon: '🧙‍♂️',
    rarity: 'Legendary',
    earned: false,
    category: 'Development'
  },
  {
    id: 8,
    name: 'DAO Participant',
    description: 'Participated in first governance vote',
    icon: '🏛️',
    rarity: 'Epic',
    earned: false,
    category: 'Governance'
  },
  {
    id: 9,
    name: 'Liquidity Provider',
    description: 'Added liquidity to a pool',
    icon: '💧',
    rarity: 'Rare',
    earned: false,
    category: 'DeFi'
  },
  {
    id: 10,
    name: 'Knowledge Sharer',
    description: 'Helped 5 other learners',
    icon: '🤝',
    rarity: 'Common',
    earned: true,
    category: 'Social'
  },
  {
    id: 11,
    name: 'Quiz Master',
    description: 'Scored 100% in 5 quizzes',
    icon: '🎓',
    rarity: 'Rare',
    earned: true,
    category: 'Learning'
  },
  {
    id: 12,
    name: 'DeFi Explorer',
    description: 'Used 3 different DeFi protocols',
    icon: '🔍',
    rarity: 'Epic',
    earned: false,
    category: 'DeFi'
  }
];

const RARITY_COLORS = {
  Common: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  Rare: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  Epic: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-700',
    border: 'border-yellow-200'
  },
  Legendary: {
    bg: 'bg-red-500/10',
    text: 'text-red-700',
    border: 'border-red-200'
  }
};

export default function Badges({ searchQuery = '' }) {
  const filteredBadges = BADGES.filter(badge => 
    badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    badge.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm">
            {badge.category}
          </div>
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
            ${RARITY_COLORS[badge.rarity].bg} ${RARITY_COLORS[badge.rarity].text}`}>
            {badge.rarity}
          </span>
          {!badge.earned && (
            <div className="absolute inset-0 bg-gray-900/5 rounded-2xl backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-gray-900/70 text-white text-xs px-3 py-1 rounded-full">
                Locked
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
} 