import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getThoughtBySlug, getThoughtSlugs } from '@/lib/content';
import { formatDate } from '@/lib/utils';

marked.setOptions({
  gfm: true,
  breaks: true,
});

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getThoughtSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    return { title: 'Not Found' };
  }

  const title = `${thought.title || 'Thought'} | Gabriele Tinelli`;
  const description = thought.description || thought.content.slice(0, 160).replace(/[#*`]/g, '').trim();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: thought.date,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/thoughts"
        className="font-mono text-sm text-slate-500 hover:text-amber-600 mb-8 inline-block"
      >
        ← Back to thoughts
      </Link>

      <article>
        <header className="accent-line pt-8 mb-8">
          <h1 className="text-foreground mb-4">{thought.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="label">{formatDate(thought.date)}</span>
            {thought.tags && thought.tags.length > 0 && (
              <div className="flex gap-2">
                {thought.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-mono rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {thought.description && (
            <p className="text-lg text-slate-600 mt-4">{thought.description}</p>
          )}
        </header>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{
            __html: marked.parse(thought.content) as string,
          }}
        />
      </article>
    </div>
  );
}
