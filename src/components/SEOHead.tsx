import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  article?: { publishDate: string; author: string; tags: string[] };
}

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SEOHead({ title, description, url, image, type = 'website', article }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | SEOrely`;
    const pageUrl = url || `https://seorely.netlify.app${window.location.pathname}`;
    const pageImage = image || 'https://seorely.netlify.app/og-image.png';

    document.title = fullTitle;
    setMeta('name', 'description', description);

    // Canonical
    setCanonical(pageUrl);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', pageImage);
    setMeta('property', 'og:type', article ? 'article' : type);
    setMeta('property', 'og:site_name', 'SEOrely');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', pageImage);

    // Article-specific
    if (article) {
      setMeta('property', 'article:published_time', article.publishDate);
      setMeta('property', 'article:author', article.author);
      article.tags.forEach(tag => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'article:tag');
        el.setAttribute('content', tag);
        el.setAttribute('data-seo-head', 'true');
        document.head.appendChild(el);
      });
    }

    return () => {
      // Cleanup article tags
      document.querySelectorAll('meta[data-seo-head="true"]').forEach(el => el.remove());
    };
  }, [title, description, url, image, type, article]);

  return null;
}
