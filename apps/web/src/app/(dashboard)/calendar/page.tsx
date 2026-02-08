'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';

const scheduledPosts = [
  { id: 1, date: '2026-02-10', platform: 'instagram', time: '09:00', title: 'Product Launch' },
  { id: 2, date: '2026-02-10', platform: 'facebook', time: '14:00', title: 'Behind the Scenes' },
  { id: 3, date: '2026-02-12', platform: 'linkedin', time: '10:00', title: 'Industry Insights' },
  { id: 4, date: '2026-02-15', platform: 'twitter', time: '16:00', title: 'Quick Tips' },
  { id: 5, date: '2026-02-18', platform: 'tiktok', time: '12:00', title: 'Trending Challenge' },
];

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  twitter: 'bg-sky-500',
  tiktok: 'bg-black',
  youtube: 'bg-red-600',
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startPadding = monthStart.getDay();
  const paddedDays = Array(startPadding).fill(null).concat(days);

  const getPostsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return scheduledPosts.filter(post => post.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 text-sm font-medium ${view === 'month' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 text-sm font-medium ${view === 'week' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'}`}
            >
              Week
            </button>
          </div>
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
            + Schedule Post
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {paddedDays.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="min-h-[120px] border-b border-r border-gray-100 bg-gray-50" />;
            }

            const posts = getPostsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] border-b border-r border-gray-100 p-2 ${
                  !isCurrentMonth ? 'bg-gray-50' : ''
                }`}
              >
                <div className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                  isTodayDate ? 'bg-primary-600 text-white' : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {posts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-white ${platformColors[post.platform]}`}
                    >
                      <span className="truncate">{post.time}</span>
                    </div>
                  ))}
                  {posts.length > 3 && (
                    <div className="text-xs text-gray-500">+{posts.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Posts</h2>
        <div className="mt-4 space-y-3">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg ${platformColors[post.platform]} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white uppercase">{post.platform[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.title}</p>
                  <p className="text-sm text-gray-500">{post.date} at {post.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
