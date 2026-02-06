import Image from 'next/image';
import { Book } from '@/lib/content';
import { formatDateShort, getRatingStars } from '@/lib/utils';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="card card-hover">
      <div className="flex gap-4">
        {book.cover && (
          <div className="flex-shrink-0 relative w-16 h-24">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono text-base font-medium text-foreground truncate">
              {book.title}
            </h3>
            <span className="label flex-shrink-0">{book.status}</span>
          </div>
          <p className="text-muted text-sm mt-1">{book.author}</p>
          {book.rating && (
            <p className="text-accent text-sm mt-1">{getRatingStars(book.rating)}</p>
          )}
          <p className="text-muted opacity-60 text-xs mt-2 font-mono">
            {formatDateShort(book.dateRead)}
          </p>
          {book.content && (
            <p className="text-muted text-sm mt-3 line-clamp-2">{book.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
