import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { getGuides, categories } from '../data';
import SEOHead from '../components/SEOHead';

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <>
      <SEOHead title="SEO Guides — Comprehensive Learning Resources" description="In-depth SEO guides covering everything from beginner fundamentals to advanced technical optimization, link building, and local SEO." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">SEO Guides</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive, in-depth guides that cover everything you need to know about SEO. Each guide is a complete resource on its topic.</p>
        </div>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {guides.map(guide => {
            const cat = categories.find(c => c.id === guide.category);
            return (
              <Link key={guide.id} to={`/blog/${guide.slug}`} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                <div className="md:w-64 shrink-0 aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden bg-gray-100">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {cat && <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{cat.name}</span>}
                    <span className="text-xs text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full font-semibold">Guide</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{guide.readTime} min</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">{guide.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{guide.excerpt}</p>
                  <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">Read guide <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
