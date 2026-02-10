import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { tools } from '../data';
import SEOHead from '../components/SEOHead';

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function StatBox({ label, value, color = 'purple' }: { label: string; value: string; color?: string }) {
  const bg = color === 'purple' ? 'bg-purple-50' : color === 'teal' ? 'bg-teal-50' : 'bg-gray-50';
  const text = color === 'purple' ? 'text-purple-600' : color === 'teal' ? 'text-teal-600' : 'text-gray-600';
  return (
    <div className={`p-4 ${bg} rounded-lg text-center`}>
      <div className={`text-2xl font-bold ${text}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
      {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
    </button>
  );
}

function CodeOutput({ label, code }: { label: string; code: string }) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
      <div className="bg-gray-900 rounded-lg p-4 max-h-80 overflow-y-auto">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{code}</pre>
      </div>
      <div className="mt-2"><CopyBtn text={code} /></div>
    </div>
  );
}

// ============================================================================
// ON-PAGE SEO TOOLS (1-15)
// ============================================================================

function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const html = `<title>${title}</title>\n<meta name="description" content="${desc}" />\n<meta name="keywords" content="${keywords}" />`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Title *</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your Page Title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description *</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Compelling description..." className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label><input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="seo, keyword research, optimization" className="input-field" /></div>
      {title && desc && <CodeOutput label="HTML Meta Tags" code={html} />}
    </div>
  );
}

function SERPPreview() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('https://example.com/page');
  const [desc, setDesc] = useState('');
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title" className="input-field" /><span className="text-xs text-gray-400">{title.length}/60 chars</span></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={url} onChange={e => setUrl(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="input-field resize-none" /><span className="text-xs text-gray-400">{desc.length}/155 chars</span></div>
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase">Google SERP Preview</h4>
        <div className="space-y-1">
          <div className="text-sm text-gray-500 truncate">{url}</div>
          <div className="text-xl text-blue-600 hover:underline cursor-pointer font-medium">{title || 'Your Page Title'}</div>
          <div className="text-sm text-gray-600 leading-relaxed line-clamp-2">{desc || 'Your meta description will appear here.'}</div>
        </div>
      </div>
    </div>
  );
}

function TitleLengthChecker() {
  const [title, setTitle] = useState('');
  const ok = title.length > 0 && title.length <= 60;
  const pixels = Math.round(title.length * 8.5);
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title Tag</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your page title..." className="input-field" /></div>
      {title && <div className="grid grid-cols-2 gap-4">
        <StatBox label="Characters" value={String(title.length)} color={ok ? 'teal' : 'purple'} />
        <StatBox label="Est. Pixels" value={`${pixels}px`} color={pixels <= 600 ? 'teal' : 'purple'} />
      </div>}
      {title && <div className={`p-4 rounded-lg ${ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        <div className="font-semibold">{ok ? '✓ Title length is good!' : '✗ Title is too long'}</div>
        <div className="text-sm mt-1">{ok ? 'Your title will display fully in Google search results.' : 'Google may truncate your title. Aim for 50-60 characters.'}</div>
      </div>}
    </div>
  );
}

function MetaDescriptionLengthChecker() {
  const [desc, setDesc] = useState('');
  const ok = desc.length >= 120 && desc.length <= 155;
  const pixels = Math.round(desc.length * 5.5);
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Enter your meta description..." className="input-field resize-none" /></div>
      {desc && <div className="grid grid-cols-2 gap-4">
        <StatBox label="Characters" value={String(desc.length)} color={ok ? 'teal' : 'purple'} />
        <StatBox label="Est. Pixels" value={`${pixels}px`} color={pixels <= 920 ? 'teal' : 'purple'} />
      </div>}
      {desc && <div className={`p-4 rounded-lg ${ok ? 'bg-green-50 text-green-700' : desc.length > 155 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
        <div className="font-semibold">{ok ? '✓ Perfect length!' : desc.length > 155 ? '✗ Too long' : '! Could be longer'}</div>
        <div className="text-sm mt-1">{ok ? 'Your description will display fully.' : desc.length > 155 ? 'Google may cut off your description.' : 'Aim for 120-155 characters for best results.'}</div>
      </div>}
    </div>
  );
}

function HeadingStructureAnalyzer() {
  const [html, setHtml] = useState('');
  const headings = (() => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const found: { level: number; text: string }[] = [];
    ['h1','h2','h3','h4','h5','h6'].forEach((tag, idx) => {
      doc.querySelectorAll(tag).forEach(el => found.push({ level: idx + 1, text: el.textContent?.trim() || '' }));
    });
    return found;
  })();
  const h1Count = headings.filter(h => h.level === 1).length;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Paste HTML</label><textarea value={html} onChange={e => setHtml(e.target.value)} rows={8} placeholder="<h1>Main Title</h1>\n<h2>Section 1</h2>\n<h3>Subsection</h3>" className="input-field resize-none font-mono text-sm" /></div>
      {headings.length > 0 && <>
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="H1 Count" value={String(h1Count)} color={h1Count === 1 ? 'teal' : 'purple'} />
          <StatBox label="Total Headings" value={String(headings.length)} />
          <StatBox label="Levels Used" value={String(new Set(headings.map(h => h.level)).size)} />
        </div>
        {h1Count !== 1 && <div className="p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">⚠ You should have exactly one H1 tag per page.</div>}
        <div className="space-y-1">{headings.map((h, i) => <div key={i} className="flex gap-2 text-sm"><span className="text-gray-400 font-mono w-8">H{h.level}</span><span style={{ paddingLeft: `${(h.level - 1) * 16}px` }} className="text-gray-700">{h.text}</span></div>)}</div>
      </>}
    </div>
  );
}

function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const keywordCount = keyword ? (text.toLowerCase().match(new RegExp(keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length : 0;
  const density = wordCount > 0 && keyword ? ((keywordCount / wordCount) * 100).toFixed(2) : '0.00';
  const ideal = +density >= 0.5 && +density <= 2.5;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Content</label><textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content here..." className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Target Keyword</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="seo tools" className="input-field" /></div>
      {keyword && wordCount > 0 && <div className="grid grid-cols-3 gap-4">
        <StatBox label="Density" value={`${density}%`} color={ideal ? 'teal' : 'purple'} />
        <StatBox label="Occurrences" value={String(keywordCount)} />
        <StatBox label="Total Words" value={String(wordCount)} />
      </div>}
      {keyword && wordCount > 0 && <div className={`p-3 rounded-lg text-sm ${ideal ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
        {ideal ? '✓ Keyword density looks good (0.5-2.5% is ideal)' : +density < 0.5 ? '! Keyword density is low. Consider using your keyword more naturally.' : '⚠ Keyword density is high. Avoid keyword stuffing.'}
      </div>}
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
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="Paste or type your content here..." className="input-field resize-none" />
      {text && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox label="Words" value={String(words)} color="teal" />
        <StatBox label="Characters" value={String(chars)} />
        <StatBox label="Chars (no spaces)" value={String(charsNoSpace)} />
        <StatBox label="Sentences" value={String(sentences)} />
        <StatBox label="Paragraphs" value={String(paragraphs)} />
        <StatBox label="Reading Time" value={`${readTime} min`} color="teal" />
      </div>}
    </div>
  );
}

function ReadabilityChecker() {
  const [text, setText] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const syllables = (word: string) => { const w = word.toLowerCase().replace(/[^a-z]/g, ''); if (w.length <= 3) return 1; const vowels = w.match(/[aeiouy]+/g); let c = vowels ? vowels.length : 1; if (w.endsWith('e')) c--; return Math.max(1, c); };
  const totalSyllables = words.reduce((s, w) => s + syllables(w), 0);
  const wc = words.length; const sc = sentences.length;
  const flesch = wc > 0 && sc > 0 ? Math.max(0, Math.round(206.835 - 1.015 * (wc / sc) - 84.6 * (totalSyllables / wc))) : 0;
  const grade = wc > 0 && sc > 0 ? Math.max(0, Math.round(0.39 * (wc / sc) + 11.8 * (totalSyllables / wc) - 15.59)) : 0;
  const level = flesch >= 80 ? 'Very Easy' : flesch >= 60 ? 'Easy' : flesch >= 40 ? 'Standard' : flesch >= 20 ? 'Difficult' : 'Very Difficult';
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your content to analyze readability..." className="input-field resize-none" />
      {wc > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Flesch Score" value={String(flesch)} color={flesch >= 60 ? 'teal' : 'purple'} />
        <StatBox label="Grade Level" value={String(grade)} />
        <StatBox label="Readability" value={level} color={flesch >= 60 ? 'teal' : 'purple'} />
        <StatBox label="Avg Words/Sentence" value={(wc / Math.max(1, sc)).toFixed(1)} />
      </div>}
      {wc > 0 && <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p><strong>Flesch Reading Ease:</strong> {flesch >= 60 ? 'Your content is easy to read for most audiences.' : 'Consider simplifying sentences for better readability.'}</p>
        <p className="mt-2"><strong>Grade Level:</strong> Requires a grade {grade} reading level. Most web content should target grade 8-10.</p>
      </div>}
    </div>
  );
}

function InternalLinkAnalyzer() {
  const [input, setInput] = useState('');
  const links = input.split('\n').filter(Boolean).map(l => { const [from, to] = l.split(/\s*[→>]+\s*/); return { from: from?.trim(), to: to?.trim() }; }).filter(l => l.from && l.to);
  const pages = new Set(links.flatMap(l => [l.from, l.to]));
  const inbound: Record<string, number> = {};
  const outbound: Record<string, number> = {};
  links.forEach(l => { inbound[l.to!] = (inbound[l.to!] || 0) + 1; outbound[l.from!] = (outbound[l.from!] || 0) + 1; });
  const orphans = [...pages].filter(p => !inbound[p]);
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Links (from → to, one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="/home → /about\n/home → /blog\n/blog → /blog/post-1" className="input-field resize-none font-mono text-sm" /></div>
      {pages.size > 0 && <div className="grid grid-cols-3 gap-4">
        <StatBox label="Pages" value={String(pages.size)} color="teal" />
        <StatBox label="Links" value={String(links.length)} />
        <StatBox label="Orphans" value={String(orphans.length)} color={orphans.length > 0 ? 'purple' : 'teal'} />
      </div>}
      {orphans.length > 0 && <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"><span className="font-medium text-yellow-700">⚠ Orphan pages (no inbound links):</span><ul className="mt-1 text-yellow-600 text-sm">{orphans.map(p => <li key={p}><code>{p}</code></li>)}</ul></div>}
      {pages.size > 0 && <div className="space-y-1">{[...pages].sort().map(p => <div key={p} className="flex justify-between px-2 py-1 bg-gray-50 rounded text-sm"><code>{p}</code><span className="text-gray-500">In: {inbound[p] || 0} | Out: {outbound[p] || 0}</span></div>)}</div>}
    </div>
  );
}

function AltTextGenerator() {
  const [subject, setSubject] = useState('');
  const [action, setAction] = useState('');
  const [context, setContext] = useState('');
  const alt = (() => { if (!subject) return ''; let result = subject; if (action) result += ` ${action}`; if (context) result += ` — ${context}`; return result; })();
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Main Subject *</label><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., Golden retriever puppy" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Action / State</label><input value={action} onChange={e => setAction(e.target.value)} placeholder="e.g., running on a beach" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Context / Purpose</label><input value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., hero image for pet adoption page" className="input-field" /></div>
      {alt && <><div className="p-4 bg-teal-50 rounded-lg"><span className="text-sm font-medium text-gray-500">Generated alt text:</span><p className="text-gray-900 mt-1 font-medium">"{alt}"</p></div><div className="text-xs text-gray-400">{alt.length} characters (aim for under 125)</div><CodeOutput label="HTML" code={`<img src="image.jpg" alt="${alt}" />`} /></>}
    </div>
  );
}

function AnchorTextAnalyzer() {
  const [input, setInput] = useState('');
  const anchors = input.split('\n').filter(Boolean).map(a => a.trim().toLowerCase());
  const freq: Record<string, number> = {};
  anchors.forEach(a => { freq[a] = (freq[a] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const total = anchors.length;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Anchor Texts (one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="your brand name\nbest seo tools\nclick here\nhttps://example.com" className="input-field resize-none" /></div>
      {total > 0 && <><StatBox label="Total Anchors" value={String(total)} color="teal" /><div className="space-y-1">{sorted.slice(0, 20).map(([text, count]) => <div key={text} className="flex justify-between text-sm p-2 bg-gray-50 rounded"><span className="truncate">{text}</span><span className="text-gray-500 ml-2 whitespace-nowrap">{count}× ({((count/total)*100).toFixed(1)}%)</span></div>)}</div></>}
    </div>
  );
}

function ContentGapFinder() {
  const [topic, setTopic] = useState('');
  const suggestions = topic ? [
    'What is ' + topic + '?',
    'How to use ' + topic,
    'Best practices for ' + topic,
    topic + ' benefits and drawbacks',
    topic + ' vs alternatives',
    'Common ' + topic + ' mistakes',
    topic + ' examples and case studies',
    'Getting started with ' + topic,
    topic + ' tools and resources',
    'Advanced ' + topic + ' techniques',
    topic + ' pricing and costs',
    topic + ' for beginners',
    'Future of ' + topic,
    topic + ' statistics and data',
    'Expert ' + topic + ' tips'
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., SEO optimization" className="input-field" /></div>
      {suggestions.length > 0 && <><h4 className="font-semibold text-gray-900">Suggested subtopics to cover:</h4><ul className="space-y-2">{suggestions.map((s, i) => <li key={i} className="p-3 bg-gray-50 rounded-lg text-sm flex items-start gap-2"><span className="text-purple-600">•</span><span>{s}</span></li>)}</ul></>}
    </div>
  );
}

function LSIKeywordGenerator() {
  const [keyword, setKeyword] = useState('');
  const lsi = keyword ? [
    keyword + ' guide',
    'best ' + keyword,
    keyword + ' tips',
    'how to ' + keyword,
    keyword + ' tutorial',
    keyword + ' strategies',
    keyword + ' techniques',
    keyword + ' tools',
    keyword + ' examples',
    keyword + ' checklist',
    'free ' + keyword,
    keyword + ' for beginners',
    keyword + ' definition',
    keyword + ' benefits',
    keyword + ' optimization'
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Seed Keyword</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g., content marketing" className="input-field" /></div>
      {lsi.length > 0 && <><h4 className="font-semibold text-gray-900">LSI Keywords (semantically related terms):</h4><div className="flex flex-wrap gap-2">{lsi.map((k, i) => <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">{k}</span>)}</div><div className="mt-2"><CopyBtn text={lsi.join('\n')} /></div></>}
    </div>
  );
}

function FeaturedSnippetOptimizer() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Format your content to target featured snippets (position zero) in Google.</p>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Question (H2 or H3)</label><input value={question} onChange={e => setQuestion(e.target.value)} placeholder="What is SEO?" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Concise Answer (40-60 words)</label><textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={4} placeholder="SEO (Search Engine Optimization) is the practice of..." className="input-field resize-none" /><span className="text-xs text-gray-400">{answer.split(/\s+/).filter(Boolean).length} words</span></div>
      {question && answer && <>
        <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <h4 className="font-bold text-gray-900 text-lg mb-2">{question}</h4>
          <p className="text-gray-700">{answer}</p>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Tips for featured snippets:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Answer the question directly in 40-60 words</li>
            <li>Use the question as an H2 or H3 heading</li>
            <li>Place the answer immediately after the heading</li>
            <li>Use lists, tables, or steps for how-to content</li>
          </ul>
        </div>
      </>}
    </div>
  );
}

function ContentLengthCalculator() {
  const [topic, setTopic] = useState('');
  const [competition, setCompetition] = useState('medium');
  const recommended = competition === 'low' ? '800-1200' : competition === 'medium' ? '1500-2500' : '2500-4000';
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Topic/Keyword</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., email marketing strategies" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Competition Level</label><select value={competition} onChange={e => setCompetition(e.target.value)} className="input-field"><option value="low">Low (newer keywords)</option><option value="medium">Medium (standard topics)</option><option value="high">High (competitive topics)</option></select></div>
      {topic && <div className="p-4 bg-teal-50 rounded-lg text-center"><div className="text-3xl font-bold text-teal-600">{recommended}</div><div className="text-sm text-gray-600 mt-1">Recommended word count</div><div className="text-xs text-gray-500 mt-2">Based on {competition} competition level</div></div>}
    </div>
  );
}

// ============================================================================
// TECHNICAL SEO TOOLS (16-30)
// ============================================================================

function RobotsGenerator() {
  const [userAgent, setUserAgent] = useState('*');
  const [disallow, setDisallow] = useState('/admin/\n/private/');
  const [allow, setAllow] = useState('');
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');
  const output = `User-agent: ${userAgent}\n${allow ? allow.split('\n').filter(Boolean).map(a => `Allow: ${a}`).join('\n') + '\n' : ''}${disallow.split('\n').filter(Boolean).map(d => `Disallow: ${d}`).join('\n')}\n\nSitemap: ${sitemap}`;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">User-agent</label><input value={userAgent} onChange={e => setUserAgent(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Sitemap URL</label><input value={sitemap} onChange={e => setSitemap(e.target.value)} className="input-field" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Allow (one per line)</label><textarea value={allow} onChange={e => setAllow(e.target.value)} rows={3} placeholder="/public/\n/assets/" className="input-field resize-none font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Disallow (one per line)</label><textarea value={disallow} onChange={e => setDisallow(e.target.value)} rows={3} className="input-field resize-none font-mono text-sm" /></div>
      </div>
      <CodeOutput label="robots.txt" code={output} />
    </div>
  );
}

function XMLSitemapGenerator() {
  const [urls, setUrls] = useState('https://example.com/\nhttps://example.com/about\nhttps://example.com/blog');
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split('\n').filter(u => u.trim()).map(u => `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}\n</urlset>`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URLs (one per line)</label><textarea value={urls} onChange={e => setUrls(e.target.value)} rows={8} placeholder="https://example.com/\nhttps://example.com/page" className="input-field resize-none font-mono text-sm" /></div>
      <CodeOutput label="sitemap.xml" code={xml} />
    </div>
  );
}

function SchemaGenerator() {
  const [type, setType] = useState('Article');
  const [fields, setFields] = useState<Record<string, string>>({ headline: '', author: '', datePublished: '', description: '' });
  const update = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }));
  const schemas: Record<string, any> = {
    Article: { '@context': 'https://schema.org', '@type': 'Article', headline: fields.headline, author: { '@type': 'Person', name: fields.author }, datePublished: fields.datePublished, description: fields.description },
    FAQPage: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: fields.question, acceptedAnswer: { '@type': 'Answer', text: fields.answer } }] },
    HowTo: { '@context': 'https://schema.org', '@type': 'HowTo', name: fields.name, description: fields.description, step: [{ '@type': 'HowToStep', text: fields.step1 }] },
    Product: { '@context': 'https://schema.org', '@type': 'Product', name: fields.name, description: fields.description, brand: { '@type': 'Brand', name: fields.brand }, offers: { '@type': 'Offer', price: fields.price, priceCurrency: 'USD' } },
    LocalBusiness: { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: fields.name, address: { '@type': 'PostalAddress', streetAddress: fields.street, addressLocality: fields.city, addressRegion: fields.state, postalCode: fields.zip }, telephone: fields.phone },
    Recipe: { '@context': 'https://schema.org', '@type': 'Recipe', name: fields.name, description: fields.description, recipeIngredient: (fields.ingredients || '').split('\n').filter(Boolean), recipeInstructions: fields.instructions }
  };
  const fieldDefs: Record<string, string[]> = {
    Article: ['headline', 'author', 'datePublished', 'description'],
    FAQPage: ['question', 'answer'],
    HowTo: ['name', 'description', 'step1'],
    Product: ['name', 'description', 'brand', 'price'],
    LocalBusiness: ['name', 'street', 'city', 'state', 'zip', 'phone'],
    Recipe: ['name', 'description', 'ingredients', 'instructions']
  };
  const output = JSON.stringify(schemas[type], null, 2);
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Schema Type</label><select value={type} onChange={e => { setType(e.target.value); setFields({}); }} className="input-field">{Object.keys(fieldDefs).map(t => <option key={t}>{t}</option>)}</select></div>
      {(fieldDefs[type] || []).map(f => <div key={f}><label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f.replace(/([A-Z])/g, ' $1')}</label>{f.includes('ingredients') || f.includes('instructions') ? <textarea value={fields[f] || ''} onChange={e => update(f, e.target.value)} rows={3} className="input-field resize-none" /> : <input value={fields[f] || ''} onChange={e => update(f, e.target.value)} className="input-field" type={f.includes('date') ? 'date' : f === 'price' ? 'number' : 'text'} />}</div>)}
      <CodeOutput label="JSON-LD Schema" code={`<script type="application/ld+json">\n${output}\n</script>`} />
    </div>
  );
}

