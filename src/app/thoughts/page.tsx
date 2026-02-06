import { Metadata } from 'next';
import ThoughtCard from '@/components/ThoughtCard';
import { getThoughts, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Thoughts | Gabriele Tinelli',
  description: 'Notes, essays, and ideas on technology, investing, and more.',
};

export default function ThoughtsPage() {
  const thoughts = getThoughts();
  const { title, subtitle } = getPageContent('thoughts');

  return (
    <div>
      <section className="mb-16">
        <div className="section-marker mb-6">// THOUGHTS</div>
        <div className="accent-line pt-8">
          <h1 className="text-foreground mb-6">{title || 'Thoughts'}</h1>
          {subtitle && (
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {thoughts.length > 0 ? (
        <div className="space-y-4">
          {thoughts.map((thought, index) => (
            <ThoughtCard key={thought.slug || `thought-${index}`} thought={thought} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No thoughts published yet. Check back soon.</p>
      )}
    </div>
  );
}
