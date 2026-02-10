import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../data';
import SEOHead from '../components/SEOHead';

function MetaTagChecker() {
  const [url, setUrl] = useState('https://example.com/page');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Page URL</label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your page title..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{title.length}/60 characters</span>
          {title.length > 0 && title.length <= 60 && <span className="text-xs text-green-500">✓ Good length</span>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Enter your meta description..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${desc.length > 155 ? 'text-red-500' : 'text-gray-400'}`}>{desc.length}/155 characters</span>
          {desc.length >= 120 && desc.length <= 155 && <span className="text-xs text-green-500">✓ Perfect length</span>}
        </div>
      </div>
      {(title || desc) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400 mb-3">SERP Preview</h4>
          <div className="text-blue-700 text-lg font-medium hover:underline cursor-pointer truncate">{title || 'Your Page Title'}</div>
          <div className="text-green-700 text-sm">{url || 'https://example.com/page'}</div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{desc || 'Your meta description will appear here.'}</div>
        </div>
      )}
    </div>
  );
}

function KeywordDensity() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const keywordCount = keyword ? (text.toLowerCase().match(new RegExp(keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length : 0;
  const density = wordCount > 0 && keyword ? ((keywordCount / wordCount) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Content</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content here..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
        <span className="text-xs text-gray-400">{wordCount} words</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Keyword</label>
        <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Enter keyword..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      {keyword && wordCount > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{density}%</div>
            <div className="text-xs text-gray-500">Density</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{keywordCount}</div>
            <div className="text-xs text-gray-500">Occurrences</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{wordCount}</div>
            <div className="text-xs text-gray-500">Total Words</div>
          </div>
        </div>
      )}
    </div>
  );
}

function SERPPreview() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Meta description" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
      </div>
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-medium text-gray-400 mb-4">Google Search Preview</h4>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">{url || 'https://example.com'} › page</div>
          <div className="text-xl text-blue-800 font-medium hover:underline cursor-pointer">{title || 'Your Page Title Here'}</div>
          <div className="text-sm text-gray-600 leading-relaxed">{desc || 'Your meta description will appear here. Write something compelling to encourage clicks.'}</div>
        </div>
      </div>
    </div>
  );
}

function RobotsGenerator() {
  const [userAgent, setUserAgent] = useState('*');
  const [disallow, setDisallow] = useState('/admin/\n/private/');
  const [allow, setAllow] = useState('/');
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');

  const output = `User-agent: ${userAgent}\n${allow.split('\n').filter(Boolean).map(a => `Allow: ${a}`).join('\n')}\n${disallow.split('\n').filter(Boolean).map(d => `Disallow: ${d}`).join('\n')}\n\nSitemap: ${sitemap}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User-agent</label>
          <input value={userAgent} onChange={e => setUserAgent(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap URL</label>
          <input value={sitemap} onChange={e => setSitemap(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Allow (one per line)</label>
          <textarea value={allow} onChange={e => setAllow(e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disallow (one per line)</label>
          <textarea value={disallow} onChange={e => setDisallow(e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Generated robots.txt</h4>
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{output}</pre>
        </div>
        <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">Copy to clipboard</button>
      </div>
    </div>
  );
}

const toolComponents: Record<string, React.FC> = {
  'meta-tag-checker': MetaTagChecker,
  'keyword-density': KeywordDensity,
  'serp-preview': SERPPreview,
  'robots-generator': RobotsGenerator,
};

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const ToolComponent = toolComponents[slug || ''];

  if (!tool || !ToolComponent) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Tool Not Found</h1></div>;
  }

  return (
    <>
      <SEOHead title={`${tool.name} — Free SEO Tool`} description={tool.description} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-3">{tool.name}</h1>
        <p className="text-lg text-gray-500 mb-8">{tool.description}</p>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <ToolComponent />
        </div>
      </div>
    </>
  );
}
