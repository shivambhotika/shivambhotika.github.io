import { Investment } from '@/lib/content';
import { formatDateShort } from '@/lib/utils';

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const statusStyles: Record<string, string> = {
    holding: 'color: #22c55e; background: rgba(34, 197, 94, 0.15)',
    watching: 'color: var(--accent); background: var(--accent-dim)',
    exited: 'color: var(--muted); background: rgba(100, 116, 139, 0.15)',
  };

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-mono text-base font-medium text-foreground">
            {investment.company}
          </h3>
          {investment.ticker && (
            <span className="text-muted text-sm font-mono">
              ({investment.ticker})
            </span>
          )}
        </div>
        <span
          className="px-2 py-0.5 text-xs font-mono rounded"
          style={{ cssText: statusStyles[investment.status] }}
        >
          {investment.status}
        </span>
      </div>

      <p className="text-muted text-sm">{investment.thesis}</p>

      {investment.content && (
        <div className="text-muted text-sm mt-3 line-clamp-3">
          {investment.content}
        </div>
      )}

      <p className="text-muted opacity-60 text-xs font-mono mt-3">
        Added {formatDateShort(investment.dateAdded)}
      </p>
    </div>
  );
}
