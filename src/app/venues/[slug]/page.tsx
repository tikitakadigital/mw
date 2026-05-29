import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VENUES, PLANNERS } from '@/lib/data';
import VenueGuideClient from './VenueGuideClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return VENUES.map(v => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = VENUES.find(v => v.slug === slug);
  if (!venue) return {};
  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    alternates: { canonical: `https://www.mallorcawedding.co.uk/venues/${venue.slug}/` },
  };
}

export default async function VenueSlugPage({ params }: Props) {
  const { slug } = await params;
  const venue = VENUES.find(v => v.slug === slug);
  if (!venue) notFound();

  const matchedPlanners = venue.plannerIds.map(pid => PLANNERS.find(p => p.id === pid)).filter(Boolean) as typeof PLANNERS;
  const alternatives    = venue.alternatives.map(aid => VENUES.find(v => v.id === aid)).filter(Boolean) as typeof VENUES;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: venue.name,
        description: venue.blurb,
        address: { '@type': 'PostalAddress', addressLocality: venue.region.split('·')[0].trim(), addressRegion: 'Mallorca', addressCountry: 'ES' },
        priceRange: `€${venue.estTotal80.low.toLocaleString()} – €${venue.estTotal80.high.toLocaleString()} (80 guests)`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `What is the minimum budget for a ${venue.name} wedding?`, acceptedAnswer: { '@type': 'Answer', text: `Most weddings start around €${venue.estTotal80.low.toLocaleString()}, with peak-season weddings often exceeding €${venue.estTotal80.high.toLocaleString()}.` } },
          { '@type': 'Question', name: 'Does the estimate include wedding planner fees?', acceptedAnswer: { '@type': 'Answer', text: 'No. Wedding planners typically charge €6,000–€15,000+ depending on service level.' } },
          { '@type': 'Question', name: 'How far in advance should we book?', acceptedAnswer: { '@type': 'Answer', text: 'Peak Saturdays often book 12–18 months ahead.' } },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mallorcawedding.co.uk/' },
          { '@type': 'ListItem', position: 2, name: 'Wedding venues', item: 'https://www.mallorcawedding.co.uk/venues/' },
          { '@type': 'ListItem', position: 3, name: venue.name },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VenueGuideClient venue={venue} matchedPlanners={matchedPlanners} alternatives={alternatives} />
    </>
  );
}
