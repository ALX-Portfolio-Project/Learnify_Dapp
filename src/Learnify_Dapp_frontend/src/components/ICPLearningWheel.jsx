import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Wallet2, 
  Image as ImageIcon, 
  PiggyBank, 
  Code, 
  Blocks,
  ArrowRight,
  Star
} from 'lucide-react';

const ROADMAP_ITEMS = [
  {
    id: 1,
    title: 'Internet Identity',
    icon: <Shield className="w-6 h-6" />,
    description: 'Secure your crypto journey with decentralized authentication',
    status: 'current',
    reward: '100 XP',
    financeGoal: 'Foundation for secure crypto transactions'
  },
  {
    id: 2,
    title: 'ICP Wallets',
    icon: <Wallet2 className="w-6 h-6" />,
    description: 'Set up and secure your ICP wallet for DeFi operations',
    status: 'locked',
    reward: '150 XP',
    financeGoal: 'Manage and protect your digital assets'
  },
  {
    id: 3,
    title: 'NFT Creation',
    icon: <ImageIcon className="w-6 h-6" />,
    description: 'Create and trade NFTs for passive income generation',
    status: 'locked',
    reward: '200 XP',
    financeGoal: 'Explore NFT markets and revenue streams'
  },
  {
    id: 4,
    title: 'Staking & Neurons',
    icon: <PiggyBank className="w-6 h-6" />,
    description: 'Maximize returns through ICP staking strategies',
    status: 'locked',
    reward: '250 XP',
    financeGoal: 'Generate passive income through staking'
  },
  {
    id: 5,
    title: 'Smart Contracts',
    icon: <Code className="w-6 h-6" />,
    description: 'Build DeFi applications and automated trading systems',
    status: 'locked',
    reward: '300 XP',
    financeGoal: 'Create automated financial instruments'
  },
  {
    id: 6,
    title: 'Tokenomics',
    icon: <Blocks className="w-6 h-6" />,
    description: 'Master ICP economics for informed investment decisions',
    status: 'locked',
    reward: '350 XP',
    financeGoal: 'Make data-driven investment choices'
  }
];

const RoadmapPath = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            DeFi Mastery Path
          </h1>
          <p className="text-gray-600 text-sm">
            Master crypto finance through hands-on ICP development
          </p>
        </div>

        {/* Roadmap with Circle Connectors */}
        <div className="relative flex flex-col gap-8 px-4">
          {ROADMAP_ITEMS.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Connector Line */}
              {index < ROADMAP_ITEMS.length - 1 && (
                <div className="absolute left-[27px] top-16 w-0.5 h-24 bg-[#2ec4b6]/20" />
              )}
              
              <div className="flex items-start gap-4">
                {/* Circle Node */}
                <div className={`relative flex-shrink-0 w-14 h-14 rounded-full 
                  ${item.status === 'current' 
                    ? 'bg-[#2ec4b6]/10 border-2 border-[#2ec4b6]' 
                    : 'bg-gray-100 border-2 border-gray-200'
                  } flex items-center justify-center`}
                >
                  {/* Inner Circle */}
                  <div className={`w-3 h-3 rounded-full 
                    ${item.status === 'current' ? 'bg-[#2ec4b6]' : 'bg-gray-300'}`} 
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 p-4 rounded-xl ${
                    item.status === 'current'
                      ? 'bg-white shadow-lg cursor-pointer border border-[#2ec4b6]'
                      : 'bg-white/80 backdrop-blur-sm'
                  } transition-all duration-200
                    ${item.status === 'current' ? 'glow-card' : ''}`}
                  onClick={() => item.status === 'current' && setSelectedItem(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.status === 'current' ? 'bg-[#2ec4b6]/10' : 'bg-gray-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-[#2ec4b6]" />
                          <span className="text-[#2ec4b6] font-medium">
                            {item.reward}
                          </span>
                        </div>
                        {item.status === 'locked' && (
                          <span className="text-xs text-gray-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Item Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-8 max-w-lg w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#2ec4b6]/10 rounded-xl">
                    {selectedItem.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedItem.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {selectedItem.description}
                    </p>
                    <div className="text-sm text-[#2ec4b6] font-medium">
                      Goal: {selectedItem.financeGoal}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#2ec4b6] text-white rounded-xl
                    font-medium flex items-center justify-center gap-2"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .glow-card {
          box-shadow: 0 0 20px rgba(46, 196, 182, 0.2);
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(46, 196, 182, 0.2);
          }
          to {
            box-shadow: 0 0 20px rgba(46, 196, 182, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapPath; 