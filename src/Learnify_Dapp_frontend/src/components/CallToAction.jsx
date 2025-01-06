'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-b from-white to-[#e6f2f2] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-title text-[#062424]">Sign up for free today</h2>
          <p className="section-description mt-5 text-[#062424]/80">
            Join The Xero Community on all of our social media platforms @Xero For more information
          </p>
        </div>
        <div className="flex gap-6 mt-10 justify-center">
          <motion.button
            className="group relative px-8 py-3 bg-[#062424]/90 text-white rounded-xl font-medium overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.open('https://twitter.com/xerow_ai', '_blank', 'noopener,noreferrer')}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(6, 36, 36, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-windshield" />
            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300" style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            }} />
            <span className="relative z-10 flex items-center gap-2">
              Follow Us On X
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>

          <motion.button
            className="group relative px-8 py-3 bg-white/10 text-[#062424] rounded-xl font-medium overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(6, 36, 36, 0.1)',
              border: '1px solid rgba(6, 36, 36, 0.18)',
            }}
            onClick={() => window.open('https://t.me/xerow_ai', '_blank', 'noopener,noreferrer')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#062424]/5 to-transparent animate-windshield" />
            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300" style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            }} />
            <span className="relative z-10 flex items-center gap-2">
              Learn more
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
