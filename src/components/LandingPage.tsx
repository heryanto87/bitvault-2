'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LogoFull } from './Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-grey-dark flex flex-col">
      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* Left Side - Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          >
            {/* Logo - Mobile Only */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 flex justify-center lg:hidden"
            >
              <LogoFull size="xl" animated priority className="w-24 h-auto sm:w-32" />
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                BitVault
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/70 mb-8 lg:mb-12 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg lg:max-w-none"
            >
              Connect your Solana wallet to access professional trading tools and manage your investment portfolio with confidence.
            </motion.p>

            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 mb-8 lg:mb-12 text-sm sm:text-base"
            >
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Secure Authentication</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Professional Tools</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Portfolio Management</span>
              </div>
            </motion.div>

            {/* Connect Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <WalletMultiButton className="!bg-gradient-to-r !from-primary !to-primary-light !text-white !rounded-2xl !px-8 sm:!px-12 !py-3 sm:!py-4 !font-semibold !text-base sm:!text-lg hover:!from-primary-light hover:!to-primary !transition-all !duration-300 !shadow-lg hover:!shadow-primary/25 !w-full sm:!w-auto !border-0 !min-w-[200px]" style={{borderRadius: '1rem'}} />
              </motion.div>
            </motion.div>

            {/* Supported Wallets */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-xs sm:text-sm text-white/40 mt-6"
            >
              Supported: Phantom • Solflare • Torus
            </motion.p>
          </motion.div>

          {/* Right Side - Logo & Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex-1 hidden lg:flex items-center justify-center max-w-lg"
          >
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-full blur-3xl scale-150"></div>
              
              {/* Logo Container */}
              <div className="relative bg-grey-dark/50 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-primary/20">
                <LogoFull size="xl" animated priority className="w-48 lg:w-56 xl:w-64 h-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="flex justify-center items-center py-6 px-4 border-t border-white/10"
      >
        <p className="text-white/30 text-xs sm:text-sm text-center">
          Secure • Decentralized • Professional
        </p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;