'use client';

import { motion } from 'framer-motion';

export default function LearnyFi() {
  return (
    <section className="bg-white py-12 relative overflow-hidden">
      {/* Floating Background Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute whitespace-nowrap text-[100px] font-bold text-[#062424]/5 font-syne capitalize"
          initial={{ x: '0%' }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          LEARNYFI  LEARNYFI  LEARNYFI  LEARNYFI
        </motion.div>
      </div>
    </section>
  );
} 