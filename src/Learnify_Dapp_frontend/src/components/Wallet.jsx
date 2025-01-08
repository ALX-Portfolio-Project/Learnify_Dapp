import React from 'react';
import { motion } from 'framer-motion';

export default function Wallet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
      {/* Add your wallet content here */}
    </motion.div>
  );
} 