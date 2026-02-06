import { ListeningItem } from '@/lib/content';
import { formatDateShort } from '@/lib/utils';

interface ListeningCardProps {
  item: ListeningItem;
}

export default function ListeningCard({ item }: ListeningCardProps) {
  const typeLabels = {
    podcast: 'Podcast',
    music: 'Music',
    audiobook: 'Audiobook',
  };

  const content = (
    <div className="card card-hover">
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="label">{typeLabels[item.type]}</span>
        <span className="label">{formatDateShort(item.date)}</span>
      </div>
      <h3 className="font-mono text-base font-medium text-foreground">{item.title}</h3>
      <p className="text-muted text-sm mt-1">{item.source}</p>
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
