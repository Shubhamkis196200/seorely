import SEOHead from '../components/SEOHead';

export default function TermsPage() {
  return (
    <>
      <SEOHead title="Terms of Service" description="SEOrely's terms of service. Read before using our free SEO tools and content." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose-custom space-y-6 text-gray-600 leading-relaxed">
          <p><strong>Last updated:</strong> February 10, 2026</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Acceptance of Terms</h2>
          <p>By accessing and using SEOrely (seorely.com), you agree to these Terms of Service. If you do not agree, please do not use our site.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Use of Tools</h2>
          <p>Our SEO tools are provided free of charge for personal and commercial use. All tools run client-side in your browser. We make no guarantees about the accuracy or completeness of tool outputs. You are responsible for verifying results before using them in production.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Content</h2>
          <p>All articles, guides, and educational content on SEOrely are for informational purposes only. SEO best practices evolve constantly — we strive to keep content current but cannot guarantee all information is up-to-date at any given time.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Intellectual Property</h2>
          <p>All content, design, and code on SEOrely is owned by us or our licensors. You may share links to our content but may not reproduce articles in full without permission.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Limitation of Liability</h2>
          <p>SEOrely is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our site, tools, or content. This includes but is not limited to direct, indirect, incidental, or consequential damages.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Changes</h2>
          <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
          <p>Questions? Email hello@seorely.com.</p>
        </div>
      </div>
    </>
  );
}