function CanonicalBuilder() {
  const [url, setUrl] = useState('');
  const tag = `<link rel="canonical" href="${url}" />`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="input-field" /></div>
      {url && <><div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600"><p><strong>What is a canonical tag?</strong> It tells search engines which version of a page is the "master" copy when you have duplicate or similar content.</p><p className="mt-2"><strong>Use cases:</strong> Same content on multiple URLs, URL parameters, print versions, pagination.</p></div><CodeOutput label="Canonical Tag" code={tag} /></>}
    </div>
  );
}

function HreflangGenerator() {
  const [entries, setEntries] = useState([{ lang: 'en', url: 'https://example.com/' }, { lang: 'es', url: 'https://example.com/es/' }]);
  const add = () => setEntries([...entries, { lang: '', url: '' }]);
  const remove = (i: number) => setEntries(entries.filter((_, j) => j !== i));
  const update = (i: number, field: 'lang' | 'url', value: string) => { const n = [...entries]; n[i][field] = value; setEntries(n); };
  const tags = entries.filter(e => e.lang && e.url).map(e => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}" />`).join('\n') + (entries[0]?.url ? `\n<link rel="alternate" hreflang="x-default" href="${entries[0].url}" />` : '');
  return (
    <div className="space-y-4">
      {entries.map((e, i) => <div key={i} className="flex gap-2"><input value={e.lang} onChange={ev => update(i, 'lang', ev.target.value)} placeholder="en" className="input-field w-24" /><input value={e.url} onChange={ev => update(i, 'url', ev.target.value)} placeholder="https://..." className="input-field flex-1" /><button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 px-2">✗</button></div>)}
      <button onClick={add} className="text-sm text-purple-600 font-medium">+ Add language</button>
      {entries.some(e => e.lang && e.url) && <CodeOutput label="Hreflang Tags" code={tags} />}
    </div>
  );
}

function OGGenerator() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [url, setUrl] = useState('');
  const tags = `<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:image" content="${img}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:type" content="website" />`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Description" className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="https://example.com/image.jpg (1200x630)" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="input-field" /></div>
      {title && <><h4 className="text-sm font-medium text-gray-700 mt-4">Facebook Preview</h4><div className="border rounded-lg overflow-hidden max-w-lg">{img && <div className="bg-gray-100 aspect-video"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} /></div>}<div className="p-3 bg-gray-50"><div className="text-xs text-gray-400 uppercase">{url ? new URL(url).hostname : 'example.com'}</div><div className="font-semibold text-gray-900">{title}</div><div className="text-sm text-gray-500 line-clamp-2">{desc}</div></div></div><CodeOutput label="Open Graph Tags" code={tags} /></>}
    </div>
  );
}

