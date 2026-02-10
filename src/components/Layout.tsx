import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BarChart3, BookOpen, Wrench, Info, Mail } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../data';

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">SEO<span className="text-purple-600">rely</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/guides" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Guides</Link>
              <div className="relative group">
                <button className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Categories</button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/category/${cat.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">{cat.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/tools" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Free Tools</Link>
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">About</Link>
              <Link to="/search" className="text-gray-400 hover:text-purple-600 transition"><Search className="w-5 h-5" /></Link>
            </nav>

            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
            <nav className="flex flex-col gap-3">
              <Link to="/guides" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600">Guides</Link>
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="text-sm text-gray-500 pl-4">{cat.name}</Link>
              ))}
              <Link to="/tools" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600">Free Tools</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600">About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600">Contact</Link>
              <Link to="/search" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600">Search</Link>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-7 h-7 text-purple-400" />
                <span className="text-lg font-bold text-white">SEO<span className="text-purple-400">rely</span></span>
              </Link>
              <p className="text-sm">Learn SEO the right way. Free guides, tools, and tutorials to help you rank higher in search results.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Learn</h4>
              <div className="flex flex-col gap-2">
                <Link to="/guides" className="text-sm hover:text-white transition">SEO Guides</Link>
                <Link to="/category/on-page-seo" className="text-sm hover:text-white transition">On-Page SEO</Link>
                <Link to="/category/technical-seo" className="text-sm hover:text-white transition">Technical SEO</Link>
                <Link to="/category/link-building" className="text-sm hover:text-white transition">Link Building</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tools</h4>
              <div className="flex flex-col gap-2">
                <Link to="/tools/meta-tag-checker" className="text-sm hover:text-white transition">Meta Tag Checker</Link>
                <Link to="/tools/keyword-density" className="text-sm hover:text-white transition">Keyword Density</Link>
                <Link to="/tools/serp-preview" className="text-sm hover:text-white transition">SERP Preview</Link>
                <Link to="/tools/robots-generator" className="text-sm hover:text-white transition">Robots.txt Generator</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <div className="flex flex-col gap-2">
                <Link to="/about" className="text-sm hover:text-white transition">About</Link>
                <Link to="/contact" className="text-sm hover:text-white transition">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} SEOrely. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
