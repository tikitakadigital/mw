import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { REAL_WEDDINGS } from '@/lib/data';
import CtaStrip from '@/components/CtaStrip';

export const metadata: Metadata = {
  title: 'Real Mallorca Weddings · Actual Costs & Photos',
  description: 'Three real Mallorca weddings broken down line by line. Real guest counts, real venues, real totals — no "price on request."',
};

export default function RealWeddingsPage() {
  return (
    <>
      <section className="blog-hero">
        <span className="kicker kicker--brand">Real Weddings · case studies</span>
        <h1>What couples actually spent. With photos.</h1>
        <p>Three real Mallorca weddings, broken down line by line. Real guest counts, real venues, real totals — no &ldquo;price on request.&rdquo;</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="rw-grid">
          {REAL_WEDDINGS.map(w => (
            <Link key={w.slug} href={`/real-weddings/${w.slug}`} className="rw-card">
              <div className="rw-card__photo">
                <Image src={w.photos[0]} alt={`${w.couple} wedding at ${w.venueName}`} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <div className="rw-card__body">
                <span className="kicker">{w.month} · {w.venueName}</span>
                <h3 className="serif-h3">{w.couple}</h3>
                <p className="body-md">{w.excerpt}</p>
                <div className="rw-card__stats">
                  <span><strong>{w.guests}</strong> guests</span>
                  <span>·</span>
                  <span><strong>{w.totalRange}</strong> all-in</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Want to plan a wedding like one of these?"
          body="The matcher uses the same kind of inputs (guest count, venue, season) to shortlist planners who've built these exact weddings."
          ctaLabel="Start the matcher"
          variant="brand"
        />
      </section>
    </>
  );
}
