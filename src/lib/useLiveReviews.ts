'use client';

import { useState, useEffect } from 'react';
import type { PlannerReview } from './types';

export function useLiveReviews(
  plannerId: string,
  fallback: PlannerReview[] = []
): { reviews: PlannerReview[]; rating?: string; totalReviews?: number } {
  const [reviews, setReviews] = useState<PlannerReview[]>(fallback);
  const [rating, setRating] = useState<string | undefined>();
  const [totalReviews, setTotalReviews] = useState<number | undefined>();

  useEffect(() => {
    // Try JSON file first (manual reviews), fall back to static data
    fetch(`/api/reviews/${plannerId}.json`)
      .then(r => { if (!r.ok) throw new Error('no json'); return r.json(); })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setReviews(data);
      })
      .catch(() => {
        // JSON file doesn't exist — static data from data.ts is already set as initial state
      });
  }, [plannerId]);

  return { reviews, rating, totalReviews };
}
