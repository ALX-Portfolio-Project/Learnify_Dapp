'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGraduationCap, FaPiggyBank, FaWallet, FaGamepad, FaUsers, FaChartLine } from 'react-icons/fa'

export default function Features() {
  const [activeCard, setActiveCard] = useState(0)
  const [activeWord, setActiveWord] = useState(0)
  
  const titleWords = ["Empowering", "Elevating", "Enhancing", "Enriching"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 6)
    }, 2000)

    const wordInterval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % titleWords.length)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(wordInterval)
    }
  }, [])

  // Title animation
  const titleAnimation = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const wordAnimation = {
    initial: { 
      opacity: 0,
      y: 20,
      filter: 'blur(3px)'
    },
    animate: { 
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(3px)',
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  }

  // Subtle icon animation
  const iconAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const learnyfiFeatures = [
    {
      icon: <FaGraduationCap className="w-10 h-10 text-[#006d77]" />,
      title: 'Educational Modules',
      description: 'Learn crypto fundamentals, from wallet creation to staking, through engaging tutorials and challenges.'
    },
    {
      icon: <FaPiggyBank className="w-10 h-10 text-[#006d77]" />,
      title: 'Savings Goals',
      description: 'Set personalized crypto savings goals and track progress with blockchain-secured milestones.'
    },
    {
      icon: <FaWallet className="w-10 h-10 text-[#006d77]" />,
      title: 'Staking Simulator',
      description: 'Practice staking in a safe, simulated environment before engaging with real staking pools.'
    },
    {
      icon: <FaGamepad className="w-10 h-10 text-[#006d77]" />,
      title: 'Gamification',
      description: 'Earn badges and tokens for completing challenges, competing on leaderboards, and more.'
    },
    {
      icon: <FaUsers className="w-10 h-10 text-[#006d77]" />,
      title: 'Community Features',
      description: 'Connect with peers through mentorship, forums, and decentralized chats to share insights.'
    },
    {
      icon: <FaChartLine className="w-10 h-10 text-[#006d77]" />,
      title: 'Market Dashboard',
      description: 'Access real-time crypto analytics to stay informed and plan your investments effectively.'
    }
  ]

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">
        <div className="text-center">
          <motion.h2
            initial="initial"
            animate="animate"
            variants={titleAnimation}
            className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <div className="h-[1.2em] relative">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={titleWords[activeWord]}
                  className="text-yellow-400 block absolute w-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={wordAnimation}
                >
                  {titleWords[activeWord]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span 
              className="text-[#006d77] block mt-2"
              variants={wordAnimation}
            >
              Your Crypto Journey
            </motion.span>
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            initial="initial"
            animate="animate" 
            className="text-gray-500 mt-4"
          >
            Explore tools and tutorials designed to make cryptocurrency accessible for everyone.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {learnyfiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className={`p-8 rounded-3xl bg-white shadow-lg ${
                activeCard === index ? 'shadow-xl' : ''
              }`}
            >
              <motion.div
                initial="initial"
                animate="animate"
                variants={iconAnimation}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl text-[#003b5c] mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
