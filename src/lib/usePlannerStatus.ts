'use client';

import { useState, useEffect } from 'react';

export type PlannerStatus = 'unclaimed' | 'pending' | 'verified';

export function usePlannerStatus(plannerId: string, preVerified: boolean) {
  const [status, setStatus] = useState<PlannerStatus>(preVerified ? 'verified' : 'unclaimed');
  const [claimEmail, setClaimEmail] = useState<string | undefined>();
  const [loading, setLoading] = useState(!preVerified);

  useEffect(() => {
    // Pre-verified planners (manually set by admin in data.ts) skip the API check
    if (preVerified) { setLoading(false); return; }

    fetch(`/api/planner-status.php?id=${plannerId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.status) {
          setStatus(data.status as PlannerStatus);
          if (data.email) setClaimEmail(data.email);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [plannerId, preVerified]);

  return { status, claimEmail, loading };
}
