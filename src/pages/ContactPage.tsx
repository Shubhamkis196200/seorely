import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <SEOHead title="Contact Us" description="Get in touch with the SEOrely team. We'd love to hear from you." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 mb-10">Have a question, suggestion, or want to collaborate? We'd love to hear from you.</p>

          <div className="flex gap-6 mb-10">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Mail className="w-5 h-5 text-purple-600" /> hello@seorely.com
            </div>
          </div>

          {submitted ? (
            <div className="p-8 bg-purple-50 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-purple-600 mb-2">Message Sent! ✉️</h3>
              <p className="text-gray-500">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition flex items-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
