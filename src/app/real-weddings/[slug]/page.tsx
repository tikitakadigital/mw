import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { REAL_WEDDINGS, PLANNERS, VENUES } from '@/lib/data';
import RealWeddingGallery from './RealWeddingGallery';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return REAL_WEDDINGS.map(w => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = REAL_WEDDINGS.find(r => r.slug === slug);
  if (!w) return {};
  return {
    title: `${w.couple} at ${w.venueName} · ${w.totalRange} · Real Wedding`,
    description: `${w.excerpt} ${w.guests} guests, ${w.region}, ${w.month}.`,
  };
}

export default async function RealWeddingPage({ params }: Props) {
  const { slug } = await params;
  const w = REAL_WEDDINGS.find(r => r.slug === slug);
  if (!w) notFound();
  const planner = PLANNERS.find(p => p.id === w.plannerId)!;
  const related = REAL_WEDDINGS.filter(r => r.slug !== w.slug);

  return (
    <>
      <article>
        <div className="article-hero">
          <span className="cat">Real wedding · {w.month}</span>
          <h1>{w.couple} at {w.venueName}</h1>
          <div className="meta">
            <span>{w.guests} guests</span><span className="sep">·</span>
            <span>{w.region}</span><span className="sep">·</span>
            <span>{w.style}</span>
          </div>
        </div>

        <div className="article-photo">
          <Image src={w.photos[0]} alt={`${w.couple} wedding`} width={1200} height={450} style={{ width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', aspectRatio: '16/6' }} unoptimized />
        </div>

        <div className="article-body">
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)', borderBottom: '1px solid var(--hairline)', paddingBottom: 24, marginBottom: 32 }}>
            {w.excerpt}
          </p>
          <blockquote>&ldquo;{w.quote}&rdquo; <br /><span style={{ fontFamily: 'var(--font-body)', fontStyle: 'normal', fontSize: 14, color: 'var(--muted)' }}>— {w.couple}</span></blockquote>

          <h2>The numbers</h2>
          <table className="venue-cost-table">
            <thead><tr><th>Line item</th><th style={{ textAlign: 'right' }}>Actual spend</th></tr></thead>
            <tbody>
              {w.breakdown.map((b, i) => (
                <tr key={i}><td>{b.item}</td><td style={{ textAlign: 'right' }}>{b.value}</td></tr>
              ))}
              <tr>
                <td className="total">Total all-in</td>
                <td className="total" style={{ textAlign: 'right' }}>{w.totalRange}</td>
              </tr>
            </tbody>
          </table>

          <h2>The team</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {w.suppliers.map((s, i) => (
              <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--hairline-soft)', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, font: 'var(--t-body-md)' }}>
                <span style={{ color: 'var(--muted)' }}>{s.role}</span>
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* Gallery */}
      <section className="wrap" style={{ paddingBottom: 64 }}>
        <h2 className="serif-h2" style={{ marginBottom: 24 }}>From the day</h2>
        <RealWeddingGallery photos={w.photos} couple={w.couple} />
      </section>

      {/* CTA */}
      <section className="wrap--narrow" style={{ padding: '0 32px 96px' }}>
        <div style={{ padding: 32, background: 'var(--primary-soft)', borderRadius: 'var(--radius-md)' }}>
          <span className="kicker kicker--brand">Plan a wedding like {w.couple.split(' ')[0]}&apos;s</span>
          <h3 className="serif-h3" style={{ marginTop: 8 }}>Talk to {planner.name.split(' ')[0]}, who planned this wedding</h3>
          <p style={{ font: 'var(--t-body-md)', color: 'var(--body)', margin: '8px 0 20px' }}>{planner.bio.slice(0, 180)}…</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={`/planner/${planner.id}`} className="btn btn--primary">See {planner.name.split(' ')[0]}&apos;s profile</Link>
            <Link href="/matcher" className="btn btn--secondary">Use the matcher</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="sec sec--sm wrap">
        <header className="sec__head"><span className="kicker">More like this</span><h2 style={{ fontSize: 32 }}>Other real weddings</h2></header>
        <div className="blog-grid">
          {related.map(r => (
            <Link key={r.slug} href={`/real-weddings/${r.slug}`} className="blog-card">
              <div className="blog-card__photo">
                <Image src={r.photos[0]} alt="" width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <span className="blog-card__cat">{r.month}</span>
              <h3 className="blog-card__title">{r.couple} · {r.venueName}</h3>
              <p className="blog-card__excerpt">{r.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
