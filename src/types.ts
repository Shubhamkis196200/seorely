export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  author: Author;
  publishDate: string;
  content: string;
  tags: string[];
  type: 'guide' | 'post';
  image: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export type { Author as AuthorType, Article as ArticleType, Tool as ToolType, Category as CategoryType };
