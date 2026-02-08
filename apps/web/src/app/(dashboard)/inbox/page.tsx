'use client';

import { useState } from 'react';

const conversations = [
  { id: 1, platform: 'instagram', user: '@johndoe', avatar: 'JD', message: 'Love your new collection! When will it be available?', time: '5m ago', unread: true, sentiment: 'positive' },
  { id: 2, platform: 'facebook', user: 'Jane Smith', avatar: 'JS', message: 'I have a question about my order #12345...', time: '15m ago', unread: true, sentiment: 'neutral' },
  { id: 3, platform: 'twitter', user: '@techfan', avatar: 'TF', message: 'This is disappointing. Expected better quality.', time: '1h ago', unread: false, sentiment: 'negative' },
  { id: 4, platform: 'linkedin', user: 'Mike Johnson', avatar: 'MJ', message: 'Great insights in your latest post!', time: '2h ago', unread: false, sentiment: 'positive' },
  { id: 5, platform: 'instagram', user: '@fashionista', avatar: 'FA', message: 'Can you share more details about the materials?', time: '3h ago', unread: false, sentiment: 'neutral' },
];

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  twitter: 'bg-sky-500',
};

const sentimentColors: Record<string, string> = {
  positive: 'bg-green-100 text-green-700',
  neutral: 'bg-gray-100 text-gray-700',
  negative: 'bg-red-100 text-red-700',
};

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [filter, setFilter] = useState('all');
  const [reply, setReply] = useState('');

  const filteredConversations = conversations.filter((c) => {
    if (filter === 'unread') return c.unread;
    if (filter === 'negative') return c.sentiment === 'negative';
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="w-96 flex-shrink-0 rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
            <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
              {conversations.filter((c) => c.unread).length} unread
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            {['all', 'unread', 'negative'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ${
                  filter === f ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full border-b border-gray-100 p-4 text-left transition-colors ${
                selectedConversation.id === conversation.id ? 'bg-primary-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                    {conversation.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${platformColors[conversation.platform]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                      {conversation.user}
                    </span>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className={`mt-1 truncate text-sm ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                    {conversation.message}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${sentimentColors[conversation.sentiment]}`}>
                    {conversation.sentiment}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
              {selectedConversation.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{selectedConversation.user}</p>
              <p className="text-sm text-gray-500 capitalize">{selectedConversation.platform}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-start">
            <div className="max-w-md rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-900">{selectedConversation.message}</p>
              <p className="mt-1 text-xs text-gray-500">{selectedConversation.time}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="mb-3 flex gap-2">
            <button className="rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100">
              AI Suggest Reply
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
              Saved Replies
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
