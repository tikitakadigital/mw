'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Icon from './Icon';
import type { Planner } from '@/lib/types';

interface PlannerCardProps {
  planner: Planner;
  saved?: boolean;
  onSave?: (id: string) => void;
}

export default function PlannerCard({ planner, saved = false, onSave }: PlannerCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(v => !v);
    onSave?.(planner.id);
  };

  return (
    <Link href={`/planner/${planner.id}`} className="pcard">
      <div className="pcard__photo">
        <Image
          src={planner.img}
          alt={planner.name}
          width={400}
          height={300}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          unoptimized
        />
        {planner.featured && <span className="pcard__badge">Guest favourite</span>}
        <button
          className={`pcard__heart ${isSaved ? 'is-on' : ''}`}
          onClick={handleSave}
          aria-label={isSaved ? 'Saved' : 'Save planner'}
          type="button"
        >
          <Icon name={isSaved ? 'heart-fill' : 'heart'} size={16} />
        </button>
      </div>
      <div className="pcard__row">
        <span className="pcard__name">{planner.name}</span>
        <span className="pcard__rating">
          <Icon name="star" size={12} />
          {planner.rating}
        </span>
      </div>
      <span className="pcard__sub">{planner.location} · {planner.style}</span>
      <span className="pcard__sub">{planner.guests} guests · {planner.season}</span>
      {planner.price !== 'POA' && (
        <span className="pcard__price">Planning from {planner.price.split('–')[0]}</span>
      )}
    </Link>
  );
}
