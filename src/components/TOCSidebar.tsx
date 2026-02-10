import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TOCSidebar({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const matches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
    const h: Heading[] = [];
    for (const m of matches) {
      const id = m[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      h.push({ id, text: m[2], level: m[1].length });
    }
    setHeadings(h);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">On This Page</h4>
      <ul className="space-y-2 border-l-2 border-gray-100">
        {headings.map(h => (
          <li key={h.id} style={{ paddingLeft: (h.level - 2) * 12 + 12 }}>
            <a
              href={`#${h.id}`}
              className={`text-sm block py-0.5 transition-colors ${active === h.id ? 'text-purple-600 font-medium border-l-2 border-purple-600 -ml-[2px] pl-3' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
