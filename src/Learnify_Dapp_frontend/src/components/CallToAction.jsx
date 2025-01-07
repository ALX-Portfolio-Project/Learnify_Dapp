'use client';

import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-5xl font-bold text-[#006d77] font-syne leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join the Movement<br/>
          for a Sustainable Future!
        </motion.h2>
        <motion.p
          className="mt-5 text-lg text-[#062424]/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Become part of the Learnyfi community and make a difference today!
        </motion.p>
      </div>
    </section>
  );
}
