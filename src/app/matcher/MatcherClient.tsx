'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PLANNERS, VENUES, USE_CASES } from '@/lib/data';
import Icon from '@/components/Icon';

const P1_STEPS = ['venue', 'when', 'guests', 'budget', 'style', 'priorities', 'support', 'contact'] as const;
const P2_STEPS = ['catering', 'florals', 'photo', 'music', 'extras', 'logistics'] as const;

type MatcherData = {
  venueStatus: string; venueId: string;
  month: string; year: string;
  guests: number; budget: number;
  style: string; priority: string; support: string;
  name: string; email: string;
  catering: string; florals: string; photo: string; music: string;
  extras: string[]; logistics: string;
};

function computeEstimate(data: MatcherData) {
  const venue = VENUES.find(v => v.id === data.venueId);
  if (!venue) return null;

  const cateringFor80 = venue.cateringMid * 80;
  const fixed = venue.totalFor80 - cateringFor80;
  let point = fixed + (venue.cateringMid * data.guests);
  const addOns: { label: string; value: number }[] = [];

  if (data.catering) {
    const uplift = ({ mid: -30, premium: 0, luxury: 100 } as Record<string, number>)[data.catering] || 0;
    if (uplift !== 0) { point += uplift * data.guests; addOns.push({ label: `Catering (${data.catering})`, value: uplift * data.guests }); }
  }
  if (data.florals) { const v = ({ simple: 2500, elevated: 5000, statement: 9000 } as Record<string, number>)[data.florals] || 0; point += v; addOns.push({ label: `Florals (${data.florals})`, value: v }); }
  if (data.photo) { const v = ({ photo: 4200, 'photo-video': 7500 } as Record<string, number>)[data.photo] || 0; point += v; addOns.push({ label: data.photo === 'photo' ? 'Photography' : 'Photography + video', value: v }); }
  if (data.music) { const v = ({ dj: 2500, band: 6000, mix: 8500 } as Record<string, number>)[data.music] || 0; point += v; addOns.push({ label: 'Music', value: v }); }
  (data.extras || []).forEach(e => { const v = ({ welcome: 7500, brunch: 4500, rehearsal: 3000, pool: 2000 } as Record<string, number>)[e] || 0; point += v; addOns.push({ label: `Extra: ${e}`, value: v }); });
  if (data.logistics) { const v = ({ low: 0, medium: 3000, high: 7000 } as Record<string, number>)[data.logistics] || 0; if (v) { point += v; addOns.push({ label: 'Guest logistics', value: v }); } }
  const plannerFee = ({ full: 9000, partial: 6000, 'day-of': 3500, design: 5000 } as Record<string, number>)[data.support] || 7000;
  if (addOns.length > 0 || data.support) { point += plannerFee; addOns.push({ label: `Planner fee (${data.support || 'full'})`, value: plannerFee }); }

  return { total: point, low: Math.round(point * 0.92), high: Math.round(point * 1.08), addOns, venue };
}

function complexityScore(data: MatcherData) {
  const s = {
    support:   ({ full: 2, partial: 1, 'day-of': 0, design: 1 } as Record<string, number>)[data.support] || 0,
    florals:   ({ simple: 0, elevated: 1, statement: 2 } as Record<string, number>)[data.florals] || 0,
    photo:     ({ photo: 0, 'photo-video': 1 } as Record<string, number>)[data.photo] || 0,
    music:     ({ dj: 0, band: 1, mix: 2 } as Record<string, number>)[data.music] || 0,
    extras:    Math.min(2, (data.extras || []).length),
    logistics: ({ low: 0, medium: 1, high: 2 } as Record<string, number>)[data.logistics] || 0,
  };
  const total = Object.values(s).reduce((a, b) => a + b, 0);
  const tier = total <= 3
    ? { name: 'Coordination-style planner', desc: 'Best for couples doing most of the planning themselves. Lighter touch, lower fee.' }
    : total <= 6
    ? { name: 'Mid-range full-service', desc: 'Most-requested tier on the island. End-to-end planning with a refined design eye.' }
    : { name: 'Luxury / multi-day specialist', desc: 'For complex productions: blank-canvas venues, multi-day weekends, large guest counts.' };
  return { score: total, max: 10, tier };
}

