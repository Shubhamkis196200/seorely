import { useState } from 'react';
import { BarChart3, FileText, FolderOpen, Users, Wrench, Settings } from 'lucide-react';
import { articles, categories, authors, tools } from '../data';
import SEOHead from '../components/SEOHead';

const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'articles', name: 'Articles', icon: FileText },
  { id: 'categories', name: 'Categories', icon: FolderOpen },
  { id: 'authors', name: 'Authors', icon: Users },
  { id: 'tools', name: 'Tools', icon: Wrench },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <SEOHead title="Admin Panel" description="SEOrely admin panel" />
      <div className="flex min-h-[80vh]">
        <aside className="w-56 bg-gray-900 text-white p-4 shrink-0">
          <div className="flex items-center gap-2 mb-8 px-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <span className="font-bold">Admin</span>
          </div>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-gray-50">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Articles', value: articles.length, color: 'purple' },
                  { label: 'Categories', value: categories.length, color: 'teal' },
                  { label: 'Authors', value: authors.length, color: 'blue' },
                  { label: 'Tools', value: tools.length, color: 'amber' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h2>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {articles.slice(0, 10).map(a => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{a.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{categories.find(c => c.id === a.category)?.name}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${a.type === 'guide' ? 'bg-teal-50 text-teal-600' : 'bg-purple-50 text-purple-600'}`}>{a.type}</span></td>
                        <td className="px-4 py-3 text-sm text-gray-400">{a.publishDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
                <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">+ New Article</button>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Author</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {articles.map(a => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{a.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{a.author.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{categories.find(c => c.id === a.category)?.name}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-purple-600 hover:text-purple-700 font-medium mr-3">Edit</button>
                          <button className="text-xs text-red-500 hover:text-red-600 font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{c.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{c.count} articles</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'authors' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Authors</h1>
              <div className="space-y-4">
                {authors.map(a => (
                  <div key={a.id} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100">
                    <img src={a.avatar} alt={a.name} className="w-12 h-12 rounded-full bg-purple-100" />
                    <div>
                      <h3 className="font-bold text-gray-900">{a.name}</h3>
                      <p className="text-sm text-gray-500">{a.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Tools</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                    <p className="text-xs text-gray-400 mt-2">/{t.slug}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
              <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input defaultValue="SEOrely" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input defaultValue="Learn SEO the right way" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input defaultValue="hello@seorely.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">Save Settings</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
