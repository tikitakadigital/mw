import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/data';
import CtaStrip from '@/components/CtaStrip';
import Icon from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Inspiration & Planning Guides · Mallorca Wedding Blog',
  description: 'Budget breakdowns, venue comparisons, paperwork explainers — written by people who actually work weddings on the island.',
};

export default function BlogPage() {
  const feature = BLOG_POSTS.find(p => p.feature);
  const rest = BLOG_POSTS.filter(p => !p.feature);

  return (
    <>
      <section className="blog-hero">
        <span className="kicker">Inspiration &amp; guides</span>
        <h1>Real advice for planning a Mallorca wedding.</h1>
        <p>Budget breakdowns, venue comparisons, paperwork explainers — written by people who actually work weddings on the island.</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        {feature && (
          <Link href={`/blog/${feature.slug}`} className="blog-feature" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="blog-feature__photo">
              <Image src={feature.img} alt={feature.title} width={700} height={525} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
            </div>
            <div>
              <span className="blog-card__cat">Featured · {feature.category}</span>
              <h2>{feature.title}</h2>
              <p>{feature.excerpt}</p>
              <span style={{ font: 'var(--t-caption)', color: 'var(--muted)' }}>{feature.date} · {feature.readTime}</span>
              <div style={{ marginTop: 16 }}>
                <span className="btn btn--secondary">Read the guide <Icon name="arrow" size={14} /></span>
              </div>
            </div>
          </Link>
        )}

        <div className="blog-grid">
          {rest.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
              <div className="blog-card__photo">
                <Image src={p.img} alt={p.title} width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <span className="blog-card__cat">{p.category}</span>
              <h3 className="blog-card__title">{p.title}</h3>
              <p className="blog-card__excerpt">{p.excerpt}</p>
              <span className="blog-card__meta">{p.date} · {p.readTime}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Tired of reading? Just find a planner."
          body="The matcher uses these same benchmarks to suggest three planners who actually fit your wedding."
          ctaLabel="Start the matcher"
          variant="brand"
        />
      </section>
    </>
  );
}
