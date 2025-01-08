import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Staking = () => {
  const [stakingData, setStakingData] = useState([]);
  const [marketCapData, setMarketCapData] = useState([]);

  // Fetch data from ICPX API
  const fetchMarketData = async () => {
    try {
      const response = await axios.get('https://api.icpx.com/v1/market-data'); // Replace with actual ICPX API endpoint
      const marketData = response.data.map(data => ({
        time: data.timestamp, // Adjust based on actual data structure
        market_cap: data.market_cap,
        staking_amount: data.staking_amount, // Example field
      }));
      setMarketCapData(marketData);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Fetch new data every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900">Staking</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Market Cap Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketCapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="market_cap" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Staking; 