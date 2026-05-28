import type { Metadata } from 'next';
import MatcherClient from './MatcherClient';

export const metadata: Metadata = {
  title: 'Find My Mallorca Wedding Planner · Free Smart Matcher',
  description: 'Answer 6 quick questions and get 3 personalised Mallorca wedding planner matches in under 30 seconds. Free, no obligation.',
  robots: { index: false, follow: true },
};

export default function MatcherPage() {
  return <MatcherClient />;
}
