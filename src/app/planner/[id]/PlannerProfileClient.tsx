'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import type { Planner, Venue } from '@/lib/types';

interface Props {
  planner: Planner;
  preferredVenues: Venue[];
}

export default function PlannerProfileClient({ planner: p, preferredVenues }: Props) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <div className="mw-profile" style={{ paddingTop: 0, marginTop: 0 }}>
      {/* Breadcrumb */}
      <div className="mw-profile__topline">
        <Link href="/planners" className="mw-profile__back">
          <Icon name="arrow-l" size={16} /> All planners
        </Link>
        <div className="mw-profile__actions">
          <button className="mw-profile__act" type="button"><Icon name="share" size={14} /> Share</button>
          <button className="mw-profile__act" type="button"><Icon name="heart" size={14} /> Save</button>
        </div>
      </div>

      {/* Photo banner */}
      <section className="mw-profile__photos">
        <div className="mw-profile__hero" style={{ overflow: 'hidden', borderRadius: '12px 0 0 12px' }}>
          <Image src={p.photos[0] || p.img} alt={p.firm} width={800} height={560} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
        </div>
        <div className="mw-profile__sides">
          <div style={{ overflow: 'hidden', borderRadius: '0 12px 0 0' }}>
            <Image src={p.photos[1] || p.img} alt="" width={400} height={276} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </div>
          <div style={{ overflow: 'hidden', borderRadius: '0 0 12px 0' }}>
            <Image src={p.photos[2] || p.img} alt="" width={400} height={276} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </div>
        </div>
      </section>

      {/* Title */}
      <header className="mw-profile__head">
        <span className="kicker">{p.location} · {p.style}</span>
        <h1>{p.tagline}</h1>
        <div className="mw-profile__stats">
          <span><Icon name="star" size={14} /> {p.rating}</span>
          <span>·</span>
          <span>{p.reviews} weddings on Mallorca Wedding</span>
          <span>·</span>
          <span>{p.based}</span>
        </div>
      </header>

      {/* Body */}
      <section className="mw-profile__body">
        <div className="mw-profile__main">
          <div className="mw-profile__intro">
            <div className="mw-profile__avatar"><span>{p.name[0]}</span></div>
            <div>
              <h3>Planned by {p.name}</h3>
              <p className="mw-profile__intro-sub">{p.firm} · {p.languages.join(' · ')} · {p.response}</p>
            </div>
            {p.badges.includes('Verified') && (
              <span className="mw-profile__verify"><Icon name="check" size={12} /> Verified planner</span>
            )}
          </div>

          <hr className="mw-profile__rule" />
          <h3>About {p.firm}</h3>
          <p>{p.bio}</p>

          <hr className="mw-profile__rule" />
          <h3>What&apos;s offered</h3>
          <ul className="mw-services">
            {p.services.map((s, i) => (
              <li key={i}>
                <span className="mw-services__title">{s.title}</span>
                <span className="mw-services__body">{s.body}</span>
              </li>
            ))}
          </ul>

          {preferredVenues.length > 0 && (
            <>
              <hr className="mw-profile__rule" />
              <h3>Venues {p.name.split(' ')[0]} regularly works at</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 12 }}>
                {preferredVenues.map(v => (
                  <Link key={v.id} href={`/venue/${v.id}`} className="cost-card" style={{ flexDirection: 'row' }}>
                    <div style={{ width: 100, flexShrink: 0, aspectRatio: '1', overflow: 'hidden' }}>
                      <Image src={v.img} alt={v.name} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                    </div>
                    <div className="cost-card__body" style={{ padding: 12 }}>
                      <h4 className="cost-card__name" style={{ fontSize: 17 }}>{v.name}</h4>
                      <p className="cost-card__meta">{v.region}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <hr className="mw-profile__rule" />
          <h3>What past couples say</h3>
          <div className="mw-reviews">
            <article>
              <div className="mw-reviews__rating">
                <span className="mw-reviews__num">{p.rating}</span>
                <span className="mw-reviews__sub">Guest favourite · {p.reviews} reviews</span>
              </div>
            </article>
            {[
              { init: 'K', name: 'Kate & James', date: 'May 2025 · 38 guests', text: `Quietly competent. ${p.name.split(' ')[0]} made the day feel like an afternoon at a friend's house — which is exactly what we asked for.` },
              { init: 'D', name: 'Daisy & Tom', date: 'Sep 2024 · 52 guests', text: 'We were planning from London and had no idea where to start. Three months in we already trusted them more than ourselves.' },
              { init: 'R', name: 'Ruth & Mark', date: 'Jun 2024 · 64 guests', text: 'Five days of "this is handled" in a row. Worth every penny. Would recommend to anyone planning from outside Spain.' },
            ].map((r, i) => (
              <article key={i}>
                <header>
                  <span className="mw-profile__avatar mw-profile__avatar--sm"><span>{r.init}</span></span>
                  <div>
                    <strong>{r.name}</strong>
                    <span className="mw-reviews__date">{r.date}</span>
                  </div>
                </header>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Sticky rail */}
        <aside className="mw-profile__rail">
          <div className="mw-book">
            <div className="mw-book__price">
              From <em>{p.price.split('–')[0]}</em>
              <span className="mw-book__per"> · full planning</span>
            </div>
            <div className="mw-book__row">
              <div className="mw-book__seg">
                <span className="lbl">Wedding date</span>
                <span className="val">Sat 14 Jun 2026</span>
              </div>
              <div className="mw-book__seg">
                <span className="lbl">Guests</span>
                <span className="val">40 guests</span>
              </div>
            </div>
            <button className="btn btn--primary" style={{ width: '100%' }} onClick={() => setShowEnquiry(true)} type="button">
              Request a call
            </button>
            <p className="mw-book__meta">
              You won&apos;t be charged. {p.name.split(' ')[0]} replies within {p.response.replace(/^\d+%\s*within\s*/, '')}.
            </p>
            <hr className="mw-profile__rule" />
            <div className="mw-book__line"><span>Planning fee</span><span>From {p.price.split('–')[0]}</span></div>
            <div className="mw-book__line"><span>Estimated supplier spend</span><span>£15,000–35,000</span></div>
            <div className="mw-book__line mw-book__line--total"><span>Estimated total</span><span>{p.price}</span></div>
          </div>

          <div style={{ marginTop: 16, padding: 20, background: 'var(--surface-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="shield" size={18} />
              <strong style={{ font: 'var(--t-body-sm)', fontWeight: 600 }}>Vetted in person, on the island</strong>
            </div>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', margin: '8px 0 0' }}>
              We meet every planner before listing. Portfolio, references, and venue relationships are checked.
            </p>
          </div>
        </aside>
      </section>

      {showEnquiry && <EnquiryModal planner={p} onClose={() => setShowEnquiry(false)} />}
    </div>
  );
}

function EnquiryModal({ planner: p, onClose }: { planner: Planner; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [d, setD] = useState({ name: '', email: '', date: '', guests: '', style: '', message: '' });
  const set = (k: keyof typeof d, v: string) => setD(prev => ({ ...prev, [k]: v }));

  const handleSend = async () => {
    setSending(true);
    try {
      await fetch('/api/enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.name, email: d.email,
          plannerName: p.name, plannerId: p.id,
          date: d.date, guests: d.guests,
          style: d.style, message: d.message,
        }),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mw-modal">
        <div className="mw-modal__scrim" onClick={onClose} />
        <div className="mw-modal__panel" role="dialog" aria-modal="true">
          <div className="mw-modal__body" style={{ padding: '48px 32px', textAlign: 'center' }}>
            <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon name="check" size={24} stroke={2.4} />
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Request sent to {p.name.split(' ')[0]}.</h3>
            <p style={{ font: 'var(--t-body-md)', color: 'var(--body)', maxWidth: 360, margin: '0 auto 24px' }}>
              {p.name.split(' ')[0]} will reply within {p.response.replace(/^\d+%\s*within\s*/, '')}. We&apos;ve also emailed you a copy.
            </p>
            <button className="btn btn--primary" onClick={onClose} type="button">Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mw-modal">
      <div className="mw-modal__scrim" onClick={onClose} />
      <div className="mw-modal__panel" role="dialog" aria-modal="true">
        <header className="mw-modal__head">
          <button className="mw-modal__close" onClick={onClose} aria-label="Close" type="button"><Icon name="close" size={16} /></button>
          <span className="mw-modal__title">Request a call with {p.name.split(' ')[0]}</span>
          <span className="mw-modal__step">Step {step} of 3</span>
        </header>
        <div className="mw-modal__progress">
          {[1, 2, 3].map(n => <span key={n} className={`mw-modal__bar ${step >= n ? 'is-on' : ''}`} />)}
        </div>
        <div className="mw-modal__body">
          {step === 1 && (
            <>
              <h3>Your details</h3>
              <p className="mw-modal__sub">So {p.name.split(' ')[0]} knows who to reply to.</p>
              <label className="label">Your name</label>
              <input className="input" type="text" placeholder="e.g. Sarah" value={d.name} onChange={e => set('name', e.target.value)} />
              <div style={{ height: 12 }} />
              <label className="label">Your email</label>
              <input className="input" type="email" placeholder="sarah@example.com" value={d.email} onChange={e => set('email', e.target.value)} />
              <div style={{ height: 12 }} />
              <label className="label">Wedding date (or window)</label>
              <input className="input" type="text" placeholder="e.g. Sat 14 Jun 2026" value={d.date} onChange={e => set('date', e.target.value)} />
              <div style={{ height: 12 }} />
              <label className="label">Guest count</label>
              <input className="input" type="text" placeholder="e.g. 40 guests" value={d.guests} onChange={e => set('guests', e.target.value)} />
            </>
          )}
          {step === 2 && (
            <>
              <h3>The kind of day you&apos;re picturing</h3>
              <p className="mw-modal__sub">Pick one — you can change your mind later.</p>
              {['Small finca with a long table', 'Coastal with a sunset ceremony', 'Two-day weekend with a rehearsal', 'Not sure — show me options'].map((label, i) => (
                <label key={i} className={`mw-modal__choice ${d.style === label ? 'is-on' : ''}`}>
                  <input type="radio" name="style" checked={d.style === label} onChange={() => set('style', label)} />
                  <span>{label}</span>
                </label>
              ))}
            </>
          )}
          {step === 3 && (
            <>
              <h3>A short note to {p.name.split(' ')[0]}</h3>
              <p className="mw-modal__sub">Anything to share before the call. Optional.</p>
              <textarea className="input" rows={6} placeholder="We're getting married in June and looking for a 30-guest day on the north of the island." value={d.message} onChange={e => set('message', e.target.value)} />
            </>
          )}
        </div>
        <footer className="mw-modal__foot">
          {step > 1
            ? <button className="btn btn--ghost" onClick={() => setStep(step - 1)} type="button">Back</button>
            : <span />}
          {step < 3
            ? <button className="btn btn--primary" onClick={() => setStep(step + 1)} disabled={step === 1 && (!d.name || !d.email)} type="button">Continue</button>
            : <button className="btn btn--primary" onClick={handleSend} disabled={sending} type="button">{sending ? 'Sending…' : 'Send request'}</button>}
        </footer>
      </div>
    </div>
  );
}
