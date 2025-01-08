'use client'

import { ChevronDown, Play, Wallet } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaCrown, FaCoins, FaStore, FaUsers, FaRocket, FaLeaf } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }


  return (
    <div className="h-screen relative">
      {/* Hero Section */}
      <div className="relative h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/hero_video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for text legibility covering the entire viewport */}
        <div className="absolute inset-0 bg-black opacity-80 z-10" />

        <div className="container mx-auto px-8 pt-20 pb-16 relative z-20">
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
                  The Future of Crypto Education
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                  className="text-yellow-400 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Learn Crypto,<br />
                  <span className="text-white">Understand Finance.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-300 text-lg max-w-xl"
              >
                  Learnify is a platform that helps you learn about finance and cryptocurrency through interactive tutorials, gamified learning.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                  className="flex flex-wrap gap-4"
                >
                  <Link to="/dashboard">
                    <motion.button 
                      className="relative overflow-hidden group bg-white bg-opacity-10 backdrop-blur-lg text-white px-3 py-1 rounded-md font-medium transition-all border border-white/20 flex items-center"
                      style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Launch Dapp
                    </motion.button>
                  </Link>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="flex items-center text-gray-400 pt-12"
              >
                <span className="mr-2">EXPLORE MORE</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

