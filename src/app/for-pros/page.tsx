import type { Metadata } from 'next';
import ForProsClient from './ForProsClient';

export const metadata: Metadata = {
  title: 'For Wedding Planners · Pre-Qualified Mallorca Leads',
  description: 'Join the Mallorca Wedding planner directory. Receive pre-qualified leads with full wedding briefs. Verified Partner from €399/month.',
};

export default function ForProsPage() {
  return <ForProsClient />;
}
