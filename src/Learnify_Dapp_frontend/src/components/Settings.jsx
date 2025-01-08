import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Shield, Save, Loader, X } from 'lucide-react';

// Add predefined tags at the top
const PREDEFINED_TAGS = [
  { id: 1, label: 'ICP Developer' },
  { id: 2, label: 'Smart Contracts' },
  { id: 3, label: 'Web3' },
  { id: 4, label: 'DeFi' },
  { id: 5, label: 'NFTs' },
  { id: 6, label: 'Blockchain' },
  { id: 7, label: 'Motoko' },
  { id: 8, label: 'Rust' }
];

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    avatar: null,
    principalId: '',
    tags: [],
    bio: '',
    expertise: 'beginner'
  });

  const [newTag, setNewTag] = useState('');

  // Add file input ref
  const fileInputRef = React.useRef(null);

  const handleIIAuth = async () => {
    try {
      setIsLoading(true);
      
      // Create auth client
      const authClient = await import("@dfinity/auth-client").then(module => {
        return module.AuthClient.create();
      });

      // Start the login process
      await new Promise((resolve) => {
        authClient.login({
          identityProvider: "https://identity.ic0.app",
          onSuccess: resolve,
          onError: (error) => {
            console.error('Authentication error:', error);
            setIsLoading(false);
          }
        });
      });

      // Get the identity and principal
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toString();
      
      setProfile(prev => ({
        ...prev,
        principalId: principal
      }));

      // Store the authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('principalId', principal);
    } catch (error) {
      console.error('Internet Identity authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add useEffect to check for existing authentication
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const storedPrincipalId = localStorage.getItem('principalId');
      
      if (isAuthenticated && storedPrincipalId) {
        setProfile(prev => ({
          ...prev,
          principalId: storedPrincipalId
        }));
      }
    };

    checkAuth();
  }, []);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag && !profile.tags.includes(newTag)) {
      setProfile(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProfile(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      // Add your profile saving logic here
      console.log('Saving profile:', profile);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const renderTagsSection = () => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20"
    >
      <label className="block text-xs font-medium text-gray-500 mb-2">
        Expertise
      </label>
      
      {/* Predefined Tags */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Suggested tags:</div>
        <div className="flex flex-wrap gap-2">
          {PREDEFINED_TAGS.map((tag) => (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!profile.tags.includes(tag.label)) {
                  setProfile(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag.label]
                  }));
                }
              }}
              disabled={profile.tags.includes(tag.label)}
              className={`px-2 py-1 rounded-lg text-xs border transition-all
                ${profile.tags.includes(tag.label)
                  ? 'bg-[#2ec4b6]/20 text-[#2ec4b6] border-[#2ec4b6]/30'
                  : 'bg-white/40 text-gray-600 border-white/20 hover:bg-[#2ec4b6]/10 hover:text-[#2ec4b6] hover:border-[#2ec4b6]/20'
                }`}
            >
              {tag.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {profile.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#2ec4b6]/10 rounded-lg text-xs text-[#2ec4b6]
              flex items-center gap-1 border border-[#2ec4b6]/20"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-teal-800"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Custom Tag Input */}
      <form onSubmit={handleAddTag} className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/40 border border-white/20
            focus:outline-none focus:border-[#2ec4b6]/30"
          placeholder="Add custom expertise tag"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-[#2ec4b6]/10 text-[#2ec4b6] text-sm
            hover:bg-[#2ec4b6]/20 transition-colors border border-[#2ec4b6]/20"
        >
          Add
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
          {profile.principalId && (
            <div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-white/20
              text-xs text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2ec4b6]"></span>
              Connected: {profile.principalId.slice(0, 6)}...{profile.principalId.slice(-4)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Profile Picture & Basic Info */}
          <div className="col-span-1 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20"
            >
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Profile Picture */}
              <div className="relative mx-auto w-32 h-32 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center
                    cursor-pointer overflow-hidden"
                  onClick={triggerFileUpload}
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-indigo-300" />
                  )}
                </motion.div>
                <button 
                  onClick={triggerFileUpload}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-white/80 
                    backdrop-blur-sm border border-white/20 shadow-sm 
                    hover:bg-white/90 transition-colors"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Display Name Input */}
              <div className="relative">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg 
                    bg-white/40 border-2 border-gray-200
                    focus:border-indigo-500/30 focus:outline-none
                    text-center transition-all duration-200"
                  placeholder="Display Name"
                />
              </div>
            </motion.div>

            {/* Internet Identity Button */}
            {!profile.principalId ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleIIAuth}
                disabled={isLoading}
                className="w-full p-3 rounded-xl bg-[#2ec4b6]/10 text-[#2ec4b6]
                  border border-[#2ec4b6]/20 flex items-center justify-center gap-2 text-sm
                  hover:bg-[#2ec4b6]/20 transition-all"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                Connect Internet Identity
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-[#2ec4b6]/10 border border-[#2ec4b6]/20
                  flex items-center justify-center gap-2"
              >
                <div className="flex items-center gap-2 text-sm text-[#2ec4b6]">
                  <span className="w-2 h-2 rounded-full bg-[#2ec4b6]"></span>
                  Connected: {profile.principalId.slice(0, 6)}...{profile.principalId.slice(-4)}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Profile Details */}
          <div className="col-span-2 space-y-4">
            {/* Bio */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20"
            >
              <label className="block text-xs font-medium text-gray-500 mb-2">
                About
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/40 border border-white/20
                  focus:outline-none focus:border-blue-200 h-24 resize-none"
                placeholder="Tell us about yourself..."
              />
            </motion.div>

            {/* Tags */}
            {renderTagsSection()}

            {/* Save Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-[#2ec4b6]/10 text-[#2ec4b6] text-sm
                  hover:bg-[#2ec4b6]/20 transition-colors flex items-center gap-2
                  border border-[#2ec4b6]/20"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 