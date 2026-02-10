import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Article } from '../types';
import { categories } from '../data';

export default function ArticleCard({ article }: { article: Article }) {
  const cat = categories.find(c => c.id === article.category);
  return (
    <Link to={`/blog/${article.slug}`} className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {cat && <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{cat.name}</span>}
          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min</span>
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  );
}
