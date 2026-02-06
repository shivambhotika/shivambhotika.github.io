import { Metadata } from 'next';
import ListeningCard from '@/components/ListeningCard';
import { getListeningItems, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Listening | Gabriele Tinelli',
  description: 'Podcasts, audiobooks, and audio content I\'ve been enjoying.',
};

export default function ListeningPage() {
  const items = getListeningItems();
  const { title, subtitle } = getPageContent('listening');

  const podcasts = items.filter((i) => i.type === 'podcast');
  const audiobooks = items.filter((i) => i.type === 'audiobook');
  const music = items.filter((i) => i.type === 'music');

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

      {podcasts.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Podcasts</h2>
          <div className="space-y-4">
            {podcasts.map((item) => (
              <ListeningCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {audiobooks.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Audiobooks</h2>
          <div className="space-y-4">
            {audiobooks.map((item) => (
              <ListeningCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {music.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Music</h2>
          <div className="space-y-4">
            {music.map((item) => (
              <ListeningCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {items.length === 0 && (
        <p className="text-slate-500">No listening items logged yet. Check back soon.</p>
      )}
    </div>
  );
}
