import { Link } from 'react-router-dom';
import { Tool } from '../types';
import * as Icons from 'lucide-react';

function getIcon(name: string) {
  const Icon = (Icons as any)[name];
  if (Icon) return <Icon className="w-6 h-6" />;
  return <Icons.Wrench className="w-6 h-6" />;
}

const categoryColors: Record<string, string> = {
  'on-page': 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
  'technical': 'bg-teal-50 text-teal-600 group-hover:bg-teal-100',
  'content': 'bg-violet-50 text-violet-600 group-hover:bg-violet-100',
  'link-analytics': 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
};

const categoryLabels: Record<string, string> = {
  'on-page': 'On-Page SEO',
  'technical': 'Technical SEO',
  'content': 'Content & Keywords',
  'link-analytics': 'Links & Analytics',
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const colors = categoryColors[tool.category] || categoryColors['on-page'];
  return (
    <Link to={`/tools/${tool.slug}`} className="group block p-6 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition ${colors}`}>
        {getIcon(tool.icon)}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{categoryLabels[tool.category]}</span>
      <h3 className="font-bold text-gray-900 mb-2 mt-1">{tool.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
      <span className="text-sm font-semibold text-purple-600 group-hover:text-purple-700">Use free tool →</span>
    </Link>
  );
}
