'use client';

import { useState, useEffect } from 'react';
import type { PlannerReview } from './types';

export function useLiveReviews(plannerId: string, fallback: PlannerReview[] = []) {
  const [reviews, setReviews] = useState<PlannerReview[]>(fallback);

  useEffect(() => {
    fetch(`/api/reviews/${plannerId}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (Array.isArray(data) && data.length > 0) setReviews(data); })
      .catch(() => {});
  }, [plannerId]);

  return reviews;
}
