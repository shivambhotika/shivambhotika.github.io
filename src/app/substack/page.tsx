import { Metadata } from 'next';
import SubstackCard from '@/components/SubstackCard';
import { getSubstackPosts } from '@/lib/rss';
import { getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Substack | Gabriele Tinelli',
  description: 'My Substack newsletter posts, synced automatically.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function SubstackPage() {
  const posts = await getSubstackPosts();
  const { title, subtitle } = getPageContent('substack');

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Substack'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <SubstackCard key={post.guid} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">
          No posts yet, or unable to fetch from Substack. Check back later or visit{' '}
          <a
            href="https://gabrieletinelli.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500"
          >
            the newsletter directly
          </a>
          .
        </p>
      )}
    </div>
  );
}
