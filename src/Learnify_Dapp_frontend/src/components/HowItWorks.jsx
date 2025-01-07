import { DollarSign, Zap, KeyRound, Smartphone, Settings, Rocket, Mail, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPiggyBank } from 'react-icons/fa';

export default function HowItWorks() {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="w-full min-h-screen bg-white p-3 md:p-6 lg:p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          The <motion.span 
            className="bg-[#FFD700] px-2"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            future
          </motion.span> of<br />
          your defi learning
        </h1>
      </div>
      <div className="p-5"> </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Rewards Card */}
        <div className="bg-white border rounded-2xl p-4 col-span-full md:col-span-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start space-x-4">
                <motion.div
                  className="p-3 bg-[#006d77] rounded-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <DollarSign className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        className="p-2 bg-white rounded-full"
                      >
                        <Zap className="w-4 h-4 text-[#006d77]" />
                      </motion.div>
                      <span>Rewards System</span>
                    </div>
                    <span className="bg-[#FFD700] px-3 py-1 rounded-full text-sm">Gamified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Piggy Bank with Falling Coins Animation */}
            <div className="relative flex items-center justify-center w-48">
              <motion.div
                className="cursor-pointer"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotateY: [-15, -20, -15]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
                  transformStyle: 'preserve-3d'
                }}
              >
                <FaPiggyBank className="w-32 h-32 text-[#006d77]" />
                
                {/* Continuously Falling Coins Animation */}
                <motion.div
                  className="absolute -top-4 -left-4"
                  initial={{ y: 0, opacity: 1, rotate: 0 }}
                  animate={{ 
                    y: 80, 
                    opacity: 0, 
                    rotate: 360,
                    x: -20 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#006d77]" />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 left-1/2"
                  initial={{ y: 0, opacity: 1, rotate: 0 }}
                  animate={{ 
                    y: 80, 
                    opacity: 0, 
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                    repeatDelay: 1
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#006d77]" />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  initial={{ y: 0, opacity: 1, rotate: 0 }}
                  animate={{ 
                    y: 80, 
                    opacity: 0, 
                    rotate: 360,
                    x: 20 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                    repeatDelay: 1
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <Coins className="w-5 h-5 text-[#006d77]" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-6">3 Steps to Learn</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <motion.div
                className="p-2 bg-white rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Settings className="w-4 h-4 text-[#006d77]" />
              </motion.div>
              <span>Choose Path</span>
            </li>
            <li className="flex items-center space-x-3">
              <motion.div
                className="p-2 bg-white rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Settings className="w-4 h-4 text-[#006d77]" />
              </motion.div>
              <span>Complete Tasks</span>
            </li>
            <li className="flex items-center space-x-3">
              <motion.div
                className="p-2 bg-white rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Rocket className="w-4 h-4 text-[#006d77]" />
              </motion.div>
              <span>Earn & Grow</span>
            </li>
          </ul>
        </div>

        {/* All-in-One Learning Card */}
        <div className="bg-[#006d77] text-white rounded-2xl p-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <Zap className="w-6 h-6 mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
          <p className="text-gray-400 text-sm">
            Access courses and challenges in one place.
          </p>
        </div>

        {/* Support Card */}
        <div className="bg-white border rounded-2xl p-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <KeyRound className="w-6 h-6 mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Join a community ready to help you succeed.
          </p>
        </div>

        {/* New Yellow Card */}
        <div className="bg-[#FFD700] rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-2">Your Learning Journey Awaits</h3>
          <p className="text-gray-600 text-sm mb-4">
            Dive into a world of knowledge and unlock your potential with our interactive platform.
          </p>
        </div>
      </div>
    </div>
  );
}
