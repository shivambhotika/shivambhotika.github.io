'use client';

import Image from 'next/image';
import { Record } from '@/lib/content';

interface RecordCardProps {
  record: Record;
}

export default function RecordCard({ record }: RecordCardProps) {
  const content = (
    <div className={`group relative aspect-square overflow-hidden rounded ${record.link ? 'cursor-pointer' : 'cursor-default'}`}>
      <Image
        src={record.cover}
        alt={`${record.title} by ${record.artist}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-white font-mono text-sm font-medium truncate">{record.title}</p>
        <p className="text-white/70 text-xs truncate">{record.artist}</p>
        {record.description && (
          <p className="text-white/90 text-xs mt-2 italic line-clamp-2">{record.description}</p>
        )}
      </div>
    </div>
  );

  if (record.link) {
    return (
      <a href={record.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
