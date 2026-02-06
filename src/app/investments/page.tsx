import { Metadata } from 'next';
import InvestmentCard from '@/components/InvestmentCard';
import { getInvestments, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Investments | Gabriele Tinelli',
  description: 'My investment portfolio, theses, and thinking on public and private markets.',
};

export default function InvestmentsPage() {
  const investments = getInvestments();
  const { title, subtitle } = getPageContent('investments');

  const holding = investments.filter((i) => i.status === 'holding');
  const watching = investments.filter((i) => i.status === 'watching');
  const exited = investments.filter((i) => i.status === 'exited');

  return (
    <div>
      <section className="accent-line pt-8 mb-12">
        <h1 className="text-foreground mb-4">{title || 'Investments'}</h1>
        {subtitle && (
          <p className="text-lg text-slate-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {holding.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Current holdings</h2>
          <div className="space-y-4">
            {holding.map((investment) => (
              <InvestmentCard key={investment.slug} investment={investment} />
            ))}
          </div>
        </section>
      )}

      {watching.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Watching</h2>
          <div className="space-y-4">
            {watching.map((investment) => (
              <InvestmentCard key={investment.slug} investment={investment} />
            ))}
          </div>
        </section>
      )}

      {exited.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">Exited positions</h2>
          <div className="space-y-4">
            {exited.map((investment) => (
              <InvestmentCard key={investment.slug} investment={investment} />
            ))}
          </div>
        </section>
      )}

      {investments.length === 0 && (
        <p className="text-slate-500">No investments documented yet. Check back soon.</p>
      )}
    </div>
  );
}
