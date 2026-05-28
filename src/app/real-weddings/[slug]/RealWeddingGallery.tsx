'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';

interface Props { photos: string[]; couple: string; }

export default function RealWeddingGallery({ photos, couple }: Props) {
  const [lb, setLb] = useState<number | null>(null);
  return (
    <>
      <div className="rw-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {photos.map((p, i) => (
          <button key={i} type="button" style={{ border: 'none', padding: 0, cursor: 'pointer', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '4/3', display: 'block' }} onClick={() => setLb(i)}>
            <Image src={p} alt="" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </button>
        ))}
      </div>
      {lb !== null && (
        <div className="vlb" role="dialog" aria-modal="true" onClick={() => setLb(null)}>
          <button className="vlb__close" onClick={(e) => { e.stopPropagation(); setLb(null); }} aria-label="Close" type="button"><Icon name="close" size={18} /></button>
          <button className="vlb__nav vlb__nav--prev" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + photos.length) % photos.length); }} aria-label="Previous" type="button"><Icon name="arrow-l" size={18} /></button>
          <Image src={photos[lb]} alt={`${couple} wedding photo ${lb + 1}`} width={1200} height={800} style={{ maxWidth: '90vw', maxHeight: '90svh', objectFit: 'contain', borderRadius: 4 }} onClick={(e) => e.stopPropagation()} unoptimized />
          <button className="vlb__nav vlb__nav--next" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % photos.length); }} aria-label="Next" type="button"><Icon name="arrow" size={18} /></button>
          <span className="vlb__count">{lb + 1} / {photos.length}</span>
        </div>
      )}
    </>
  );
}
