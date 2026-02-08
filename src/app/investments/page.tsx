import { Metadata } from 'next';
import InvestmentCard from '@/components/InvestmentCard';
import { getInvestments, getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Investments | Gabriele Tinelli',
  description: 'My investment portfolio, theses, and thinking on public and private markets.',
  openGraph: {
    title: 'Investments | Gabriele Tinelli',
    description: 'My investment portfolio, theses, and thinking on public and private markets.',
    images: [
      {
        url: '/images/habboicon.png',
        width: 1200,
        height: 630,
        alt: 'Investments | Gabriele Tinelli',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Investments | Gabriele Tinelli',
    description: 'My investment portfolio, theses, and thinking on public and private markets.',
    images: ['/images/habboicon.png'],
  },
};

export default function InvestmentsPage() {
  const investments = getInvestments();
  const { title, subtitle } = getPageContent('investments');

  // Group investments by status dynamically
  const investmentsByStatus = investments.reduce((acc, investment) => {
    const status = investment.status || 'uncategorized';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(investment);
    return acc;
  }, {} as Record<string, typeof investments>);

  const statuses = Object.keys(investmentsByStatus);

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

      {statuses.map((status) => (
        <section key={status} className="mb-12">
          <h2 className="font-mono text-lg text-foreground mb-6">{status}</h2>
          <div className="space-y-4">
            {investmentsByStatus[status].map((investment) => (
              <InvestmentCard key={investment.slug} investment={investment} />
            ))}
          </div>
        </section>
      ))}

      {investments.length === 0 && (
        <p className="text-slate-500">No investments documented yet. Check back soon.</p>
      )}
    </div>
  );
}
