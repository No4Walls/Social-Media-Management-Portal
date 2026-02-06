'use client';

import { useState } from 'react';

const metrics = [
  { name: 'Total Reach', value: '245.3K', change: '+12.5%', trend: 'up' },
  { name: 'Engagement Rate', value: '4.8%', change: '+0.3%', trend: 'up' },
  { name: 'New Followers', value: '+2,340', change: '+5.2%', trend: 'up' },
  { name: 'Link Clicks', value: '3,421', change: '-2.1%', trend: 'down' },
];

const platformMetrics = [
  { platform: 'Instagram', reach: '98.2K', engagement: '5.2%', followers: '+892', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { platform: 'Facebook', reach: '67.1K', engagement: '3.8%', followers: '+456', color: 'bg-blue-600' },
  { platform: 'LinkedIn', reach: '45.3K', engagement: '6.1%', followers: '+623', color: 'bg-blue-700' },
  { platform: 'X (Twitter)', reach: '34.7K', engagement: '4.2%', followers: '+369', color: 'bg-black' },
];

const topPosts = [
  { id: 1, platform: 'Instagram', content: 'Summer collection launch...', reach: '45.2K', engagement: '3,421', date: 'Feb 5' },
  { id: 2, platform: 'LinkedIn', content: 'Industry insights report...', reach: '32.1K', engagement: '2,156', date: 'Feb 4' },
  { id: 3, platform: 'Facebook', content: 'Behind the scenes...', reach: '28.9K', engagement: '1,892', date: 'Feb 3' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">X (Twitter)</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-600">{metric.name}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
            <p className={`mt-1 text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change} vs previous period
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Engagement Trend</h2>
        <div className="mt-4 h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const height = 20 + Math.random() * 80;
            return (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary-500 transition-all hover:bg-primary-600"
                style={{ height: `${height}%` }}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Jan 7</span>
          <span>Jan 14</span>
          <span>Jan 21</span>
          <span>Jan 28</span>
          <span>Feb 6</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Platform Performance</h2>
          <div className="mt-4 space-y-4">
            {platformMetrics.map((platform) => (
              <div key={platform.platform} className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg ${platform.color} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">{platform.platform[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{platform.platform}</span>
                    <span className="text-sm text-gray-500">{platform.reach} reach</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${platform.color}`}
                      style={{ width: `${parseInt(platform.reach) / 1000}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Posts</h2>
          <div className="mt-4 space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{post.content}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                    <span>{post.platform}</span>
                    <span>{post.reach} reach</span>
                    <span>{post.engagement} engagements</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Best Posting Times</h2>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center">
              <p className="text-sm font-medium text-gray-600">{day}</p>
              <div className="mt-2 space-y-1">
                {['9AM', '12PM', '3PM', '6PM', '9PM'].map((time) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={time}
                      className="h-8 rounded"
                      style={{
                        backgroundColor: `rgba(14, 165, 233, ${intensity})`,
                      }}
                      title={`${day} ${time}: ${Math.round(intensity * 100)}% engagement`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-primary-100" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-primary-300" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-primary-500" />
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
