'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  walletAddress: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { connected, publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for wallet connection check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value: AuthContextType = {
    isAuthenticated: connected,
    isLoading,
    walletAddress: publicKey?.toString() || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};