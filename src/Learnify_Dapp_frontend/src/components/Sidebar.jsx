import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  GraduationCap,
  Trophy,
  Wallet2,
  PiggyBank,
  Users2,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', color: '#006d77' },
    { path: '/dashboard/learning', icon: GraduationCap, label: 'Learning', color: '#4361ee' },
    { path: '/dashboard/achievements', icon: Trophy, label: 'Achievements', color: '#ffd60a' },
    { path: '/dashboard/wallet', icon: Wallet2, label: 'Wallet', color: '#7209b7' },
    { path: '/dashboard/staking', icon: PiggyBank, label: 'Staking', color: '#2ec4b6' },
    { path: '/dashboard/community', icon: Users2, label: 'Community', color: '#f72585' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', color: '#3a0ca3' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings', color: '#4a4e69' },
  ];

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full">
        <motion.div 
          className="flex items-center justify-center h-16 border-b border-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
            Learnify
          </h1>
        </motion.div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm relative group ${
                    isActive 
                      ? 'text-[#006d77] bg-[#006d77]/5' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                        isActive ? `text-[${item.color}]` : 'text-gray-500 group-hover:text-[#006d77]'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#006d77] rounded-r"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.div 
          className="p-4 border-t border-gray-200"
          variants={itemVariants}
        >
          <motion.button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
} 