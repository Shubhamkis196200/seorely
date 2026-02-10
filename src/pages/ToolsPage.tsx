import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { tools } from '../data';

export default function ToolsPage() {
  return (
    <>
      <SEOHead title="Free SEO Tools" description="Powerful free SEO tools: Meta tag checker, keyword density analyzer, SERP preview, and robots.txt generator." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Free SEO Tools</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Analyze, optimize, and improve your search performance with our free tools. No signup required.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map(t => <ToolCard key={t.id} tool={t} />)}
        </div>
      </div>
    </>
  );
}
