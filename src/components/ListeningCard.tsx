import { ListeningItem } from '@/lib/content';

interface ListeningCardProps {
  item: ListeningItem;
}

export default function ListeningCard({ item }: ListeningCardProps) {
  const content = (
    <div className="card card-hover">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-mono text-base font-medium text-foreground">{item.title}</h3>
        {item.type && <span className="label flex-shrink-0">{item.type}</span>}
      </div>
      <p className="text-muted text-sm">{item.source}</p>
      {item.content && (
        <p className="text-muted text-sm mt-3">{item.content}</p>
      )}
      {item.link && (
        <p className="text-accent text-sm font-mono mt-3">Listen →</p>
      )}
    </div>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {content}
      </a>
    );
  }

  return content;
}
