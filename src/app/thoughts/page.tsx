import { Metadata } from 'next';
import ThoughtCard from '@/components/ThoughtCard';
import SubstackCard from '@/components/SubstackCard';
import { getThoughts, getPageContent, Thought } from '@/lib/content';
import { getSubstackPosts, SubstackPost } from '@/lib/rss';

export const metadata: Metadata = {
  title: 'Thoughts | Gabriele Tinelli',
  description: 'Notes, essays, and ideas on technology, investing, and more.',
  openGraph: {
    title: 'Thoughts | Gabriele Tinelli',
    description: 'Notes, essays, and ideas on technology, investing, and more.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Thoughts | Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Thoughts | Gabriele Tinelli',
    description: 'Notes, essays, and ideas on technology, investing, and more.',
    images: ['/images/habboicon.png'],
  },
};

export const revalidate = 3600; // Revalidate every hour for Substack posts

type CombinedItem =
  | { type: 'thought'; data: Thought; date: Date }
  | { type: 'substack'; data: SubstackPost; date: Date };

export default async function ThoughtsPage() {
  const thoughts = getThoughts();
  const substackPosts = await getSubstackPosts();
  const { title, subtitle } = getPageContent('thoughts');

  // Combine and sort by date
  const combinedItems: CombinedItem[] = [
    ...thoughts.map((thought) => ({
      type: 'thought' as const,
      data: thought,
      date: new Date(thought.date),
    })),
    ...substackPosts.map((post) => ({
      type: 'substack' as const,
      data: post,
      date: new Date(post.pubDate),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Thoughts'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {combinedItems.length > 0 ? (
        <div className="space-y-4">
          {combinedItems.map((item, index) =>
            item.type === 'thought' ? (
              <ThoughtCard key={item.data.slug || `thought-${index}`} thought={item.data} />
            ) : (
              <SubstackCard key={item.data.guid} post={item.data} />
            )
          )}
        </div>
      ) : (
        <p className="text-slate-500">No thoughts published yet. Check back soon.</p>
      )}
    </div>
  );
}
