import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: 'Experiments | Shivam Bhotika',
  description: 'Side projects and experiments - AI tools, VC ratings, investment planners, newsletters, and podcasts.',
  openGraph: {
    title: 'Experiments | Shivam Bhotika',
    description: 'Side projects and experiments - AI tools, VC ratings, investment planners, newsletters, and podcasts.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Experiments | Shivam Bhotika',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Experiments | Shivam Bhotika',
    description: 'Side projects and experiments - AI tools, VC ratings, investment planners, newsletters, and podcasts.',
    images: ['/images/habboicon.png'],
  },
};

export default function ExperimentsPage() {
  const { title, subtitle, content } = getPageContent('experiments');

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlContent = content ? marked.parse(content) : '';

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Experiments'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {content ? (
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      ) : (
        <p className="text-slate-500">No experiments yet. Check back soon.</p>
      )}
    </div>
  );
}
