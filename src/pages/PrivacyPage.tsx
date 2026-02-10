import SEOHead from '../components/SEOHead';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy" description="SEOrely's privacy policy. Learn how we collect, use, and protect your data." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose-custom space-y-6 text-gray-600 leading-relaxed">
          <p><strong>Last updated:</strong> February 10, 2026</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Information We Collect</h2>
          <p>SEOrely is committed to protecting your privacy. Our free SEO tools run entirely in your browser — we do not collect, store, or transmit any content you enter into our tools.</p>
          <p>When you subscribe to our newsletter, we collect your email address solely for the purpose of sending SEO tips and updates. When you use our contact form, we collect your name, email, and message to respond to your inquiry.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To send you our newsletter (only if you subscribe)</li>
            <li>To respond to your contact form inquiries</li>
            <li>To improve our website and tools based on aggregate usage patterns</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Cookies & Analytics</h2>
          <p>We use minimal analytics to understand site traffic. We do not use advertising cookies or sell your data to third parties.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Third-Party Services</h2>
          <p>Our site is hosted on Netlify. We use Google Fonts for typography. These services may collect limited technical data as described in their respective privacy policies.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@seorely.com. If you're in the EU, you have additional rights under GDPR including the right to data portability and the right to lodge a complaint with a supervisory authority.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Data Security</h2>
          <p>We implement appropriate security measures to protect your information. All data is transmitted over HTTPS encryption.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
          <p>Questions about this policy? Email us at hello@seorely.com.</p>
        </div>
      </div>
    </>
  );
}
