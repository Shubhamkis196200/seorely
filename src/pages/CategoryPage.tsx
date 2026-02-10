import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategory, categories } from '../data';
import ArticleCard from '../components/ArticleCard';
import SEOHead from '../components/SEOHead';

export default function CategoryPage() {
  const { slug } = useParams();
  const cat = categories.find(c => c.slug === slug);
  const catArticles = getArticlesByCategory(slug || '');

  if (!cat) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <Link to="/" className="text-purple-600 hover:underline mt-4 inline-block">← Back to home</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={`${cat.name} — SEO Articles & Guides`} description={cat.description} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <Link to="/" className="text-sm text-gray-400 hover:text-purple-600">Home</Link>
          <span className="text-gray-300 mx-2">/</span>
          <span className="text-sm text-gray-600">{cat.name}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{cat.name}</h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">{cat.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catArticles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
        {catArticles.length === 0 && <p className="text-gray-400 text-center py-10">No articles in this category yet.</p>}
      </div>
    </>
  );
}
