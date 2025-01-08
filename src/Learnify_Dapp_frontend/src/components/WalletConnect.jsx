import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, ExternalLink } from 'lucide-react';

const WALLET_OPTIONS = [
  {
    id: 'plug',
    name: 'Plug Wallet',
    icon: '🔌',
    description: 'Connect with Plug wallet for ICP',
    downloadUrl: 'https://plugwallet.ooo/',
    supported: true,
    primaryColor: 'bg-purple-500'
  },
  {
    id: 'stoic',
    name: 'Stoic Wallet',
    icon: '🌟',
    description: 'Web-based wallet for Internet Computer',
    downloadUrl: 'https://www.stoicwallet.com/',
    supported: true,
    primaryColor: 'bg-blue-500'
  },
  {
    id: 'infinity',
    name: 'Infinity Wallet',
    icon: '♾️',
    description: 'Multi-chain wallet supporting ICP',
    downloadUrl: 'https://infinityswap.one/',
    supported: true,
    primaryColor: 'bg-indigo-500'
  },
  {
    id: 'bitfinity',
    name: 'Bitfinity Wallet',
    icon: '🌐',
    description: 'Browser extension for ICP ecosystem',
    downloadUrl: 'https://bitfinity.network/',
    supported: true,
    primaryColor: 'bg-green-500'
  }
];

export default function WalletConnect({ isOpen, onClose, onWalletConnect }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);

  const handleWalletConnect = async (wallet) => {
    setSelectedWallet(wallet);
    setError(null);
    
    try {
      // Different connection logic based on wallet type
      switch (wallet.id) {
        case 'plug':
          const publicKey = await window.ic?.plug?.requestConnect({
            whitelist: ['YOUR_CANISTER_ID'],
            host: 'https://mainnet.dfinity.network'
          });
          if (publicKey) {
            const principalId = await window.ic.plug.agent.getPrincipal();
            onWalletConnect({
              wallet: wallet.id,
              principalId: principalId.toString(),
              publicKey
            });
            onClose();
          }
          break;
          
        case 'stoic':
          // Add Stoic wallet connection logic
          break;
          
        // Add other wallet connection logic
      }
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-lg p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Connect Wallet
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Wallet Options */}
            <div className="grid grid-cols-2 gap-4">
              {WALLET_OPTIONS.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border border-gray-100
                    ${selectedWallet?.id === wallet.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white hover:bg-gray-50'
                    }
                    transition-all duration-200 text-left group`}
                  onClick={() => handleWalletConnect(wallet)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {wallet.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={wallet.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-full
                      opacity-0 group-hover:opacity-100 
                      hover:bg-gray-100 transition-all duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-6 text-sm text-gray-500 text-center">
              New to Internet Computer? Learn more about{' '}
              <a 
                href="https://internetcomputer.org/docs/current/tokenomics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                ICP wallets
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 