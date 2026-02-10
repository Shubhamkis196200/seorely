import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your page title..." className="input-field" />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{title.length}/60 characters</span>
          {title.length > 0 && title.length <= 60 && <span className="text-xs text-green-500">✓ Good length</span>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Enter your meta description..." className="input-field resize-none" />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${desc.length > 155 ? 'text-red-500' : 'text-gray-400'}`}>{desc.length}/155 characters</span>
          {desc.length >= 120 && desc.length <= 155 && <span className="text-xs text-green-500">✓ Perfect length</span>}
        </div>
      </div>
      {(title || desc) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400 mb-3">SERP Preview</h4>
          <div className="text-blue-700 text-lg font-medium hover:underline cursor-pointer truncate">{title || 'Your Page Title'}</div>
          <div className="text-green-700 text-sm">{url}</div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{desc || 'Your meta description will appear here.'}</div>
        </div>
      )}
      {title && desc && (
        <div className="p-4 bg-white border rounded-lg space-y-2">
          <h4 className="font-semibold text-gray-900">Analysis</h4>
          <div className="space-y-1 text-sm">
            <div className={title.length <= 60 ? 'text-green-600' : 'text-red-600'}>
              {title.length <= 60 ? '✓' : '✗'} Title length: {title.length} chars {title.length > 60 ? '(too long)' : '(good)'}
            </div>
            <div className={desc.length >= 120 && desc.length <= 155 ? 'text-green-600' : desc.length > 155 ? 'text-red-600' : 'text-yellow-600'}>
              {desc.length >= 120 && desc.length <= 155 ? '✓' : '!'} Description length: {desc.length} chars
            </div>
            <div className={title.charAt(0) === title.charAt(0).toUpperCase() ? 'text-green-600' : 'text-yellow-600'}>
              {title.charAt(0) === title.charAt(0).toUpperCase() ? '✓' : '!'} Title starts with capital letter
            </div>
          </div>
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
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content here..." className="input-field resize-none" />
        <span className="text-xs text-gray-400">{wordCount} words</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Keyword</label>
        <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Enter keyword..." className="input-field" />
      </div>
      {keyword && wordCount > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="Density" value={`${density}%`} />
          <StatBox label="Occurrences" value={String(keywordCount)} />
          <StatBox label="Total Words" value={String(wordCount)} />
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
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Meta description" className="input-field resize-none" /></div>
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-medium text-gray-400 mb-4">Google Search Preview</h4>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">{url || 'https://example.com'} › page</div>
          <div className="text-xl text-blue-800 font-medium hover:underline cursor-pointer">{title || 'Your Page Title Here'}</div>
          <div className="text-sm text-gray-600 leading-relaxed">{desc || 'Your meta description will appear here.'}</div>
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
        <div><label className="block text-sm font-medium text-gray-700 mb-1">User-agent</label><input value={userAgent} onChange={e => setUserAgent(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Sitemap URL</label><input value={sitemap} onChange={e => setSitemap(e.target.value)} className="input-field" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Allow (one per line)</label><textarea value={allow} onChange={e => setAllow(e.target.value)} rows={3} className="input-field resize-none font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Disallow (one per line)</label><textarea value={disallow} onChange={e => setDisallow(e.target.value)} rows={3} className="input-field resize-none font-mono text-sm" /></div>
      </div>
      <CodeOutput label="Generated robots.txt" code={output} />
    </div>
  );
}

function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(s => s.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 250));
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="Paste or type your content here..." className="input-field resize-none" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox label="Words" value={String(words)} />
        <StatBox label="Characters" value={String(chars)} />
        <StatBox label="Characters (no spaces)" value={String(charsNoSpace)} />
        <StatBox label="Sentences" value={String(sentences)} />
        <StatBox label="Paragraphs" value={String(paragraphs)} />
        <StatBox label="Reading Time" value={`${readTime} min`} />
      </div>
    </div>
  );
}

