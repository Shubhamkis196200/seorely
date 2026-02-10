import { useState } from 'react';
import { Search } from 'lucide-react';
import { searchArticles, articles } from '../data';
import ArticleCard from '../components/ArticleCard';
import SEOHead from '../components/SEOHead';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = query.length > 1 ? searchArticles(query) : articles;

  return (
    <>
      <SEOHead title="Search SEO Articles" description="Search our library of SEO guides, tutorials, and tools." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-black text-gray-900 text-center mb-6">Search Articles</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for SEO topics..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              autoFocus
            />
          </div>
          {query.length > 1 && <p className="text-sm text-gray-400 mt-3">{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      </div>
    </>
  );
}
