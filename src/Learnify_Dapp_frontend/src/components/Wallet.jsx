import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet as WalletIcon, Filter, Calendar } from 'lucide-react';

const WALLET_CARDS = [
  {
    id: 'plug',
    name: 'Plug Wallet',
    icon: '🔌',
    description: 'Your secure gateway to the Internet Computer ecosystem',
    category: 'ICP Native',
    chainId: 'icp',
    rarity: 'Recommended',
    installUrl: 'https://plugwallet.ooo/',
    connectHandler: async () => {
      try {
        const publicKey = await window.ic?.plug?.requestConnect({
          whitelist: ['YOUR_CANISTER_ID'],
          host: 'https://mainnet.dfinity.network'
        });
        return publicKey;
      } catch (err) {
        console.error('Plug connection error:', err);
        throw err;
      }
    }
  },
  {
    id: 'nfid',
    name: 'Internet Identity',
    icon: '🎭',
    description: 'Secure authentication for the Internet Computer',
    category: 'ICP Native',
    chainId: 'icp',
    rarity: 'Advanced',
    installUrl: 'https://identity.ic0.app/',
    connectHandler: async () => {
      window.open('https://identity.ic0.app/', 'NFID Login', 
        'width=600,height=700,left=200,top=100');
    }
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'The most popular Web3 wallet for ETH and ERC tokens',
    category: 'Multi-Chain',
    chainId: 'eth',
    rarity: 'Popular',
    installUrl: 'https://metamask.io/download/',
    connectHandler: async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          return accounts[0];
        }
        throw new Error('MetaMask not installed');
      } catch (err) {
        console.error('MetaMask connection error:', err);
        throw err;
      }
    }
  },
  {
    id: 'sui',
    name: 'Sui Wallet',
    icon: '🌊',
    description: 'Official wallet for the Sui blockchain',
    category: 'Sui Native',
    chainId: 'sui',
    rarity: 'Popular',
    installUrl: 'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil',
    connectHandler: async () => {
      try {
        if (window.suiWallet) {
          await window.suiWallet.connect();
          return await window.suiWallet.getAccounts();
        }
        throw new Error('Sui Wallet not installed');
      } catch (err) {
        console.error('Sui connection error:', err);
        throw err;
      }
    }
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: 'Your friendly Solana wallet for DeFi and NFTs',
    category: 'Solana',
    chainId: 'solana',
    rarity: 'Popular',
    installUrl: 'https://phantom.app/download',
    connectHandler: async () => {
      try {
        const provider = window.solana;
        if (provider?.isPhantom) {
          const response = await provider.connect();
          return response.publicKey.toString();
        }
        throw new Error('Phantom not installed');
      } catch (err) {
        console.error('Phantom connection error:', err);
        throw err;
      }
    }
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '🌈',
    description: 'The fun and simple way to start your Web3 journey',
    category: 'Multi-Chain',
    chainId: 'eth',
    rarity: 'Popular',
    installUrl: 'https://rainbow.me/',
    connectHandler: async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          return accounts[0];
        }
        throw new Error('Rainbow Wallet not installed');
      } catch (err) {
        console.error('Rainbow connection error:', err);
        throw err;
      }
    }
  }
];

const RARITY_COLORS = {
  Recommended: {
    bg: 'bg-white/20',
    text: 'text-purple-500',
  },
  Advanced: {
    bg: 'bg-white/20',
    text: 'text-blue-500',
  },
  Popular: {
    bg: 'bg-white/20',
    text: 'text-amber-500',
  }
};

export default function Wallet() {
  const [connectedWallets, setConnectedWallets] = useState({});
  const [walletBalances, setWalletBalances] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleWalletConnect = async (wallet) => {
    try {
      if (connectedWallets[wallet.id]) {
        return;
      }

      if (!window[wallet.id.toLowerCase()] && !window.ethereum) {
        window.open(wallet.installUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      const connection = await wallet.connectHandler();
      console.log(`Connected to ${wallet.name}:`, connection);
      setConnectedWallets(prev => ({
        ...prev,
        [wallet.id]: connection
      }));
      
      setWalletBalances(prev => ({
        ...prev,
        [wallet.id]: '1.234 ICP'
      }));
    } catch (error) {
      console.error(`Failed to connect to ${wallet.name}:`, error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Wallets</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-white/40 border-2 border-white/20
            hover:border-yellow-500/50 cursor-pointer shadow-lg hover:shadow-xl 
            transition-all duration-300"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <WalletIcon className="h-5 w-5 text-yellow-500" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90]"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-[220px] p-2 rounded-xl
                bg-white border border-gray-300 shadow-lg z-[100]"
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm text-gray-400">
                  Filter by Chain
                </div>
                {['All', 'ICP Native', 'Multi-Chain', 'Sui Native', 'Solana'].map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (category === 'All') {
                        setSelectedCategories([]);
                      } else {
                        setSelectedCategories(prev => 
                          prev.includes(category)
                            ? prev.filter(c => c !== category)
                            : [...prev, category]
                        );
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                      ${selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)
                        ? 'bg-white/20 border border-gray-300'
                        : 'hover:bg-gray-100 border border-transparent'
                      } transition-all duration-200`}
                  >
                    <span className={selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)
                      ? 'text-gray-800'
                      : 'text-gray-400'
                    }>
                      {category}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {WALLET_CARDS
          .filter(wallet => 
            selectedCategories.length === 0 || 
            selectedCategories.includes(wallet.category)
          )
          .map((wallet) => (
          <motion.div
            key={wallet.id}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.05,
              transition: { duration: 0.2 } 
            }}
            className={`relative p-6 rounded-2xl backdrop-blur-lg
              bg-white/30 border border-white/20 hover:border-yellow-500/20
              shadow-[0_8px_30px_rgb(0,0,0,0.12)]
              hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]
              transition-all duration-300`}
          >
            <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm">
              {wallet.category}
            </div>

    <motion.div
              className="text-4xl mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {wallet.icon}
            </motion.div>

            <h3 className="font-medium mb-1">{wallet.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{wallet.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm
                ${RARITY_COLORS[wallet.rarity].bg} ${RARITY_COLORS[wallet.rarity].text}`}
              >
                {wallet.rarity}
              </span>

              {connectedWallets[wallet.id] && (
                <span className="text-sm text-green-600 font-medium">
                  {walletBalances[wallet.id]}
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWalletConnect(wallet)}
              className={`w-full mt-4 py-1.5 px-4 rounded-full text-sm font-medium
                ${connectedWallets[wallet.id]
                  ? 'bg-white/10 text-green-500 border border-green-500/20 backdrop-blur-sm'
                  : 'bg-white/20 text-gray-800 hover:bg-white/30 backdrop-blur-sm border border-white/20'
                }
                transition-all duration-200 shadow-sm hover:shadow-md`}
            >
              {connectedWallets[wallet.id] ? (
                <span className="flex items-center justify-center gap-2">
                  Connected
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </span>
              ) : (
                'Connect Wallet'
              )}
            </motion.button>
          </motion.div>
        ))}
    </motion.div>
    </div>
  );
} 