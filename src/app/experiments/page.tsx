import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';

interface ExperimentItem {
  title: string;
  url: string;
  description: string;
}

interface ExperimentSection {
  title: string;
  items: ExperimentItem[];
}

function parseExperiments(content: string): ExperimentSection[] {
  const sections: ExperimentSection[] = [];
  const lines = content.split('\n');
  let currentTitle = 'Projects';
  let currentItems: ExperimentItem[] = [];

  const pushSection = () => {
    if (currentItems.length > 0) {
      sections.push({
        title: currentTitle,
        items: currentItems,
      });
    }
  };

  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line || line === '---') {
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      pushSection();
      currentTitle = line.slice(3).trim();
      currentItems = [];
      index += 1;
      continue;
    }

    const match = line.match(/^\*\*\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\*\*$/);
    if (match) {
      const [, title, url] = match;
      index += 1;

      const descriptionLines: string[] = [];
      while (index < lines.length) {
        const next = lines[index].trim();

        if (!next) {
          if (descriptionLines.length > 0) {
            index += 1;
            break;
          }
          index += 1;
          continue;
        }

        if (next === '---' || next.startsWith('## ') || next.startsWith('**[')) {
          break;
        }

        descriptionLines.push(next);
        index += 1;
      }

      currentItems.push({
        title,
        url,
        description: descriptionLines.join(' '),
      });
      continue;
    }

    index += 1;
  }

  pushSection();
  return sections;
}

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
  const sections = parseExperiments(content || '');

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

      {sections.length > 0 ? (
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-pixel text-2xl text-foreground mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    <div className="card card-hover">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-mono text-base font-medium text-foreground">{item.title}</h3>
                        <span className="label flex-shrink-0">Live</span>
                      </div>

                      {item.description && (
                        <p className="text-muted text-sm mb-3">{item.description}</p>
                      )}

                      <p className="text-accent text-sm font-mono">Open experiment →</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : content ? (
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