export default function MatcherClient() {
  const [phase, setPhase] = useState<'p1' | 'results' | 'p2' | 'results2'>('p1');
  const [step, setStep] = useState(0);
  const [data, setData] = useState<MatcherData>({
    venueStatus: '', venueId: '', month: '', year: '2027',
    guests: 60, budget: 80000,
    style: '', priority: '', support: '',
    name: '', email: '',
    catering: '', florals: '', photo: '', music: '', extras: [], logistics: '',
  });

  const set = (k: keyof MatcherData, v: string | number | string[]) =>
    setData(d => ({ ...d, [k]: v }));
  const toggle = (k: 'extras', v: string) =>
    setData(d => {
      const arr = new Set(d[k]);
      arr.has(v) ? arr.delete(v) : arr.add(v);
      return { ...d, [k]: Array.from(arr) };
    });

  const currentSteps = phase === 'p1' ? P1_STEPS : phase === 'p2' ? P2_STEPS : null;
  const stepName = currentSteps?.[step];
  const pct = currentSteps ? ((step + 1) / currentSteps.length) * 100 : 0;

  const canContinue = () => {
    switch (stepName) {
      case 'venue': return !!data.venueStatus;
      case 'when': return !!data.month && !!data.year;
      case 'guests': return data.guests > 0;
      case 'budget': return data.budget > 0;
      case 'style': return !!data.style;
      case 'priorities': return !!data.priority;
      case 'support': return !!data.support;
      case 'contact': return data.name.length > 1 && /@/.test(data.email);
      case 'catering': return !!data.catering;
      case 'florals': return !!data.florals;
      case 'photo': return !!data.photo;
      case 'music': return !!data.music;
      case 'extras': return true;
      case 'logistics': return !!data.logistics;
      default: return true;
    }
  };

  const next = () => {
    if (!currentSteps) return;
    if (step < currentSteps.length - 1) { setStep(step + 1); return; }
    if (phase === 'p1') { setPhase('results'); setStep(0); return; }
    if (phase === 'p2') { setPhase('results2'); setStep(0); return; }
  };
  const back = () => {
    if (step > 0) { setStep(step - 1); return; }
    if (phase === 'p2') { setPhase('results'); setStep(0); }
  };

  if (phase === 'results' || phase === 'results2') {
    return <MatcherResults data={data} refined={phase === 'results2'} onRefine={() => { setPhase('p2'); setStep(0); }} onRestart={() => { setPhase('p1'); setStep(0); }} />;
  }

  return (
    <div className="matcher" style={{ paddingTop: 0, marginTop: 'calc(-1 * var(--nav-h))' }}>
      <header className="matcher__header">
        <Link href="/" className="matcher__exit">
          <Icon name="arrow-l" size={14} /> Exit
        </Link>
        <div className="matcher__progress">
          <div className="matcher__progress-track">
            <div className="matcher__progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="matcher__progress-text">
            {phase === 'p2' ? 'Refining · ' : ''}Step {step + 1} of {currentSteps?.length}
          </span>
        </div>
        <span className="kicker" style={{ color: 'var(--muted)' }}>
          {phase === 'p2' ? '30 seconds · Refine' : 'Free · 30 seconds'}
        </span>
      </header>

      <div className="matcher__body">
        <div className="matcher__step" key={`${phase}-${stepName}`}>
          {stepName === 'venue' && <StepVenue data={data} set={set} />}
          {stepName === 'when' && <StepWhen data={data} set={set} />}
          {stepName === 'guests' && <StepGuests data={data} set={set} />}
          {stepName === 'budget' && <StepBudget data={data} set={set} />}
          {stepName === 'style' && <StepStyle data={data} set={set} />}
          {stepName === 'priorities' && <StepPriorities data={data} set={set} />}
          {stepName === 'support' && <StepSupport data={data} set={set} />}
          {stepName === 'contact' && <StepContact data={data} set={set} />}
          {stepName === 'catering' && <StepCatering data={data} set={set} />}
          {stepName === 'florals' && <StepFlorals data={data} set={set} />}
          {stepName === 'photo' && <StepPhoto data={data} set={set} />}
          {stepName === 'music' && <StepMusic data={data} set={set} />}
          {stepName === 'extras' && <StepExtras data={data} toggle={toggle} />}
          {stepName === 'logistics' && <StepLogistics data={data} set={set} />}
        </div>
      </div>

      <footer className="matcher__foot">
        {(step > 0 || phase === 'p2')
          ? <button className="matcher__back" onClick={back}><Icon name="arrow-l" size={14} /> Back</button>
          : <span />}
        <button
          className="btn btn--primary btn--lg"
          disabled={!canContinue()}
          onClick={next}
        >
          {step < (currentSteps?.length ?? 0) - 1
            ? <><>Continue </><Icon name="arrow" size={14} /></>
            : phase === 'p1'
            ? <><>See my matches </><Icon name="sparkle" size={14} /></>
            : <><>See my refined estimate </><Icon name="sparkle" size={14} /></>}
        </button>
      </footer>
    </div>
  );
}

