'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/providers/AuthProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { trpc } from '@/lib/trpc';
import { LogoBitVault } from '@/components/Logo';

export default function Home() {
  const { walletAddress } = useAuth();
  const { wallet } = useWallet();
  const helloQuery = trpc.general.hello.useQuery();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-grey/10">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-grey/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <LogoBitVault size="md" className="mr-3" />
                <h1 className="text-xl font-bold text-grey">BitVault</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-grey-light">
                  Connected: {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                </div>
                <WalletDisconnectButton className="!bg-grey !text-white !rounded-lg !px-4 !py-2 hover:!bg-grey-light !transition-colors" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-grey mb-4">
                Welcome to Your Trading Vault
              </h2>
              <p className="text-grey-light text-lg mb-6">
                Your wallet is successfully connected. Start managing your trading positions and investment vaults.
              </p>
              
              {/* Wallet Info Card */}
              <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  {wallet?.adapter.icon && (
                    <img 
                      src={wallet.adapter.icon} 
                      alt={wallet.adapter.name} 
                      className="w-8 h-8 mr-3"
                    />
                  )}
                  <span className="font-semibold text-grey">{wallet?.adapter.name}</span>
                </div>
                <div className="text-sm text-grey-light">
                  <p className="mb-2">Wallet Address:</p>
                  <p className="font-mono bg-white/50 rounded-lg p-2 break-all">
                    {walletAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-grey mb-4">API Connection Status</h3>
            <div className="bg-grey/5 rounded-lg p-4">
              {helloQuery.isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-3"></div>
                  <p className="text-grey-light">Connecting to API...</p>
                </div>
              ) : helloQuery.error ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <p className="text-red-600">API Error: {helloQuery.error.message}</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-green-600 font-medium">{helloQuery.data?.message}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-grey mb-2">Trading Dashboard</h3>
              <p className="text-grey-light mb-4">View and manage your trading positions</p>
              <button className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition-colors">
                View Trades
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-grey mb-2">Investment Vaults</h3>
              <p className="text-grey-light mb-4">Manage your investment vaults and returns</p>
              <button className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition-colors">
                View Vaults
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-grey mb-2">Analytics</h3>
              <p className="text-grey-light mb-4">Track performance and analytics</p>
              <button className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
