import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Clock, RefreshCcw, X } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SUPPORTED_TOKENS = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A' },
  { id: 'ETH', name: 'Ethereum', icon: '💎', color: '#627EEA' },
  { id: 'ICP', name: 'Internet Computer', icon: '⚡', color: '#2ec4b6' },
  { id: 'SOL', name: 'Solana', icon: '🚀', color: '#00FFA3' },
  { id: 'SUI', name: 'Sui', icon: '🌊', color: '#6fbcf0' },
  { id: 'DOT', name: 'Polkadot', icon: '🔴', color: '#E6007A' },
  { id: 'AVAX', name: 'Avalanche', icon: '❄️', color: '#E84142' },
  { id: 'MATIC', name: 'Polygon', icon: '🟣', color: '#8247E5' },
  { id: 'ADA', name: 'Cardano', icon: '🔷', color: '#0033AD' }
];

const Analytics = () => {
  const [prices, setPrices] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [selectedToken, setSelectedToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrice = async (token) => {
    try {
      const response = await fetch(`https://api.coinbase.com/v2/prices/${token}-USD/spot`);
      const data = await response.json();
      return parseFloat(data.data.amount);
    } catch (error) {
      console.error(`Error fetching ${token} price:`, error);
      return null;
    }
  };

  const updatePrices = async () => {
    setIsLoading(true);
    const newPrices = {};
    for (const token of SUPPORTED_TOKENS) {
      const price = await fetchPrice(token.id);
      if (price) {
        newPrices[token.id] = price;
        setPriceHistory(prev => ({
          ...prev,
          [token.id]: [...(prev[token.id] || []).slice(-11), price]
        }));
      }
    }
    setPrices(newPrices);
    setIsLoading(false);
  };

  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: Array(12).fill('').map((_, i) => `-${(11-i)*30}s`),
    datasets: [
      {
        label: selectedToken ? selectedToken.name : 'Select a coin',
        data: selectedToken ? (priceHistory[selectedToken.id] || []) : [],
        borderColor: selectedToken?.color || '#2ec4b6',
        backgroundColor: selectedToken?.color || '#2ec4b6',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Live Market Data</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={updatePrices}
            className={`px-4 py-2 rounded-xl text-sm font-medium
              flex items-center gap-2 transition-all duration-200
              ${isLoading 
                ? 'bg-[#2ec4b6]/10 text-[#2ec4b6] border border-[#2ec4b6]/20' 
                : 'bg-white hover:bg-[#2ec4b6]/5 text-gray-600 border border-gray-200'
              }`}
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Updating...' : 'Refresh'}
          </motion.button>
        </div>

        {/* Coin Circles */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {SUPPORTED_TOKENS.map((token) => (
            <motion.div
              key={token.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedToken(token)}
              className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                transition-all ${
                  selectedToken?.id === token.id 
                    ? 'ring-2 ring-offset-2 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
              style={{
                backgroundColor: token.color,
                color: 'white',
                boxShadow: selectedToken?.id === token.id 
                  ? `0 0 15px ${token.color}40` 
                  : undefined
              }}
            >
              <div className="text-center">
                <div className="text-xl mb-0.5">{token.icon}</div>
                <div className="text-[10px] font-medium">
                  ${prices[token.id]?.toLocaleString() || '---'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedToken ? selectedToken.name : 'Select a coin to view price'}
              </h2>
              {selectedToken && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedToken(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Updates every 30s
            </div>
          </div>
          <div className="h-[400px]">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    padding: 12,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: {
                      size: 14
                    },
                    bodyFont: {
                      size: 13
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: {
                      color: 'rgba(0,0,0,0.05)'
                    },
                    title: {
                      display: true,
                      text: 'Price (USD)',
                      color: '#64748b',
                      font: {
                        size: 12,
                        weight: 500
                      },
                      padding: { bottom: 8 }
                    },
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`,
                      color: '#64748b',
                      font: {
                        size: 11
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: 'Time (Last 6 Minutes)',
                      color: '#64748b',
                      font: {
                        size: 12,
                        weight: 500
                      },
                      padding: { top: 8 }
                    },
                    ticks: {
                      color: '#64748b',
                      font: {
                        size: 11
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 