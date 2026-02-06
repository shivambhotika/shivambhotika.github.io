import Link from 'next/link';
import { ActivityItem } from '@/lib/content';
import { formatDateShort, getTypeLabel, truncate } from '@/lib/utils';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <Link
          key={`${activity.type}-${activity.date}-${index}`}
          href={activity.href}
          className="block card card-hover no-underline"
          style={{ textDecoration: 'none' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="font-pixel text-lg text-muted">
                {getTypeLabel(activity.type).toUpperCase()}
              </span>
              <h3 className="text-xl mt-1">
                {truncate(activity.title, 55)}
              </h3>
              {activity.preview && (
                <p className="text-muted text-sm mt-1" style={{ fontFamily: 'IBM Plex Serif, serif' }}>
                  {truncate(activity.preview, 70)}
                </p>
              )}
            </div>
            <span className="font-pixel text-lg text-muted flex-shrink-0">
              {formatDateShort(activity.date)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
