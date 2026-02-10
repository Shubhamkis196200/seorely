import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import ToolCard from '../components/ToolCard';
import NewsletterSignup from '../components/NewsletterSignup';
import SEOHead from '../components/SEOHead';
import { articles, tools, categories } from '../data';

export default function Home() {
  const latestArticles = articles.slice(0, 6);
  return (
    <>
      <SEOHead title="Learn SEO — Free Guides, Tools & Tutorials" description="Master SEO with free comprehensive guides, tools, and tutorials. Learn keyword research, technical SEO, link building, and more." />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-teal-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" /> Updated for 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Master SEO with <span className="text-purple-600">Data-Driven</span> Strategies
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Free comprehensive guides, actionable tutorials, and powerful tools to help you rank higher in search results. Learn SEO the right way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/guides" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition">
                Start Learning SEO <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tools" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 font-semibold rounded-lg transition">
                Explore Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '15+', label: 'In-Depth Guides' },
              { num: '4', label: 'Free SEO Tools' },
              { num: '6', label: 'Categories' },
              { num: '10K+', label: 'Monthly Readers' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-purple-600">{s.num}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link to="/search" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Free SEO Tools</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Powerful tools to help you analyze, optimize, and improve your search performance — completely free.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map(t => <ToolCard key={t.id} tool={t} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-100">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">{cat.name}</h3>
                  <p className="text-sm text-gray-400">{cat.count} articles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
