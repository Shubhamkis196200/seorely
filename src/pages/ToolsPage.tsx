import { useState } from 'react';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { tools } from '../data';

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'on-page', label: 'On-Page SEO' },
  { id: 'technical', label: 'Technical SEO' },
  { id: 'content', label: 'Content & Keywords' },
  { id: 'link-analytics', label: 'Links & Analytics' },
];

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = tools.filter(t => {
    if (cat !== 'all' && t.category !== cat) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <SEOHead title="50 Free SEO Tools — No Signup Required" description={`${tools.length} free SEO tools: meta tag generator, SERP preview, schema markup, keyword density, readability checker, and more. All run in your browser.`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">50 Free SEO Tools</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Analyze, optimize, and improve your search performance. All tools run 100% in your browser — no signup, no data sent to servers.</p>
          <div className="mt-6 max-w-md mx-auto">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${cat === c.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No tools match your search.</p>}
      </div>
    </>
  );
}