function CharCounter() {
  const [text, setText] = useState('');
  const [limit, setLimit] = useState(280);
  const chars = text.length;
  const remaining = limit - chars;
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Type your text..." className="input-field resize-none" />
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Limit:</label>
        {[160, 280, 300, 500].map(l => (
          <button key={l} onClick={() => setLimit(l)} className={`px-3 py-1 text-sm rounded-full ${limit === l ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{l}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatBox label="Characters" value={String(chars)} />
        <StatBox label="Remaining" value={String(remaining)} />
        <div className={`p-4 rounded-lg text-center ${remaining >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>{remaining >= 0 ? '✓' : '✗'}</div>
          <div className="text-xs text-gray-500">Status</div>
        </div>
      </div>
    </div>
  );
}

function URLEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const output = (() => { try { return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input); } catch { return 'Invalid input'; } })();
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'encode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Decode</button>
      </div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Input</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-encoded text...'} className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Output</label><div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">{output || '—'}</div></div>
      <CopyBtn text={output} />
    </div>
  );
}

function HeadingAnalyzer() {
  const [title, setTitle] = useState('');
  const analyze = () => {
    if (!title.trim()) return null;
    const words = title.trim().split(/\s+/);
    const wordCount = words.length;
    let score = 50;
    if (wordCount >= 6 && wordCount <= 13) score += 15; else if (wordCount >= 4) score += 5;
    if (title.length >= 40 && title.length <= 65) score += 10;
    const powerWords = ['ultimate', 'free', 'proven', 'complete', 'guide', 'best', 'how', 'why', 'top', 'secret', 'easy', 'quick', 'essential', 'simple'];
    const hasPower = powerWords.some(w => title.toLowerCase().includes(w));
    if (hasPower) score += 10;
    if (/\d/.test(title)) score += 10;
    if (/[?!:]/.test(title)) score += 5;
    return Math.min(100, score);
  };
  const score = analyze();
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Headline</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your blog post headline..." className="input-field" /></div>
      {score !== null && (
        <>
          <div className="flex items-center gap-4">
            <div className={`text-5xl font-black ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{score}</div>
            <div><div className="font-semibold text-gray-900">{score >= 70 ? 'Great headline!' : score >= 50 ? 'Decent headline' : 'Needs work'}</div><div className="text-sm text-gray-500">Score out of 100</div></div>
          </div>
          <div className="space-y-2 text-sm">
            <div className={title.split(/\s+/).length >= 6 && title.split(/\s+/).length <= 13 ? 'text-green-600' : 'text-yellow-600'}>
              {title.split(/\s+/).length >= 6 && title.split(/\s+/).length <= 13 ? '✓' : '!'} Word count: {title.split(/\s+/).length} (ideal: 6-13)
            </div>
            <div className={title.length >= 40 && title.length <= 65 ? 'text-green-600' : 'text-yellow-600'}>
              {title.length >= 40 && title.length <= 65 ? '✓' : '!'} Character count: {title.length} (ideal: 40-65)
            </div>
            <div className={/\d/.test(title) ? 'text-green-600' : 'text-gray-400'}>{/\d/.test(title) ? '✓ Contains numbers' : '○ Try adding a number'}</div>
            <div className={/[?!:]/.test(title) ? 'text-green-600' : 'text-gray-400'}>{/[?!:]/.test(title) ? '✓ Has emotional punctuation' : '○ Try adding a question mark or colon'}</div>
          </div>
        </>
      )}
    </div>
  );
}

function OGPreview() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [url, setUrl] = useState('');
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Description" className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="https://example.com/image.jpg" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="input-field" /></div>
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3">Facebook Preview</h4>
        <div className="border rounded-lg overflow-hidden max-w-lg">
          {img && <div className="bg-gray-100 aspect-video"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} /></div>}
          <div className="p-3 bg-gray-50">
            <div className="text-xs text-gray-400 uppercase">{url ? new URL(url).hostname : 'example.com'}</div>
            <div className="font-semibold text-gray-900">{title || 'Page Title'}</div>
            <div className="text-sm text-gray-500 line-clamp-2">{desc || 'Page description'}</div>
          </div>
        </div>
      </div>
      <CodeOutput label="OG Meta Tags" code={`<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:image" content="${img}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:type" content="website" />`} />
    </div>
  );
}

function SchemaGenerator() {
  const [type, setType] = useState('Article');
  const [fields, setFields] = useState<Record<string, string>>({ headline: '', author: '', datePublished: '', description: '' });
  const schema = type === 'Article' ? {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: fields.headline, author: { '@type': 'Person', name: fields.author },
    datePublished: fields.datePublished, description: fields.description
  } : type === 'FAQPage' ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [{ '@type': 'Question', name: fields.question || '', acceptedAnswer: { '@type': 'Answer', text: fields.answer || '' } }]
  } : {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: fields.orgName || '', url: fields.orgUrl || '', description: fields.orgDesc || ''
  };
  const faqFields = type === 'FAQPage';
  const orgFields = type === 'Organization';
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['Article', 'FAQPage', 'Organization'].map(t => (
          <button key={t} onClick={() => { setType(t); setFields({}); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${type === t ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>{t}</button>
        ))}
      </div>
      {!faqFields && !orgFields && <>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Headline</label><input value={fields.headline || ''} onChange={e => setFields({ ...fields, headline: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Author</label><input value={fields.author || ''} onChange={e => setFields({ ...fields, author: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Date Published</label><input type="date" value={fields.datePublished || ''} onChange={e => setFields({ ...fields, datePublished: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={fields.description || ''} onChange={e => setFields({ ...fields, description: e.target.value })} rows={2} className="input-field resize-none" /></div>
      </>}
      {faqFields && <>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Question</label><input value={fields.question || ''} onChange={e => setFields({ ...fields, question: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Answer</label><textarea value={fields.answer || ''} onChange={e => setFields({ ...fields, answer: e.target.value })} rows={3} className="input-field resize-none" /></div>
      </>}
      {orgFields && <>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label><input value={fields.orgName || ''} onChange={e => setFields({ ...fields, orgName: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={fields.orgUrl || ''} onChange={e => setFields({ ...fields, orgUrl: e.target.value })} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={fields.orgDesc || ''} onChange={e => setFields({ ...fields, orgDesc: e.target.value })} rows={2} className="input-field resize-none" /></div>
      </>}
      <CodeOutput label="JSON-LD Schema" code={JSON.stringify(schema, null, 2)} />
    </div>
  );
}

function SlugGenerator() {
  const [input, setInput] = useState('');
  const slug = input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Text</label><input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a title or text..." className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label><div className="p-4 bg-gray-50 rounded-lg font-mono text-sm">{slug || '—'}</div></div>
      <CopyBtn text={slug} />
    </div>
  );
}

function LoremGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const variants = [
    lorem,
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',
    'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.',
    'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  ];
  const output = Array.from({ length: paragraphs }, (_, i) => variants[i % variants.length]).join('\n\n');
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphs: {paragraphs}</label>
        <input type="range" min={1} max={10} value={paragraphs} onChange={e => setParagraphs(+e.target.value)} className="w-full" />
      </div>
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 whitespace-pre-line max-h-80 overflow-y-auto">{output}</div>
      <CopyBtn text={output} />
    </div>
  );
}

function CaseConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('title');
  const convert = () => {
    switch (mode) {
      case 'upper': return input.toUpperCase();
      case 'lower': return input.toLowerCase();
      case 'title': return input.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
      case 'sentence': return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      case 'toggle': return input.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
      default: return input;
    }
  };
  return (
    <div className="space-y-6">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder="Enter text to convert..." className="input-field resize-none" />
      <div className="flex flex-wrap gap-2">
        {[['upper', 'UPPERCASE'], ['lower', 'lowercase'], ['title', 'Title Case'], ['sentence', 'Sentence case'], ['toggle', 'tOGGLE']].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>{l}</button>
        ))}
      </div>
      <div className="p-4 bg-gray-50 rounded-lg text-sm">{convert() || '—'}</div>
      <CopyBtn text={convert()} />
    </div>
  );
}

function HtaccessGenerator() {
  const [redirects, setRedirects] = useState('/old-page /new-page\n/blog/old-post /blog/new-post');
  const output = redirects.split('\n').filter(Boolean).map(line => {
    const [from, to] = line.trim().split(/\s+/);
    return from && to ? `Redirect 301 ${from} ${to}` : '';
  }).filter(Boolean).join('\n');
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Redirects (old-path new-path, one per line)</label>
        <textarea value={redirects} onChange={e => setRedirects(e.target.value)} rows={6} placeholder="/old-page /new-page" className="input-field resize-none font-mono text-sm" /></div>
      <CodeOutput label=".htaccess Rules" code={output} />
    </div>
  );
}

function XMLSitemapGenerator() {
  const [urls, setUrls] = useState('https://example.com/\nhttps://example.com/about\nhttps://example.com/blog');
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split('\n').filter(u => u.trim()).map(u => `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}\n</urlset>`;
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URLs (one per line)</label>
        <textarea value={urls} onChange={e => setUrls(e.target.value)} rows={6} className="input-field resize-none font-mono text-sm" /></div>
      <CodeOutput label="sitemap.xml" code={xml} />
    </div>
  );
}

function HreflangGenerator() {
  const [entries, setEntries] = useState([{ lang: 'en', url: 'https://example.com/' }, { lang: 'es', url: 'https://example.com/es/' }]);
  const tags = entries.map(e => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}" />`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${entries[0]?.url || ''}" />`;
  return (
    <div className="space-y-6">
      {entries.map((e, i) => (
        <div key={i} className="flex gap-2">
          <input value={e.lang} onChange={ev => { const n = [...entries]; n[i].lang = ev.target.value; setEntries(n); }} placeholder="en" className="input-field w-24" />
          <input value={e.url} onChange={ev => { const n = [...entries]; n[i].url = ev.target.value; setEntries(n); }} placeholder="https://..." className="input-field flex-1" />
          <button onClick={() => setEntries(entries.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-sm">✗</button>
        </div>
      ))}
      <button onClick={() => setEntries([...entries, { lang: '', url: '' }])} className="text-sm text-purple-600 font-medium">+ Add language</button>
      <CodeOutput label="Hreflang Tags" code={tags} />
    </div>
  );
}

function CanonicalChecker() {
  const [url, setUrl] = useState('');
  const [canonical, setCanonical] = useState('');
  const match = url && canonical ? url.trim() === canonical.trim() : null;
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Page URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label><input value={canonical} onChange={e => setCanonical(e.target.value)} placeholder="https://example.com/page" className="input-field" /></div>
      {match !== null && (
        <div className={`p-4 rounded-lg ${match ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <div className={`font-semibold ${match ? 'text-green-700' : 'text-yellow-700'}`}>{match ? '✓ Self-referencing canonical — correct!' : '⚠ Canonical differs from page URL — this is a cross-domain or consolidation canonical.'}</div>
        </div>
      )}
      {canonical && <CodeOutput label="Canonical Tag" code={`<link rel="canonical" href="${canonical}" />`} />}
    </div>
  );
}

function ReadabilityChecker() {
  const [text, setText] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const syllables = (word: string) => { const w = word.toLowerCase().replace(/[^a-z]/g, ''); let c = 0; if (w.length <= 3) return 1; const vowels = w.match(/[aeiouy]+/g); c = vowels ? vowels.length : 1; if (w.endsWith('e')) c--; return Math.max(1, c); };
  const totalSyllables = words.reduce((s, w) => s + syllables(w), 0);
  const wc = words.length; const sc = sentences.length;
  const flesch = wc > 0 && sc > 0 ? Math.round(206.835 - 1.015 * (wc / sc) - 84.6 * (totalSyllables / wc)) : 0;
  const grade = wc > 0 && sc > 0 ? Math.round(0.39 * (wc / sc) + 11.8 * (totalSyllables / wc) - 15.59) : 0;
  const level = flesch >= 80 ? 'Easy' : flesch >= 60 ? 'Standard' : flesch >= 40 ? 'Difficult' : 'Very Difficult';
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content to analyze..." className="input-field resize-none" />
      {wc > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox label="Flesch Score" value={String(Math.max(0, flesch))} />
          <StatBox label="Grade Level" value={String(Math.max(0, grade))} />
          <StatBox label="Readability" value={level} />
          <StatBox label="Avg Words/Sentence" value={(wc / Math.max(1, sc)).toFixed(1)} />
        </div>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const output = (() => { try { return mode === 'encode' ? btoa(input) : atob(input); } catch { return 'Invalid input'; } })();
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'encode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder="Enter text..." className="input-field resize-none" />
      <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all max-h-40 overflow-y-auto">{output || '—'}</div>
      <CopyBtn text={output} />
    </div>
  );
}

function UTMBuilder() {
  const [base, setBase] = useState('https://example.com/');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('spring_sale');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const params = new URLSearchParams();
  if (source) params.set('utm_source', source);
  if (medium) params.set('utm_medium', medium);
  if (campaign) params.set('utm_campaign', campaign);
  if (term) params.set('utm_term', term);
  if (content) params.set('utm_content', content);
  const url = `${base}${base.includes('?') ? '&' : '?'}${params.toString()}`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label><input value={base} onChange={e => setBase(e.target.value)} className="input-field" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Source *</label><input value={source} onChange={e => setSource(e.target.value)} placeholder="google" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Medium *</label><input value={medium} onChange={e => setMedium(e.target.value)} placeholder="cpc" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Campaign *</label><input value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="spring_sale" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Term</label><input value={term} onChange={e => setTerm(e.target.value)} placeholder="keyword" className="input-field" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><input value={content} onChange={e => setContent(e.target.value)} placeholder="ad_variant" className="input-field" /></div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">{url}</div>
      <CopyBtn text={url} />
    </div>
  );
}

function ViewportTester() {
  const [url, setUrl] = useState('https://seorely.netlify.app');
  const [size, setSize] = useState({ w: 375, h: 667, label: 'iPhone SE' });
  const presets = [
    { w: 375, h: 667, label: 'iPhone SE' },
    { w: 390, h: 844, label: 'iPhone 14' },
    { w: 768, h: 1024, label: 'iPad' },
    { w: 1024, h: 768, label: 'iPad Landscape' },
    { w: 1440, h: 900, label: 'Desktop' },
  ];
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL to Preview</label><input value={url} onChange={e => setUrl(e.target.value)} className="input-field" /></div>
      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button key={p.label} onClick={() => setSize(p)} className={`px-3 py-1.5 rounded-lg text-sm ${size.label === p.label ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>{p.label} ({p.w}×{p.h})</button>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white" style={{ width: Math.min(size.w, 800), height: Math.min(size.h, 600) }}>
          <iframe src={url} title="Viewport preview" style={{ width: size.w, height: size.h, transform: `scale(${Math.min(800 / size.w, 600 / size.h, 1)})`, transformOrigin: 'top left' }} sandbox="allow-scripts allow-same-origin" />
        </div>
      </div>
    </div>
  );
}

function TextDiff() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const diff = () => {
    const linesA = a.split('\n');
    const linesB = b.split('\n');
    const max = Math.max(linesA.length, linesB.length);
    return Array.from({ length: max }, (_, i) => {
      const la = linesA[i] ?? '';
      const lb = linesB[i] ?? '';
      if (la === lb) return { type: 'same', text: la };
      if (!la) return { type: 'add', text: lb };
      if (!lb) return { type: 'remove', text: la };
      return { type: 'change', old: la, new: lb };
    });
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Original</label><textarea value={a} onChange={e => setA(e.target.value)} rows={8} className="input-field resize-none font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Modified</label><textarea value={b} onChange={e => setB(e.target.value)} rows={8} className="input-field resize-none font-mono text-sm" /></div>
      </div>
      {(a || b) && <div className="space-y-1 font-mono text-sm">
        {diff().map((d, i) => (
          <div key={i} className={`px-2 py-0.5 rounded ${d.type === 'same' ? 'text-gray-600' : d.type === 'add' ? 'bg-green-50 text-green-700' : d.type === 'remove' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {d.type === 'change' ? <><div className="line-through text-red-500">{(d as any).old}</div><div className="text-green-600">{(d as any).new}</div></> : <>{d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  '}{d.text}</>}
          </div>
        ))}
      </div>}
    </div>
  );
}

function JSONFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const format = () => {
    try { const o = JSON.parse(input); setError(''); return JSON.stringify(o, null, 2); } catch (e: any) { setError(e.message); return ''; }
  };
  const output = input ? format() : '';
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">JSON Input</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder='{"key": "value"}' className="input-field resize-none font-mono text-sm" /></div>
      {error && <div className="text-red-600 text-sm">❌ {error}</div>}
      {output && !error && <><div className="text-green-600 text-sm font-medium">✓ Valid JSON</div><CodeOutput label="Formatted JSON" code={output} /></>}
    </div>
  );
}

function ColorContrast() {
  const [fg, setFg] = useState('#333333');
  const [bg, setBg] = useState('#ffffff');
  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
  };
  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  const [r1, g1, b1] = hexToRgb(fg);
  const [r2, g2, b2] = hexToRgb(bg);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const ratio = ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  const passAA = +ratio >= 4.5;
  const passAAA = +ratio >= 7;
  const passAALarge = +ratio >= 3;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label><div className="flex gap-2"><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input value={fg} onChange={e => setFg(e.target.value)} className="input-field flex-1 font-mono" /></div></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label><div className="flex gap-2"><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input value={bg} onChange={e => setBg(e.target.value)} className="input-field flex-1 font-mono" /></div></div>
      </div>
      <div className="p-8 rounded-lg text-center text-2xl font-bold" style={{ color: fg, backgroundColor: bg }}>
        Sample Text Preview
      </div>
      <div className="text-center text-3xl font-black text-purple-600">{ratio}:1</div>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className={`p-3 rounded-lg ${passAA ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{passAA ? '✓' : '✗'} AA Normal</div>
        <div className={`p-3 rounded-lg ${passAALarge ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{passAALarge ? '✓' : '✗'} AA Large</div>
        <div className={`p-3 rounded-lg ${passAAA ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{passAAA ? '✓' : '✗'} AAA Normal</div>
      </div>
    </div>
  );
}

// Shared components
function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-purple-50 rounded-lg text-center">
      <div className="text-2xl font-bold text-purple-600">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
      {copied ? '✓ Copied!' : 'Copy to clipboard'}
    </button>
  );
}

function CodeOutput({ label, code }: { label: string; code: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
      <div className="bg-gray-900 rounded-lg p-4">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono max-h-60 overflow-y-auto">{code}</pre>
      </div>
      <CopyBtn text={code} />
    </div>
  );
}

function MetaLengthChecker() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const titleOk = title.length > 0 && title.length <= 60;
  const descOk = desc.length >= 120 && desc.length <= 155;
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title Tag</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title..." className="input-field" /><div className="flex justify-between mt-1"><span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{title.length}/60</span>{titleOk && <span className="text-xs text-green-500">✓ Good</span>}</div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Your meta description..." className="input-field resize-none" /><div className="flex justify-between mt-1"><span className={`text-xs ${desc.length > 155 ? 'text-red-500' : 'text-gray-400'}`}>{desc.length}/155</span>{descOk && <span className="text-xs text-green-500">✓ Perfect</span>}</div></div>
      {(title || desc) && <div className="grid grid-cols-2 gap-4"><StatBox label="Title Pixels (est.)" value={`${Math.round(title.length * 8.5)}px`} /><StatBox label="Desc Pixels (est.)" value={`${Math.round(desc.length * 5.5)}px`} /></div>}
    </div>
  );
}

function KeywordExtractor() {
  const [text, setText] = useState('');
  const extract = () => {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const stopWords = new Set(['that','this','with','from','your','have','more','will','been','they','were','than','each','make','like','just','over','such','also','into','after','only','other','which','their','about','would','these','some','them','could','what','there','when','very','much','most','even','then','does','being','made','well','back','still','many','those']);
    const freq: Record<string, number> = {};
    words.filter(w => !stopWords.has(w)).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
  };
  const results = text ? extract() : [];
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content here..." className="input-field resize-none" />
      {results.length > 0 && <div className="space-y-2">{results.map(([w, c]) => <div key={w} className="flex items-center gap-3"><div className="flex-1 bg-gray-100 rounded-full h-6 relative"><div className="bg-purple-500 h-6 rounded-full" style={{ width: `${(c / results[0][1]) * 100}%` }} /><span className="absolute inset-0 flex items-center px-3 text-xs font-medium">{w}</span></div><span className="text-sm text-gray-500 w-8 text-right">{c}</span></div>)}</div>}
    </div>
  );
}

function AltTextGenerator() {
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [action, setAction] = useState('');
  const generate = () => {
    if (!subject) return '';
    let alt = subject;
    if (action) alt = `${subject} ${action}`;
    if (context) alt += ` — ${context}`;
    return alt;
  };
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Main Subject *</label><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., Golden retriever puppy" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Action / State</label><input value={action} onChange={e => setAction(e.target.value)} placeholder="e.g., running on a beach" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Context / Purpose</label><input value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., hero image for pet adoption page" className="input-field" /></div>
      {subject && <><div className="p-4 bg-gray-50 rounded-lg"><span className="text-sm font-medium text-gray-500">Generated alt text:</span><p className="text-gray-900 mt-1">"{generate()}"</p></div><div className="text-xs text-gray-400">{generate().length} characters (aim for under 125)</div><CodeOutput label="HTML" code={`<img src="image.jpg" alt="${generate()}" />`} /></>}
    </div>
  );
}

function RedirectMapper() {
  const [input, setInput] = useState('/old-page → /new-page\n/old-page-2 → /new-page → /final-page');
  const chains = input.split('\n').filter(Boolean).map(line => {
    const parts = line.split(/\s*[→>]+\s*/).filter(Boolean);
    return { parts, hops: parts.length - 1, isChain: parts.length > 2 };
  });
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Redirect paths (use → to separate, one chain per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="input-field resize-none font-mono text-sm" /></div>
      <div className="space-y-3">{chains.map((c, i) => (
        <div key={i} className={`p-3 rounded-lg border ${c.isChain ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'}`}>
          <div className="flex items-center gap-2 text-sm">{c.parts.map((p, j) => <span key={j} className="flex items-center gap-2"><code className="bg-white px-2 py-0.5 rounded">{p}</code>{j < c.parts.length - 1 && <span className="text-gray-400">→</span>}</span>)}</div>
          <div className={`text-xs mt-1 ${c.isChain ? 'text-yellow-700' : 'text-green-700'}`}>{c.hops} hop{c.hops > 1 ? 's' : ''} {c.isChain ? '⚠ Consider collapsing this chain' : '✓ Direct redirect'}</div>
        </div>
      ))}</div>
    </div>
  );
}

function HTMLMinifier() {
  const [input, setInput] = useState('');
  const minify = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim();
  const output = input ? minify(input) : '';
  const saved = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;
  return (
    <div className="space-y-6">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="Paste your HTML..." className="input-field resize-none font-mono text-sm" />
      {input && <div className="grid grid-cols-3 gap-4"><StatBox label="Original" value={`${input.length}`} /><StatBox label="Minified" value={`${output.length}`} /><StatBox label="Saved" value={`${saved}%`} /></div>}
      {output && <CodeOutput label="Minified HTML" code={output} />}
    </div>
  );
}

function CSSMinifier() {
  const [input, setInput] = useState('');
  const minify = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;\}/g, '}').replace(/\s{2,}/g, ' ').trim();
  const output = input ? minify(input) : '';
  const saved = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;
  return (
    <div className="space-y-6">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="Paste your CSS..." className="input-field resize-none font-mono text-sm" />
      {input && <div className="grid grid-cols-3 gap-4"><StatBox label="Original" value={`${input.length}`} /><StatBox label="Minified" value={`${output.length}`} /><StatBox label="Saved" value={`${saved}%`} /></div>}
      {output && <CodeOutput label="Minified CSS" code={output} />}
    </div>
  );
}

function JSMinifier() {
  const [input, setInput] = useState('');
  const minify = (js: string) => js.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s{2,}/g, ' ').replace(/\s*([{}();=,+\-*/<>!&|])\s*/g, '$1').trim();
  const output = input ? minify(input) : '';
  const saved = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;
  return (
    <div className="space-y-6">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="Paste your JavaScript..." className="input-field resize-none font-mono text-sm" />
      {input && <div className="grid grid-cols-3 gap-4"><StatBox label="Original" value={`${input.length}`} /><StatBox label="Minified" value={`${output.length}`} /><StatBox label="Saved" value={`${saved}%`} /></div>}
      {output && <CodeOutput label="Minified JS" code={output} />}
    </div>
  );
}

function TwitterCardPreview() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [site, setSite] = useState('');
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="https://..." className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">@site handle</label><input value={site} onChange={e => setSite(e.target.value)} placeholder="@yoursite" className="input-field" /></div>
      <div className="border rounded-2xl overflow-hidden max-w-lg">
        {img && <div className="bg-gray-100 aspect-video"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} /></div>}
        <div className="p-3 border-t"><div className="text-xs text-gray-400">{site || 'example.com'}</div><div className="font-semibold text-gray-900 text-sm">{title || 'Title'}</div><div className="text-xs text-gray-500 line-clamp-2">{desc || 'Description'}</div></div>
      </div>
      <CodeOutput label="Twitter Card Meta Tags" code={`<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:site" content="${site}" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${desc}" />\n<meta name="twitter:image" content="${img}" />`} />
    </div>
  );
}

