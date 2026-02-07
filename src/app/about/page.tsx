import { Metadata } from 'next';
import Image from 'next/image';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: 'About | Gabriele Tinelli',
  description: 'Learn more about Gabriele Tinelli - background, interests, and current projects.',
};

export default function AboutPage() {
  const { title, content } = getPageContent('about');

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlContent = content ? marked.parse(content) : '';

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6">{title || 'About'}</h1>

      {content ? (
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      ) : (
        <p className="text-slate-500">Content coming soon.</p>
      )}

      <div className="flex justify-end mt-8">
        <Image
          src="/images/habboicon.png"
          alt=""
          width={48}
          height={48}
        />
      </div>
    </div>
  );
}
