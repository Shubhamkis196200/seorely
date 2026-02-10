import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, categories } from '../data';
import ArticleCard from '../components/ArticleCard';
import AuthorCard from '../components/AuthorCard';
import TOCSidebar from '../components/TOCSidebar';
import SEOHead from '../components/SEOHead';

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLang = '';
  let inList = false;
  let listItems: string[] = [];
  let listOrdered = false;

  const flushList = () => {
    if (listItems.length) {
      const Tag = listOrdered ? 'ol' : 'ul';
      elements.push(
        <Tag key={elements.length} className={`${listOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-4 space-y-2 text-gray-600`}>
          {listItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />)}
        </Tag>
      );
      listItems = [];
      inList = false;
    }
  };

  const inlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-purple-600 hover:underline">$1</a>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={elements.length} className="rounded-lg overflow-hidden my-4 bg-gray-900">
            <div className="px-4 py-2 bg-gray-800"><span className="text-xs text-gray-400">{codeLang}</span></div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-300"><code>{codeContent}</code></pre>
          </div>
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        flushList();
        codeLang = line.slice(3).trim() || 'text';
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line;
      continue;
    }

    if (line.trim() === '') {
      flushList();
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)/);
    const orderedMatch = line.match(/^\d+\.\s+(.+)/);
    if (listMatch) {
      if (!inList || listOrdered) { flushList(); inList = true; listOrdered = false; }
      listItems.push(listMatch[1]);
      continue;
    }
    if (orderedMatch) {
      if (!inList || !listOrdered) { flushList(); inList = true; listOrdered = true; }
      listItems.push(orderedMatch[1]);
      continue;
    }

    flushList();

    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);
    const h4Match = line.match(/^####\s+(.+)/);

    if (h2Match) {
      const id = h2Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(<h2 key={elements.length} id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{h2Match[1]}</h2>);
    } else if (h3Match) {
      const id = h3Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(<h3 key={elements.length} id={id} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{h3Match[1]}</h3>);
    } else if (h4Match) {
      elements.push(<h4 key={elements.length} className="text-lg font-semibold text-gray-900 mt-6 mb-2">{h4Match[1]}</h4>);
    } else {
      elements.push(<p key={elements.length} className="text-gray-600 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }} />);
    }
  }
  flushList();
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <Link to="/" className="text-purple-600 hover:underline">← Back to home</Link>
      </div>
    );
  }

  const related = getRelatedArticles(article);
  const cat = categories.find(c => c.id === article.category);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { '@type': 'Person', name: article.author.name },
    publisher: { '@type': 'Organization', name: 'SEOrely', logo: { '@type': 'ImageObject', url: '/logo.png' } },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
  };

  return (
    <>
      <SEOHead title={article.title} description={article.excerpt} image={article.image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-purple-600 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>

        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            {cat && <Link to={`/category/${cat.slug}`} className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{cat.name}</Link>}
            {article.type === 'guide' && <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Comprehensive Guide</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime} min read</span>
            <span>By {article.author.name}</span>
          </div>
        </div>

        <div className="aspect-[21/9] max-w-4xl rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex gap-10">
          <div className="flex-1 max-w-3xl">
            <div className="prose-custom">
              {renderMarkdown(article.content)}
            </div>

            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-gray-100">
              <span className="text-sm text-gray-400">Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition"><Twitter className="w-4 h-4" /></a>
              <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition"><Linkedin className="w-4 h-4" /></a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>

            <div className="mt-10">
              <AuthorCard author={article.author} />
            </div>
          </div>

          <aside className="hidden lg:block w-64 shrink-0">
            <TOCSidebar content={article.content} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
