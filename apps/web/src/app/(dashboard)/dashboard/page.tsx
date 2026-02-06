'use client';

import { useState } from 'react';

const stats = [
  { name: 'Total Reach', value: '245.3K', change: '+12.5%', trend: 'up' },
  { name: 'Engagement', value: '18.2K', change: '+8.3%', trend: 'up' },
  { name: 'New Followers', value: '+2,340', change: '+5.2%', trend: 'up' },
  { name: 'Link Clicks', value: '3,421', change: '-2.1%', trend: 'down' },
];

const recentPosts = [
  { id: 1, platform: 'instagram', content: 'Summer collection is here! Shop now...', engagement: 1234, status: 'published', time: '2h ago' },
  { id: 2, platform: 'facebook', content: 'Behind the scenes of our latest shoot...', engagement: 856, status: 'published', time: '4h ago' },
  { id: 3, platform: 'linkedin', content: 'Excited to announce our new partnership...', engagement: 2341, status: 'scheduled', time: 'Tomorrow 9:00 AM' },
  { id: 4, platform: 'twitter', content: 'Quick tip: Always engage with your audience...', engagement: 567, status: 'draft', time: 'Draft' },
];

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  twitter: 'bg-sky-500',
  tiktok: 'bg-black',
  youtube: 'bg-red-600',
};

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
          <div className="mt-4 space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-4 rounded-lg border border-gray-100 p-4">
                <div className={`h-10 w-10 flex-shrink-0 rounded-lg ${platformColors[post.platform]} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white uppercase">{post.platform[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm text-gray-900">{post.content}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                    <span>{post.engagement.toLocaleString()} engagements</span>
                    <span className={`rounded-full px-2 py-0.5 ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' :
                      post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {post.status}
                    </span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Connected Accounts</h2>
          <div className="mt-4 space-y-3">
            {['instagram', 'facebook', 'linkedin', 'twitter', 'tiktok', 'youtube'].map((platform) => (
              <div key={platform} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg ${platformColors[platform]} flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white uppercase">{platform[0]}</span>
                  </div>
                  <span className="text-sm font-medium capitalize text-gray-900">{platform}</span>
                </div>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Alerts & Tasks</h2>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">2 Failed Posts</p>
              <p className="text-xs text-red-700">Requires attention</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-900">Token Expiring</p>
              <p className="text-xs text-yellow-700">Instagram in 3 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">3 Pending Approvals</p>
              <p className="text-xs text-blue-700">Review required</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">5 Tasks Assigned</p>
              <p className="text-xs text-gray-700">Due this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