function FAQSchemaGenerator() {
  const [faqs, setFaqs] = useState([{ q: '', a: '' }, { q: '', a: '' }]);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.filter(f => f.q && f.a).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <div className="space-y-6">
      {faqs.map((f, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <div className="flex justify-between"><span className="text-sm font-medium text-gray-700">FAQ #{i + 1}</span><button onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} className="text-red-400 text-sm">Remove</button></div>
          <input value={f.q} onChange={e => { const n = [...faqs]; n[i].q = e.target.value; setFaqs(n); }} placeholder="Question" className="input-field" />
          <textarea value={f.a} onChange={e => { const n = [...faqs]; n[i].a = e.target.value; setFaqs(n); }} rows={2} placeholder="Answer" className="input-field resize-none" />
        </div>
      ))}
      <button onClick={() => setFaqs([...faqs, { q: '', a: '' }])} className="text-sm text-purple-600 font-medium">+ Add FAQ</button>
      <CodeOutput label="FAQ Schema (JSON-LD)" code={JSON.stringify(schema, null, 2)} />
    </div>
  );
}

function BreadcrumbSchemaGenerator() {
  const [items, setItems] = useState([{ name: 'Home', url: 'https://example.com/' }, { name: 'Blog', url: 'https://example.com/blog/' }, { name: 'Post Title', url: '' }]);
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, ...(it.url ? { item: it.url } : {}) })) };
  return (
    <div className="space-y-6">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={it.name} onChange={e => { const n = [...items]; n[i].name = e.target.value; setItems(n); }} placeholder="Name" className="input-field w-40" />
          <input value={it.url} onChange={e => { const n = [...items]; n[i].url = e.target.value; setItems(n); }} placeholder="URL (leave blank for current page)" className="input-field flex-1" />
          <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-red-400 text-sm">✗</button>
        </div>
      ))}
      <button onClick={() => setItems([...items, { name: '', url: '' }])} className="text-sm text-purple-600 font-medium">+ Add level</button>
      <CodeOutput label="Breadcrumb Schema (JSON-LD)" code={JSON.stringify(schema, null, 2)} />
    </div>
  );
}

