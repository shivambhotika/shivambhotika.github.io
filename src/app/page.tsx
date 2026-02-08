import Image from 'next/image';
import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: 'Gabriele Tinelli',
  description: 'Personal website of Gabriele Tinelli - builder, investor, and technologist.',
  openGraph: {
    title: 'Gabriele Tinelli',
    description: 'Personal website of Gabriele Tinelli - builder, investor, and technologist.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Gabriele Tinelli',
    description: 'Personal website of Gabriele Tinelli - builder, investor, and technologist.',
    images: ['/images/habboicon.png'],
  },
};

export default function Home() {
  const { title, subtitle, content } = getPageContent('home');

  // Configure marked for simple rendering
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlContent = content ? marked.parse(content) : '';

  return (
    <div className="space-y-8">
      {/* Intro */}
      <section>
        <h1 className="mb-4 flex items-center gap-3">
          {title || 'Welcome'}
          <Image
            src="/images/habboicon.png"
            alt=""
            width={48}
            height={48}
            className="inline-block"
          />
        </h1>
        {subtitle && <p className="text-lg">{subtitle}</p>}
      </section>

      {/* Content from markdown */}
      {content && (
        <>
          <div className="divider" />
          <div
            className="prose-custom home-content"
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />
        </>
      )}
    </div>
  );
}
