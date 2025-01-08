import React from 'react';
import { motion } from 'framer-motion';

export default function Staking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900">Staking</h1>
      {/* Add your staking content here */}
    </motion.div>
  );
} 