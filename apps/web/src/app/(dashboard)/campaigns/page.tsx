'use client';

import { useState } from 'react';

const campaigns = [
  { id: 1, name: 'Q1 Product Launch', status: 'active', posts: 24, reach: '156K', engagement: '12.4K', startDate: '2026-01-15', endDate: '2026-03-31', progress: 45 },
  { id: 2, name: 'Summer Collection', status: 'draft', posts: 8, reach: '-', engagement: '-', startDate: '2026-06-01', endDate: '2026-08-31', progress: 0 },
  { id: 3, name: 'Holiday Special', status: 'completed', posts: 32, reach: '289K', engagement: '24.1K', startDate: '2025-11-15', endDate: '2025-12-31', progress: 100 },
  { id: 4, name: 'Brand Awareness', status: 'active', posts: 18, reach: '98K', engagement: '8.2K', startDate: '2026-01-01', endDate: '2026-12-31', progress: 12 },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-yellow-100 text-yellow-700',
};

export default function CampaignsPage() {
  const [filter, setFilter] = useState('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          + Create Campaign
        </button>
      </div>

      <div className="flex gap-2">
        {['all', 'active', 'draft', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              filter === f ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {campaign.startDate} - {campaign.endDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Posts</p>
                <p className="text-xl font-semibold text-gray-900">{campaign.posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reach</p>
                <p className="text-xl font-semibold text-gray-900">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="text-xl font-semibold text-gray-900">{campaign.engagement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-primary-500"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{campaign.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
