'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '@/components/Icon';
import PlannerCard from '@/components/PlannerCard';
import CtaStrip from '@/components/CtaStrip';
import type { Venue, Planner } from '@/lib/types';
import { PLANNERS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  venue: Venue;
  matchedPlanners: Planner[];
  alternatives: Venue[];
}

export default function VenueGuideClient({ venue: v, matchedPlanners, alternatives }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const totalRef    = useRef<HTMLTableCellElement>(null);
  const snapshotRef = useRef<HTMLDivElement>(null);
  const railEstRef  = useRef<HTMLParagraphElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const photos      = v.photos.length > 0 ? v.photos : [v.img];
  const sara        = PLANNERS.find(p => p.id === 'sara');

  // Count-up helper
  function countUp(el: HTMLElement, low: number, high: number, suffix = '') {
    gsap.fromTo({ val: low }, { val: high }, {
      duration: 1.2, ease: 'power2.out',
      onUpdate: function() {
        const t = (this as unknown as { targets: () => [{ val: number }] }).targets()[0];
        el.textContent = `€${Math.round(t.val).toLocaleString()}${suffix}`;
      },
    });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snapshot rows
      if (snapshotRef.current) {
        gsap.fromTo(Array.from(snapshotRef.current.children),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: snapshotRef.current, start: 'top 87%', once: true } }
        );
      }
      // Cost total count-up
      if (totalRef.current) {
        ScrollTrigger.create({
          trigger: totalRef.current, start: 'top 85%', once: true,
          onEnter: () => {
            if (totalRef.current) countUp(totalRef.current, v.estTotal80.low * 0.5, v.estTotal80.high, v.id === 'son-marroig' ? '+' : '');
          },
        });
      }
      // Rail estimate count-up
      if (railEstRef.current) {
        ScrollTrigger.create({
          trigger: railEstRef.current, start: 'top 85%', once: true,
          onEnter: () => {
            if (railEstRef.current) {
              railEstRef.current.textContent = `€${(v.estTotal80.low / 1000).toFixed(0)}k – €${(v.estTotal80.high / 1000).toFixed(0)}k${v.id === 'son-marroig' ? '+' : ''}`;
            }
          },
        });
      }
      // Example budgets
      if (examplesRef.current) {
        gsap.fromTo(Array.from(examplesRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: examplesRef.current, start: 'top 85%', once: true } }
        );
      }
    });
    return () => ctx.revert();
  }, [v.id, v.estTotal80.low, v.estTotal80.high]);

  return (
    <>
      <section className="wrap--narrow" style={{ paddingTop: 32 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginBottom: 8 }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link>
          <span> · </span>
          <Link href="/venues" style={{ color: 'inherit' }}>Wedding venues</Link>
          <span> · </span>
          <span style={{ color: 'var(--ink)' }}>{v.name}</span>
        </nav>

        <p className="kicker kicker--brand" style={{ marginBottom: 12 }}>
          <Icon name="clock" size={12} /> Last updated March 2026 · 2026 Mallorca vendor pricing
        </p>
        <h1 className="serif-h1" style={{ fontStyle: 'italic', marginBottom: 8 }}>{v.name} wedding cost</h1>
        <p style={{ font: 'var(--t-body-md)', color: 'var(--muted)', marginBottom: 16 }}>
          {v.region} · {v.capacity} · {v.tagline}
        </p>

        {/* Author byline */}
        {sara && (
          <div className="byline" style={{ marginBottom: 28 }}>
            <div className="byline__avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sara.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <strong>Reviewed by Sara Llabrés &amp; the editorial team</strong>
              <span>Working planner with {sara.yearsActive} years on the island · <Link href="/standards" className="t-link">How we calculate costs</Link></span>
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="venue-gallery">
          <button type="button" className="venue-gallery__main" onClick={() => setLightbox(0)} aria-label="Open photos">
            <Image src={photos[0]} alt={`${v.name} wedding venue`} fill priority style={{ objectFit: 'cover' }} unoptimized />
          </button>
          <div className="venue-gallery__grid">
            {[1, 2, 3, 4].map(i => (
              <button key={i} type="button" className="venue-gallery__cell"
                style={{ visibility: photos[i] ? 'visible' : 'hidden' }}
                onClick={() => setLightbox(i)} aria-label={`Photo ${i + 1}`}>
                {photos[i] && <Image src={photos[i]} alt="" fill style={{ objectFit: 'cover' }} unoptimized />}
              </button>
            ))}
          </div>
          {photos.length > 5 && (
            <button type="button" className="venue-gallery__more" onClick={() => setLightbox(0)}>
              <Icon name="camera" size={14} /> Show all {photos.length} photos
            </button>
          )}
        </div>
        {v.photosNote && <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginTop: 12 }}>{v.photosNote}</p>}
      </section>

      {/* Body */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="venue-grid">
          <div className="venue-body">

            <span className="kicker">{v.region} · {v.usp}</span>
            <h2>About {v.name}</h2>
            <p className="lead">{v.blurb}</p>

            {/* Snapshot */}
            <h2>Quick {v.name} wedding cost snapshot</h2>
            <p>Typical realistic budgets for weddings in 2026:</p>
            <div className="snapshot" ref={snapshotRef}>
              {v.costSnapshot.map((s, i) => (
                <div key={i} className={`snapshot__row ${s.highlight ? 'is-on' : ''}`}>
                  <span className="snapshot__guests">{s.g}</span>
                  <span className="snapshot__range">{s.range}</span>
                </div>
              ))}
            </div>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginTop: 8 }}>
              These estimates reflect the wedding day itself. Multi-day celebrations can increase the total significantly.
            </p>

            {/* Inline matcher CTA */}
            <div style={{ margin: '32px 0', padding: 24, background: 'var(--primary-soft)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <strong style={{ font: 'var(--t-body-md)', fontWeight: 700, color: 'var(--ink)', display: 'block' }}>Calculate your {v.name} budget in 30 seconds</strong>
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--body)' }}>Use the Smart Matcher to get a realistic estimate based on guest count, season and complexity.</span>
              </div>
              <Link href="/matcher" className="btn btn--primary">
                <Icon name="sparkle" size={14} /> Calculate my budget
              </Link>
            </div>

            {/* Cost explanation */}
            <h2>How much does a wedding at {v.name} cost?</h2>
            {v.blankCanvas ? (
              <>
                <p>The average {v.name} wedding cost is influenced primarily by guest numbers, catering level and production requirements. Because the venue is a blank-canvas event space, infrastructure must be installed temporarily for each wedding.</p>
                <p>Typical cost drivers include lighting installations, generator power systems, temporary catering kitchens, event furniture rentals and supplier logistics.</p>
                <p>These requirements are the main reason {v.name} weddings tend to cost more than celebrations hosted at private finca venues elsewhere on the island.</p>
              </>
            ) : (
              <>
                <p>The cost is primarily influenced by guest numbers, catering level, décor installations and entertainment.</p>
                <p>Because the venue is {v.region.includes('Palma') ? 'close to Palma' : 'in the ' + v.region.split('·')[0].trim()}, supplier access is {v.region.includes('Palma') ? 'relatively straightforward compared with remote venues' : 'a planning factor — lighting and transport are usually budgeted accordingly'}.</p>
              </>
            )}

            {/* Breakdown table */}
            <h2>{v.name} wedding cost breakdown</h2>
            <table className="venue-cost-table">
              <thead>
                <tr><th>Item</th><th style={{ textAlign: 'right' }}>2026 estimate</th></tr>
              </thead>
              <tbody>
                {v.breakdown.map((b, i) => (
                  <tr key={i}><td>{b.item}</td><td style={{ textAlign: 'right' }}>{b.value}</td></tr>
                ))}
                <tr>
                  <td className="total">Typical realistic wedding cost · 80 guests</td>
                  <td className="total" style={{ textAlign: 'right' }} ref={totalRef}>
                    €{v.estTotal80.low.toLocaleString()} – €{v.estTotal80.high.toLocaleString()}{v.id === 'son-marroig' ? '+' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)' }}>This estimate assumes a standard wedding day with dinner, open bar and typical production requirements.</p>

            {/* Example budgets */}
            {v.exampleBudgets.length > 0 && (
              <>
                <h2>Example {v.name} wedding budgets</h2>
                <div className="venue-examples" ref={examplesRef}>
                  {v.exampleBudgets.map((ex, i) => (
                    <div key={i} className="venue-example">
                      <span className="venue-example__h">{ex.h}</span>
                      <span className="venue-example__range">{ex.range}</span>
                      <p>{ex.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Why expensive */}
            {v.whyExpensive && (
              <>
                <h2>Why {v.name} weddings are more expensive</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '16px 0 32px' }}>
                  {v.whyExpensive.map((w, i) => (
                    <div key={i}>
                      <h3 className="serif-h3" style={{ marginBottom: 8 }}>{w.h}</h3>
                      <p style={{ font: 'var(--t-body-md)', color: 'var(--body)' }}>{w.p}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2>What makes {v.name} special</h2>
            <ul>{v.pros.map((pro, i) => <li key={i}>{pro}</li>)}</ul>

            <h2>Things to know before booking</h2>
            <ul>{v.things_to_know.map((t, i) => <li key={i}>{t}</li>)}</ul>

            {/* Included vs Not included */}
            <h2>What&apos;s included vs not included</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '16px 0 32px' }}>
              <div>
                <h3 className="serif-h3" style={{ marginBottom: 8 }}>Included</h3>
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {v.includes.map((it, i) => (
                    <li key={i} style={{ padding: '8px 0', display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10, borderBottom: '1px solid var(--hairline-soft)', font: 'var(--t-body-md)' }}>
                      <Icon name="check" size={16} /> <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="serif-h3" style={{ marginBottom: 8 }}>Not included</h3>
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {v.notIncluded.map((it, i) => (
                    <li key={i} style={{ padding: '8px 0', display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10, borderBottom: '1px solid var(--hairline-soft)', font: 'var(--t-body-md)', color: 'var(--muted)' }}>
                      <span>—</span><span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inline photo band */}
            {photos.length > 5 && (
              <div className="venue-inline-photos">
                {photos.slice(5, 8).map((src, i) => (
                  <button key={i} type="button" onClick={() => setLightbox(5 + i)}>
                    <Image src={src} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
                  </button>
                ))}
              </div>
            )}

            {/* Matched planners */}
            <h2>Wedding planners who regularly work at {v.name}</h2>
            <p>These planners have a track record at {v.name}. They know the venue team, the access rules, and the production patterns that keep totals in range.</p>
            <div className="pcard-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 24 }}>
              {matchedPlanners.map(p => <PlannerCard key={p.id} planner={p} />)}
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <>
                <h2>Alternative Mallorca wedding venues</h2>
                <p>If the {v.name} estimate exceeds your budget, these venues offer comparable atmosphere at a lower total. <Link href="/venues" className="t-link t-link--brand">See all venue cost guides</Link>.</p>
                <div className="cost-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 24 }}>
                  {alternatives.map(alt => (
                    <Link key={alt.id} href={`/venues/${alt.slug}`} className="cost-card">
                      <div className="cost-card__photo">
                        <Image src={alt.img} alt={alt.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      </div>
                      <div className="cost-card__body">
                        <h4 className="cost-card__name">{alt.name}</h4>
                        <p className="cost-card__meta">{alt.region}</p>
                        <div className="cost-card__price"><em>€{(alt.estTotal80.low / 1000).toFixed(0)}k–€{(alt.estTotal80.high / 1000).toFixed(0)}k</em> for 80 guests</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* FAQ */}
            <h2>FAQ — {v.name} wedding cost</h2>
            <div className="faq">
              {[
                { q: `What is the minimum budget for a ${v.name} wedding?`, a: `Most weddings start around €${v.estTotal80.low.toLocaleString()}, with peak-season weddings often exceeding €${v.estTotal80.high.toLocaleString()}${v.id === 'son-marroig' ? '+' : ''}.` },
                { q: 'Does the estimate include wedding planner fees?', a: "No. Wedding planners typically charge €6,000–€15,000+ depending on service level. We'd recommend a planner for any wedding at this venue." },
                { q: 'Does the estimate include additional wedding events?', a: 'No. These estimates reflect the wedding day only. Welcome dinners and brunches can add €15–40k depending on scale.' },
                { q: 'How far in advance should we book?', a: 'Peak Saturdays often book 12–18 months ahead. Shoulder-season and weekday dates have more availability at 8–10 months out.' },
              ].map((f, i) => (
                <details key={i} className="faq-item" open={i === 0}>
                  <summary className="faq-item__q">{f.q}</summary>
                  <p className="faq-item__a">{f.a}</p>
                </details>
              ))}
            </div>

            {/* Methodology */}
            <h2>How this guide was put together</h2>
            <p>This guide was updated in March 2026 using recent Mallorca wedding vendor pricing, venue planning benchmarks, and real production cost ranges{v.blankCanvas ? ' for blank-canvas wedding venues' : ' for private finca venues'}.</p>
            <p>Final pricing varies by season, guest count, supplier selection and design complexity. The matcher uses the same benchmarks to give you a personalised range.</p>

            {/* Related guides */}
            <h2>Related Mallorca wedding planning guides</h2>
            <ul className="venue-related">
              <li><Link href="/venues">Mallorca wedding venues guide</Link></li>
              <li><Link href="/blog/realistic-budget-mallorca-wedding-2026">Mallorca destination wedding cost guide</Link></li>
              <li><Link href="/find-a-planner">Best wedding planners in Mallorca</Link></li>
              <li><Link href="/real-weddings">Real Mallorca weddings &amp; what they cost</Link></li>
            </ul>

            <div style={{ marginTop: 48 }}>
              <CtaStrip
                title={`Want a personalised estimate for ${v.name}?`}
                body="The matcher applies your guest count, season and catering tier to get the exact range — and shortlists planners who actually work at this venue."
                ctaLabel="Get my estimate"
                variant="brand"
              />
            </div>
          </div>

          {/* STICKY RAIL */}
          <aside>
            <div className="venue-rail">
              <p className="venue-rail__title">2026 typical 80-guest budget</p>
              <p className="venue-rail__est" ref={railEstRef}>
                €{(v.estTotal80.low / 1000).toFixed(0)}k<span style={{ fontSize: 18, color: 'var(--muted)' }}> – </span>€{(v.estTotal80.high / 1000).toFixed(0)}k{v.id === 'son-marroig' ? '+' : ''}
              </p>
              <p className="venue-rail__sub">All-in: venue, catering, infrastructure, furniture, service &amp; buffer</p>
              <Link href="/matcher" className="btn btn--primary btn--wide btn--lg">
                <Icon name="sparkle" size={14} /> Calculate my budget
              </Link>
              <ul className="venue-rail__list">
                <li><span>Venue rental</span><strong>{v.rentalRange}</strong></li>
                <li><span>Catering tier</span><strong>{v.cateringTier}</strong></li>
                <li><span>Per-head from</span><strong>€{v.cateringPerHead.low}</strong></li>
                <li><span>Capacity</span><strong>{v.capacity}</strong></li>
                <li><span>Best season</span><strong>{v.season}</strong></li>
                {v.plannerRequired && <li><span>Planner</span><strong>Required</strong></li>}
              </ul>
            </div>
            <div style={{ marginTop: 16 }} className="venue-rail">
              <p className="venue-rail__title">Talk to a planner</p>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', marginBottom: 12 }}>{matchedPlanners.length} verified planners with a track record at {v.name}.</p>
              <Link href="/planners" className="btn btn--secondary btn--wide">See planners</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox photos={photos} index={lightbox} onClose={() => setLightbox(null)} setIndex={setLightbox} />
      )}
    </>
  );
}

function Lightbox({ photos, index, onClose, setIndex }: { photos: string[]; index: number; onClose: () => void; setIndex: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') setIndex((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [index, photos.length, onClose, setIndex]);

  return (
    <div className="vlb" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="vlb__close" onClick={e => { e.stopPropagation(); onClose(); }} aria-label="Close" type="button"><Icon name="close" size={18} /></button>
      <button className="vlb__nav vlb__nav--prev" onClick={e => { e.stopPropagation(); setIndex((index - 1 + photos.length) % photos.length); }} aria-label="Previous" type="button"><Icon name="arrow-l" size={18} /></button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="vlb__img" src={photos[index]} alt="" onClick={e => e.stopPropagation()} />
      <button className="vlb__nav vlb__nav--next" onClick={e => { e.stopPropagation(); setIndex((index + 1) % photos.length); }} aria-label="Next" type="button"><Icon name="arrow" size={18} /></button>
      <span className="vlb__count">{index + 1} / {photos.length}</span>
    </div>
  );
}
