import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet2, 
  Shield, 
  Image as ImageIcon, 
  PiggyBank, 
  Code, 
  Blocks,
  ArrowRight
} from 'lucide-react';

const WALLET_OPTIONS = [
  {
    id: 'plug',
    name: 'Plug Wallet',
    icon: '🔌',
    description: 'Your secure gateway to the Internet Computer ecosystem',
    category: 'ICP Native',
    status: 'Recommended'
  },
  {
    id: 'nfid',
    name: 'NFID',
    icon: '🎭',
    description: 'Next-gen blockchain identity for seamless cross-chain authentication',
    category: 'ICP Native',
    status: 'Advanced'
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'The most popular Web3 wallet for ETH and ERC tokens',
    category: 'Multi-Chain',
    status: 'Popular'
  },
  {
    id: 'sui',
    name: 'Sui Wallet',
    icon: '🌊',
    description: 'Official wallet for the Sui blockchain',
    category: 'Sui Native',
    status: 'Popular'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: 'Your friendly Solana wallet for DeFi and NFTs',
    category: 'Solana',
    status: 'Popular'
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '🌈',
    description: 'The fun and simple way to start your Web3 journey',
    category: 'Multi-Chain',
    status: 'Popular'
  }
];

const STATUS_COLORS = {
  'Recommended': 'text-purple-600 bg-purple-50',
  'Advanced': 'text-blue-600 bg-blue-50',
  'Popular': 'text-amber-600 bg-amber-50'
};

export default function Wallet() {
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connect Wallet</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {WALLET_OPTIONS.map((wallet) => (
          <motion.div
            key={wallet.id}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative p-6 rounded-2xl bg-white shadow-lg cursor-pointer"
            onClick={() => setSelectedWallet(wallet)}
          >
            <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-gray-100">
              {wallet.category}
            </div>

            <div className="space-y-4">
              <span className="text-3xl block">
                {wallet.icon}
              </span>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {wallet.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {wallet.description}
                </p>
              </div>

              <span className={`inline-block text-sm px-3 py-1 rounded-full ${STATUS_COLORS[wallet.status]}`}>
                {wallet.status}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-2 bg-white border border-gray-200 rounded-lg
                text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Connect Wallet
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 