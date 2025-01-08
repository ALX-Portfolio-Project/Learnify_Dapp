import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PiggyBank, 
  Clock, 
  TrendingUp, 
  Lock, 
  Unlock,
  Info,
  Calculator,
  AlertCircle,
  X
} from 'lucide-react';

const DISSOLVE_DELAY_OPTIONS = [
  { months: 6, apy: 14 },
  { months: 12, apy: 18 },
  { months: 18, apy: 22 },
  { months: 24, apy: 26 }
];

const SUPPORTED_TOKENS = [
  {
    id: 'icp',
    name: 'Internet Computer',
    symbol: 'ICP',
    icon: '⚡',
    minStake: 1,
    color: '#2ec4b6'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '💎',
    minStake: 0.1,
    color: '#627eea'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    icon: '🚀',
    minStake: 1,
    color: '#00FFA3'
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    icon: '🌊',
    minStake: 1,
    color: '#6fbcf0'
  },
  {
    id: 'dot',
    name: 'Polkadot',
    symbol: 'DOT',
    icon: '🔴',
    minStake: 1,
    color: '#E6007A'
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: '🟣',
    minStake: 1,
    color: '#8247E5'
  }
];

const Staking = () => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0]);
  const [selectedDelay, setSelectedDelay] = useState(DISSOLVE_DELAY_OPTIONS[0]);
  const [projectedRewards, setProjectedRewards] = useState({
    monthly: 0,
    yearly: 0,
    total: 0
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculate rewards based on amount and selected delay
  useEffect(() => {
    if (!amount) return;

    const principal = parseFloat(amount);
    const yearlyInterest = (principal * selectedDelay.apy) / 100;
    const monthlyInterest = yearlyInterest / 12;
    const totalReward = (yearlyInterest * selectedDelay.months) / 12;

    setProjectedRewards({
      monthly: monthlyInterest.toFixed(2),
      yearly: yearlyInterest.toFixed(2),
      total: totalReward.toFixed(2)
    });
  }, [amount, selectedDelay]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Staking Simulator
          </h1>
          <p className="text-gray-600 text-sm">
            Simulate staking rewards across multiple chains
          </p>
        </div>

        {/* Token Selection - Updated with glassmorphic design */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {SUPPORTED_TOKENS.map((token) => (
            <motion.button
              key={token.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedToken(token)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-md
                border transition-all duration-200 ${
                  selectedToken.id === token.id 
                    ? `bg-${token.color}/10 border-${token.color}/20 text-${token.color}`
                    : 'bg-white/30 border-white/20 text-gray-600 hover:bg-white/50'
                }`}
              style={{
                boxShadow: selectedToken.id === token.id 
                  ? `0 8px 32px ${token.color}10` 
                  : '0 8px 32px rgba(0, 0, 0, 0.05)'
              }}
            >
              <span className="text-lg">{token.icon}</span>
              <span className="font-medium text-sm">{token.symbol}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Staking Input */}
          <div className="space-y-4">
            <motion.div
              className="bg-white/70 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-[#2ec4b6]" />
                Stake Amount
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Amount to stake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200
                        focus:outline-none focus:border-[#2ec4b6] text-lg"
                      placeholder="0.00"
                      min={selectedToken.minStake}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {selectedToken.symbol}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Dissolve Delay
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {DISSOLVE_DELAY_OPTIONS.map((option) => (
                      <motion.button
                        key={option.months}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDelay(option)}
                        className={`p-3 rounded-xl text-sm font-medium
                          ${selectedDelay.months === option.months
                            ? 'bg-[#2ec4b6] text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {option.months} Months ({option.apy}% APY)
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Staking Info - Made more compact */}
            <motion.div
              className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#2ec4b6]" />
                Staking Information
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Minimum stake: {selectedToken.minStake} {selectedToken.symbol}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Rewards are earned daily
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Higher dissolve delay = Higher rewards
                </li>
                <li className="flex items-center gap-2">
                  <Unlock className="w-4 h-4" />
                  Early unstaking has penalties
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Rewards Projection - Made more compact */}
    <motion.div
            className="bg-white/70 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#2ec4b6]" />
              Projected Rewards
            </h2>

            {amount ? (
              <div className="space-y-4">
                {/* Reward Cards - Made more compact */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/50">
                    <div className="text-xs text-gray-600">Monthly</div>
                    <div className="text-lg font-bold text-[#2ec4b6]">
                      {projectedRewards.monthly} {selectedToken.symbol}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/50">
                    <div className="text-xs text-gray-600">Yearly</div>
                    <div className="text-lg font-bold text-[#2ec4b6]">
                      {projectedRewards.yearly} {selectedToken.symbol}
                    </div>
                  </div>
                </div>

                {/* Total Projection - Made more compact */}
                <div className="p-4 rounded-lg bg-[#2ec4b6]/5 border border-[#2ec4b6]/10">
                  <div className="text-xs text-gray-600">
                    Total ({selectedDelay.months} months)
                  </div>
                  <div className="text-2xl font-bold text-[#2ec4b6]">
                    {projectedRewards.total} {selectedToken.symbol}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Based on {selectedDelay.apy}% APY
                  </div>
                </div>

                {/* Stake Button - Updated with glassmorphic effect */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmation(true)}
                  className="w-full py-3 bg-[#2ec4b6]/90 backdrop-blur-md text-white rounded-xl 
                    font-medium text-sm flex items-center justify-center gap-2
                    border border-[#2ec4b6]/20 shadow-lg"
                  style={{
                    boxShadow: '0 8px 32px rgba(46, 196, 182, 0.2)'
                  }}
                >
                  <PiggyBank className="w-4 h-4" />
                  Stake Now
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                Enter an amount to see projected rewards
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#2ec4b6]/10 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-[#2ec4b6]" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Simulation Notice
                </h3>
                
                <p className="text-gray-600 text-sm mb-6">
                  This is a staking simulator for educational purposes. No real tokens are being staked or transferred.
                </p>

                <div className="flex gap-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium
                      hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Add any simulation logic here
                      setShowConfirmation(false);
                      // Show success message or additional feedback
                    }}
                    className="flex-1 px-4 py-2 rounded-xl bg-[#2ec4b6] text-white text-sm font-medium
                      hover:bg-[#2ec4b6]/90 transition-colors"
                  >
                    I Understand
                  </motion.button>
                </div>
              </div>
            </motion.div>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Staking; 