'use client';

import { useState, useEffect } from 'react';

export interface ClaimedProfile {
  name?: string;
  firm?: string;
  bio?: string;
  services?: string;
  languages?: string;
  based?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  email?: string;
}

export function useClaimedProfile(plannerId: string, isVerified: boolean) {
  const [profile, setProfile] = useState<ClaimedProfile | null>(null);

  useEffect(() => {
    // Only fetch for planners verified via claim flow (not pre-verified in data.ts)
    if (!isVerified) return;

    fetch(`/api/planner-data.php?id=${plannerId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProfile(data); })
      .catch(() => {});
  }, [plannerId, isVerified]);

  return profile;
}
