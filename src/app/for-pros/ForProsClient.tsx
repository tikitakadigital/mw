'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function ForProsClient() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="pro-hero">
        <span className="kicker kicker--brand">For wedding planners</span>
        <h1>Pre-qualified Mallorca wedding leads. No more €100k weddings on a €10k budget.</h1>
        <p className="lead">Couples spend 12 questions answering our Smart Matcher before you ever see them. You get the lead with budget, date, venue status, guest count, catering tier, florals level, photo/video, music, extras and guest logistics — and a complexity score recommending the planner tier.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a className="btn btn--primary btn--xl" href="#apply" onClick={(e) => { e.preventDefault(); document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Apply to list — free trial
          </a>
          <a className="btn btn--secondary btn--xl" href="#lead" onClick={(e) => { e.preventDefault(); document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth' }); }}>
            See a sample lead
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap sec--sm" id="how">
        <div className="pro-features">
          {[
            { n: '01', h: "Tell us what you'll take", p: "Minimum project value, max guest count, preferred styles, dates you're booking for. We never send you a lead that fails your filter." },
            { n: '02', h: 'We send only matched leads', p: "Couples have answered 6–14 qualifying questions before reaching you. You see their full brief — including complexity score and recommended tier — before unlocking contact." },
            { n: '03', h: 'Pay per lead, or monthly', p: "€149 per unlocked lead, or €399/month for unlimited matched leads + Verified Partner badge. First 2 leads free during the trial month." },
          ].map(f => (
            <div key={f.n} className="pro-feature">
              <div className="pro-feature__num">{f.n}</div>
              <h4>{f.h}</h4>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE LEAD */}
      <section className="sec wrap" id="lead">
        <header className="sec__head">
          <span className="kicker">A real lead, anonymised</span>
          <h2>This is what a lead looks like.</h2>
          <p>Every field below comes from the couple&apos;s matcher answers. You see all of it before you decide to unlock contact details.</p>
        </header>

        <div className="lead-mock">
          <div className="lead-mock__head">
            <div>
              <span className="lead-mock__tag">New lead · 12 March 2026</span>
              <h3 className="serif-h3" style={{ marginTop: 8 }}>S. &amp; T. · Saturday June 2026 · 80 guests</h3>
              <p className="muted" style={{ font: 'var(--t-body-sm)', marginTop: 4 }}>Venue: Son Marroig (booked) · Budget comfort: €80–110k</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--ink)' }}>6<small style={{ fontSize: 18, color: 'var(--muted)' }}>/10</small></span>
              <span style={{ display: 'block', font: 'var(--t-caption)', color: 'var(--muted)' }}>Complexity</span>
            </div>
          </div>
          <div className="lead-mock__grid">
            <div className="lead-mock__col">
              <h4>Basics</h4>
              <dl>
                <dt>Guest count</dt><dd>80</dd>
                <dt>Wedding date</dt><dd>Sat 14 Jun 2026</dd>
                <dt>Budget range</dt><dd>€80,000 – €110,000</dd>
                <dt>Venue status</dt><dd>Booked · Son Marroig</dd>
              </dl>
            </div>
            <div className="lead-mock__col">
              <h4>Day shape</h4>
              <dl>
                <dt>Style</dt><dd>Luxury · cliffside sunset</dd>
                <dt>Priority</dt><dd>Design &amp; atmosphere</dd>
                <dt>Support level</dt><dd>Full-service planning</dd>
                <dt>Catering tier</dt><dd>Premium (€280–325/g)</dd>
              </dl>
            </div>
            <div className="lead-mock__col">
              <h4>Extras &amp; logistics</h4>
              <dl>
                <dt>Photography</dt><dd>Photo + video</dd>
                <dt>Music</dt><dd>Live band + DJ</dd>
                <dt>Extra events</dt><dd>Welcome dinner · Day-after brunch</dd>
                <dt>Guest logistics</dt><dd>Medium (multi-hotel)</dd>
              </dl>
            </div>
          </div>
          <div className="lead-mock__quote">
            <Icon name="sparkle" size={14} />
            <span><strong>S&apos;s note:</strong> &ldquo;We&apos;re getting married at Son Marroig in June 2026 and would love a planner who has worked there before. Open to ideas on the welcome dinner — keen to do something in Deià village.&rdquo;</span>
          </div>
          <div className="lead-mock__foot">
            <span className="muted" style={{ font: 'var(--t-body-sm)' }}>Contact details unlock for €149 (PPL) or included in your Verified Partner plan.</span>
            <button className="btn btn--primary" type="button">Unlock contact</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec wrap">
        <div className="stats">
          {[
            { num: '€80–110k', lbl: 'Median 80-guest wedding the platform routes' },
            { num: '72%', lbl: 'Of leads already have a venue or shortlist' },
            { num: '3.4×', lbl: 'Contact-to-booked rate vs. open enquiries' },
            { num: '2026+', lbl: 'Wedding dates currently in the funnel' },
          ].map((s, i) => (
            <div key={i} className="stat">
              <span className="stat__num"><em>{s.num}</em></span>
              <span className="stat__lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="sec wrap">
        <header className="sec__head">
          <span className="kicker">Pricing</span>
          <h2>Choose what fits your business.</h2>
          <p>Pay only when you see value. First 2 leads free during the trial month — no card required.</p>
        </header>
        <div className="pricing-grid">
          <div className="pricing-tier">
            <span className="kicker">Pay per lead</span>
            <div className="pricing-tier__price"><span className="num">€149</span><span className="per">per qualified lead</span></div>
            <p className="muted" style={{ font: 'var(--t-body-sm)' }}>Best for planners booking 2–5 destination weddings a year.</p>
            <ul className="pricing-features">
              {['Full lead brief before paying', 'Filter by min budget & guests', 'First 2 leads free in trial', 'Cancel anytime'].map(f => (
                <li key={f}><Icon name="check" size={14} /> <span>{f}</span></li>
              ))}
            </ul>
            <button className="btn btn--secondary btn--wide" type="button">Start with pay-per-lead</button>
          </div>

          <div className="pricing-tier pricing-tier--recommended">
            <span className="pricing-tier__badge">Recommended</span>
            <span className="kicker" style={{ color: 'var(--primary)' }}>Verified Partner</span>
            <div className="pricing-tier__price"><span className="num">€399</span><span className="per">/ month</span></div>
            <p className="muted" style={{ font: 'var(--t-body-sm)' }}>Unlimited matched leads, featured directory placement, and the Verified Partner badge for your own site.</p>
            <ul className="pricing-features">
              {['Unlimited matched leads', 'Featured directory placement', 'Lead dashboard with pipeline tracking', 'Verified Partner badge for your site', 'Quarterly 2026 pricing benchmarks (private)', 'Trial month free'].map(f => (
                <li key={f}><Icon name="check" size={14} /> <span>{f}</span></li>
              ))}
            </ul>
            <button className="btn btn--primary btn--wide" type="button">Apply for Verified Partner</button>
          </div>

          <div className="pricing-tier pricing-tier--premium">
            <span className="kicker" style={{ color: 'var(--terracotta)' }}>Premium Partner</span>
            <div className="pricing-tier__price"><span className="num">€899</span><span className="per">/ month</span></div>
            <p className="muted" style={{ font: 'var(--t-body-sm)' }}>For planners who take 10+ weddings a year.</p>
            <ul className="pricing-features">
              {['Everything in Verified Partner', '24h head start on every matched lead', '"Editor\'s pick" badge in directory', '2× profile impressions', 'Real-wedding feature once per year', 'Blog interview + social mention'].map(f => (
                <li key={f}><Icon name="check" size={14} /> <span>{f}</span></li>
              ))}
            </ul>
            <button className="btn btn--secondary btn--wide" style={{ borderColor: 'var(--terracotta)', color: 'var(--terracotta)' }} type="button">Apply for Premium</button>
          </div>
        </div>
        <p className="muted" style={{ font: 'var(--t-caption)', textAlign: 'center', marginTop: 24 }}>
          A booked destination wedding in Mallorca earns €4k–15k+ per planner. At a 10% lead-to-booking rate, €149/lead is a ~€1,500 CPA — typical for high-ticket B2C lead-gen.
        </p>
      </section>

      {/* APPLY */}
      <section className="sec sec--alt" id="apply">
        <div className="wrap--narrow">
          <header className="sec__head sec__head--center">
            <span className="kicker">Apply</span>
            <h2>Apply to list your planning service.</h2>
            <p>It takes five minutes. We review every application and meet new planners on a video call before listing.</p>
          </header>
          {sent ? (
            <div style={{ padding: 48, textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon name="check" size={24} stroke={2.4} />
              </span>
              <h3 className="serif-h3">Application received.</h3>
              <p className="body-md" style={{ marginTop: 8, maxWidth: 420, margin: '8px auto 0' }}>We&apos;ll review and reach out within 3 working days to schedule a 20-minute introduction call.</p>
            </div>
          ) : (
            <form style={{ display: 'grid', gap: 16, background: 'var(--surface)', padding: 32, borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="cols-2" style={{ gap: 16 }}>
                <div><label className="label">Your name</label><input className="input" type="text" required placeholder="e.g. Sara Llabrés" /></div>
                <div><label className="label">Company name</label><input className="input" type="text" required placeholder="e.g. Slow Finca" /></div>
              </div>
              <div className="cols-2" style={{ gap: 16 }}>
                <div><label className="label">Based in</label><input className="input" type="text" required placeholder="e.g. Pollença, Mallorca" /></div>
                <div><label className="label">Languages</label><input className="input" type="text" required placeholder="e.g. English, Castellano, Català" /></div>
              </div>
              <div className="cols-2" style={{ gap: 16 }}>
                <div>
                  <label className="label">Minimum project value</label>
                  <select className="input">
                    <option>Under €40k</option><option>€40–70k</option><option>€70–100k</option><option>€100–150k</option><option>€150k+</option>
                  </select>
                </div>
                <div><label className="label">Max guest count</label><input className="input" type="number" placeholder="e.g. 120" /></div>
              </div>
              <div>
                <label className="label">Portfolio link (Instagram or website)</label>
                <input className="input" type="url" placeholder="https://" />
              </div>
              <div>
                <label className="label">Describe your ideal couple</label>
                <textarea className="input" rows={4} placeholder="e.g. We take 8 weddings a year, mostly 40–80 guests, looking for a planner-led day not a high-production show." />
              </div>
              <button className="btn btn--primary btn--lg" type="submit">Submit application</button>
              <p className="muted" style={{ font: 'var(--t-caption)' }}>By submitting you agree to our planner standards. We&apos;ll never share your details publicly without your approval.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
