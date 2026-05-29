'use client';

import type { PlannerReview } from './types';

// Reviews are hardcoded in data.ts for now.
// When ready for dynamic reviews, re-implement fetch logic here.
export function useLiveReviews(
  _plannerId: string,
  fallback: PlannerReview[] = []
): { reviews: PlannerReview[] } {
  return { reviews: fallback };
}
