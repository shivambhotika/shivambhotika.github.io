import { Metadata } from 'next';
import BookCard from '@/components/BookCard';
import { getBooks, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Reading | Gabriele Tinelli',
  description: 'Books I\'ve read, am reading, or plan to read.',
};

export default function ReadingPage() {
  const books = getBooks();
  const { title, subtitle } = getPageContent('reading');

  const currentlyReading = books.filter((b) => b.status === 'reading');
  const finished = books.filter((b) => b.status === 'finished');
  const abandoned = books.filter((b) => b.status === 'abandoned');

  return (
    <div>
      <section className="mb-16">
        <div className="section-marker mb-6">// READING</div>
        <div className="accent-line pt-8">
          <h1 className="text-foreground mb-6">{title || 'Reading'}</h1>
          {subtitle && (
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {currentlyReading.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="section-marker">// IN PROGRESS</div>
            <div className="flex-1 border-t border-slate-200/60" />
          </div>
          <div className="space-y-4">
            {currentlyReading.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="section-marker">// COMPLETED</div>
            <div className="flex-1 border-t border-slate-200/60" />
          </div>
          <div className="space-y-4">
            {finished.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      )}

      {abandoned.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="section-marker">// ABANDONED</div>
            <div className="flex-1 border-t border-slate-200/60" />
          </div>
          <div className="space-y-4">
            {abandoned.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      )}

      {books.length === 0 && (
        <p className="text-slate-500">No books logged yet. Check back soon.</p>
      )}
    </div>
  );
}
