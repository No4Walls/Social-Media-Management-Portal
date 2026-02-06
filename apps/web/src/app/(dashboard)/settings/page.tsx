'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="flex gap-6">
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'profile', name: 'Profile' },
              { id: 'organization', name: 'Organization' },
              { id: 'team', name: 'Team Members' },
              { id: 'billing', name: 'Billing' },
              { id: 'notifications', name: 'Notifications' },
              { id: 'api', name: 'API & Webhooks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-200" />
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Change Avatar
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Organization Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input
                  type="text"
                  defaultValue="Acme Inc."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Timezone</label>
                <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                </select>
              </div>
              <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                  + Invite Member
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Owner' },
                  { name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
                  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
                ].map((member) => (
                  <div key={member.email} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {member.role}
                      </span>
                      <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Billing & Subscription</h2>
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary-900">Pro Plan</p>
                    <p className="text-sm text-primary-700">$99/month - Renews Feb 15, 2026</p>
                  </div>
                  <button className="rounded-lg border border-primary-300 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100">
                    Manage Plan
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Credits</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-2 flex-1 rounded-full bg-gray-100">
                    <div className="h-2 w-3/4 rounded-full bg-primary-500" />
                  </div>
                  <span className="text-sm text-gray-600">7,500 / 10,000 used</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
              {[
                { name: 'Email notifications', description: 'Receive email updates about your account' },
                { name: 'Push notifications', description: 'Receive push notifications in browser' },
                { name: 'Weekly reports', description: 'Receive weekly performance reports' },
              ].map((setting) => (
                <div key={setting.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{setting.name}</p>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">API & Webhooks</h2>
              <div>
                <h3 className="font-medium text-gray-900">API Key</h3>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="password"
                    value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                  />
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Webhooks</h3>
                  <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                    + Add Webhook
                  </button>
                </div>
                <div className="mt-2 rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">No webhooks configured</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
