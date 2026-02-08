import { Metadata } from 'next';
import BookCard from '@/components/BookCard';
import { getBooks, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Reading | Gabriele Tinelli',
  description: 'Books I\'ve read, am reading, or plan to read.',
  openGraph: {
    title: 'Reading | Gabriele Tinelli',
    description: 'Books I\'ve read, am reading, or plan to read.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Reading | Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Reading | Gabriele Tinelli',
    description: 'Books I\'ve read, am reading, or plan to read.',
    images: ['/images/habboicon.png'],
  },
};

export default function ReadingPage() {
  const books = getBooks();
  const { title, subtitle } = getPageContent('reading');

  // Group books by genre dynamically
  const booksByGenre = books.reduce((acc, book) => {
    const genre = book.genre || 'uncategorized';
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(book);
    return acc;
  }, {} as Record<string, typeof books>);

  const genres = Object.keys(booksByGenre);

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Reading'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {genres.map((genre) => (
        <section key={genre} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="section-marker">{`// ${genre.toUpperCase()}`}</div>
            <div className="flex-1 border-t border-slate-200/60" />
          </div>
          <div className="space-y-4">
            {booksByGenre[genre].map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      ))}

      {books.length === 0 && (
        <p className="text-slate-500">No books logged yet. Check back soon.</p>
      )}
    </div>
  );
}
