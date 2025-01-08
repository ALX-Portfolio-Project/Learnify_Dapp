import React, { useState } from 'react';
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
  LogOut,
  ChevronLeft,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
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
    expanded: {
      width: "16rem",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    collapsed: {
      width: "5rem",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.div 
        className={`h-screen fixed left-0 top-0 z-20 shadow-lg
          ${isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'} 
          border-r`}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 border-b border-gray-200 dark:border-gray-700">
            <motion.div 
              className="flex items-center justify-between w-full px-4"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              {isExpanded && (
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Learnify
                </motion.h1>
              )}
              <motion.button
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
              >
                <ChevronLeft 
                  className={`w-5 h-5 transition-transform ${!isExpanded && 'rotate-180'} 
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                />
              </motion.button>
            </motion.div>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 relative group
                    ${isActive 
                      ? `${isDarkMode ? 'bg-gray-800' : 'bg-[#006d77]/5'} text-[#006d77]` 
                      : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`
                    }`}
                >
                  <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      className={`w-5 h-5 ${isExpanded ? 'mr-3' : 'mx-auto'} transition-colors duration-200
                        ${isActive ? `text-[${item.color}]` : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    {isExpanded && (
                      <motion.span 
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
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
              );
            })}
          </nav>

          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {/* Theme Toggle */}
            <motion.button
              className={`flex items-center w-full px-4 py-2 mb-2 text-sm rounded-lg
                ${isDarkMode 
                  ? 'text-gray-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 mr-3" />
              ) : (
                <Moon className="w-5 h-5 mr-3" />
              )}
              {isExpanded && <span className="font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>}
            </motion.button>

            {/* Logout Button */}
            <motion.button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-lg
                ${isDarkMode 
                  ? 'text-gray-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              {isExpanded && <span className="font-medium">Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
        }`}
        style={{ 
          marginLeft: isExpanded ? "16rem" : "5rem",
          transition: "margin-left 0.3s ease-in-out"
        }}
      >
        {/* Your main content goes here */}
      </div>
    </>
  );
} 