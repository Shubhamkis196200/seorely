import { useState } from 'react';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { tools } from '../data';

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const filtered = search ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())) : tools;

  return (
    <>
      <SEOHead title="Free SEO Tools" description={`${tools.length} free SEO tools: meta tag checker, keyword density analyzer, SERP preview, schema generator, heading analyzer, and more.`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Free SEO Tools</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Analyze, optimize, and improve your search performance with our {tools.length} free tools. No signup required.</p>
          <div className="mt-6 max-w-md mx-auto">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
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
