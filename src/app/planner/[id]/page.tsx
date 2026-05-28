import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PLANNERS, VENUES } from '@/lib/data';
import PlannerProfileClient from './PlannerProfileClient';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return PLANNERS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const planner = PLANNERS.find(p => p.id === id);
  if (!planner) return {};
  return {
    title: `${planner.name} · ${planner.firm} · Mallorca Wedding Planner`,
    description: `${planner.tagline}. ${planner.bio.slice(0, 120)}...`,
  };
}

export default async function PlannerProfilePage({ params }: Props) {
  const { id } = await params;
  const planner = PLANNERS.find(p => p.id === id);
  if (!planner) notFound();
  const preferredVenues = planner.preferredVenues.map(vid => VENUES.find(v => v.id === vid)).filter(Boolean);
  return <PlannerProfileClient planner={planner} preferredVenues={preferredVenues as typeof VENUES} />;
}
