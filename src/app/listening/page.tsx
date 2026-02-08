import { Metadata } from 'next';
import ListeningCard from '@/components/ListeningCard';
import RecordCard from '@/components/RecordCard';
import { getListeningItems, getRecords, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Listening | Gabriele Tinelli',
  description: 'Podcasts, audiobooks, and audio content I\'ve been enjoying.',
  openGraph: {
    title: 'Listening | Gabriele Tinelli',
    description: 'Podcasts, audiobooks, and audio content I\'ve been enjoying.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Listening | Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Listening | Gabriele Tinelli',
    description: 'Podcasts, audiobooks, and audio content I\'ve been enjoying.',
    images: ['/images/habboicon.png'],
  },
};

export default function ListeningPage() {
  const items = getListeningItems();
  const records = getRecords();
  const { title, subtitle } = getPageContent('listening');

  // Group items by type dynamically
  const itemsByType = items.reduce((acc, item) => {
    const type = item.type || 'uncategorized';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const types = Object.keys(itemsByType);

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Listening'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {records.length > 0 && (
        <section className="mb-16">
          <h2 className="font-mono text-lg text-foreground mb-6">my all-time records</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {records.map((record) => (
              <RecordCard key={record.slug} record={record} />
            ))}
          </div>
        </section>
      )}

      {types.map((type) => (
        <section key={type} className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">{type}</h2>
          <div className="space-y-4">
            {itemsByType[type].map((item) => (
              <ListeningCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}

      {items.length === 0 && records.length === 0 && (
        <p className="text-slate-500">No listening items logged yet. Check back soon.</p>
      )}
    </div>
  );
}
