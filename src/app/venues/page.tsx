import type { Metadata } from 'next';
import VenuesIndex from './VenuesIndex';

export const metadata: Metadata = {
  title: 'Mallorca Wedding Venues: 2026 Cost Guides & Realistic Budgets',
  description: 'Compare the best wedding venues in Mallorca with real 2026 cost guides. Honest budgets for fincas and cliffside estates, plus a free 30-second budget estimator.',
  alternates: { canonical: 'https://www.mallorcawedding.co.uk/venues/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mallorca wedding venue cost guides',
  description: 'Real 2026 cost guides for the most-requested wedding venues in Mallorca',
  url: 'https://www.mallorcawedding.co.uk/venues/',
};

export default function VenuesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VenuesIndex />
    </>
  );
}
