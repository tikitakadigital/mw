import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PLANNERS } from '@/lib/data';
import ClaimClient from './ClaimClient';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  // Pre-build claim pages for all planners (verified and not)
  return PLANNERS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const planner = PLANNERS.find(p => p.id === id);
  return {
    title: planner ? `Claim your profile — ${planner.name} · Mallorca Wedding` : 'Claim profile · Mallorca Wedding',
    robots: { index: false, follow: false },
  };
}

export default async function ClaimPage({ params }: Props) {
  const { id } = await params;
  const planner = PLANNERS.find(p => p.id === id);
  if (!planner) notFound();
  return <ClaimClient planner={planner} />;
}
