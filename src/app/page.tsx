import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

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
        <h1 className="mb-4">{title || 'Welcome'}</h1>
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
