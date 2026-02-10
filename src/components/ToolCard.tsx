import { Link } from 'react-router-dom';
import { Tool } from '../types';
import { Tags, BarChart3, Search, Bot } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Tags: <Tags className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link to={`/tools/${tool.slug}`} className="group block p-6 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-100 transition">
        {iconMap[tool.icon] || <Tags className="w-6 h-6" />}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{tool.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
      <span className="text-sm font-semibold text-purple-600 group-hover:text-purple-700">Try it free →</span>
    </Link>
  );
}
