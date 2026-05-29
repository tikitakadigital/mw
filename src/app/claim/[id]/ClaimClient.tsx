'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Planner } from '@/lib/types';

interface Props { planner: Planner }

type Step = 'intro' | 'identity' | 'profile' | 'plan' | 'done';

const PLANS = [
  {
    id: 'ppl',
    name: 'Pay per lead',
    price: '€149',
    per: 'per qualified lead',
    desc: 'Pay only when you unlock a lead. See the full brief before paying.',
    bullets: ['Full lead brief before paying', 'Filter by budget & guests', 'First 2 leads free', 'No monthly commitment'],
  },
  {
    id: 'verified',
    name: 'Verified Partner',
    price: '€399',
    per: '/ month',
    desc: 'Unlimited leads, featured placement, and the Verified Partner badge.',
    bullets: ['Unlimited matched leads', 'Featured directory placement', 'Verified Partner badge for your site', 'Trial month free'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium Partner',
    price: '€899',
    per: '/ month',
    desc: '24h head start on every lead. For planners taking 10+ weddings a year.',
    bullets: ['Everything in Verified', '24h head start on leads', '"Editor\'s pick" badge', '2× profile impressions'],
  },
];

export default function ClaimClient({ planner: p }: Props) {
  const [step, setStep] = useState<Step>('intro');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name:      p.name,
    firm:      p.firm,
    email:     '',
    phone:     '',
    website:   '',
    instagram: p.instagram ?? '',
    bio:       p.bio ?? '',
    services:  p.services?.map(s => `${s.tier}: ${s.bullets?.join(', ')}`).join('\n') ?? '',
    languages: p.languages?.join(', ') ?? '',
    based:     p.based ?? '',
    plan:      'verified',
  });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/claim.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plannerId: p.id }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStep('done');
    } catch {
      setError('Something went wrong. Please try again or email hello@mallorcawedding.co.uk');
    } finally {
      setSending(false);
    }
  };

  if (step === 'done') {
    return (
      <div className="claim-page">
        <div className="claim-page__card" style={{ textAlign: 'center', padding: '56px 40px' }}>
          <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Icon name="check" size={28} stroke={2} />
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,36px)', fontStyle: 'italic', marginBottom: 16 }}>
            Claim received
          </h1>
          <p style={{ font: 'var(--t-body-lg)', color: 'var(--body)', maxWidth: 460, margin: '0 auto 12px' }}>
            Thanks {form.name.split(' ')[0]}. We review every application personally — typically within 1–2 business days.
          </p>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', marginBottom: 32 }}>
            We&apos;ll email you at <strong>{form.email}</strong> once your profile is verified.
          </p>
          <Link href={`/planner/${p.id}`} className="btn btn--secondary">
            View your profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="claim-page">

      {/* Progress */}
      {step !== 'intro' && (
        <div className="claim-page__progress">
          {(['identity', 'profile', 'plan'] as Step[]).map((s, i) => (
            <div key={s} className={`claim-page__step ${step === s ? 'is-active' : ['identity','profile','plan'].indexOf(step) > i ? 'is-done' : ''}`}>
              <span>{i + 1}</span> {s === 'identity' ? 'Identity' : s === 'profile' ? 'Your profile' : 'Choose plan'}
            </div>
          ))}
        </div>
      )}

      <div className="claim-page__card">

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <>
            <span className="kicker kicker--brand">Mallorca Wedding · Free profile claim</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,48px)', fontStyle: 'italic', margin: '12px 0 16px', lineHeight: 1.1 }}>
              Couples in Mallorca are looking for you.
            </h1>
            <p style={{ font: 'var(--t-body-lg)', color: 'var(--body)', marginBottom: 32, maxWidth: 560 }}>
              We&apos;ve created a profile for <strong>{p.name}</strong> of <strong>{p.firm}</strong> based on public information. Claim it to start receiving pre-qualified leads — couples who&apos;ve already told us their budget, venue, guest count and style.
            </p>

            {/* Benefits */}
            <div className="claim-benefits">
              {[
                { ico: 'sparkle', t: 'First 2 leads free', s: 'No payment required to get started. See exactly what a lead looks like before you commit.' },
                { ico: 'shield',  t: 'Pre-qualified couples', s: 'Every lead has answered 12 questions. You see their full brief — budget, venue, guests, style — before deciding.' },
                { ico: 'star',    t: 'Verified badge', s: 'The Verified badge appears on your profile, in the directory, and in the Smart Matcher couples use to find planners.' },
                { ico: 'wallet',  t: 'Flexible pricing', s: 'Pay per lead (€149) or subscribe for unlimited leads from €399/month. No lock-in.' },
              ].map((b, i) => (
                <div key={i} className="claim-benefit">
                  <span className="claim-benefit__ico"><Icon name={b.ico} size={18} /></span>
                  <div>
                    <strong>{b.t}</strong>
                    <p>{b.s}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Blurred lead preview */}
            <div className="claim-lead-preview">
              <div className="claim-lead-preview__label">
                <Icon name="sparkle" size={12} /> Sample lead brief — what you&apos;ll receive
              </div>
              <div className="claim-lead-preview__blur">
                <div className="claim-lead-preview__row"><span>Couple</span><span>S. &amp; T. · Saturday June 2026 · 80 guests</span></div>
                <div className="claim-lead-preview__row"><span>Venue</span><span>Son Marroig (booked) · Budget €80–110k</span></div>
                <div className="claim-lead-preview__row"><span>Style</span><span>Luxury · cliffside sunset · full-service</span></div>
                <div className="claim-lead-preview__row"><span>Complexity</span><span>6/10 · Mid–Lux planner recommended</span></div>
                <div className="claim-lead-preview__overlay">
                  <Icon name="shield" size={20} />
                  Contact details unlock when you claim
                </div>
              </div>
            </div>

            <button className="btn btn--primary btn--xl" onClick={() => setStep('identity')} type="button" style={{ marginTop: 8 }}>
              <Icon name="sparkle" size={16} /> Claim your free profile
            </button>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginTop: 12 }}>
              Takes 3 minutes · No payment needed · We review within 48 hours
            </p>
          </>
        )}

        {/* ── STEP 1: IDENTITY ── */}
        {step === 'identity' && (
          <>
            <span className="kicker kicker--brand">Step 1 of 3</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,32px)', fontStyle: 'italic', margin: '8px 0 6px' }}>
              Confirm who you are
            </h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', marginBottom: 28 }}>
              We&apos;ve pre-filled what we know. Update anything that&apos;s wrong.
            </p>
            <div className="claim-form-grid">
              <div><label className="label">Your name</label><input className="input" type="text" value={form.name} onChange={e => set('name', e.target.value)} /></div>
              <div><label className="label">Firm / business name</label><input className="input" type="text" value={form.firm} onChange={e => set('firm', e.target.value)} /></div>
              <div><label className="label">Email address *</label><input className="input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></div>
              <div><label className="label">Phone / WhatsApp</label><input className="input" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+34 600 000 000" /></div>
              <div><label className="label">Website</label><input className="input" type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourwebsite.com" /></div>
              <div><label className="label">Instagram</label><input className="input" type="text" value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="@yourhandle" /></div>
            </div>
            <div className="claim-form-actions">
              <button className="btn btn--ghost" onClick={() => setStep('intro')} type="button">Back</button>
              <button className="btn btn--primary btn--lg" onClick={() => setStep('profile')} disabled={!form.name || !form.email} type="button">
                Continue <Icon name="arrow" size={14} />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2: PROFILE ── */}
        {step === 'profile' && (
          <>
            <span className="kicker kicker--brand">Step 2 of 3</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,32px)', fontStyle: 'italic', margin: '8px 0 6px' }}>
              Tell couples about yourself
            </h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', marginBottom: 28 }}>
              This is what couples see on your profile. Edit freely — we pre-filled from public sources.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label">Your bio</label>
                <textarea className="input" rows={5} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Tell couples who you are and how you work..." />
              </div>
              <div>
                <label className="label">Services you offer</label>
                <textarea className="input" rows={4} value={form.services} onChange={e => set('services', e.target.value)} placeholder="e.g. Full planning from €8,000 · Day-of coordination from €2,500..." />
              </div>
              <div className="claim-form-grid">
                <div>
                  <label className="label">Languages</label>
                  <input className="input" type="text" value={form.languages} onChange={e => set('languages', e.target.value)} placeholder="English, Castellano..." />
                </div>
                <div>
                  <label className="label">Based in</label>
                  <input className="input" type="text" value={form.based} onChange={e => set('based', e.target.value)} placeholder="Pollença, Mallorca" />
                </div>
              </div>
            </div>
            <div className="claim-form-actions">
              <button className="btn btn--ghost" onClick={() => setStep('identity')} type="button">Back</button>
              <button className="btn btn--primary btn--lg" onClick={() => setStep('plan')} type="button">
                Continue <Icon name="arrow" size={14} />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: PLAN ── */}
        {step === 'plan' && (
          <>
            <span className="kicker kicker--brand">Step 3 of 3</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,32px)', fontStyle: 'italic', margin: '8px 0 6px' }}>
              How would you like to receive leads?
            </h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--muted)', marginBottom: 28 }}>
              No payment now — we&apos;ll confirm everything when we verify your profile. Your first 2 leads are always free.
            </p>

            <div className="claim-plan-grid">
              {PLANS.map(plan => (
                <button
                  key={plan.id}
                  type="button"
                  className={`claim-plan-card ${form.plan === plan.id ? 'is-on' : ''} ${plan.recommended ? 'is-recommended' : ''}`}
                  onClick={() => set('plan', plan.id)}
                >
                  {plan.recommended && <span className="claim-plan-card__badge">Most popular</span>}
                  <div className="claim-plan-card__price">
                    <strong>{plan.price}</strong>
                    <span>{plan.per}</span>
                  </div>
                  <h4>{plan.name}</h4>
                  <p>{plan.desc}</p>
                  <ul>
                    {plan.bullets.map((b, i) => (
                      <li key={i}><Icon name="check" size={13} /> {b}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {error && <p style={{ color: '#b8341d', font: 'var(--t-body-sm)', marginTop: 16 }}>{error}</p>}

            <div className="claim-form-actions">
              <button className="btn btn--ghost" onClick={() => setStep('profile')} type="button">Back</button>
              <button className="btn btn--primary btn--lg" onClick={handleSubmit} disabled={sending} type="button">
                {sending ? 'Submitting…' : <><Icon name="sparkle" size={14} /> Submit claim</>}
              </button>
            </div>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginTop: 12 }}>
              No card required · We&apos;ll be in touch within 48 hours · First 2 leads free
            </p>
          </>
        )}
      </div>
    </div>
  );
}
