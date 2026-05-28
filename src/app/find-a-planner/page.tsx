import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CtaStrip from '@/components/CtaStrip';

export const metadata: Metadata = {
  title: 'Find the Best Wedding Planner in Mallorca · Free Matcher',
  description: 'Planning a destination wedding in Mallorca? Our free matcher shortlists planners who actually fit your wedding in under 30 seconds. Verified in person on the island.',
};

export default function FindAPlannerPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ minHeight: 540, marginTop: 'calc(-1 * var(--nav-h))', paddingTop: 'var(--nav-h)' }}>
        <div className="hero__bg">
          <Image src="/img/comassema-3.webp" alt="A wedding ceremony at Finca Comassema in the Mallorca mountains" fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <div className="hero__scrim" />
        <div className="hero__inner">
          <span className="hero__kicker">Wedding planner · Mallorca</span>
          <h1 className="hero__title">Find the best wedding planner in Mallorca.</h1>
          <p className="hero__lede">Planning a destination wedding in Mallorca shouldn&apos;t take a week of research. Our free matcher shortlists planners who actually fit your wedding in under 30 seconds.</p>
          <div className="hero__cta-row">
            <Link href="/matcher" className="btn btn--primary btn--xl">
              <Icon name="sparkle" size={16} /> Start the matcher
            </Link>
            <span className="hero__trust">
              <Icon name="check" size={14} /> Free
              <span className="sep">·</span>
              <Icon name="check" size={14} /> Personalised
              <span className="sep">·</span>
              <Icon name="check" size={14} /> No obligation
            </span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="wrap" style={{ paddingTop: 32 }}>
        <div className="trust-strip">
          {['Takes less than 30 seconds', 'Free to use', 'No obligation to book', 'Verified planners only'].map(t => (
            <span key={t}><Icon name="check" size={16} /> {t}</span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec wrap">
        <header className="sec__head">
          <span className="kicker">Why the matcher</span>
          <h2>Find the right Mallorca wedding planner in less than 30 seconds.</h2>
          <p>Couples often spend hours researching planners and sending enquiries before knowing who&apos;s actually the right fit.</p>
        </header>
        <ol className="steps">
          {[
            { n: '01', h: 'Tell us about your wedding', p: 'Six quick questions about guest numbers, budget, season, planning needs.' },
            { n: '02', h: 'Your requirements are reviewed', p: 'Your answers identify planners who regularly organise weddings like yours.' },
            { n: '03', h: 'Receive personalised matches', p: 'Three suitable planners are identified based on your wedding details.' },
            { n: '04', h: 'Explore your options', p: 'You decide whether to connect with any of them. No obligation.' },
          ].map(s => (
            <li key={s.n}>
              <span className="steps__num">{s.n}</span>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* WHY USE A PLANNER */}
      <section className="sec wrap">
        <div className="band band--reverse">
          <div className="band__media">
            <Image src="/img/son-marroig-7.webp" alt="A wedding ceremony at the Son Marroig rotunda" width={700} height={525} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </div>
          <div className="band__copy">
            <span className="kicker">Why couples use a planner</span>
            <h2>Planning a destination wedding from abroad is a job.</h2>
            <p className="lead">Coordinating Spanish suppliers, paperwork, transport, and a guest experience — from another country, in another language. A local planner saves months of work.</p>
            <ul className="band__bullets">
              {['Venue sourcing', 'Supplier coordination', 'Design and styling', 'Logistics planning', 'Guest experience', 'Wedding day coordination'].map(t => (
                <li key={t}><Icon name="check" size={16} /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DIFFERENT PLANNERS */}
      <section className="sec sec--alt">
        <div className="wrap">
          <header className="sec__head">
            <span className="kicker">Not all the same</span>
            <h2>Not every wedding planner in Mallorca is the same.</h2>
          </header>
          <div className="cols-2">
            {[
              { t: 'Luxury weddings', s: 'Large budgets, multi-day events, complex production at headline venues.' },
              { t: 'Finca and villa weddings', s: 'Focus on logistics, in-house catering relationships, supplier networks in the hills.' },
              { t: 'Coordination-only', s: "Support in the final 6–8 weeks. You've done the planning; they bring it home on the day." },
              { t: 'Full-service planning', s: "End-to-end. The right call when you're planning from abroad and time is short." },
            ].map((x, i) => (
              <div key={i} style={{ padding: 32, background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)' }}>
                <h4 className="serif-h3" style={{ marginBottom: 8 }}>{x.t}</h4>
                <p className="body-md">{x.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec wrap--narrow">
        <header className="sec__head">
          <span className="kicker">FAQ</span>
          <h2>Frequently asked questions.</h2>
        </header>
        <div className="faq">
          {[
            { q: 'Is it free?', a: 'Yes — completely free.' },
            { q: 'How long does it take?', a: 'Less than 30 seconds.' },
            { q: 'Do I need a venue first?', a: 'No. Planners can also help with venue sourcing.' },
            { q: 'Do I have to book?', a: 'No. The matcher is information; you decide whether to contact anyone.' },
            { q: 'How are planners verified?', a: 'In person, on the island. We meet every planner and check portfolio + references before listing.' },
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
          title="Save hours of wedding planner research."
          body="Complete one matcher and receive three personalised planner suggestions in under 30 seconds."
          ctaLabel="Get planner matches"
        />
      </section>
    </>
  );
}
