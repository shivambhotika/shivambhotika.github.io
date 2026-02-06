import { SubstackPost } from '@/lib/rss';
import { formatDateShort, truncate } from '@/lib/utils';

interface SubstackCardProps {
  post: SubstackPost;
}

export default function SubstackCard({ post }: SubstackCardProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block card card-hover no-underline"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="label text-accent">Substack</span>
        <span className="label">{formatDateShort(post.pubDate)}</span>
      </div>
      <h3 className="font-mono text-base font-medium text-foreground">{post.title}</h3>
      {post.contentSnippet && (
        <p className="text-muted text-sm mt-2">
          {truncate(post.contentSnippet, 200)}
        </p>
      )}
      <p className="text-accent text-sm font-mono mt-3">Read on Substack →</p>
    </a>
  );
}
