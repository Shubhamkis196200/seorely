import { Users, Target, BookOpen, Award } from 'lucide-react';
import { authors } from '../data';
import AuthorCard from '../components/AuthorCard';
import SEOHead from '../components/SEOHead';

export default function AboutPage() {
  return (
    <>
      <SEOHead title="About SEOrely" description="SEOrely is a free SEO education platform providing guides, tools, and tutorials to help marketers and businesses improve their search rankings." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">About SEOrely</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            SEOrely is a free SEO education platform built by practitioners, for practitioners. We believe that high-quality SEO knowledge should be accessible to everyone — whether you're a complete beginner or a seasoned professional looking to stay current.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            {[
              { icon: Target, label: 'Our Mission', desc: 'Make SEO accessible through clear, actionable, data-driven content.' },
              { icon: BookOpen, label: 'Our Content', desc: 'Every guide is researched, tested, and updated regularly.' },
              { icon: Users, label: 'Our Audience', desc: 'Marketers, business owners, and developers learning SEO.' },
              { icon: Award, label: 'Our Standard', desc: 'We only publish strategies we\'ve tested ourselves.' },
            ].map(item => (
              <div key={item.label} className="p-5 rounded-xl bg-gray-50">
                <item.icon className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
          <div className="space-y-4">
            {authors.map(a => <AuthorCard key={a.id} author={a} />)}
          </div>
        </div>
      </div>
    </>
  );
}
