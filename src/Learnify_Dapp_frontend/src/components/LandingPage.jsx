'use client'

import { ChevronDown, Play, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2533] to-[#1a1a3a]">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 py-6"
      >
        <span className="text-white text-2xl font-semibold cursor-pointer">
          Learnify
        </span>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Tutorials', 'Marketplace', 'Community', 'Dashboard'].map((item) => (
            <span key={item} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              {item}
            </span>
          ))}
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center">
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <button className="relative overflow-hidden group bg-white bg-opacity-10 backdrop-blur-lg text-white px-6 py-2 rounded-full font-medium transition-all hover:bg-opacity-20 border border-white/20">
          <span className="relative z-10">Connect Wallet</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div 
              variants={fadeIn}
              className="uppercase text-purple-400 tracking-wider text-sm font-medium"
            >
              CRYPTO EDUCATION PLATFORM
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Learn Crypto,<br />
              Earn Rewards.
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-gray-300 text-lg max-w-xl"
            >
              Master cryptocurrency fundamentals through interactive tutorials, gamified learning, 
              and hands-on practice. Set goals, earn rewards, and join a community of crypto enthusiasts 
              while building your financial future.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4"
            >
              <motion.button 
                className="relative overflow-hidden group bg-white bg-opacity-10 backdrop-blur-lg text-white px-6 py-2 rounded-md font-medium transition-all border border-white/20 flex items-center"
                style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ scale: 1.2 }} className="mr-2 h-5 w-5">
                  <Play />
                </motion.div>
                <span className="relative z-10">Start Learning</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              <motion.button 
                className="relative overflow-hidden group bg-white/5 backdrop-blur-lg text-white px-6 py-2 rounded-md font-medium transition-all hover:bg-opacity-10 border border-white/20 flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ scale: 1.2 }} className="mr-2 h-5 w-5">
                  <BookOpen />
                </motion.div>
                <span className="relative z-10">View Tutorials</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="flex items-center text-gray-400 pt-12"
            >
              <span className="mr-2">EXPLORE MORE</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative aspect-video"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg w-full h-[600px] object-cover"
            >
              <source src="/hero_video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 right-4 flex items-center space-x-4 backdrop-blur-md bg-black/20 p-3 rounded-lg">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((avatar) => (
                  <div
                    key={avatar}
                    className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden backdrop-blur-sm"
                  >
                    <img
                      src={`/avatar${avatar}.png`}
                      alt={`Community member ${avatar}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

