'use client';

import { useState, useEffect } from 'react';
import type { PlannerReview } from './types';

// Planners with Google Business Profile integration
const GOOGLE_ENABLED = new Set(['awhitehotwedding']);

interface GoogleResponse {
  reviews: (PlannerReview & { stars?: number; source?: string })[];
  rating?: number;
  total_reviews?: number;
}

export function useLiveReviews(
  plannerId: string,
  fallback: PlannerReview[] = []
): { reviews: PlannerReview[]; rating?: string; totalReviews?: number } {
  const [reviews, setReviews] = useState<PlannerReview[]>(fallback);
  const [rating, setRating] = useState<string | undefined>();
  const [totalReviews, setTotalReviews] = useState<number | undefined>();

  useEffect(() => {
    if (GOOGLE_ENABLED.has(plannerId)) {
      // Try Google reviews first
      fetch(`/api/google-reviews.php?id=${plannerId}`)
        .then(r => r.ok ? r.json() as Promise<GoogleResponse> : null)
        .then(data => {
          if (data?.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
            if (data.rating) setRating(data.rating.toFixed(1));
            if (data.total_reviews) setTotalReviews(data.total_reviews);
          }
        })
        .catch(() => {
          // Fall back to JSON file
          fetch(`/api/reviews/${plannerId}.json`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (Array.isArray(data) && data.length > 0) setReviews(data); })
            .catch(() => {});
        });
    } else {
      // Use JSON file
      fetch(`/api/reviews/${plannerId}.json`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (Array.isArray(data) && data.length > 0) setReviews(data); })
        .catch(() => {});
    }
  }, [plannerId]);

  return { reviews, rating, totalReviews };
}
