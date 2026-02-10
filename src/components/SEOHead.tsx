export default function SEOHead({ title, description }: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  article?: { publishDate: string; author: string; tags: string[] };
}) {
  if (typeof document !== 'undefined') {
    document.title = `${title} | SEOrely`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }
  return null;
}
