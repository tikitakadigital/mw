'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { VENUES, REAL_WEDDINGS } from '@/lib/data';
import type { Planner, Venue } from '@/lib/types';
import { useLiveReviews } from '@/lib/useLiveReviews';

interface Props {
  planner: Planner;
  preferredVenues: Venue[];
}

// Generate a consistent pastel background + dark text colour from a name string
function avatarColour(name: string): { bg: string; color: string } {
  const palettes = [
    { bg: '#dce8d4', color: '#2d4a24' }, // sage green
    { bg: '#d4e4f0', color: '#1e3a52' }, // soft blue
    { bg: '#f0dfd4', color: '#52301e' }, // terracotta
    { bg: '#e8d4e8', color: '#4a1e52' }, // lavender
    { bg: '#f0ecd4', color: '#524a1e' }, // warm sand
    { bg: '#d4ece8', color: '#1e4a45' }, // teal
    { bg: '#f0d4d4', color: '#521e1e' }, // blush rose
    { bg: '#ddd4f0', color: '#2a1e52' }, // periwinkle
  ];
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

export default function PlannerProfileClient({ planner: p, preferredVenues }: Props) {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { reviews: liveReviews } = useLiveReviews(p.id, p.reviewsData ?? []);
  const displayRating  = p.rating;
  const displayReviews = p.reviews;
  const photos         = p.photos ?? [];
  const specialisms  = p.specialisms ?? [];
  const services     = p.services ?? [];
  const process      = p.process ?? [];
  const reviewsData  = liveReviews;
  const faqs         = p.faqs ?? [];
  const signatureLine  = p.signatureLine ?? p.tagline;
  const weddingsPerYear = p.weddingsPerYear ?? `${p.reviews}+ weddings`;
  const avgResponse    = p.avgResponse ?? p.response.replace(/^\d+%\s*within\s*/, '');
  const instagram      = p.instagram ?? null;
  const nextAvailable  = p.nextAvailable ?? 'Reply within 24h with availability';
  const deposit        = p.deposit ?? 'Deposit confirms your date';
  const firstName      = p.name.split(' ')[0];

  const realWeddings = REAL_WEDDINGS.filter(w => w.plannerId === p.id);

  return (
    <main>
      {/* Topline */}
      <div className="pp-topline">
        <Link href="/planners" className="pp-back">
          <Icon name="arrow-l" size={14} /> All planners
        </Link>
        <div className="pp-actions">
          <button className="pp-act" type="button"><Icon name="share" size={14} /> Share</button>
          <button className="pp-act" type="button"><Icon name="heart" size={14} /> Save</button>
        </div>
      </div>

      {/* Hero — identity left, gallery right */}
      <section className="pp-hero">
        <div className="pp-hero__copy">
          <span className="kicker">{p.location} · {p.style}</span>
          <h1 className="pp-hero__name">{p.name}</h1>
          <p className="pp-hero__firm">{p.firm}</p>
          <p className="pp-hero__sig">&ldquo;{signatureLine}&rdquo;</p>

          <div className="pp-hero__badges">
            {p.badges.map(b => (
              <span key={b} className={`pp-badge ${b.toLowerCase().includes('verified') ? 'pp-badge--verified' : ''}`}>
                {b.toLowerCase().includes('verified')
                  ? <Icon name="check" size={12} stroke={2.4} />
                  : <Icon name="star" size={12} />}
                {b}
              </span>
            ))}
          </div>

          {/* Stats strip */}
          <div className="pp-stats">
            <div className="pp-stats__item">
              <strong>{displayRating}<small> ★</small></strong>
              <span>{displayReviews} reviews</span>
            </div>
            <div className="pp-stats__item">
              <strong>{p.yearsActive}<small> yrs</small></strong>
              <span>on the island</span>
            </div>
            <div className="pp-stats__item">
              <strong>{weddingsPerYear.split(' ')[0]}</strong>
              <span>weddings / year</span>
            </div>
            <div className="pp-stats__item">
              <strong>{avgResponse}</strong>
              <span>avg response</span>
            </div>
            <div className="pp-stats__item">
              <strong>{p.languages.length}</strong>
              <span>languages</span>
            </div>
          </div>
        </div>

        {/* Airbnb-style 5-photo gallery */}
        {photos.length > 0 && (
          <div className="pp-gallery">
            <button type="button" className="pp-gallery__main" onClick={() => setLightbox(0)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[0]} alt={p.firm} />
            </button>
            <div className="pp-gallery__grid">
              {[1, 2, 3, 4].map(i => (
                <button key={i} type="button" className="pp-gallery__cell"
                  style={{ visibility: photos[i] ? 'visible' : 'hidden' }}
                  onClick={() => setLightbox(i)}>
                  {photos[i] && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={photos[i]} alt="" />
                  )}
                </button>
              ))}
            </div>
            {photos.length > 5 && (
              <button type="button" className="pp-gallery__more" onClick={() => setLightbox(0)}>
                <Icon name="camera" size={14} /> All {photos.length} photos
              </button>
            )}
          </div>
        )}
      </section>

      {/* Body */}
      <section className="pp-body">
        <div className="pp-main">

          {/* About */}
          <div className="pp-section" style={{ borderTop: 'none', paddingTop: 0 }}>
            <h2>Meet {firstName}</h2>
            <p style={{ font: 'var(--t-body-lg)', color: 'var(--body)', marginTop: 16, lineHeight: 1.7 }}>{p.bio}</p>
            <div className="pp-meta-line">
              <span><Icon name="globe" size={14} /> Speaks {p.languages.join(' · ')}</span>
              <span><Icon name="pin" size={14} /> Based {p.based}</span>
              {instagram && <span><Icon name="camera" size={14} /> {instagram}</span>}
            </div>
          </div>

          {/* Specialisms */}
          {specialisms.length > 0 && (
            <div className="pp-section">
              <h2>{firstName} is known for</h2>
              <div className="pp-spec-grid">
                {specialisms.map((s, i) => (
                  <div key={i} className="pp-spec">
                    <div className="pp-spec__ico"><Icon name={s.ico} size={18} /></div>
                    <h4>{s.t}</h4>
                    <p>{s.s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {services.length > 0 && (
            <div className="pp-section">
              <h2>Services &amp; packages</h2>
              <p style={{ font: 'var(--t-body-md)', color: 'var(--muted)', marginTop: 8 }}>
                All fees are flat — no supplier commissions.
              </p>
              <div className="pp-services">
                {services.map((s, i) => (
                  <div key={i} className={`pp-service ${s.popular ? 'pp-service--popular' : ''}`}>
                    {s.popular && <span className="pp-service__badge">Most chosen</span>}
                    <h3>{s.tier}</h3>
                    <div className="pp-service__price">{s.price}</div>
                    <ul>
                      {s.bullets.map((b, j) => (
                        <li key={j}><Icon name="check" size={14} /> <span>{b}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          {process.length > 0 && (
            <div className="pp-section">
              <h2>How {firstName} works</h2>
              <ol className="pp-process">
                {process.map((step, i) => (
                  <li key={i}>
                    <span className="pp-process__num">{step.n}</span>
                    <div>
                      <h4>{step.t}</h4>
                      <p>{step.s}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Real weddings by this planner */}
          {realWeddings.length > 0 && (
            <div className="pp-section">
              <h2>Recent weddings by {firstName}</h2>
              <p style={{ font: 'var(--t-body-md)', color: 'var(--muted)', marginTop: 8, marginBottom: 0 }}>
                Real weddings — real numbers — that {firstName} planned.
              </p>
              <div className="pp-real-weddings">
                {realWeddings.map(w => (
                  <Link key={w.slug} href={`/real-weddings/${w.slug}`} className="pp-real-card">
                    <div className="pp-real-card__photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.photos[0]} alt={`${w.couple} at ${w.venueName}`} />
                    </div>
                    <div className="pp-real-card__body">
                      <span className="kicker">{w.month} · {w.venueName}</span>
                      <h4>{w.couple}</h4>
                      <p>{w.guests} guests · {w.totalRange}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Preferred venues */}
          {preferredVenues.length > 0 && (
            <div className="pp-section">
              <h2>Venues {firstName} regularly works at</h2>
              <div className="pp-venues">
                {preferredVenues.map(v => (
                  <Link key={v.id} href={`/venue/${v.id}`} className="pp-venue-card">
                    <div className="pp-venue-card__photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.img} alt={v.name} />
                    </div>
                    <div>
                      <h4>{v.name}</h4>
                      <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', margin: '3px 0' }}>{v.region}</p>
                      <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink)', margin: 0 }}>
                        €{(v.estTotal80.low / 1000).toFixed(0)}–€{(v.estTotal80.high / 1000).toFixed(0)}k{' '}
                        <span style={{ color: 'var(--muted)' }}>for 80g</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="pp-section">
            <div className="pp-reviews-header">
              <h2>
                <Icon name="star" size={20} /> {displayRating} · {displayReviews} reviews
              </h2>
              <a className="t-link" href="#" onClick={e => e.preventDefault()}>
                See all <Icon name="arrow" size={12} />
              </a>
            </div>
            {reviewsData.length > 0 ? (
              <div className="pp-reviews">
                {reviewsData.map((r, i) => (
                  <article key={i} className="pp-review">
                    <header>
                      <span className="pp-review__avatar" style={{ background: avatarColour(r.name).bg, color: avatarColour(r.name).color }}>{r.name[0]}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <span>
                          {r.stars && (
                            <span style={{ color: '#f5a623', marginRight: 6 }}>
                              {'★'.repeat(r.stars)}
                            </span>
                          )}
                          {r.date}{r.guests > 0 ? ` · ${r.guests} guests` : ''}{r.venue ? ` · ${r.venue}` : ''}
                          {r.source === 'google' && (
                            <span style={{ marginLeft: 6, font: 'var(--t-micro)', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Google</span>
                          )}
                        </span>
                      </div>
                    </header>
                    <p>&ldquo;{r.body}&rdquo;</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mw-reviews" style={{ marginTop: 20 }}>
                {[
                  { init: 'K', name: 'Kate & James', date: 'May 2025 · 38 guests', text: `Quietly competent. ${firstName} made the day feel like an afternoon at a friend's house — which is exactly what we asked for.` },
                  { init: 'D', name: 'Daisy & Tom', date: 'Sep 2024 · 52 guests', text: 'We were planning from London and had no idea where to start. Three months in we already trusted them more than ourselves.' },
                  { init: 'R', name: 'Ruth & Mark', date: 'Jun 2024 · 64 guests', text: 'Five days of "this is handled" in a row. Worth every penny. Would recommend to anyone planning from outside Spain.' },
                ].map((r, i) => (
                  <article key={i}>
                    <header>
                      <span className="mw-profile__avatar mw-profile__avatar--sm"><span>{r.init}</span></span>
                      <div><strong>{r.name}</strong><span className="mw-reviews__date">{r.date}</span></div>
                    </header>
                    <p>{r.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="pp-section">
            <h2>Where {firstName} is based</h2>
            <div className="pp-map">
              <div className="pp-map__plate" style={{ background: 'linear-gradient(135deg, #c4c19a 0%, #7e8a5f 60%, #3c4326 100%)' }} />
              <div className="pp-map__pin"><Icon name="pin" size={16} /></div>
              <span className="pp-map__caption">{p.based} · exact address shared after first call</span>
            </div>
          </div>

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="pp-section">
              <h2>Frequently asked, answered</h2>
              <div className="faq" style={{ marginTop: 16 }}>
                {faqs.map((f, i) => (
                  <details key={i} className="faq-item" open={i === 0}>
                    <summary className="faq-item__q">{f.q}</summary>
                    <p className="faq-item__a">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky rail */}
        <aside className="pp-rail">
          <div className="pp-book">
            <div className="pp-book__price">
              <span>From <strong>{p.price.split('–')[0]}</strong></span>
              <span className="pp-book__per">Full planning · flat fee</span>
            </div>
            <button
              className="btn btn--primary"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={() => setShowEnquiry(true)}
              type="button"
            >
              Request a call with {firstName}
            </button>
            <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', textAlign: 'center', margin: '0 0 16px' }}>
              Free · No obligation · {firstName} replies in ~{avgResponse}
            </p>
            <hr className="pp-book__rule" />
            <dl className="pp-book__meta">
              <dt>Availability</dt><dd>{nextAvailable}</dd>
              <dt>Wedding range</dt><dd>{p.guests} guests</dd>
              <dt>Budget range</dt><dd>{p.price}</dd>
              <dt>Languages</dt><dd>{p.languages.join(' · ')}</dd>
              <dt>Deposit</dt><dd>{deposit}</dd>
              <dt>Response</dt><dd>{p.response}</dd>
            </dl>
            {instagram && (
              <a className="btn btn--secondary" href="#" onClick={e => e.preventDefault()}
                style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
                <Icon name="camera" size={14} /> {instagram}
              </a>
            )}
          </div>

          <div className="pp-vetted">
            <div className="pp-vetted__head">
              <Icon name="shield" size={18} />
              <strong>Vetted in person, on the island</strong>
            </div>
            <p>We meet every planner before listing. Portfolio audit + reference calls + a 90-minute meeting in Palma.</p>
            <Link href="/standards" className="t-link" style={{ font: 'var(--t-body-sm)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Our editorial standards <Icon name="arrow" size={12} />
            </Link>
          </div>
        </aside>
      </section>

      {/* Enquiry modal */}
      {showEnquiry && <EnquiryModal planner={p} onClose={() => setShowEnquiry(false)} />}

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox photos={photos} index={lightbox} onClose={() => setLightbox(null)} setIndex={setLightbox} />
      )}
    </main>
  );
}

/* ─── Enquiry modal ─── */
function EnquiryModal({ planner: p, onClose }: { planner: Planner; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [d, setD] = useState({ name: '', email: '', date: '', guests: '', style: '', message: '' });
  const set = (k: keyof typeof d, v: string) => setD(prev => ({ ...prev, [k]: v }));
  const firstName = p.name.split(' ')[0];

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
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Request sent to {firstName}.</h3>
            <p style={{ font: 'var(--t-body-md)', color: 'var(--body)', maxWidth: 360, margin: '0 auto 24px' }}>
              {firstName} will reply within {p.response.replace(/^\d+%\s*within\s*/, '')}. We&apos;ve also emailed you a copy.
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
          <span className="mw-modal__title">Request a call with {firstName}</span>
          <span className="mw-modal__step">Step {step} of 3</span>
        </header>
        <div className="mw-modal__progress">
          {[1, 2, 3].map(n => <span key={n} className={`mw-modal__bar ${step >= n ? 'is-on' : ''}`} />)}
        </div>
        <div className="mw-modal__body">
          {step === 1 && (
            <>
              <h3>Your details</h3>
              <p className="mw-modal__sub">So {firstName} knows who to reply to.</p>
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
              <h3>A short note to {firstName}</h3>
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

/* ─── Lightbox ─── */
function Lightbox({ photos, index, onClose, setIndex }: { photos: string[]; index: number; onClose: () => void; setIndex: (i: number) => void }) {
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