function TwitterCardGenerator() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [site, setSite] = useState('');
  const tags = `<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:site" content="${site}" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${desc}" />\n<meta name="twitter:image" content="${img}" />`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="https://... (1200x628)" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">@site handle</label><input value={site} onChange={e => setSite(e.target.value)} placeholder="@yoursite" className="input-field" /></div>
      {title && <><h4 className="text-sm font-medium text-gray-700">Twitter Preview</h4><div className="border rounded-2xl overflow-hidden max-w-lg">{img && <div className="bg-gray-100 aspect-video"><img src={img} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} /></div>}<div className="p-3 border-t"><div className="text-xs text-gray-400">{site || 'example.com'}</div><div className="font-semibold text-gray-900 text-sm">{title}</div><div className="text-xs text-gray-500 line-clamp-2">{desc}</div></div></div><CodeOutput label="Twitter Card Tags" code={tags} /></>}
    </div>
  );
}

function StructuredDataValidator() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useState(false);
  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed['@context'] || !parsed['@type']) {
        setError('Missing @context or @type field');
        setValid(false);
      } else {
        setError('');
        setValid(true);
      }
    } catch (e: any) {
      setError(e.message);
      setValid(false);
    }
  };
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Paste JSON-LD</label><textarea value={input} onChange={e => { setInput(e.target.value); if (e.target.value) validate(); }} onBlur={validate} rows={12} placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "..."\n}' className="input-field resize-none font-mono text-sm" /></div>
      {input && <div className={`p-3 rounded-lg ${valid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {valid ? <><strong>✓ Valid JSON-LD</strong><p className="text-sm mt-1">Syntax is correct. For full schema.org validation, use Google's Rich Results Test.</p></> : <><strong>✗ Invalid JSON</strong><p className="text-sm mt-1">{error}</p></>}
      </div>}
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
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Redirects (old-path new-path, one per line)</label><textarea value={redirects} onChange={e => setRedirects(e.target.value)} rows={6} placeholder="/old-page /new-page" className="input-field resize-none font-mono text-sm" /></div>
      {output && <CodeOutput label=".htaccess 301 Redirects" code={output} />}
    </div>
  );
}

function SlugGenerator() {
  const [input, setInput] = useState('');
  const slug = input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Title or Text</label><input value={input} onChange={e => setInput(e.target.value)} placeholder="10 Best SEO Tools for 2026" className="input-field" /></div>
      {slug && <><div className="p-4 bg-teal-50 rounded-lg"><span className="text-sm text-gray-600">URL Slug:</span><div className="font-mono text-lg font-medium text-gray-900 mt-1">{slug}</div></div><div className="text-xs text-gray-400">Full URL: https://example.com/{slug}</div><CopyBtn text={slug} /></>}
    </div>
  );
}

function BreadcrumbSchema() {
  const [items, setItems] = useState([{ name: 'Home', url: 'https://example.com/' }, { name: 'Blog', url: 'https://example.com/blog/' }, { name: 'Post Title', url: '' }]);
  const add = () => setItems([...items, { name: '', url: '' }]);
  const remove = (i: number) => setItems(items.filter((_, j) => j !== i));
  const update = (i: number, field: 'name' | 'url', value: string) => { const n = [...items]; n[i][field] = value; setItems(n); };
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.filter(it => it.name).map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, ...(it.url ? { item: it.url } : {}) })) };
  return (
    <div className="space-y-4">
      {items.map((it, i) => <div key={i} className="flex gap-2 items-center"><input value={it.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Name" className="input-field w-40" /><input value={it.url} onChange={e => update(i, 'url', e.target.value)} placeholder="URL (blank for current)" className="input-field flex-1" /><button onClick={() => remove(i)} className="text-red-400 px-2">✗</button></div>)}
      <button onClick={add} className="text-sm text-purple-600 font-medium">+ Add level</button>
      <CodeOutput label="Breadcrumb JSON-LD" code={JSON.stringify(schema, null, 2)} />
    </div>
  );
}

function FAQSchema() {
  const [faqs, setFaqs] = useState([{ q: '', a: '' }, { q: '', a: '' }]);
  const add = () => setFaqs([...faqs, { q: '', a: '' }]);
  const remove = (i: number) => setFaqs(faqs.filter((_, j) => j !== i));
  const update = (i: number, field: 'q' | 'a', value: string) => { const n = [...faqs]; n[i][field] = value; setFaqs(n); };
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.filter(f => f.q && f.a).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => <div key={i} className="p-4 border rounded-lg space-y-2"><div className="flex justify-between"><span className="text-sm font-medium text-gray-700">FAQ #{i + 1}</span><button onClick={() => remove(i)} className="text-red-400 text-sm">Remove</button></div><input value={f.q} onChange={e => update(i, 'q', e.target.value)} placeholder="Question" className="input-field" /><textarea value={f.a} onChange={e => update(i, 'a', e.target.value)} rows={2} placeholder="Answer" className="input-field resize-none" /></div>)}
      <button onClick={add} className="text-sm text-purple-600 font-medium">+ Add FAQ</button>
      <CodeOutput label="FAQ Schema (JSON-LD)" code={JSON.stringify(schema, null, 2)} />
    </div>
  );
}

function PageSpeedChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const items = [
    ['i1','Enable Gzip/Brotli compression'],['i2','Minify CSS, JS, HTML'],['i3','Optimize images (WebP, compression)'],['i4','Use a CDN'],['i5','Enable browser caching'],['i6','Reduce server response time (TTFB < 200ms)'],['i7','Eliminate render-blocking resources'],['i8','Lazy load images below the fold'],['i9','Use font-display: swap for web fonts'],['i10','Preload critical resources'],['i11','Remove unused CSS/JS'],['i12','Optimize critical rendering path'],['i13','Use HTTP/2 or HTTP/3'],['i14','Implement resource hints (preconnect, prefetch)'],['i15','Minimize redirects'],['i16','Inline critical CSS'],['i17','Defer non-critical JavaScript'],['i18','Use async for third-party scripts'],['i19','Reduce DOM size (<1500 nodes)'],['i20','Avoid enormous network payloads'],['i21','Serve static assets with long cache lifetimes'],['i22','Avoid document.write()'],['i23','Use efficient cache policy'],['i24','Minimize main-thread work'],['i25','Keep request counts low'],['i26','Minimize payload sizes'],['i27','Avoid legacy JavaScript'],['i28','Preconnect to required origins'],['i29','Use video formats for animated content'],['i30','Implement proper image sizing']
  ];
  const pct = Math.round((checked.size / items.length) * 100);
  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg"><div className="text-4xl font-bold text-purple-600">{pct}%</div><div className="text-sm text-gray-600 mt-1">{checked.size}/{items.length} optimizations completed</div><div className="w-full bg-gray-200 rounded-full h-2 mt-3"><div className="bg-purple-600 h-2 rounded-full transition-all" style={{width:`${pct}%`}} /></div></div>
      <div className="space-y-1">{items.map(([id, label]) => <label key={id} className="flex items-start gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded cursor-pointer text-sm"><input type="checkbox" checked={checked.has(id)} onChange={() => toggle(id)} className="mt-0.5" /><span className={checked.has(id) ? 'line-through text-gray-400' : ''}>{label}</span></label>)}</div>
    </div>
  );
}

function CoreWebVitalsGuide() {
  return (
    <div className="space-y-6 prose prose-sm max-w-none">
      <div className="p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mt-0">Core Web Vitals — Google's User Experience Metrics</h3>
        <p className="text-sm text-gray-600 mb-0">Core Web Vitals are a set of real-world user-centric metrics that measure key aspects of user experience on the web.</p>
      </div>
      
      <div className="border-l-4 border-teal-500 pl-4 bg-teal-50 p-4 rounded">
        <h4 className="font-bold text-teal-900 mt-0">LCP — Largest Contentful Paint</h4>
        <p className="text-sm"><strong>What it measures:</strong> Loading performance. Time until the largest content element becomes visible.</p>
        <p className="text-sm"><strong>Good:</strong> &lt; 2.5 seconds | <strong>Needs Improvement:</strong> 2.5-4s | <strong>Poor:</strong> &gt; 4s</p>
        <p className="text-sm mb-0"><strong>How to improve:</strong></p>
        <ul className="text-sm space-y-1">
          <li>Optimize server response times</li>
          <li>Use a CDN</li>
          <li>Optimize and compress images (WebP)</li>
          <li>Preload critical resources</li>
          <li>Remove render-blocking resources</li>
        </ul>
      </div>
      
      <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded">
        <h4 className="font-bold text-purple-900 mt-0">INP — Interaction to Next Paint</h4>
        <p className="text-sm"><strong>What it measures:</strong> Interactivity. Latency of user interactions (clicks, taps, keyboard).</p>
        <p className="text-sm"><strong>Good:</strong> &lt; 200ms | <strong>Needs Improvement:</strong> 200-500ms | <strong>Poor:</strong> &gt; 500ms</p>
        <p className="text-sm mb-0"><strong>How to improve:</strong></p>
        <ul className="text-sm space-y-1">
          <li>Minimize JavaScript execution time</li>
          <li>Break up long tasks</li>
          <li>Optimize event handlers</li>
          <li>Use web workers for heavy computations</li>
          <li>Defer non-critical scripts</li>
        </ul>
      </div>
      
      <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
        <h4 className="font-bold text-blue-900 mt-0">CLS — Cumulative Layout Shift</h4>
        <p className="text-sm"><strong>What it measures:</strong> Visual stability. Unexpected layout shifts during page load.</p>
        <p className="text-sm"><strong>Good:</strong> &lt; 0.1 | <strong>Needs Improvement:</strong> 0.1-0.25 | <strong>Poor:</strong> &gt; 0.25</p>
        <p className="text-sm mb-0"><strong>How to improve:</strong></p>
        <ul className="text-sm space-y-1">
          <li>Set explicit width/height on images and videos</li>
          <li>Reserve space for ads and embeds</li>
          <li>Avoid inserting content above existing content</li>
          <li>Use CSS aspect-ratio or size attributes</li>
          <li>Preload fonts and use font-display: swap</li>
        </ul>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mt-0">Tools to Measure Core Web Vitals</h4>
        <ul className="text-sm space-y-1 mb-0">
          <li><strong>Google PageSpeed Insights:</strong> Lab + field data</li>
          <li><strong>Chrome DevTools Lighthouse:</strong> Lab testing</li>
          <li><strong>Search Console Core Web Vitals Report:</strong> Real user data</li>
          <li><strong>Web Vitals Chrome Extension:</strong> Real-time measurements</li>
        </ul>
      </div>
    </div>
  );
}

function MobileFriendlyChecker() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const items = [
    ['m1','Uses responsive design (viewport meta tag)'],['m2','Text is readable without zooming (16px min)'],['m3','Content fits within viewport width'],['m4','Touch targets are at least 48x48px'],['m5','Touch targets have adequate spacing (8px min)'],['m6','Links and buttons are easy to tap'],['m7','No horizontal scrolling required'],['m8','Avoids plugins (Flash, Java)'],['m9','Font sizes are legible on small screens'],['m10','Line height and spacing are comfortable'],['m11','Navigation is thumb-friendly'],['m12','Forms are easy to fill on mobile'],['m13','Pop-ups don\'t block content'],['m14','Images scale properly'],['m15','Page loads quickly on mobile networks']
  ];
  const pct = Math.round((checked.size / items.length) * 100);
  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-teal-50 rounded-lg"><div className="text-4xl font-bold text-teal-600">{pct}%</div><div className="text-sm text-gray-600 mt-1">{checked.size}/{items.length} checks passed</div><div className="w-full bg-gray-200 rounded-full h-2 mt-3"><div className="bg-teal-600 h-2 rounded-full transition-all" style={{width:`${pct}%`}} /></div></div>
      <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">💡 Google uses mobile-first indexing. Your mobile site is what Google primarily uses for ranking.</div>
      <div className="space-y-1">{items.map(([id, label]) => <label key={id} className="flex items-start gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded cursor-pointer text-sm"><input type="checkbox" checked={checked.has(id)} onChange={() => toggle(id)} className="mt-0.5" /><span className={checked.has(id) ? 'line-through text-gray-400' : ''}>{label}</span></label>)}</div>
    </div>
  );
}

// ============================================================================
// CONTENT & KEYWORD TOOLS (31-40)
// ============================================================================

function BlogOutlineGenerator() {
  const [topic, setTopic] = useState('');
  const outline = topic ? [
    { h: 'H1', text: topic },
    { h: 'H2', text: `What is ${topic}?` },
    { h: 'H3', text: 'Definition and key concepts' },
    { h: 'H3', text: `Why ${topic} matters` },
    { h: 'H2', text: `How to get started with ${topic}` },
    { h: 'H3', text: 'Step 1: Research and planning' },
    { h: 'H3', text: 'Step 2: Implementation' },
    { h: 'H3', text: 'Step 3: Optimization' },
    { h: 'H2', text: `Best practices for ${topic}` },
    { h: 'H3', text: 'Common mistakes to avoid' },
    { h: 'H3', text: 'Expert tips and tricks' },
    { h: 'H2', text: `${topic} tools and resources` },
    { h: 'H2', text: 'Conclusion' },
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Email Marketing Automation" className="input-field" /></div>
      {outline.length > 0 && <><h4 className="font-semibold text-gray-900">Generated Outline:</h4><div className="space-y-1 p-4 bg-gray-50 rounded-lg">{outline.map((o, i) => <div key={i} className="flex gap-3 text-sm" style={{ paddingLeft: o.h === 'H3' ? '20px' : '0' }}><span className="text-purple-600 font-mono font-medium w-8">{o.h}</span><span className="text-gray-800">{o.text}</span></div>)}</div><CopyBtn text={outline.map(o => `${o.h}: ${o.text}`).join('\n')} /></>}
    </div>
  );
}

function SEOTitleGenerator() {
  const [keyword, setKeyword] = useState('');
  const titles = keyword ? [
    `${keyword}: The Complete Guide for 2026`,
    `10 Proven ${keyword} Strategies That Actually Work`,
    `How to Master ${keyword} in 30 Days (Step-by-Step)`,
    `${keyword} 101: Everything You Need to Know`,
    `The Ultimate ${keyword} Checklist [Free Download]`,
    `${keyword}: 7 Mistakes You're Probably Making`,
    `Best ${keyword} Tools and Software (Compared)`,
    `${keyword} Made Simple: A Beginner's Guide`,
    `Why ${keyword} Matters (And How to Do It Right)`,
    `${keyword} Tips from Industry Experts [2026]`
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Target Keyword</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g., content marketing" className="input-field" /></div>
      {titles.length > 0 && <><h4 className="font-semibold text-gray-900">10 Title Options:</h4><div className="space-y-2">{titles.map((t, i) => <div key={i} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-start gap-2 cursor-pointer group" onClick={() => navigator.clipboard.writeText(t)}><span className="text-purple-600 font-bold">{i+1}.</span><span className="flex-1 text-gray-800">{t}</span><span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100">📋</span></div>)}</div></>}
    </div>
  );
}