function TextStatistics() {
  const [text, setText] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wc = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''))).size;
  const avgWordLen = wc > 0 ? (words.reduce((s, w) => s + w.length, 0) / wc).toFixed(1) : '0';
  const avgSentLen = sentences > 0 ? (wc / sentences).toFixed(1) : '0';
  const lexDiversity = wc > 0 ? ((uniqueWords / wc) * 100).toFixed(1) : '0';
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste text to analyze..." className="input-field resize-none" />
      {wc > 0 && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox label="Words" value={String(wc)} />
        <StatBox label="Unique Words" value={String(uniqueWords)} />
        <StatBox label="Sentences" value={String(sentences)} />
        <StatBox label="Avg Word Length" value={`${avgWordLen} chars`} />
        <StatBox label="Avg Sentence Length" value={`${avgSentLen} words`} />
        <StatBox label="Lexical Diversity" value={`${lexDiversity}%`} />
      </div>}
    </div>
  );
}

function PageTitleTester() {
  const [titleA, setTitleA] = useState('');
  const [titleB, setTitleB] = useState('');
  const score = (t: string) => {
    let s = 0;
    if (t.length >= 30 && t.length <= 60) s += 30; else if (t.length > 0 && t.length < 30) s += 10; else if (t.length > 60) s += 5;
    if (/\d/.test(t)) s += 10;
    if (/[|—:\-]/.test(t)) s += 5;
    if (t.charAt(0) === t.charAt(0).toUpperCase() && t.length > 0) s += 10;
    const power = ['how','why','best','top','guide','free','new','proven','ultimate','easy'];
    if (power.some(w => t.toLowerCase().includes(w))) s += 15;
    if (t.length > 0) s += 10;
    const words = t.trim().split(/\s+/).length;
    if (words >= 5 && words <= 12) s += 10;
    if (/[!?]$/.test(t)) s += 5;
    if (t.length > 0 && !t.includes('  ')) s += 5;
    return Math.min(100, s);
  };
  const sA = score(titleA);
  const sB = score(titleB);
  const colorFor = (s: number) => s >= 70 ? 'text-green-600' : s >= 40 ? 'text-yellow-600' : 'text-red-600';
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Compare two page titles to see which is more optimized for SEO and click-through rate.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title A</label>
        <input value={titleA} onChange={e => setTitleA(e.target.value)} placeholder="e.g. 10 Best SEO Tools for Beginners in 2026" className="input-field" />
        <span className={`text-xs ${titleA.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{titleA.length}/60</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title B</label>
        <input value={titleB} onChange={e => setTitleB(e.target.value)} placeholder="e.g. SEO Tools - A Complete Guide" className="input-field" />
        <span className={`text-xs ${titleB.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{titleB.length}/60</span>
      </div>
      {(titleA || titleB) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {titleA && <div className={`p-4 rounded-lg border-2 ${sA >= sB && titleB ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-sm font-medium text-gray-500 mb-1">Title A</div>
            <div className="font-semibold text-gray-900 mb-2">{titleA}</div>
            <div className={`text-2xl font-bold ${colorFor(sA)}`}>{sA}/100</div>
            {sA >= sB && titleB && <div className="text-xs text-green-600 mt-1 font-medium">★ Winner</div>}
          </div>}
          {titleB && <div className={`p-4 rounded-lg border-2 ${sB > sA && titleA ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-sm font-medium text-gray-500 mb-1">Title B</div>
            <div className="font-semibold text-gray-900 mb-2">{titleB}</div>
            <div className={`text-2xl font-bold ${colorFor(sB)}`}>{sB}/100</div>
            {sB > sA && titleA && <div className="text-xs text-green-600 mt-1 font-medium">★ Winner</div>}
          </div>}
        </div>
      )}
      {titleA && titleB && (
        <div className="p-4 bg-white border rounded-lg text-sm space-y-1">
          <h4 className="font-semibold">Tips for better titles:</h4>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Keep between 30–60 characters</li>
            <li>Include numbers (e.g. "10 Best...")</li>
            <li>Use power words: best, ultimate, proven, free, guide</li>
            <li>Start with a capital letter</li>
            <li>Use separators like | or — for branding</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function MarkdownPreviewer() {
  const [md, setMd] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n[Link](https://example.com)');
  const toHtml = (s: string) => s
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-purple-600 underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-5">$1</ul>')
    .replace(/\n\n/g, '<br/><br/>');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Markdown</label><textarea value={md} onChange={e => setMd(e.target.value)} rows={12} className="input-field resize-none font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Preview</label><div className="p-4 border rounded-lg prose prose-sm max-h-80 overflow-y-auto" dangerouslySetInnerHTML={{ __html: toHtml(md) }} /></div>
      </div>
    </div>
  );
}

function HTMLEntityEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const encode = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
  const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const output = mode === 'encode' ? encode(input) : decode(input);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'encode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder="Enter text..." className="input-field resize-none font-mono text-sm" />
      <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">{output || '—'}</div>
      <CopyBtn text={output} />
    </div>
  );
}

function InternalLinkAnalyzer() {
  const [input, setInput] = useState('/home → /about\n/home → /blog\n/blog → /blog/post-1\n/blog → /blog/post-2\n/about → /contact');
  const links = input.split('\n').filter(Boolean).map(l => { const [from, to] = l.split(/\s*[→>]+\s*/); return { from: from?.trim(), to: to?.trim() }; }).filter(l => l.from && l.to);
  const pages = new Set(links.flatMap(l => [l.from, l.to]));
  const inbound: Record<string, number> = {};
  const outbound: Record<string, number> = {};
  links.forEach(l => { inbound[l.to] = (inbound[l.to] || 0) + 1; outbound[l.from] = (outbound[l.from] || 0) + 1; });
  const orphans = [...pages].filter(p => !inbound[p] && p !== '/home');
  return (
    <div className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Links (from → to, one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="input-field resize-none font-mono text-sm" /></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4"><StatBox label="Pages" value={String(pages.size)} /><StatBox label="Links" value={String(links.length)} /><StatBox label="Orphan Pages" value={String(orphans.length)} /></div>
      {orphans.length > 0 && <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm"><span className="font-medium text-yellow-700">⚠ Orphan pages (no inbound links):</span><ul className="mt-1 text-yellow-600">{orphans.map(p => <li key={p}><code>{p}</code></li>)}</ul></div>}
      <div className="text-sm space-y-1">{[...pages].sort().map(p => <div key={p} className="flex justify-between px-2 py-1 bg-gray-50 rounded"><code>{p}</code><span className="text-gray-500">In: {inbound[p] || 0} | Out: {outbound[p] || 0}</span></div>)}</div>
    </div>
  );
}

function MetaRobotsGenerator() {
  const [index, setIndex] = useState(true);
  const [follow, setFollow] = useState(true);
  const [noarchive, setNoarchive] = useState(false);
  const [nosnippet, setNosnippet] = useState(false);
  const [noimageindex, setNoimageindex] = useState(false);
  const [maxSnippet, setMaxSnippet] = useState('');
  const directives = [index ? 'index' : 'noindex', follow ? 'follow' : 'nofollow', ...(noarchive ? ['noarchive'] : []), ...(nosnippet ? ['nosnippet'] : []), ...(noimageindex ? ['noimageindex'] : []), ...(maxSnippet ? [`max-snippet:${maxSnippet}`] : [])].join(', ');
  const tag = `<meta name="robots" content="${directives}" />`;
  return (<div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">{[['Index', index, setIndex], ['Follow', follow, setFollow], ['No Archive', noarchive, setNoarchive], ['No Snippet', nosnippet, setNosnippet], ['No Image Index', noimageindex, setNoimageindex]].map(([label, val, setter]: any) => (<label key={label} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} />{label}</label>))}</div>
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Max Snippet Length</label><input value={maxSnippet} onChange={e => setMaxSnippet(e.target.value)} placeholder="-1 for unlimited" className="input-field" /></div>
    <CodeOutput label="Meta Robots Tag" code={tag} />
  </div>);
}

function HeadlineCapitalizer() {
  const [input, setInput] = useState('');
  const apStyle = (s: string) => s.split(' ').map((w, i) => { const lower = ['a','an','the','and','but','or','for','nor','at','by','in','of','on','to','up','as','is','it']; return (i === 0 || !lower.includes(w.toLowerCase())) ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase(); }).join(' ');
  const chicago = apStyle;
  const allCaps = (s: string) => s.toUpperCase();
  const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Headline</label><input value={input} onChange={e => setInput(e.target.value)} placeholder="enter your headline here" className="input-field" /></div>
    {input && <div className="space-y-2">{[['AP Style', apStyle(input)], ['Chicago Style', chicago(input)], ['ALL CAPS', allCaps(input)], ['Sentence case', sentenceCase(input)]].map(([label, result]) => (<div key={label} className="flex justify-between items-center p-3 bg-gray-50 rounded"><div><span className="text-xs text-gray-500">{label}</span><div className="font-medium">{result}</div></div><CopyBtn text={result} /></div>))}</div>}
  </div>);
}

function EmailSubjectTester() {
  const [subject, setSubject] = useState('');
  const score = (() => { if (!subject) return 0; let s = 50; if (subject.length >= 30 && subject.length <= 60) s += 15; else if (subject.length > 60) s -= 10; if (/\d/.test(subject)) s += 10; if (/[!?]/.test(subject)) s += 5; if (subject === subject.toUpperCase()) s -= 20; if (/free|urgent|act now|limited/i.test(subject)) s -= 15; if (/how|why|what|tips|guide|best/i.test(subject)) s += 10; if (/\b(you|your)\b/i.test(subject)) s += 5; return Math.max(0, Math.min(100, s)); })();
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Subject Line</label><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Your amazing subject line..." className="input-field" /></div>
    {subject && <div className="space-y-3">
      <div className="text-center"><div className={`text-4xl font-bold ${score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{score}/100</div><div className="text-sm text-gray-500">{score >= 70 ? 'Great subject line!' : score >= 40 ? 'Could be improved' : 'Needs work'}</div></div>
      <div className="text-sm space-y-1">
        <div className={subject.length >= 30 && subject.length <= 60 ? 'text-green-600' : 'text-yellow-600'}>{subject.length >= 30 && subject.length <= 60 ? '✓' : '!'} Length: {subject.length} chars (ideal: 30-60)</div>
        <div className={/\d/.test(subject) ? 'text-green-600' : 'text-gray-500'}>{/\d/.test(subject) ? '✓ Contains numbers' : '○ Try adding numbers'}</div>
        <div className={subject !== subject.toUpperCase() ? 'text-green-600' : 'text-red-600'}>{subject !== subject.toUpperCase() ? '✓ Not all caps' : '✗ Avoid ALL CAPS'}</div>
        <div className={!/free|urgent|act now|limited/i.test(subject) ? 'text-green-600' : 'text-red-600'}>{!/free|urgent|act now|limited/i.test(subject) ? '✓ No spam trigger words' : '✗ Contains spam trigger words'}</div>
      </div>
    </div>}
  </div>);
}

function SocialMediaPreview() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('https://example.com');
  const [img, setImg] = useState('');
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label><input value={title} onChange={e => setTitle(e.target.value)} className="input-field" /></div>
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="input-field resize-none" /></div>
    <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={url} onChange={e => setUrl(e.target.value)} className="input-field" /></div>
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input value={img} onChange={e => setImg(e.target.value)} className="input-field" /></div>
    {title && <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Facebook Preview</h4>
      <div className="border rounded-lg overflow-hidden max-w-md">{img && <div className="h-40 bg-gray-200"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLImageElement).style.display='none'} /></div>}<div className="p-3 bg-gray-50"><div className="text-xs text-gray-500 uppercase">{new URL(url).hostname}</div><div className="font-semibold text-sm mt-1">{title}</div><div className="text-xs text-gray-500 mt-1 line-clamp-2">{desc}</div></div></div>
      <h4 className="font-semibold text-gray-700">Twitter Preview</h4>
      <div className="border rounded-xl overflow-hidden max-w-md">{img && <div className="h-40 bg-gray-200"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLImageElement).style.display='none'} /></div>}<div className="p-3"><div className="font-semibold text-sm">{title}</div><div className="text-xs text-gray-500 mt-1 line-clamp-2">{desc}</div><div className="text-xs text-gray-400 mt-1">{new URL(url).hostname}</div></div></div>
    </div>}
  </div>);
}

function HTTPHeaderChecker() {
  const [input, setInput] = useState('HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=3600\nX-Frame-Options: DENY\nStrict-Transport-Security: max-age=31536000\nContent-Security-Policy: default-src \'self\'');
  const headers = input.split('\n').filter(Boolean).map(l => { const i = l.indexOf(':'); return i > 0 ? { name: l.slice(0, i).trim(), value: l.slice(i+1).trim() } : { name: l, value: '' }; });
  const securityHeaders = ['strict-transport-security','content-security-policy','x-frame-options','x-content-type-options','referrer-policy','permissions-policy'];
  const present = headers.map(h => h.name.toLowerCase());
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Paste HTTP Headers</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="input-field resize-none font-mono text-sm" /></div>
    <div className="space-y-2">{headers.filter(h => h.value).map(h => (<div key={h.name} className="flex gap-2 text-sm p-2 bg-gray-50 rounded"><span className="font-mono font-medium text-purple-700">{h.name}:</span><span className="text-gray-600">{h.value}</span></div>))}</div>
    <div className="p-4 bg-white border rounded-lg"><h4 className="font-semibold mb-2">Security Headers Check</h4><div className="space-y-1 text-sm">{securityHeaders.map(h => (<div key={h} className={present.includes(h) ? 'text-green-600' : 'text-red-600'}>{present.includes(h) ? '✓' : '✗'} {h}</div>))}</div></div>
  </div>);
}

function JSONLDGenerator() {
  const [type, setType] = useState('LocalBusiness');
  const [fields, setFields] = useState<Record<string, string>>({ name: '', description: '', url: '' });
  const update = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }));
  const fieldDefs: Record<string, string[]> = { LocalBusiness: ['name','description','url','telephone','address','priceRange'], Product: ['name','description','url','brand','price','currency','availability'], Event: ['name','description','url','startDate','endDate','location'] };
  const output = JSON.stringify({ '@context': 'https://schema.org', '@type': type, ...Object.fromEntries(Object.entries(fields).filter(([,v]) => v)) }, null, 2);
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Schema Type</label><select value={type} onChange={e => { setType(e.target.value); setFields({}); }} className="input-field">{Object.keys(fieldDefs).map(t => <option key={t}>{t}</option>)}</select></div>
    {(fieldDefs[type] || []).map(f => (<div key={f}><label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f}</label><input value={fields[f] || ''} onChange={e => update(f, e.target.value)} className="input-field" /></div>))}
    <CodeOutput label="JSON-LD Output" code={`<script type="application/ld+json">\n${output}\n</script>`} />
  </div>);
}

function SearchIntentClassifier() {
  const [keywords, setKeywords] = useState('');
  const classify = (kw: string): string => { const k = kw.toLowerCase(); if (/buy|price|cheap|deal|discount|coupon|order|purchase|shop/.test(k)) return 'Transactional'; if (/best|top|review|comparison|vs|alternative/.test(k)) return 'Commercial'; if (/login|\.com|\.org|website|official|youtube|facebook/.test(k)) return 'Navigational'; return 'Informational'; };
  const colors: Record<string, string> = { Transactional: 'bg-red-100 text-red-700', Commercial: 'bg-yellow-100 text-yellow-700', Navigational: 'bg-blue-100 text-blue-700', Informational: 'bg-green-100 text-green-700' };
  const results = keywords.split('\n').filter(Boolean).map(k => ({ keyword: k.trim(), intent: classify(k) }));
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords (one per line)</label><textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows={6} className="input-field resize-none" placeholder="how to improve SEO\nbuy SEO tools\nbest SEO software 2026\ngoogle.com login" /></div>
    {results.length > 0 && <div className="space-y-2">{results.map((r, i) => (<div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded"><span className="text-sm">{r.keyword}</span><span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[r.intent]}`}>{r.intent}</span></div>))}</div>}
  </div>);
}

function LongTailKeywordGenerator() {
  const [seed, setSeed] = useState('');
  const modifiers = { questions: ['how to','what is','why does','when to','where to find','how much does','can you','is it worth','what are the best'], comparisons: ['vs','or','compared to','alternative to','like','similar to'], intent: ['buy','for sale','near me','online','free','cheap','best','top','review'], year: ['2026','2025','for beginners','for small business','tips','guide','examples','template'] };
  const results = seed ? Object.entries(modifiers).flatMap(([,mods]) => mods.map(m => `${m} ${seed}`).concat(mods.map(m => `${seed} ${m}`))) : [];
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Seed Keyword</label><input value={seed} onChange={e => setSeed(e.target.value)} placeholder="e.g., SEO tools" className="input-field" /></div>
    {results.length > 0 && <div><div className="flex justify-between mb-2"><span className="text-sm font-medium text-gray-700">{results.length} variations</span><CopyBtn text={results.join('\n')} /></div><div className="max-h-64 overflow-y-auto space-y-1">{results.map((r, i) => <div key={i} className="text-sm p-1.5 bg-gray-50 rounded">{r}</div>)}</div></div>}
  </div>);
}

function SiteAuditChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const sections = [
    { title: 'Technical SEO', items: [['t1','HTTPS enabled'],['t2','XML sitemap submitted'],['t3','Robots.txt configured'],['t4','No broken links (4xx)'],['t5','Page speed < 3s'],['t6','Mobile-friendly'],['t7','Structured data implemented'],['t8','Canonical tags set']] },
    { title: 'On-Page SEO', items: [['o1','Unique title tags'],['o2','Meta descriptions on all pages'],['o3','H1 tags on every page'],['o4','Image alt attributes'],['o5','Internal linking structure'],['o6','Keyword in URL slug'],['o7','Content length > 300 words']] },
    { title: 'Off-Page SEO', items: [['f1','Google Business Profile claimed'],['f2','Social media profiles linked'],['f3','Backlink profile reviewed'],['f4','Brand mentions monitored'],['f5','Local citations consistent']] },
  ];
  const total = sections.reduce((s, sec) => s + sec.items.length, 0);
  const pct = Math.round((checked.size / total) * 100);
  return (<div className="space-y-6">
    <div className="text-center"><div className="text-3xl font-bold text-purple-600">{pct}%</div><div className="text-sm text-gray-500">{checked.size}/{total} completed</div><div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-purple-600 h-2 rounded-full transition-all" style={{width:`${pct}%`}} /></div></div>
    {sections.map(sec => (<div key={sec.title}><h4 className="font-semibold text-gray-900 mb-2">{sec.title}</h4><div className="space-y-1">{sec.items.map(([id, label]) => (<label key={id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded cursor-pointer"><input type="checkbox" checked={checked.has(id)} onChange={() => toggle(id)} /><span className={checked.has(id) ? 'line-through text-gray-400' : ''}>{label}</span></label>))}</div></div>))}
  </div>);
}

function AnchorTextAnalyzer() {
  const [input, setInput] = useState('');
  const anchors = input.split('\n').filter(Boolean).map(a => a.trim().toLowerCase());
  const freq: Record<string, number> = {};
  anchors.forEach(a => { freq[a] = (freq[a] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const total = anchors.length;
  const types: Record<string, number> = { 'Exact Match': 0, 'Branded': 0, 'Generic': 0, 'URL': 0 };
  const generic = ['click here','read more','learn more','here','this','link','visit','go'];
  anchors.forEach(a => { if (/^https?:\/\//.test(a)) types['URL']++; else if (generic.includes(a)) types['Generic']++; else types['Exact Match']++; });
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Anchor Texts (one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="input-field resize-none" placeholder="your brand name\nbest seo tools\nclick here\nhttps://example.com" /></div>
    {total > 0 && <><div className="grid grid-cols-2 gap-3">{Object.entries(types).map(([k, v]) => <StatBox key={k} label={k} value={`${v} (${Math.round(v/total*100)}%)`} />)}</div>
    <div className="space-y-1">{sorted.map(([text, count]) => <div key={text} className="flex justify-between text-sm p-2 bg-gray-50 rounded"><span>{text}</span><span className="text-gray-500">{count}× ({(count/total*100).toFixed(1)}%)</span></div>)}</div></>}
  </div>);
}

function KeywordGrouper() {
  const [input, setInput] = useState('');
  const keywords = input.split('\n').filter(Boolean).map(k => k.trim().toLowerCase());
  const groups: Record<string, string[]> = {};
  keywords.forEach(kw => { const words = kw.split(/\s+/); const key = words.length > 1 ? words.slice(0, Math.min(2, words.length - 1)).join(' ') : kw; if (!groups[key]) groups[key] = []; groups[key].push(kw); });
  return (<div className="space-y-4">
    <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords (one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="input-field resize-none" placeholder="seo tools free\nseo tools for beginners\nseo audit checklist\nseo audit tool\nkeyword research tips\nkeyword research tools" /></div>
    {Object.keys(groups).length > 0 && <div className="space-y-3">{Object.entries(groups).sort((a,b) => b[1].length - a[1].length).map(([group, kws]) => (<div key={group} className="p-3 bg-gray-50 rounded-lg"><div className="font-medium text-purple-700 text-sm mb-1">{group} ({kws.length})</div><div className="text-sm text-gray-600">{kws.join(', ')}</div></div>))}</div>}
  </div>);
}

const toolComponents: Record<string, React.FC> = {
  'meta-tag-checker': MetaTagChecker,
  'keyword-density': KeywordDensity,
  'serp-preview': SERPPreview,
  'robots-generator': RobotsGenerator,
  'word-counter': WordCounter,
  'character-counter': CharCounter,
  'url-encoder': URLEncoder,
  'heading-analyzer': HeadingAnalyzer,
  'og-preview': OGPreview,
  'schema-generator': SchemaGenerator,
  'slug-generator': SlugGenerator,
  'lorem-generator': LoremGenerator,
  'case-converter': CaseConverter,
  'htaccess-generator': HtaccessGenerator,
  'xml-sitemap-generator': XMLSitemapGenerator,
  'hreflang-generator': HreflangGenerator,
  'canonical-checker': CanonicalChecker,
  'readability-checker': ReadabilityChecker,
  'base64-tool': Base64Tool,
  'utm-builder': UTMBuilder,
  'viewport-tester': ViewportTester,
  'text-diff': TextDiff,
  'json-formatter': JSONFormatter,
  'color-contrast': ColorContrast,
  'meta-length': MetaLengthChecker,
  'keyword-extractor': KeywordExtractor,
  'alt-text-generator': AltTextGenerator,
  'redirect-mapper': RedirectMapper,
  'html-minifier': HTMLMinifier,
  'css-minifier': CSSMinifier,
  'js-minifier': JSMinifier,
  'twitter-card': TwitterCardPreview,
  'faq-schema': FAQSchemaGenerator,
  'breadcrumb-schema': BreadcrumbSchemaGenerator,
  'text-statistics': TextStatistics,
  'password-generator': PageTitleTester,
  'markdown-preview': MarkdownPreviewer,
  'html-entities': HTMLEntityEncoder,
  'internal-link-analyzer': InternalLinkAnalyzer,
  'meta-robots-generator': MetaRobotsGenerator,
  'headline-capitalizer': HeadlineCapitalizer,
  'email-subject-tester': EmailSubjectTester,
  'social-media-preview': SocialMediaPreview,
  'http-header-checker': HTTPHeaderChecker,
  'json-ld-generator': JSONLDGenerator,
  'search-intent-classifier': SearchIntentClassifier,
  'long-tail-keyword-generator': LongTailKeywordGenerator,
  'site-audit-checklist': SiteAuditChecklist,
  'anchor-text-analyzer': AnchorTextAnalyzer,
  'keyword-grouper': KeywordGrouper,
};

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const ToolComponent = toolComponents[slug || ''];

  if (!tool || !ToolComponent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Tool Not Found</h1>
        <Link to="/tools" className="text-purple-600 hover:underline mt-4 inline-block">← Back to tools</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={`${tool.name} — Free SEO Tool`} description={tool.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        url: `https://seorely.com/tools/${tool.slug}`,
        applicationCategory: 'SEO Tool',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        browserRequirements: 'Requires JavaScript'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://seorely.com/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://seorely.com/tools' },
          { '@type': 'ListItem', position: 3, name: tool.name, item: `https://seorely.com/tools/${tool.slug}` },
        ]
      })}} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/tools" className="hover:text-purple-600">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">{tool.name}</span>
        </nav>
        <h1 className="text-3xl font-black text-gray-900 mb-3">{tool.name}</h1>
        <p className="text-lg text-gray-500 mb-8">{tool.description}</p>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <ToolComponent />
        </div>
      </div>
    </>
  );
}
