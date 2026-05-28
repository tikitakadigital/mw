import type { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Wedding Planners in Mallorca · Verified Directory',
  description: 'Browse 12 hand-vetted Mallorca wedding planners. Filter by region, guest count, budget and style. All verified in person on the island.',
};

export default function PlannersPage() {
  return <DirectoryClient />;
}
