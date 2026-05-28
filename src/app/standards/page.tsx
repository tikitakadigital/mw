import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EDITORIAL_TEAM, PLANNERS } from '@/lib/data';
import Icon from '@/components/Icon';
import CtaStrip from '@/components/CtaStrip';

export const metadata: Metadata = {
  title: 'Editorial Standards & Methodology · Mallorca Wedding',
  description: 'How we vet planners, calculate costs, and maintain independence. Read our full methodology, vetting process, and editorial team details.',
};

export default function StandardsPage() {
  return (
    <>
      <section className="about-hero">
        <span className="kicker">Editorial standards &amp; methodology</span>
        <h1>How we vet planners. How we calculate costs. Why you can trust the numbers.</h1>
        <p className="lead">Trust is the entire product. This page exists so you can see exactly how we work — what we promise, what we don&apos;t, and how we&apos;d want you to push back if we get something wrong.</p>
        <p className="muted" style={{ font: 'var(--t-caption)', marginTop: 16 }}>Last updated: March 2026 · Reviewed quarterly</p>
      </section>

      {/* Editorial principles */}
      <section className="sec wrap--narrow">
        <header className="sec__head">
          <span className="kicker">Principles</span>
          <h2>Our editorial principles</h2>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[
            { n: '01', h: 'Independent', p: 'We are not owned by a planner, a venue, or a venue management group. We never take a referral fee from a couple. We are not a booking agent.' },
            { n: '02', h: 'Transparent pricing', p: 'Every cost guide shows real ranges with line-item breakdowns. Every planner profile shows their minimum project value upfront. We never publish "price on request."' },
            { n: '03', h: 'Verified, not just listed', p: 'Every planner on the platform has been met in person on the island, their portfolio audited, and references contacted. We list 12 verified planners — not 200 paid placements.' },
            { n: '04', h: 'Methodology in the open', p: 'Our 2026 cost benchmarks are derived from real recent weddings on the island and reviewed twice a year. The methodology section below explains how.' },
            { n: '05', h: 'Conflicts disclosed', p: "When an article is written by a working planner who appears in the directory, the byline says so. We don't pretend our writers are detached journalists; we just say who's writing." },
            { n: '06', h: 'Restraint', p: "The matcher returns three planners, not twelve. The point is to make a decision easier, not harder." },
          ].map(p => (
            <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48, color: 'var(--primary)', lineHeight: 1 }}>{p.n}</span>
              <div>
                <h3 className="serif-h3" style={{ marginBottom: 6 }}>{p.h}</h3>
                <p className="body-md">{p.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vetting */}
      <section className="sec sec--alt">
        <div className="wrap--narrow">
          <header className="sec__head">
            <span className="kicker">Vetting</span>
            <h2>How we vet wedding planners</h2>
            <p>Every planner on the directory passes a four-step verification before their profile goes live.</p>
          </header>
          <ol className="steps" style={{ gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { n: '01', h: 'Application & business check', p: 'We confirm the business is registered in Spain, has Spanish wedding insurance, and has been actively trading for at least 18 months.' },
              { n: '02', h: 'Portfolio audit', p: 'We review the last 24 months of weddings — the venues, the team, the photography. We\'re looking for actual delivered work, not Pinterest mood boards.' },
              { n: '03', h: 'Reference calls', p: "We call two past couples and two venue contacts. We ask about reliability, communication, and what they'd do differently." },
              { n: '04', h: 'In-person meeting on the island', p: 'A 90-minute meeting in Palma or wherever the planner is based. Profiles only go live after this happens.' },
            ].map(s => (
              <li key={s.n}>
                <span className="steps__num">{s.n}</span>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost methodology */}
      <section className="sec wrap--narrow">
        <header className="sec__head">
          <span className="kicker">Cost methodology</span>
          <h2>How we calculate the 2026 cost benchmarks</h2>
        </header>
        <ul className="band__bullets">
          {[
            { strong: 'Real weddings as inputs.', text: ' We collect anonymised cost breakdowns from real 2024–2025 weddings on the island.' },
            { strong: 'Vendor pricing as a sanity check.', text: ' We cross-check against published 2026 vendor pricing where available.' },
            { strong: '2026 inflation buffer.', text: ' A +10% adjustment on 2024–2025 base figures to reflect projected Mallorca wedding-industry inflation.' },
            { strong: '15% Mallorca service buffer.', text: ' Service, lighting, taxi, contingency. This is the line couples consistently underestimate.' },
            { strong: 'Quarterly review.', text: ' Every cost guide is reviewed by our editorial team in March, June, September, December.' },
          ].map((b, i) => (
            <li key={i}><Icon name="check" size={16} /><span><strong>{b.strong}</strong>{b.text}</span></li>
          ))}
        </ul>
      </section>

      {/* Editorial team */}
      <section className="sec sec--alt">
        <div className="wrap--narrow">
          <header className="sec__head">
            <span className="kicker">Team</span>
            <h2>Who writes and reviews this</h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {EDITORIAL_TEAM.map(t => {
              const planner = PLANNERS.find(p => p.id === t.id);
              return (
                <div key={t.id} style={{ padding: 24, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
                  {planner && (
                    <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', marginBottom: 12, background: 'var(--surface-strong)' }}>
                      <Image src={planner.img} alt={t.name} width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                    </div>
                  )}
                  <h4 className="serif-h3" style={{ marginBottom: 4 }}>{t.name}</h4>
                  <span className="kicker" style={{ marginBottom: 12 }}>{t.role}</span>
                  <p className="body-md" style={{ marginTop: 8 }}>{t.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corrections */}
      <section className="sec wrap--narrow">
        <header className="sec__head">
          <span className="kicker">Corrections</span>
          <h2>Got something wrong?</h2>
          <p>Email <a href="mailto:hello@mallorcawedding.co.uk" className="t-link t-link--brand">hello@mallorcawedding.co.uk</a>. Corrections are reviewed within 5 working days and a dated correction note is added at the bottom of the page.</p>
        </header>
      </section>

      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Ready to find your Mallorca wedding planner?"
          body="The matcher uses the same vetted directory and the same cost benchmarks discussed here."
          ctaLabel="Start the matcher"
        />
      </section>
    </>
  );
}
