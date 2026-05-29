'use client';

import Link from 'next/link';
import Icon from './Icon';
import type { PlannerStatus } from '@/lib/usePlannerStatus';

interface Props {
  plannerId: string;
  plannerName: string;
  status: PlannerStatus;
  claimEmail?: string;
}

export default function ClaimBanner({ plannerId, plannerName, status, claimEmail }: Props) {
  if (status === 'verified') return null;

  if (status === 'pending') {
    return (
      <div className="claim-banner claim-banner--pending">
        <div className="claim-banner__inner">
          <div className="claim-banner__icon">
            <Icon name="clock" size={18} />
          </div>
          <div>
            <strong>Verification in review</strong>
            <p>
              Your claim for this profile is being reviewed — usually 1–2 business days.
              {claimEmail && <> We&apos;ll email <em>{claimEmail}</em> when approved.</>}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // unclaimed
  return (
    <div className="claim-banner">
      <div className="claim-banner__inner">
        <div>
          <span className="claim-banner__kicker">Are you {plannerName}?</span>
          <p>
            Couples are actively searching for wedding planners in Mallorca right now.
            Claim your profile to start receiving pre-qualified enquiries — <strong>your first 2 leads are free.</strong>
          </p>
        </div>
        <Link href={`/claim/${plannerId}`} className="btn btn--primary claim-banner__btn">
          <Icon name="sparkle" size={14} /> Claim your free profile
        </Link>
      </div>
    </div>
  );
}
