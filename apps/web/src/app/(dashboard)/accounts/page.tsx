'use client';

import { useState } from 'react';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: 'IG', color: 'bg-gradient-to-r from-purple-500 to-pink-500', connected: true, handle: '@mybrand', followers: '45.2K' },
  { id: 'facebook', name: 'Facebook', icon: 'FB', color: 'bg-blue-600', connected: true, handle: 'My Brand Page', followers: '32.1K' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'LI', color: 'bg-blue-700', connected: false, handle: null, followers: null },
  { id: 'twitter', name: 'X (Twitter)', icon: 'X', color: 'bg-black', connected: true, handle: '@mybrand', followers: '28.5K' },
  { id: 'tiktok', name: 'TikTok', icon: 'TT', color: 'bg-black', connected: false, handle: null, followers: null },
  { id: 'youtube', name: 'YouTube', icon: 'YT', color: 'bg-red-600', connected: false, handle: null, followers: null },
];

export default function AccountsPage() {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (platformId: string) => {
    setConnecting(platformId);
    setTimeout(() => setConnecting(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your social media account connections</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <div key={platform.id} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${platform.color}`}>
                <span className="text-lg font-bold text-white">{platform.icon}</span>
              </div>
              {platform.connected && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Connected
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{platform.name}</h3>
            {platform.connected ? (
              <>
                <p className="mt-1 text-sm text-gray-600">{platform.handle}</p>
                <p className="text-sm text-gray-500">{platform.followers} followers</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Refresh
                  </button>
                  <button className="flex-1 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mt-1 text-sm text-gray-500">Not connected</p>
                <button
                  onClick={() => handleConnect(platform.id)}
                  disabled={connecting === platform.id}
                  className="mt-4 w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {connecting === platform.id ? 'Connecting...' : 'Connect Account'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Account Health</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-900">Instagram</p>
                <p className="text-sm text-green-700">Token valid for 58 days</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-yellow-900">Facebook</p>
                <p className="text-sm text-yellow-700">Token expires in 3 days - Refresh recommended</p>
              </div>
            </div>
            <button className="rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-200">
              Refresh Now
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-900">X (Twitter)</p>
                <p className="text-sm text-green-700">Token valid for 89 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
