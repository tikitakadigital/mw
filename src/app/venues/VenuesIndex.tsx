'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VENUES } from '@/lib/data';
import Icon from '@/components/Icon';
import CtaStrip from '@/components/CtaStrip';

gsap.registerPlugin(ScrollTrigger);

const cheapest = [...VENUES].sort((a, b) => a.estTotal80.low - b.estTotal80.low)[0];

export default function VenuesIndex() {
  const [sort, setSort] = useState<'popular' | 'low' | 'high'>('popular');
  const orientRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLSpanElement>(null);

  const sorted = [...VENUES].sort((a, b) => {
    if (sort === 'low')  return a.estTotal80.low - b.estTotal80.low;
    if (sort === 'high') return b.estTotal80.high - a.estTotal80.high;
    return 0;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orient strip — fade up with stagger
      if (orientRef.current) {
        gsap.fromTo(Array.from(orientRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: orientRef.current, start: 'top 88%', once: true } }
        );
      }
      // Budget count-up
      if (budgetRef.current) {
        ScrollTrigger.create({
          trigger: budgetRef.current, start: 'top 85%', once: true,
          onEnter: () => {
            gsap.fromTo({ val: 70 }, { val: 110 }, {
              duration: 1.2, ease: 'power2.out',
              onUpdate: function() {
                if (budgetRef.current) {
                  budgetRef.current.textContent = `€70k–€${Math.round((this as unknown as {targets: () => [{val:number}]}).targets()[0].val)}k+`;
                }
              }
            });
          }
        });
      }
      // Venue rows stagger
      if (listRef.current) {
        gsap.fromTo(Array.from(listRef.current.children),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 85%', once: true } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="venues-hero">
        <div className="wrap--narrow">
          <nav aria-label="Breadcrumb" style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginBottom: 8 }}>
            <Link href="/" style={{ color: 'inherit' }}>Home</Link>
            <span> · </span>
            <span style={{ color: 'var(--ink)' }}>Wedding venues</span>
          </nav>
          <p className="kicker kicker--brand" style={{ marginBottom: 12 }}>
            <Icon name="clock" size={12} /> Last updated March 2026 · {VENUES.length} venue cost guides
          </p>
          <h1 className="serif-h1" style={{ fontStyle: 'italic', marginBottom: 16 }}>
            Mallorca wedding venues
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Honest, up-to-date cost guides for the island&apos;s most-requested wedding venues — from cliffside estates to mountain fincas. Each guide gives a realistic 2026 budget, a full breakdown, and the planners who actually work there.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <Link href="/matcher" className="btn btn--primary btn--lg">
              <Icon name="sparkle" size={16} /> Calculate my budget in 30 seconds
            </Link>
            <a className="btn btn--secondary btn--lg" href="#guides" onClick={e => { e.preventDefault(); document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Compare venues
            </a>
          </div>
        </div>
      </section>

      {/* ORIENTATION STRIP */}
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="venues-orient" ref={orientRef}>
          <div className="venues-orient__item">
            <span className="venues-orient__label">Typical 80-guest budget</span>
            <span className="venues-orient__value" ref={budgetRef}>€70k–€110k+</span>
            <span className="venues-orient__sub">Across all venues, wedding day only</span>
          </div>
          <div className="venues-orient__item">
            <span className="venues-orient__label">Most cost-efficient</span>
            <span className="venues-orient__value">{cheapest.name}</span>
            <span className="venues-orient__sub">From €{(cheapest.estTotal80.low / 1000).toFixed(0)}k for 80 guests</span>
          </div>
          <div className="venues-orient__item">
            <span className="venues-orient__label">Biggest cost variable</span>
            <span className="venues-orient__value">Guest count</span>
            <span className="venues-orient__sub">Catering scales directly with numbers</span>
          </div>
        </div>
      </section>

      {/* VENUE LIST */}
      <section className="wrap sec--sm" id="guides">
        <div className="dir-results-head" style={{ marginBottom: 24 }}>
          <h2 className="serif-h2" style={{ fontStyle: 'italic' }}>Compare {VENUES.length} venues</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ font: 'var(--t-caption)', color: 'var(--muted)' }}>Sort by</span>
            <select className="input" style={{ width: 'auto', padding: '8px 32px 8px 12px', minHeight: 0 }}
              value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
              <option value="popular">Most requested</option>
              <option value="low">Lowest budget first</option>
              <option value="high">Highest budget first</option>
            </select>
          </div>
        </div>

        <div className="venues-list" ref={listRef}>
          {sorted.map(v => (
            <Link key={v.id} href={`/venues/${v.slug}`} className="venue-row">
              <div className="venue-row__photo">
                <Image src={v.img} alt={`${v.name} wedding venue, ${v.region}, Mallorca`} fill style={{ objectFit: 'cover' }} unoptimized />
                {v.blankCanvas && <span className="venue-row__tag">Blank canvas</span>}
              </div>
              <div className="venue-row__body">
                <div className="venue-row__head">
                  <div>
                    <h3 className="serif-h3">{v.name}</h3>
                    <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', margin: '2px 0 0' }}>{v.region}</p>
                  </div>
                  <div className="venue-row__price">
                    <strong>€{(v.estTotal80.low / 1000).toFixed(0)}k–€{(v.estTotal80.high / 1000).toFixed(0)}k{v.id === 'son-marroig' ? '+' : ''}</strong>
                    <span>for 80 guests</span>
                  </div>
                </div>
                <p className="venue-row__blurb">{v.listBlurb}</p>
                <div className="venue-row__meta">
                  <span><Icon name="guests" size={14} /> {v.capacity}</span>
                  <span><Icon name="wallet" size={14} /> {v.cateringTier} catering</span>
                  <span><Icon name="sun" size={14} /> {v.season}</span>
                  {v.plannerIds.length > 0 && <span><Icon name="planner" size={14} /> {v.plannerIds.length} planners</span>}
                </div>
                <span className="venue-row__cta">Read the cost guide <Icon name="arrow" size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW VENUE COSTS WORK */}
      <section style={{ background: 'var(--surface)', padding: '64px 0' }}>
        <div className="wrap--narrow">
          <span className="kicker">How venue costs work in Mallorca</span>
          <h2 className="serif-h2" style={{ fontStyle: 'italic', margin: '12px 0 16px' }}>What actually drives the price of a Mallorca wedding venue</h2>
          <p className="lead">Venue rental is rarely the biggest line. For most Mallorca weddings, catering is the largest cost, followed by production — lighting, furniture, infrastructure — and a service buffer that couples consistently underestimate.</p>
          <p className="body-md" style={{ marginTop: 16 }}>
            The two factors that move a budget most are <strong>guest count</strong> (catering scales directly with numbers) and whether the venue is a <strong>blank canvas</strong>. Blank-canvas venues like Son Marroig require infrastructure — generators, lighting rigs, temporary kitchens — installed for each wedding. Private fincas with established event areas keep production costs lower.
          </p>
          <p className="body-md" style={{ marginTop: 16 }}>
            Every guide on this page uses the same methodology: real 2026 Mallorca vendor pricing, a 15% service-and-contingency buffer, and a clear split of what&apos;s included versus what couples pay for separately. <Link href="/standards" className="t-link t-link--brand">Read our full methodology</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec wrap--narrow">
        <header className="sec__head">
          <span className="kicker">FAQ</span>
          <h2>Mallorca wedding venue questions.</h2>
        </header>
        <div className="faq">
          {[
            { q: 'How much does a wedding venue in Mallorca cost?', a: "For the wedding day itself, most 80-guest weddings at the island's established venues land between €70,000 and €110,000+ all-in. That includes venue rental, catering, infrastructure, furniture and a service buffer — but not planner, photography, florals or extra events." },
            { q: `What is the cheapest of these venues?`, a: `${cheapest.name} is currently the most cost-efficient of our benchmarked venues, starting around €${(cheapest.estTotal80.low / 1000).toFixed(0)}k for 80 guests, largely because of easier supplier logistics.` },
            { q: 'Why are cliffside venues more expensive than fincas?', a: "Cliffside 'blank canvas' venues such as Son Marroig require temporary infrastructure — power, lighting, kitchens — for every wedding, plus more complex supplier access. Private fincas with built-in event areas keep those production costs lower." },
            { q: 'Do these estimates include a wedding planner?', a: 'No. Planner fees (€6,000–€15,000+) sit on top of every venue estimate. For most of these venues a planner is strongly recommended.' },
            { q: 'How far ahead should I book a Mallorca venue?', a: 'Peak Saturdays (June–September) book 12–18 months ahead. Shoulder-season and weekday dates often still have availability 8–10 months out.' },
          ].map((f, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary className="faq-item__q">{f.q}</summary>
              <p className="faq-item__a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Not sure which venue fits your budget?"
          body="The Smart Matcher takes your guest count, season and the kind of day you want, then suggests venues and planners that actually fit — in 30 seconds."
          ctaLabel="Calculate my budget"
        />
      </section>
    </>
  );
}
