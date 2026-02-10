import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  children: ReactNode
}

export default function GuideLayout({ title, description, date, readTime, category, children }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to blog
      </Link>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">{category}</span>
        <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
        <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar className="w-3.5 h-3.5" /> {date}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
      <p className="text-lg text-gray-500 mb-12 max-w-2xl">{description}</p>
      <div className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:text-gray-600 [&_ul_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol_li]:text-gray-600 [&_ol_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-primary-700">
        {children}
      </div>
    </article>
  )
}