function MetaDescriptionWriter() {
  const [summary, setSummary] = useState('');
  const descriptions = summary ? [
    `${summary.slice(0, 140)}. Learn more →`,
    `Discover ${summary.toLowerCase()}. Expert tips & actionable advice.`,
    `Everything you need to know about ${summary.toLowerCase()}. Free guide inside.`,
    `${summary}. Click to read the full breakdown.`,
    `Want to improve? ${summary}. Get started today.`
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Summary</label><textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} placeholder="Briefly describe what your page is about..." className="input-field resize-none" /></div>
      {descriptions.length > 0 && <><h4 className="font-semibold text-gray-900">5 Meta Description Options:</h4><div className="space-y-2">{descriptions.map((d, i) => <div key={i} className="p-3 bg-gray-50 rounded-lg"><div className="text-sm text-gray-800">{d}</div><div className="text-xs text-gray-400 mt-1">{d.length} characters</div></div>)}</div></>}
    </div>
  );
}

function ContentCalendar() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [entries, setEntries] = useState<Record<string, string>>({});
  const update = (day: string, text: string) => setEntries(e => ({ ...e, [day]: text }));
  const daysInMonth = new Date(month + '-01').getMonth() === new Date(month + '-31').getMonth() ? 31 : new Date(month + '-01').getMonth() === 1 ? 28 : 30;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Month</label><input type="month" value={month} onChange={e => setMonth(e.target.value)} className="input-field" /></div>
      <div className="grid grid-cols-7 gap-2">{Array.from({ length: daysInMonth }, (_, i) => { const day = String(i + 1).padStart(2, '0'); const key = `${month}-${day}`; return <div key={key} className="border rounded p-2 min-h-24"><div className="text-xs font-bold text-gray-500 mb-1">{day}</div><textarea value={entries[key] || ''} onChange={e => update(key, e.target.value)} placeholder="Topic..." className="w-full text-xs border-0 p-0 resize-none focus:outline-none" rows={2} /></div>; })}</div>
    </div>
  );
}