type SetFn = (k: keyof MatcherData, v: string | number | string[]) => void;

function ChoiceGrid({ children }: { children: React.ReactNode }) {
  return <div className="matcher__choice-grid">{children}</div>;
}

function Choice({ value, active, onClick, children }: { value: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`matcher__choice ${active ? 'is-on' : ''}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function StepVenue({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">About your wedding</span>
      <h2>Where are you in the venue search?</h2>
      <p className="sub">If you already have a venue picked, we&apos;ll suggest planners who know it well.</p>
      <ChoiceGrid>
        {[
          { v: 'have', t: 'I have a venue', s: "We've picked or booked the venue.", ico: 'check' },
          { v: 'shortlist', t: 'I have a shortlist', s: 'A few favourites, not yet chosen.', ico: 'tag' },
          { v: 'browsing', t: "I'm still browsing", s: 'Help me think about venues too.', ico: 'venue' },
          { v: 'no-idea', t: 'No idea — show me everything', s: 'Open to ideas across the island.', ico: 'sparkles' },
        ].map(o => (
          <Choice key={o.v} value={o.v} active={data.venueStatus === o.v} onClick={() => set('venueStatus', o.v)}>
            <strong><span className="ico"><Icon name={o.ico} size={14} /></span>{o.t}</strong>
            <span>{o.s}</span>
          </Choice>
        ))}
      </ChoiceGrid>
      {(data.venueStatus === 'have' || data.venueStatus === 'shortlist') && (
        <div style={{ marginTop: 24 }}>
          <label className="label">Which venue? (optional)</label>
          <select className="input" value={data.venueId} onChange={e => set('venueId', e.target.value)}>
            <option value="">Pick one</option>
            {VENUES.map(v => <option key={v.id} value={v.id}>{v.name} — {v.region}</option>)}
            <option value="other">Another venue</option>
          </select>
        </div>
      )}
    </>
  );
}

function StepWhen({ data, set }: { data: MatcherData; set: SetFn }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <>
      <span className="kicker kicker--brand">About your wedding</span>
      <h2>When are you getting married?</h2>
      <p className="sub">Ranges are fine. Planners book up 12–18 months ahead in Mallorca.</p>
      <label className="label">Wedding month</label>
      <div className="matcher__choice-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {months.map(m => (
          <button key={m} className={`matcher__choice ${data.month === m ? 'is-on' : ''}`}
            style={{ padding: '14px', justifyContent: 'center', alignItems: 'center' }}
            onClick={() => set('month', m)} type="button">
            <strong style={{ display: 'block' }}>{m}</strong>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <label className="label">Year</label>
        <div className="matcher__choice-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {['2026', '2027', '2028+'].map(y => (
            <button key={y} className={`matcher__choice ${data.year === y ? 'is-on' : ''}`}
              style={{ padding: '14px', justifyContent: 'center' }}
              onClick={() => set('year', y)} type="button">
              <strong>{y}</strong>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function StepGuests({ data, set }: { data: MatcherData; set: SetFn }) {
  const label = data.guests <= 30 ? 'Intimate' : data.guests <= 80 ? 'Medium' : data.guests <= 150 ? 'Large' : 'Big production';
  return (
    <>
      <span className="kicker kicker--brand">About your wedding</span>
      <h2>How many guests are you planning for?</h2>
      <p className="sub">A rough number is fine. You can change it later.</p>
      <div className="matcher__slider">
        <div className="matcher__slider-vals">
          <span>{data.guests} guests</span>
          <span style={{ font: 'var(--t-body-sm)', color: 'var(--muted)' }}>{label}</span>
        </div>
        <input type="range" min="20" max="250" step="5" value={data.guests}
          onChange={e => set('guests', parseInt(e.target.value))} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--t-caption)', color: 'var(--muted)' }}>
          <span>20</span><span>80</span><span>150</span><span>250+</span>
        </div>
      </div>
      <div style={{ marginTop: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[20, 40, 80, 120, 180].map(n => (
          <button key={n} className="chip" onClick={() => set('guests', n)} type="button">{n} guests</button>
        ))}
      </div>
    </>
  );
}

function StepBudget({ data, set }: { data: MatcherData; set: SetFn }) {
  const ranges = [
    { min: 30000, max: 70000, label: 'Under €70k', sub: 'Intimate or budget-conscious' },
    { min: 70000, max: 80000, label: '€70–80k', sub: '60–80 guests, mid-range venue' },
    { min: 80000, max: 110000, label: '€80–110k', sub: 'Most-requested range', highlight: true },
    { min: 110000, max: 150000, label: '€110–150k', sub: 'Larger or multi-day' },
    { min: 150000, max: 250000, label: '€150k+', sub: 'Luxury production' },
  ];
  return (
    <>
      <span className="kicker kicker--brand">About your wedding</span>
      <h2>What&apos;s your total budget comfort range?</h2>
      <p className="sub">All-in: venue, catering, planner, suppliers. We only show planners who actually take weddings in your range.</p>
      <ChoiceGrid>
        {ranges.map(r => (
          <button key={r.label}
            className={`matcher__choice ${data.budget >= r.min && data.budget < r.max ? 'is-on' : ''}`}
            onClick={() => set('budget', Math.floor((r.min + r.max) / 2))} type="button">
            <strong>
              {r.label}
              {r.highlight && <span style={{ marginLeft: 8, font: 'var(--t-micro)', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700, letterSpacing: '0.06em' }}>Most popular</span>}
            </strong>
            <span>{r.sub}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepStyle({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">The kind of day you want</span>
      <h2>What kind of wedding are you picturing?</h2>
      <p className="sub">Pick one — it helps us shortlist planners with the right portfolio.</p>
      <ChoiceGrid>
        {USE_CASES.slice(0, 6).map(u => (
          <button key={u.key} className={`matcher__choice ${data.style === u.key ? 'is-on' : ''}`}
            onClick={() => set('style', u.key)} type="button">
            <strong><span className="ico"><Icon name={u.icon} size={14} /></span>{u.title}</strong>
            <span>{u.body}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepPriorities({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">What matters most</span>
      <h2>What&apos;s the priority for the day?</h2>
      <p className="sub">There&apos;s no wrong answer. We use this to weigh the matches.</p>
      <ChoiceGrid>
        {[
          { v: 'design', t: 'Design & atmosphere', s: 'A coherent, beautiful day. Photos that last.' },
          { v: 'logistics', t: 'Logistics & calm', s: 'No-one feels rushed or lost. Especially us.' },
          { v: 'experience', t: 'Guest experience', s: 'Food, drinks, music, and the weekend around it.' },
          { v: 'budget', t: 'Value for money', s: 'A planner who fights for the budget.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.priority === o.v ? 'is-on' : ''}`}
            onClick={() => set('priority', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepSupport({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Planner support level</span>
      <h2>How much help do you want?</h2>
      <p className="sub">Different planners offer different scopes.</p>
      <ChoiceGrid>
        {[
          { v: 'full', t: 'Full planning', s: 'Start to finish, 9–14 months of work.' },
          { v: 'partial', t: 'Partial planning', s: 'Venue is sorted; we need help with the rest.' },
          { v: 'day-of', t: 'Day-of coordination', s: "We'll plan ourselves; we want quiet hands on the day." },
          { v: 'design', t: 'Design & styling only', s: 'Logistics handled; we want a creative lead.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.support === o.v ? 'is-on' : ''}`}
            onClick={() => set('support', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepContact({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Almost there</span>
      <h2>Where should we send your matches?</h2>
      <p className="sub">You&apos;ll see your matches on the next screen. We email a copy so you can revisit.</p>
      <div className="matcher__input-row">
        <div>
          <label className="label">Your first name</label>
          <input className="input" type="text" value={data.name} placeholder="e.g. Sarah" onChange={e => set('name', e.target.value)} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={data.email} placeholder="sarah@example.com" onChange={e => set('email', e.target.value)} />
        </div>
        <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="shield" size={14} /> We don&apos;t share your details with planners until you contact them directly.
        </p>
      </div>
    </>
  );
}

function StepCatering({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Food &amp; drink</span>
      <h2>What catering level are you picturing?</h2>
      <p className="sub">Catering is the biggest swing in a Mallorca wedding budget. Most fall in Premium tier.</p>
      <ChoiceGrid>
        {[
          { v: 'mid', t: 'Mid-range', s: '€220–260 per guest · 3-course, open bar, simple service.' },
          { v: 'premium', t: 'Premium', s: '€280–325 per guest · Tasting-style, premium wines, longer service.' },
          { v: 'luxury', t: 'Luxury', s: '€350–450+ per guest · Multiple courses, wine pairing, chef-led.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.catering === o.v ? 'is-on' : ''}`}
            onClick={() => set('catering', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepFlorals({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Florals &amp; styling</span>
      <h2>What level of florals are you planning?</h2>
      <p className="sub">From a simple bouquet to a full installation. Affects budget by €2–10k.</p>
      <ChoiceGrid>
        {[
          { v: 'simple', t: 'Simple', s: 'Bouquet, buttonholes, table greenery. €1.5–3k.' },
          { v: 'elevated', t: 'Elevated', s: 'Ceremony installation, full table styling, signage. €3–6k.' },
          { v: 'statement', t: 'Statement', s: 'Hanging installation, large arch, full design. €6–12k+.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.florals === o.v ? 'is-on' : ''}`}
            onClick={() => set('florals', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepPhoto({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Photography &amp; video</span>
      <h2>Photography only, or photo + video?</h2>
      <p className="sub">Video adds about €2–3k. Most couples regret skipping it.</p>
      <ChoiceGrid>
        {[
          { v: 'photo', t: 'Photography only', s: 'Lead photographer, 10–12 hour coverage. €3.5–5k.' },
          { v: 'photo-video', t: 'Photography + video', s: 'Lead photo + cinematic film of the day. €6–9k.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.photo === o.v ? 'is-on' : ''}`}
            onClick={() => set('photo', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepMusic({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Music</span>
      <h2>DJ or a live band?</h2>
      <p className="sub">A live band is usually €3–4k more, but it&apos;s what most couples remember.</p>
      <ChoiceGrid>
        {[
          { v: 'dj', t: 'DJ', s: 'Sound system, DJ for the reception. €1.5–3k.' },
          { v: 'band', t: 'Live band', s: '4–6 piece band for the evening, DJ for late-night. €4–8k.' },
          { v: 'mix', t: 'Both — band + DJ', s: 'Band for dinner & first dances, DJ for the party. €6–10k.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.music === o.v ? 'is-on' : ''}`}
            onClick={() => set('music', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepExtras({ data, toggle }: { data: MatcherData; toggle: (k: 'extras', v: string) => void }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Extra events</span>
      <h2>Any events around the wedding?</h2>
      <p className="sub">Most destination weddings add at least one. Pick all that apply (optional).</p>
      <ChoiceGrid>
        {[
          { v: 'welcome', t: 'Welcome dinner', s: 'Night before. Typically €5–10k for 80 guests.' },
          { v: 'brunch', t: 'Day-after brunch', s: 'Sunday paella at the venue. €3–6k.' },
          { v: 'rehearsal', t: 'Rehearsal lunch', s: 'Smaller, family-only. €2–4k.' },
          { v: 'pool', t: 'Pool / beach day', s: 'Casual, optional. €1–3k.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.extras.includes(o.v) ? 'is-on' : ''}`}
            onClick={() => toggle('extras', o.v)} type="button">
            <strong><span className="ico"><Icon name={data.extras.includes(o.v) ? 'check' : 'sparkle'} size={14} /></span>{o.t}</strong>
            <span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function StepLogistics({ data, set }: { data: MatcherData; set: SetFn }) {
  return (
    <>
      <span className="kicker kicker--brand">Refine · Guest logistics</span>
      <h2>How complex is your guest logistics?</h2>
      <p className="sub">Planners price for transport, accommodation coordination, and time-on-the-ground.</p>
      <ChoiceGrid>
        {[
          { v: 'low', t: 'Low', s: 'Most guests stay nearby. Simple taxis. One accommodation block.' },
          { v: 'medium', t: 'Medium', s: 'Multiple hotels, shuttle to venue, two transfer windows.' },
          { v: 'high', t: 'High', s: 'Many accommodation locations, tight timings, larger shuttle plan.' },
        ].map(o => (
          <button key={o.v} className={`matcher__choice ${data.logistics === o.v ? 'is-on' : ''}`}
            onClick={() => set('logistics', o.v)} type="button">
            <strong>{o.t}</strong><span>{o.s}</span>
          </button>
        ))}
      </ChoiceGrid>
    </>
  );
}

function MatcherResults({ data, refined, onRefine, onRestart }: { data: MatcherData; refined: boolean; onRefine: () => void; onRestart: () => void }) {
  const estimate = computeEstimate(data);
  const complexity = refined ? complexityScore(data) : null;
  const emailSent = typeof window !== 'undefined'
    ? (window as unknown as Record<string, boolean>)['__matcherEmailSent'] ?? false
    : false;
  const refinedEmailSent = typeof window !== 'undefined'
    ? (window as unknown as Record<string, boolean>)['__matcherRefinedEmailSent'] ?? false
    : false;

  const scored = PLANNERS.map((p: typeof PLANNERS[0]) => {
    let score = 50;
    if (p.minGuests <= data.guests && p.maxGuests >= data.guests) score += 15; else score -= 10;
    if (p.minBudget <= data.budget && p.maxBudget >= data.budget) score += 18; else score -= 8;
    if (p.types.includes(data.style)) score += 12;
    if (estimate && p.preferredVenues.includes(estimate.venue.id)) score += 10;
    if (data.priority === 'design' && p.types.includes('florist')) score += 5;
    if (data.priority === 'logistics' && p.yearsActive >= 10) score += 5;
    if (refined && complexity) {
      if (complexity.score > 6 && p.maxBudget >= 100000) score += 8;
      if (complexity.score <= 3 && p.minBudget <= 40000) score += 5;
    }
    return { p, score };
  }).sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3);

  // Phase 2 refined email
  if (refined && !refinedEmailSent && data.name && data.email && estimate && typeof window !== 'undefined') {
    (window as unknown as Record<string, boolean>)['__matcherRefinedEmailSent'] = true;
    fetch('/api/matcher-refined.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name, email: data.email,
        guests: data.guests, month: data.month, year: data.year,
        venueName: estimate.venue.name,
        estimateLow: estimate.low.toLocaleString(),
        estimateHigh: estimate.high.toLocaleString(),
        tierName: complexity?.tier.name ?? '',
        tierDesc: complexity?.tier.desc ?? '',
        complexityScore: complexity?.score ?? 0,
        addOns: estimate.addOns,
        planners: top.map(({ p }) => ({ id: p.id, name: p.name, firm: p.firm, location: p.location, price: p.price })),
      }),
    }).catch(() => {});
  }

  // Send email once on first load of results (phase 1 only)
  if (!refined && !emailSent && data.name && data.email && typeof window !== 'undefined') {
    (window as unknown as Record<string, boolean>)['__matcherEmailSent'] = true;
    fetch('/api/matcher.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name, email: data.email,
        guests: data.guests, month: data.month, year: data.year,
        budget: data.budget, venueName: estimate?.venue?.name ?? '',
        planners: top.map(({ p }) => ({ id: p.id, name: p.name, firm: p.firm, location: p.location, price: p.price })),
      }),
    }).catch(() => {});
  }

  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh', paddingTop: 'var(--nav-h)' }}>
      <div className="results-hero">
        <span className="kicker kicker--brand">{refined ? 'Refined results' : 'Your matches are ready'}</span>
        <h1>{refined ? `Refined for ${data.name || 'you'}.` : `Hi ${data.name || 'there'} — here are your three planner matches.`}</h1>
        <p>Based on a <strong>{data.guests}-guest, {data.month || ''} {data.year || ''}</strong> wedding{estimate ? ` at ${estimate.venue.name}` : ''}.</p>
      </div>

      {!refined && (
        <div className="wrap--narrow" style={{ padding: '0 32px 24px' }}>
          <div className="refine-prompt">
            <div>
              <span className="kicker kicker--brand">Your estimate is missing £15–40k</span>
              <h3 className="serif-h3" style={{ marginTop: 6 }}>The number below covers venue, catering and infrastructure — not florals, music, photography or your welcome dinner.</h3>
              <p className="body-md" style={{ marginTop: 10, color: 'var(--body)' }}>
                Answer 6 more questions to see your <strong>real all-in number</strong> and find out exactly which tier of planner your wedding needs — full-service or just coordination.
              </p>
              <p style={{ font: 'var(--t-caption)', color: 'var(--muted)', marginTop: 8 }}>30 seconds. We&apos;ll email you the full breakdown.</p>
            </div>
            <button className="btn btn--primary btn--lg" onClick={onRefine} type="button" style={{ flexShrink: 0 }}>
              <Icon name="sparkle" size={14} /> See my real number
            </button>
          </div>
        </div>
      )}

      {estimate && (
        <div className="results-est" style={{ margin: '0 auto 24px', maxWidth: 680 }}>
          <p className="results-est__label">{refined ? 'Refined' : '2026 market'} estimate {refined ? '· all-in' : `for ${estimate.venue.name}`}</p>
          <span className="results-est__num">€{estimate.low.toLocaleString()} – €{estimate.high.toLocaleString()}</span>
          <p className="results-est__note">
            {refined
              ? `For ${data.guests} guests at ${estimate.venue.name}, including all the extras you selected.`
              : `For ${data.guests} guests at ${estimate.venue.name}, all-in: venue, catering, infrastructure, furniture, service buffer. Excludes planner, photography, florals.`}
          </p>
          {refined && estimate.addOns.length > 0 && (
            <details style={{ marginTop: 16, textAlign: 'left' }}>
              <summary style={{ font: 'var(--t-body-sm)', color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>Show breakdown</summary>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                {estimate.addOns.map((a, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--hairline-soft)', font: 'var(--t-body-sm)' }}>
                    <span>{a.label}</span>
                    <strong>+€{a.value.toLocaleString()}</strong>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {refined && complexity && (
        <div className="wrap--narrow" style={{ padding: '0 32px 32px' }}>
          <div className="tier-card">
            <div className="tier-card__score">
              <span className="tier-card__num">{complexity.score}<small>/{complexity.max}</small></span>
              <span className="tier-card__lbl">Complexity score</span>
            </div>
            <div>
              <span className="kicker">Recommended planner tier</span>
              <h3 className="serif-h3" style={{ marginTop: 4 }}>{complexity.tier.name}</h3>
              <p className="body-md" style={{ marginTop: 4 }}>{complexity.tier.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="wrap--narrow" style={{ marginTop: 24, padding: '0 32px 96px' }}>
        <h3 className="serif-h3" style={{ marginBottom: 16 }}>Your three planners</h3>
        <div className="results-list">
          {top.map(({ p, score }, i) => (
            <Link key={p.id} href={`/planner/${p.id}`} className="result-card">
              <div className="result-card__photo">
                <Image src={p.img} alt={p.name} width={72} height={72} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <div>
                <span className="result-tag">Match #{i + 1} · {p.style}</span>
                <h4 className="result-card__name">{p.name} <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)', fontStyle: 'normal', fontSize: 15, fontWeight: 400 }}>· {p.firm}</span></h4>
                <p className="result-card__sub">{p.location} · {p.guests} guests · {p.price} · Replies {p.response.toLowerCase()}</p>
              </div>
              <div className="result-card__match">
                <strong>{Math.min(99, score + 30)}%</strong>
                <span>match</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, flexWrap: 'wrap', gap: 16 }}>
          <Link href="/planners" className="btn btn--secondary">
            <Icon name="planner" size={16} /> Browse the full directory
          </Link>
          <button className="btn btn--primary" onClick={onRestart} type="button">
            <Icon name="sparkle" size={16} /> Run the matcher again
          </button>
        </div>

        <div style={{ marginTop: 56, padding: 32, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}>
          <h4 className="serif-h3" style={{ marginBottom: 12 }}>What happens next?</h4>
          <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14 }}>
            {[
              { n: '1', t: 'Click any planner above', s: 'Open their profile, scan portfolio and recent reviews.' },
              { n: '2', t: 'Send a request through the planner profile', s: 'Three short questions; takes 30 seconds. No spam.' },
              { n: '3', t: 'The planner replies within 24 hours', s: 'You schedule a free call to discuss the wedding. No obligation.' },
            ].map(s => (
              <li key={s.n} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16 }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{s.n}</span>
                <div>
                  <strong style={{ display: 'block', font: 'var(--t-body-md)', fontWeight: 600, color: 'var(--ink)' }}>{s.t}</strong>
                  <span style={{ font: 'var(--t-body-sm)', color: 'var(--body)' }}>{s.s}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
