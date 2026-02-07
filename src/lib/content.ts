import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Book {
  slug: string;
  title: string;
  author: string;
  rating?: number;
  status?: string;
  genre?: string;
  cover?: string;
  content: string;
}

export interface Record {
  slug: string;
  title: string;
  artist: string;
  cover: string;
  description?: string;
  link?: string;
}

export interface ListeningItem {
  slug: string;
  title: string;
  source: string;
  type?: string;
  link?: string;
  content: string;
}

export interface Thought {
  slug?: string;
  title?: string;
  date: string;
  tags?: string[];
  description?: string;
  draft?: boolean;
  content: string;
  fileName: string;
}

export interface Investment {
  slug: string;
  company: string;
  status?: string;
  entryPoint?: string;
  thesis: string;
  content: string;
}

function getFilesFromDirectory(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs.readdirSync(fullPath).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

function parseFile<T>(dir: string, fileName: string): T & { content: string; slug: string } {
  const fullPath = path.join(contentDirectory, dir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const slug = fileName.replace(/\.mdx?$/, '');

  return {
    ...data,
    content,
    slug,
  } as T & { content: string; slug: string };
}

export function getBooks(): Book[] {
  const files = getFilesFromDirectory('books');
  const books = files.map((file) => parseFile<Omit<Book, 'content' | 'slug'>>('books', file));
  return books.sort((a, b) => a.title.localeCompare(b.title));
}

export function getBook(slug: string): Book | null {
  try {
    return parseFile<Omit<Book, 'content' | 'slug'>>('books', `${slug}.mdx`);
  } catch {
    try {
      return parseFile<Omit<Book, 'content' | 'slug'>>('books', `${slug}.md`);
    } catch {
      return null;
    }
  }
}

export function getListeningItems(): ListeningItem[] {
  const files = getFilesFromDirectory('listening');
  const items = files.map((file) => parseFile<Omit<ListeningItem, 'content' | 'slug'>>('listening', file));
  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export function getRecords(): Record[] {
  const files = getFilesFromDirectory('records');
  const records = files.map((file) => {
    const fullPath = path.join(contentDirectory, 'records', file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const slug = file.replace(/\.mdx?$/, '');
    return { ...data, slug } as Record;
  });
  return records.sort((a, b) => a.artist.localeCompare(b.artist));
}

export function getThoughts(): Thought[] {
  const files = getFilesFromDirectory('thoughts');
  const thoughts = files.map((file) => {
    const fullPath = path.join(contentDirectory, 'thoughts', file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      fileName: file,
      slug: data.slug || undefined,
    } as Thought;
  });

  return thoughts
    .filter((t) => !t.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getThoughtBySlug(slug: string): Thought | null {
  const thoughts = getThoughts();
  return thoughts.find((t) => t.slug === slug) || null;
}

export function getThoughtSlugs(): string[] {
  const thoughts = getThoughts();
  return thoughts.filter((t) => t.slug).map((t) => t.slug as string);
}

export function getInvestments(): Investment[] {
  const files = getFilesFromDirectory('investments');
  const investments = files.map((file) => parseFile<Omit<Investment, 'content' | 'slug'>>('investments', file));
  return investments.sort((a, b) => a.company.localeCompare(b.company));
}

export function getInvestment(slug: string): Investment | null {
  try {
    return parseFile<Omit<Investment, 'content' | 'slug'>>('investments', `${slug}.mdx`);
  } catch {
    try {
      return parseFile<Omit<Investment, 'content' | 'slug'>>('investments', `${slug}.md`);
    } catch {
      return null;
    }
  }
}

// Get page content from markdown files (for editable pages via Obsidian)
export interface PageContent {
  title?: string;
  subtitle?: string;
  content: string;
}

export function getPageContent(pageName: string): PageContent {
  const pagePath = path.join(contentDirectory, `${pageName}.md`);

  if (!fs.existsSync(pagePath)) {
    return {
      title: '',
      subtitle: '',
      content: '',
    };
  }

  const fileContents = fs.readFileSync(pagePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || '',
    subtitle: data.subtitle || '',
    content: content.trim(),
  };
}

// For home page activity feed
export interface ActivityItem {
  type: 'book' | 'listening' | 'thought' | 'investment';
  title: string;
  date: string;
  slug?: string;
  href: string;
  preview?: string;
}

export function getRecentActivity(limit: number = 10): ActivityItem[] {
  const activities: ActivityItem[] = [];


  // Get recent thoughts
  const thoughts = getThoughts().slice(0, 5);
  thoughts.forEach((thought) => {
    activities.push({
      type: 'thought',
      title: thought.title || thought.content.slice(0, 50) + '...',
      date: thought.date,
      slug: thought.slug,
      href: thought.slug ? `/thoughts/${thought.slug}` : '/thoughts',
      preview: thought.description,
    });
  });

  // Sort by date and limit
  return activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
