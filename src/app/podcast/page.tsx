import { Metadata } from 'next';
import PodcastCard from '@/components/PodcastCard';
import { getPodcastEpisodes } from '@/lib/rss';
import { getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Podcast | Gabriele Tinelli',
  description: 'BitBuilders - interviews with people building hard things in robotics and hardware.',
  openGraph: {
    title: 'Podcast | Gabriele Tinelli',
    description: 'BitBuilders - interviews with people building hard things in robotics and hardware.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Podcast | Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Podcast | Gabriele Tinelli',
    description: 'BitBuilders - interviews with people building hard things in robotics and hardware.',
    images: ['/images/habboicon.png'],
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function PodcastPage() {
  const episodes = await getPodcastEpisodes();
  const { title, subtitle } = getPageContent('podcast');

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Podcast'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {episodes.length > 0 ? (
        <div className="space-y-4">
          {episodes.map((episode) => (
            <PodcastCard key={episode.guid} episode={episode} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">
          No episodes yet, or unable to fetch from the feed. Check back later or listen on{' '}
          <a
            href="https://open.spotify.com/show/1y5r74qzatrFOaxGbDf6iA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500"
          >
            Spotify directly
          </a>
          .
        </p>
      )}

      <div className="mt-12 pt-8 border-t border-slate-200">
        <a
          href="https://open.spotify.com/show/1y5r74qzatrFOaxGbDf6iA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-mono"
        >
          View all episodes on Spotify →
        </a>
      </div>
    </div>
  );
}
