import { Author } from '../types';
import { Twitter, Linkedin } from 'lucide-react';

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
      <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full bg-purple-100" />
      <div>
        <h4 className="font-bold text-gray-900">{author.name}</h4>
        <p className="text-sm text-gray-500 mt-1">{author.bio}</p>
        <div className="flex gap-3 mt-3">
          {author.twitter && <a href={`https://twitter.com/${author.twitter}`} className="text-gray-400 hover:text-purple-600"><Twitter className="w-4 h-4" /></a>}
          {author.linkedin && <a href={`https://linkedin.com/in/${author.linkedin}`} className="text-gray-400 hover:text-purple-600"><Linkedin className="w-4 h-4" /></a>}
        </div>
      </div>
    </div>
  );
}
