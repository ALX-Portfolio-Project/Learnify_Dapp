import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ChevronDown, LogOut } from 'lucide-react';

export default function WalletDropdown({ connectedWallets, onDisconnect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full
          bg-white/10 backdrop-blur-sm border border-white/20
          text-gray-800 hover:bg-white/20 transition-all duration-200"
      >
        <Wallet className="w-4 h-4" />
        <span>My Wallets</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 
          ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 rounded-xl
                bg-white/80 backdrop-blur-xl border border-white/20
                shadow-lg z-50 p-2"
            >
              {Object.entries(connectedWallets).length > 0 ? (
                Object.entries(connectedWallets).map(([id, address]) => (
                  <div
                    key={id}
                    className="p-3 rounded-lg hover:bg-white/50
                      transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {WALLET_CARDS.find(w => w.id === id)?.icon}
                        </span>
                        <div>
                          <div className="font-medium">
                            {WALLET_CARDS.find(w => w.id === id)?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {address.slice(0, 8)}...{address.slice(-6)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onDisconnect(id)}
                        className="p-1.5 rounded-full hover:bg-white/50
                          text-gray-400 hover:text-red-500
                          transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500 text-center">
                  No wallets connected
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 