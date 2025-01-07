'use client';

import { FaBehance, FaDribbble, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed email:', email);
    setEmail(''); // Clear the email input after submission
  };

  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 mt-10 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Contact Title Section */}
          <motion.h2
            className="text-5xl md:text-6xl font-light mb-6 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            Contact us
          </motion.h2>

          {/* Newsletter Section */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-gray-800 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-md text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:shadow-xl hover:scale-105 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 mt-10">
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-medium">
              Learnyfi: Redefining Crypto-Finance Education
            </h4>
          
          </div>

          {/* Social Links with Motion and Yellow-Gold Glow */}
          <div className="flex items-center gap-6">
            {[
              { href: '#', Icon: FaBehance },
              { href: '#', Icon: FaDribbble },
              { href: '#', Icon: FaInstagram },
              { href: '#', Icon: FaLinkedin },
            ].map(({ href, Icon }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: index * 0.2, // Staggered motion for icons
                }}
              >
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  <Icon
                    className="h-6 w-6 transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                      color: '#FFD700', // Yellow-Gold Color
                    }}
                  />
                  <span className="sr-only">{Icon.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
