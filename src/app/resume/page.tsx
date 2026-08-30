import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: 'Resume | Shivam Bhotika',
  description: 'Selected experience and work by Shivam Bhotika.',
  openGraph: {
    title: 'Resume | Shivam Bhotika',
    description: 'Selected experience and work by Shivam Bhotika.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Resume | Shivam Bhotika',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Resume | Shivam Bhotika',
    description: 'Selected experience and work by Shivam Bhotika.',
    images: ['/images/habboicon.png'],
  },
};

export default function ResumePage() {
  const { title, content } = getPageContent('resume');

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlContent = content ? marked.parse(content) : '';

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6">{title || 'Resume'}</h1>

      {content ? (
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      ) : (
        <p className="text-slate-500">Content coming soon.</p>
      )}
    </div>
  );
}