function KeywordClustering() {
  const [input, setInput] = useState('');
  const keywords = input.split('\n').filter(Boolean).map(k => k.trim().toLowerCase());
  const groups: Record<string, string[]> = {};
  keywords.forEach(kw => { const words = kw.split(/\s+/); const key = words.length > 1 ? words.slice(0, Math.min(2, words.length - 1)).join(' ') : kw; if (!groups[key]) groups[key] = []; groups[key].push(kw); });
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords (one per line)</label><textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="seo tools free\nseo tools for beginners\nkeyword research tips\nkeyword research tools" className="input-field resize-none" /></div>
      {Object.keys(groups).length > 0 && <><h4 className="font-semibold text-gray-900">{Object.keys(groups).length} Clusters Found:</h4><div className="space-y-3">{Object.entries(groups).sort((a,b) => b[1].length - a[1].length).map(([group, kws]) => <div key={group} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500"><div className="font-medium text-purple-900 text-sm mb-1">{group} ({kws.length} keywords)</div><div className="text-sm text-gray-700">{kws.join(', ')}</div></div>)}</div></>}
    </div>
  );
}

function SearchIntentClassifier() {
  const [keywords, setKeywords] = useState('');
  const classify = (kw: string): string => {
    const k = kw.toLowerCase();
    if (/buy|price|cheap|deal|discount|coupon|order|purchase|shop|for sale/.test(k)) return 'Transactional';
    if (/best|top|review|comparison|vs|alternative|compare/.test(k)) return 'Commercial';
    if (/login|\.com|\.org|website|official|youtube|facebook|brand name/.test(k)) return 'Navigational';
    return 'Informational';
  };
  const colors: Record<string, string> = {
    Transactional: 'bg-red-100 text-red-700 border-red-300',
    Commercial: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Navigational: 'bg-blue-100 text-blue-700 border-blue-300',
    Informational: 'bg-green-100 text-green-700 border-green-300'
  };
  const results = keywords.split('\n').filter(Boolean).map(k => ({ keyword: k.trim(), intent: classify(k) }));
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords (one per line)</label><textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows={6} placeholder="how to improve SEO\nbuy SEO tools\nbest SEO software\ngoogle.com" className="input-field resize-none" /></div>
      {results.length > 0 && <div className="space-y-2">{results.map((r, i) => <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded"><span className="text-sm">{r.keyword}</span><span className={`text-xs px-2 py-1 rounded-full font-medium border ${colors[r.intent]}`}>{r.intent}</span></div>)}</div>}
    </div>
  );
}

function CompetitorKeywordGap() {
  const [your, setYour] = useState('');
  const [competitor, setCompetitor] = useState('');
  const yourKw = new Set(your.toLowerCase().split('\n').filter(Boolean).map(k => k.trim()));
  const compKw = competitor.toLowerCase().split('\n').filter(Boolean).map(k => k.trim());
  const gaps = compKw.filter(k => !yourKw.has(k));
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Keywords</label><textarea value={your} onChange={e => setYour(e.target.value)} rows={5} placeholder="keyword 1\nkeyword 2" className="input-field resize-none" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Competitor Keywords</label><textarea value={competitor} onChange={e => setCompetitor(e.target.value)} rows={5} placeholder="keyword 1\nkeyword 3" className="input-field resize-none" /></div>
      {gaps.length > 0 && <><h4 className="font-semibold text-gray-900">Keyword Gaps ({gaps.length} keywords your competitor ranks for that you don't):</h4><div className="space-y-1">{gaps.map((k, i) => <div key={i} className="p-2 bg-yellow-50 text-yellow-800 rounded text-sm border-l-2 border-yellow-500">{k}</div>)}</div><CopyBtn text={gaps.join('\n')} /></>}
    </div>
  );
}

function LongTailKeywordGenerator() {
  const [seed, setSeed] = useState('');
  const modifiers = {
    questions: ['how to','what is','why','when','where','can you','should you'],
    comparisons: ['vs','or','compared to','alternative to','vs','like'],
    intent: ['buy','for sale','near me','online','free','cheap','best','review'],
    qualifiers: ['for beginners','for small business','tips','guide','examples','2026','checklist']
  };
  const results = seed ? Object.values(modifiers).flat().flatMap(m => [`${m} ${seed}`, `${seed} ${m}`]).filter((v, i, a) => a.indexOf(v) === i) : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Seed Keyword</label><input value={seed} onChange={e => setSeed(e.target.value)} placeholder="e.g., email marketing" className="input-field" /></div>
      {results.length > 0 && <><div className="flex justify-between items-center"><h4 className="font-semibold text-gray-900">{results.length} Long-Tail Variations</h4><CopyBtn text={results.join('\n')} /></div><div className="max-h-64 overflow-y-auto space-y-1">{results.slice(0, 50).map((r, i) => <div key={i} className="text-sm p-2 bg-gray-50 rounded">{r}</div>)}</div></>}
    </div>
  );
}

function PeopleAlsoAskGenerator() {
  const [topic, setTopic] = useState('');
  const questions = topic ? [
    `What is ${topic}?`,
    `How does ${topic} work?`,
    `Why is ${topic} important?`,
    `What are the benefits of ${topic}?`,
    `How much does ${topic} cost?`,
    `Is ${topic} worth it?`,
    `What are the best ${topic} tools?`,
    `How to get started with ${topic}?`,
    `What are ${topic} best practices?`,
    `How long does ${topic} take?`,
    `What is the difference between ${topic} and [alternative]?`,
    `Can I do ${topic} myself?`,
    `What are common ${topic} mistakes?`,
    `How to measure ${topic} success?`,
    `What is the future of ${topic}?`
  ] : [];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., link building" className="input-field" /></div>
      {questions.length > 0 && <><h4 className="font-semibold text-gray-900">People Also Ask Questions:</h4><ul className="space-y-2">{questions.map((q, i) => <li key={i} className="p-3 bg-gray-50 rounded-lg text-sm border-l-2 border-purple-500">{q}</li>)}</ul><CopyBtn text={questions.join('\n')} /></>}
    </div>
  );
}

function ContentRefreshChecker() {
  const [published, setPublished] = useState('');
  const [updated, setUpdated] = useState('');
  const daysSince = (date: string) => date ? Math.floor((Date.now() - new Date(date).getTime()) / 86400000) : 0;
  const pubDays = daysSince(published);
  const updDays = updated ? daysSince(updated) : pubDays;
  const shouldRefresh = updDays > 180;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Originally Published</label><input type="date" value={published} onChange={e => setPublished(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Updated (optional)</label><input type="date" value={updated} onChange={e => setUpdated(e.target.value)} className="input-field" /></div>
      {published && <><div className="grid grid-cols-2 gap-4"><StatBox label="Days Since Published" value={String(pubDays)} /><StatBox label="Days Since Updated" value={String(updDays)} color={shouldRefresh ? 'purple' : 'teal'} /></div><div className={`p-4 rounded-lg ${shouldRefresh ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-green-50 border-l-4 border-green-500'}`}><div className={`font-semibold ${shouldRefresh ? 'text-yellow-800' : 'text-green-800'}`}>{shouldRefresh ? '⚠ Time to refresh!' : '✓ Content is relatively fresh'}</div><div className={`text-sm mt-1 ${shouldRefresh ? 'text-yellow-700' : 'text-green-700'}`}>{shouldRefresh ? 'Content older than 6 months should be reviewed and updated with fresh data, examples, and insights.' : 'Consider updating every 6-12 months to maintain relevance.'}</div></div></>}
    </div>
  );
}

// ============================================================================
// LINK BUILDING & ANALYTICS TOOLS (41-50)
// ============================================================================

function BacklinkOpportunityFinder() {
  const [niche, setNiche] = useState('');
  const strategies = [
    'Guest posting on industry blogs',
    'Resource page link building',
    'Broken link building',
    'Unlinked brand mentions',
    'Competitor backlink analysis',
    'HARO (Help a Reporter Out)',
    'Industry roundups and expert quotes',
    'Create link-worthy infographics',
    'Original research and data studies',
    'Tool or calculator creation',
    'Directory submissions (niche-specific)',
    'Podcast guest appearances',
    'Webinar hosting',
    'Community forum participation',
    'Strategic partnerships'
  ];
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Niche</label><input value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., SaaS, ecommerce, digital marketing" className="input-field" /></div>
      <h4 className="font-semibold text-gray-900">Link Building Strategies:</h4>
      <ul className="space-y-2">{strategies.map((s, i) => <li key={i} className="p-3 bg-gray-50 rounded-lg text-sm flex items-start gap-2"><span className="text-teal-600 font-bold">{i+1}.</span><span>{s}</span></li>)}</ul>
    </div>
  );
}

function GuestPostPitchGenerator() {
  const [site, setSite] = useState('');
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const template = `Subject: Guest Post Idea: ${topic}\n\nHi [Editor's Name],\n\nI'm ${name}, and I've been following ${site} for a while. I love your content on [specific topic area].\n\nI'd like to contribute a guest post titled "${topic}". This article would cover:\n\n• [Key point 1]\n• [Key point 2]\n• [Key point 3]\n\nI've written for [other publications] and have expertise in [your niche]. Here are some writing samples: [links]\n\nI can deliver a 1,500-2,000 word post within [timeframe]. The content will be 100% original and tailored to your audience.\n\nWould this be a good fit for ${site}?\n\nBest regards,\n${name}`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Target Site</label><input value={site} onChange={e => setSite(e.target.value)} placeholder="Example Blog" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Article Topic</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="10 SEO Myths Debunked" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="input-field" /></div>
      {site && topic && name && <CodeOutput label="Email Template" code={template} />}
    </div>
  );
}

function BrokenLinkGuide() {
  return (
    <div className="prose prose-sm max-w-none space-y-4">
      <div className="p-4 bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mt-0">Broken Link Building — Step-by-Step Guide</h3>
        <p className="text-sm text-gray-600 mb-0">Find broken links on relevant sites, create replacement content, and earn high-quality backlinks.</p>
      </div>
      
      <div className="border-l-4 border-teal-500 pl-4 bg-teal-50 p-3 rounded">
        <h4 className="font-bold text-teal-900 mt-0">Step 1: Find Broken Links</h4>
        <p className="text-sm mb-0">Use tools like Ahrefs, Screaming Frog, or Check My Links (Chrome extension) to find 404 pages on authority sites in your niche.</p>
      </div>
      
      <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
        <h4 className="font-bold text-purple-900 mt-0">Step 2: Analyze the Opportunity</h4>
        <ul className="text-sm space-y-1 mb-0">
          <li>Check how many sites link to the dead page (use Ahrefs or Moz)</li>
          <li>Evaluate domain authority of linking sites</li>
          <li>Determine if the topic fits your content strategy</li>
        </ul>
      </div>
      
      <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
        <h4 className="font-bold text-blue-900 mt-0">Step 3: Create Better Content</h4>
        <p className="text-sm mb-0">Write a comprehensive replacement resource that's better than the original. Make it the best content available on that topic.</p>
      </div>
      
      <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3 rounded">
        <h4 className="font-bold text-yellow-900 mt-0">Step 4: Outreach</h4>
        <p className="text-sm"><strong>Email template:</strong></p>
        <p className="text-xs font-mono bg-white p-2 rounded mb-0">Hi [Name],<br/><br/>I noticed you link to [broken URL] on [page URL]. Unfortunately, that page is no longer available.<br/><br/>I recently published a similar resource: [your URL]. It might be a good replacement.<br/><br/>Either way, thought you'd want to know about the broken link!<br/><br/>Best,<br/>[Your Name]</p>
      </div>
      
      <div className="p-3 bg-gray-50 rounded">
        <h4 className="font-semibold text-gray-900 mt-0">Pro Tips</h4>
        <ul className="text-sm space-y-1 mb-0">
          <li>Personalize each outreach email</li>
          <li>Don't be pushy—offer value first</li>
          <li>Follow up once after 5-7 days</li>
          <li>Target resource pages and link roundups</li>
        </ul>
      </div>
    </div>
  );
}

function LinkBuildingROICalculator() {
  const [hours, setHours] = useState('10');
  const [hourlyRate, setHourlyRate] = useState('50');
  const [linksGained, setLinksGained] = useState('5');
  const [avgDA, setAvgDA] = useState('40');
  const cost = +hours * +hourlyRate;
  const estValue = +linksGained * (+avgDA * 2); // Rough estimate: DA40 link = $80 value
  const roi = cost > 0 ? (((estValue - cost) / cost) * 100).toFixed(0) : '0';
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Hours Spent</label><input type="number" value={hours} onChange={e => setHours(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label><input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Links Gained</label><input type="number" value={linksGained} onChange={e => setLinksGained(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Avg Domain Authority</label><input type="number" value={avgDA} onChange={e => setAvgDA(e.target.value)} className="input-field" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatBox label="Total Cost" value={`$${cost}`} />
        <StatBox label="Est. Value" value={`$${estValue}`} color="teal" />
        <StatBox label="ROI" value={`${roi}%`} color={+roi > 0 ? 'teal' : 'purple'} />
      </div>
      <div className="text-xs text-gray-400 p-2 bg-gray-50 rounded">Note: Estimated value based on average market rates for backlinks. Actual value depends on relevance, traffic, and link quality.</div>
    </div>
  );
}

function DomainAuthorityEstimator() {
  const [backlinks, setBacklinks] = useState('100');
  const [domains, setDomains] = useState('50');
  const [age, setAge] = useState('5');
  const estDA = Math.min(100, Math.round(
    (Math.log(+backlinks + 1) * 5) +
    (Math.log(+domains + 1) * 8) +
    (+age * 2)
  ));
  const category = estDA < 20 ? 'Low' : estDA < 40 ? 'Below Average' : estDA < 60 ? 'Average' : estDA < 80 ? 'Good' : 'Excellent';
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Backlinks</label><input type="number" value={backlinks} onChange={e => setBacklinks(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Linking Root Domains</label><input type="number" value={domains} onChange={e => setDomains(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Domain Age (years)</label><input type="number" value={age} onChange={e => setAge(e.target.value)} className="input-field" /></div>
      <div className="p-6 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg text-center">
        <div className="text-5xl font-black text-purple-600">{estDA}</div>
        <div className="text-sm text-gray-600 mt-2">Estimated Domain Authority</div>
        <div className="text-xs text-gray-500 mt-1">{category}</div>
      </div>
      <div className="text-xs text-gray-400 p-2 bg-gray-50 rounded">This is a rough estimate. Use Moz, Ahrefs DR, or Semrush AS for accurate metrics.</div>
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
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Source *</label><input value={source} onChange={e => setSource(e.target.value)} placeholder="google, newsletter" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Medium *</label><input value={medium} onChange={e => setMedium(e.target.value)} placeholder="cpc, email, social" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Campaign *</label><input value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="spring_sale" className="input-field" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Term (optional)</label><input value={term} onChange={e => setTerm(e.target.value)} placeholder="keyword" className="input-field" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Content (optional)</label><input value={content} onChange={e => setContent(e.target.value)} placeholder="banner_ad_1" className="input-field" /></div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg"><span className="text-xs text-gray-500">Generated URL:</span><div className="font-mono text-sm break-all mt-1 text-gray-900">{url}</div></div>
      <CopyBtn text={url} />
    </div>
  );
}

function GA4EventBuilder() {
  const [eventName, setEventName] = useState('purchase');
  const [params, setParams] = useState('currency: USD\nvalue: 99.99\ntransaction_id: T12345');
  const paramsObj = params.split('\n').filter(Boolean).reduce((acc, line) => {
    const [key, val] = line.split(':').map(s => s.trim());
    if (key && val) acc[key] = isNaN(+val) ? val : +val;
    return acc;
  }, {} as Record<string, any>);
  const code = `gtag('event', '${eventName}', ${JSON.stringify(paramsObj, null, 2)});`;
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label><input value={eventName} onChange={e => setEventName(e.target.value)} placeholder="purchase, sign_up, download" className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Parameters (key: value, one per line)</label><textarea value={params} onChange={e => setParams(e.target.value)} rows={5} className="input-field resize-none font-mono text-sm" /></div>
      <CodeOutput label="GA4 gtag.js Code" code={code} />
    </div>
  );
}

function ABTestCalculator() {
  const [visitors, setVisitors] = useState('1000');
  const [baseConv, setBaseConv] = useState('2');
  const [minDetect, setMinDetect] = useState('20');
  const conv = +baseConv / 100;
  const lift = +minDetect / 100;
  const sampleSize = Math.ceil((16 * conv * (1 - conv)) / ((lift * conv) ** 2));
  const daysNeeded = Math.ceil(sampleSize / +visitors);
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Daily Visitors per Variation</label><input type="number" value={visitors} onChange={e => setVisitors(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Baseline Conversion Rate (%)</label><input type="number" value={baseConv} onChange={e => setBaseConv(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Minimum Detectable Effect (%)</label><input type="number" value={minDetect} onChange={e => setMinDetect(e.target.value)} placeholder="20" className="input-field" /></div>
      <div className="grid grid-cols-2 gap-4">
        <StatBox label="Sample Size Needed" value={String(sampleSize)} color="teal" />
        <StatBox label="Days to Run Test" value={String(daysNeeded)} color="teal" />
      </div>
      <div className="text-xs text-gray-400 p-2 bg-gray-50 rounded">Based on 95% confidence and 80% statistical power. Run your test for at least this many days or 2 full business cycles.</div>
    </div>
  );
}

function CTRCalculator() {
  const [impressions, setImpressions] = useState('10000');
  const [clicks, setClicks] = useState('250');
  const ctr = +impressions > 0 ? ((+clicks / +impressions) * 100).toFixed(2) : '0.00';
  const benchmark = +ctr > 3 ? 'Excellent' : +ctr > 1.5 ? 'Good' : +ctr > 0.5 ? 'Average' : 'Needs Improvement';
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Impressions</label><input type="number" value={impressions} onChange={e => setImpressions(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Clicks</label><input type="number" value={clicks} onChange={e => setClicks(e.target.value)} className="input-field" /></div>
      <div className="p-6 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg text-center">
        <div className="text-5xl font-black text-purple-600">{ctr}%</div>
        <div className="text-sm text-gray-600 mt-2">Click-Through Rate</div>
        <div className="text-xs text-gray-500 mt-1">{benchmark}</div>
      </div>
      <div className="p-3 bg-gray-50 rounded text-sm text-gray-600">
        <p className="font-semibold mb-1">CTR Benchmarks (Google Search):</p>
        <ul className="space-y-1">
          <li>Position 1: ~27% CTR</li>
          <li>Position 2: ~15% CTR</li>
          <li>Position 3: ~10% CTR</li>
          <li>Position 10: ~2.5% CTR</li>
        </ul>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [investment, setInvestment] = useState('1000');
  const [revenue, setRevenue] = useState('3000');
  const profit = +revenue - +investment;
  const roi = +investment > 0 ? ((profit / +investment) * 100).toFixed(1) : '0.0';
  const roas = +investment > 0 ? (+revenue / +investment).toFixed(2) : '0.00';
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Investment ($)</label><input type="number" value={investment} onChange={e => setInvestment(e.target.value)} className="input-field" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label><input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} className="input-field" /></div>
      <div className="grid grid-cols-3 gap-4">
        <StatBox label="Profit" value={`$${profit}`} color={profit > 0 ? 'teal' : 'purple'} />
        <StatBox label="ROI" value={`${roi}%`} color={+roi > 0 ? 'teal' : 'purple'} />
        <StatBox label="ROAS" value={`${roas}x`} color={+roas > 1 ? 'teal' : 'purple'} />
      </div>
      <div className="p-3 bg-gray-50 rounded text-sm text-gray-600">
        <p><strong>ROI (Return on Investment):</strong> {+roi > 0 ? `You earned \$${roi} for every \$100 invested.` : 'Negative return — you lost money.'}</p>
        <p className="mt-2"><strong>ROAS (Return on Ad Spend):</strong> {+roas >= 1 ? `You earned \$${roas} for every \$1 spent.` : 'ROAS below 1 means you are losing money.'}</p>
      </div>
    </div>
  );
}

// ============================================================================
// TOOL COMPONENT REGISTRY
// ============================================================================

const toolComponents: Record<string, React.FC> = {
  // On-Page SEO (1-15)
  'meta-tag-generator': MetaTagGenerator,
  'serp-preview': SERPPreview,
  'title-length-checker': TitleLengthChecker,
  'meta-description-length-checker': MetaDescriptionLengthChecker,
  'heading-structure-analyzer': HeadingStructureAnalyzer,
  'keyword-density': KeywordDensityChecker,
  'word-counter': WordCounter,
  'readability-checker': ReadabilityChecker,
  'internal-link-analyzer': InternalLinkAnalyzer,
  'alt-text-generator': AltTextGenerator,
  'anchor-text-analyzer': AnchorTextAnalyzer,
  'content-gap-finder': ContentGapFinder,
  'lsi-keyword-generator': LSIKeywordGenerator,
  'featured-snippet-optimizer': FeaturedSnippetOptimizer,
  'content-length-calculator': ContentLengthCalculator,
  // Technical SEO (16-30)
  'robots-generator': RobotsGenerator,
  'xml-sitemap-generator': XMLSitemapGenerator,
  'schema-generator': SchemaGenerator,
  'canonical-builder': CanonicalBuilder,
  'hreflang-generator': HreflangGenerator,
  'og-generator': OGGenerator,
  'twitter-card': TwitterCardGenerator,
  'structured-data-validator': StructuredDataValidator,
  'htaccess-generator': HtaccessGenerator,
  'slug-generator': SlugGenerator,
  'breadcrumb-schema': BreadcrumbSchema,
  'faq-schema': FAQSchema,
  'page-speed-checklist': PageSpeedChecklist,
  'core-web-vitals-guide': CoreWebVitalsGuide,
  'mobile-friendly-checker': MobileFriendlyChecker,
  // Content & Keyword (31-40)
  'blog-outline-generator': BlogOutlineGenerator,
  'seo-title-generator': SEOTitleGenerator,
  'meta-description-writer': MetaDescriptionWriter,
  'content-calendar': ContentCalendar,
  'keyword-clustering': KeywordClustering,
  'search-intent-classifier': SearchIntentClassifier,
  'competitor-keyword-gap': CompetitorKeywordGap,
  'long-tail-keyword-generator': LongTailKeywordGenerator,
  'people-also-ask': PeopleAlsoAskGenerator,
  'content-refresh-checker': ContentRefreshChecker,
  // Link Building & Analytics (41-50)
  'backlink-opportunity-finder': BacklinkOpportunityFinder,
  'guest-post-pitch': GuestPostPitchGenerator,
  'broken-link-guide': BrokenLinkGuide,
  'link-building-roi': LinkBuildingROICalculator,
  'domain-authority-estimator': DomainAuthorityEstimator,
  'utm-builder': UTMBuilder,
  'ga4-event-builder': GA4EventBuilder,
  'ab-test-calculator': ABTestCalculator,
  'ctr-calculator': CTRCalculator,
  'roi-calculator': ROICalculator,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const ToolComponent = toolComponents[slug || ''];

  if (!tool || !ToolComponent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tool Not Found</h1>
        <Link to="/tools" className="text-purple-600 hover:underline mt-4 inline-block">← Back to all tools</Link>
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
        browserRequirements: 'Requires JavaScript. No registration needed.'
      })}} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/tools" className="hover:text-purple-600">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">{tool.name}</span>
        </nav>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{tool.name}</h1>
          <p className="text-lg text-gray-600">{tool.description}</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <ToolComponent />
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">✨ All tools run 100% in your browser. No data is sent to any server.</p>
          <Link to="/tools" className="text-purple-600 hover:text-purple-700 font-medium text-sm mt-2 inline-block">← Browse all 50 free SEO tools</Link>
        </div>
      </div>
    </>
  );
}
