import { useState } from 'react';
import { Send } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-purple-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">You're in! 🎉</h3>
        <p className="text-purple-200">Check your inbox for a confirmation email.</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-600 rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Level Up Your SEO Skills</h3>
        <p className="text-purple-200 mb-6">Get weekly SEO tips, strategies, and tool recommendations delivered to your inbox. Join SEO professionals worldwide.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button type="submit" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            Subscribe <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-purple-300 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
