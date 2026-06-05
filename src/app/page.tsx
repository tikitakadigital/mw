import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PLANNERS, VENUES, USE_CASES, REAL_WEDDINGS } from '@/lib/data';
import Icon from '@/components/Icon';
import PlannerCard from '@/components/PlannerCard';
import CtaStrip from '@/components/CtaStrip';
import AnimatedSection from '@/components/AnimatedSection';
import StatCounter from '@/components/StatCounter';
import HeroSection from './HeroSection';

export const metadata: Metadata = {
  title: 'Planning a Wedding in Mallorca · Verified Planners & Cost Guides',
  description: 'Plan your destination wedding in Mallorca. Find verified local wedding planners in 30 seconds with our free Smart Matcher. Real venue cost guides for Son Marroig, Finca Comassema and more.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Mallorca Wedding',
      url: 'https://www.mallorcawedding.co.uk',
      description: 'An independent marketplace connecting UK couples with verified local wedding planners in Mallorca.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is the planner matcher free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free, no email required to see your matches.' } },
        { '@type': 'Question', name: 'How much does a wedding in Mallorca cost?', acceptedAnswer: { '@type': 'Answer', text: 'Most 80-guest destination weddings in Mallorca in 2026 land between €70,000 and €110,000+ all-in.' } },
        { '@type': 'Question', name: 'How are planners vetted?', acceptedAnswer: { '@type': 'Answer', text: 'Every planner on the platform is verified in person, on the island. We check their portfolio, references from past couples, and their work with venues.' } },
      ],
    },
  ],
};

export default function HomePage() {
  const featured = PLANNERS.filter(p => p.featured);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO — client component with GSAP */}
      <HeroSection />

      {/* MATCHER ENTRY CARD */}
      <div className="matcher-entry" style={{ paddingTop: 0, marginTop: '-64px' }}>
        <div className="matcher-entry__card">
          <div className="matcher-entry__copy">
            <span className="kicker kicker--brand">The Smart Matcher · Free</span>
            <h3>Find the right Mallorca wedding planner in 30 seconds.</h3>
            <p>Most couples spend hours researching planners and chasing replies. The matcher asks six quick questions and shortlists planners who actually fit your wedding.</p>
            <div className="matcher-entry__steps">
              {['Wedding month', 'Guest count', 'Budget range', 'Venue status', 'Style'].map(s => (
                <span key={s}><Icon name="check" size={14} /> {s}</span>
              ))}
            </div>
          </div>
          <Link href="/matcher" className="btn btn--primary btn--xl">
            Start now <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="sec wrap">
        <header className="sec__head">
          <span className="kicker">How the matcher works</span>
          <h2>Find the right planner in less than 30 seconds.</h2>
          <p>Six quick questions about your wedding. We shortlist planners who regularly work weddings like yours — not whoever paid for a banner ad.</p>
        </header>
        <ol className="steps">
          {[
            { n: '01', h: 'Tell us about your wedding', p: 'Guest count, season, budget range, venue status. Two minutes.' },
            { n: '02', h: 'We check our directory', p: "Each planner's minimum budget, style, languages, and capacity are matched against your answers." },
            { n: '03', h: 'Get three personalised matches', p: 'A small shortlist — not the full directory. Each match comes with the reason it fits.' },
            { n: '04', h: 'Talk to the one you like', p: 'You decide whether to connect with any of them. No spam, no obligation.' },
          ].map(s => (
            <li key={s.n}>
              <span className="steps__num">{s.n}</span>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link href="/matcher" className="btn btn--primary btn--xl">
            <Icon name="sparkle" size={16} /> Get my planner matches
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="sec sec--sm wrap">
        <div className="stats">
          <StatCounter num="<em>30s</em>" label="Average matcher completion time" />
          <StatCounter num="€70<em>–</em>110k" label="Typical 80-guest wedding day in 2026" />
          <StatCounter num="<em>50</em>+" label="Venues benchmarked across the island" />
          <StatCounter num="<em>12</em>" label="Verified Mallorca planners — vetted in person" />
        </div>
        <p className="muted" style={{ font: 'var(--t-caption)', textAlign: 'center', marginTop: 16 }}>
          Cost benchmarks reviewed quarterly · Last updated March 2026 ·{' '}
          <Link href="/standards" className="t-link t-link--brand">How we vet planners &amp; calculate costs</Link>
        </p>
      </section>

      {/* COST OVERVIEW */}
      <section className="sec sec--alt">
        <div className="wrap">
          <div className="band band--reverse">
            <div className="band__media">
              <Image src="/img/togores-1.webp" alt="Wedding dinner at Son Togores by candlelight" width={700} height={525} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
            </div>
            <div className="band__copy">
              <span className="kicker">Wedding cost in Mallorca</span>
              <h2>What a Mallorca wedding actually costs in 2026.</h2>
              <p className="lead">One of the most common questions couples ask is how much a Mallorca wedding costs. Costs vary based on guest count, venue, production level and additional events.</p>
              <p className="body-md">Most destination weddings in Mallorca range between <strong>€70,000 and €150,000+</strong>, depending on complexity. An 80-guest Saturday at a mid-range finca lands in the €70–105k range; the same wedding at an iconic cliffside venue like Son Marroig runs €85–110k+ all-in.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <Link href="/matcher" className="btn btn--primary">Get a budget estimate</Link>
                <Link href="/blog/realistic-budget-mallorca-wedding-2026" className="btn btn--secondary">Read the full 2026 guide</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE COST GUIDES */}
      <section className="sec wrap">
        <header className="sec__head">
          <span className="kicker">Popular Mallorca wedding venues</span>
          <h2>Real cost guides for the most-asked-about venues.</h2>
          <p>No &ldquo;price on request.&rdquo; We&apos;ve benchmarked rental fees and 2026 catering tiers from real recent weddings.</p>
        </header>
        <AnimatedSection stagger className="cost-grid">
          {VENUES.map(v => (
            <Link key={v.id} href={`/venue/${v.id}`} className="cost-card">
              <div className="cost-card__photo">
                <Image src={v.img} alt={v.name} width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                <span className="cost-card__tag">Cost guide</span>
              </div>
              <div className="cost-card__body">
                <h4 className="cost-card__name">{v.name}</h4>
                <p className="cost-card__meta">{v.region} · {v.capacity}</p>
                <div className="cost-card__price">
                  <em>€{(v.estTotal80.low / 1000).toFixed(0)}k–€{(v.estTotal80.high / 1000).toFixed(0)}k{v.id === 'son-marroig' ? '+' : ''}</em> for 80 guests
                </div>
              </div>
            </Link>
          ))}
        </AnimatedSection>
      </section>

      {/* PLANNER TYPES */}
      <section className="sec sec--alt">
        <div className="wrap">
          <header className="sec__head">
            <span className="kicker">Find your kind of planner</span>
            <h2>Different planners specialise in different weddings.</h2>
            <p>From iconic 200-guest finca productions to intimate cliff-top elopements. We match the right planner to the right kind of day.</p>
          </header>
          <AnimatedSection stagger className="usecase-grid">
            {USE_CASES.map(u => (
              <Link key={u.key} href={`/find-a-planner?type=${u.key}`} className="usecase">
                <span className="usecase__icon"><Icon name={u.icon} size={20} /></span>
                <h4>{u.title}</h4>
                <p>{u.body}</p>
                <span className="usecase__more">Find planners <Icon name="arrow" size={14} /></span>
              </Link>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURED PLANNERS */}
      <section className="sec wrap">
        <header className="sec__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none' }}>
          <div>
            <span className="kicker">Verified planners on the island</span>
            <h2>Featured this season</h2>
          </div>
          <Link href="/planners" className="btn btn--link">See all 12 planners <Icon name="arrow" size={14} /></Link>
        </header>
        <AnimatedSection stagger className="pcard-grid">
          {featured.map(p => <PlannerCard key={p.id} planner={p} />)}
        </AnimatedSection>
      </section>

      {/* WHY USE A PLANNER */}
      <section className="sec sec--alt">
        <div className="wrap">
          <div className="band">
            <div className="band__copy">
              <span className="kicker">Why couples use a planner in Mallorca</span>
              <h2>Planning a destination wedding from abroad is a job. Yours probably isn&apos;t this.</h2>
              <p className="lead">Coordinating multiple Spanish suppliers, paperwork, transport, and a guest experience — from a different country, in a different language. A local planner saves months of work and prevents the expensive mistakes.</p>
              <ul className="band__bullets">
                {[
                  ['Venue sourcing', '— they know which fincas are actually available, not just the famous ones.'],
                  ['Supplier coordination', '— a vetted network of caterers, florists, photographers and musicians.'],
                  ['Design and styling', '— a coherent visual day, not Pinterest assembled by accident.'],
                  ['Logistics', '— guest transport, accommodation blocks, paperwork timing.'],
                  ['Wedding-day coordination', "— so you aren't the project manager of your own wedding."],
                ].map(([strong, text], i) => (
                  <li key={i}><Icon name="check" size={16} /><span><strong>{strong}</strong>{text}</span></li>
                ))}
              </ul>
            </div>
            <div className="band__media">
              <Image src="/img/comassema-3.webp" alt="A wedding ceremony at Finca Comassema in the Tramuntana foothills" width={700} height={525} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* REAL WEDDINGS */}
      <section className="sec wrap">
        <header className="sec__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none' }}>
          <div>
            <span className="kicker">Real weddings, real numbers</span>
            <h2>What couples actually spent.</h2>
          </div>
          <Link href="/real-weddings" className="btn btn--link">See all real weddings <Icon name="arrow" size={14} /></Link>
        </header>
        <div className="rw-grid">
          {REAL_WEDDINGS.map(w => (
            <Link key={w.slug} href={`/real-weddings/${w.slug}`} className="rw-card">
              <div className="rw-card__photo">
                <Image src={w.photos[0]} alt={`${w.couple} at ${w.venueName}`} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <div className="rw-card__body">
                <span className="kicker">{w.month} · {w.venueName}</span>
                <h3 className="serif-h3">{w.couple}</h3>
                <p className="body-md">{w.excerpt}</p>
                <div className="rw-card__stats">
                  <span><strong>{w.guests}</strong> guests</span>
                  <span>·</span>
                  <span><strong>{w.totalRange}</strong></span>
                </div>
              </div>
            </Link>
          ))}
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
            { q: 'Is the planner matcher free?', a: 'Yes — completely free, no email required to see your matches.' },
            { q: 'How long does it take?', a: "Most couples finish in under 30 seconds. Six short questions; ranges are fine, you don't need exact numbers." },
            { q: 'Do I need to have a venue before I use it?', a: "No. Many of our planners help with venue sourcing as part of their service. The matcher works equally well at the \"we're still deciding\" stage." },
            { q: 'Is Mallorca Wedding a booking agent?', a: 'No. We are an independent guide and matcher. You contract directly with the planner you choose. We never take a cut of your wedding spend.' },
            { q: 'How are planners vetted?', a: 'Every planner on the platform is verified in person, on the island. We check their portfolio, references from past couples, and their work with venues. Profiles only go live after that.' },
            { q: 'Do you work with non-UK couples?', a: 'Our site is in English and prices in £, but we have couples from Ireland, the US, Germany and the Netherlands using the matcher. Most planners speak at least English + Spanish.' },
          ].map((f, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary className="faq-item__q">{f.q}</summary>
              <p className="faq-item__a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Ready to find your Mallorca wedding planner?"
          body="Six questions, three personalised matches, zero obligation. The fastest way to skip three weeks of solo research."
          ctaLabel="Start the matcher"
          ctaPath="/matcher"
        />
      </section>

      {/* INTERNAL LINKS */}
      <section className="sec sec--sm wrap">
        <header className="sec__head">
          <span className="kicker">Explore</span>
          <h2 style={{ fontSize: '32px' }}>More Mallorca wedding planning guides.</h2>
        </header>
        <div className="cols-3">
          {[
            { href: '/find-a-planner', img: '/img/couple-confetti-exit.webp', cat: 'Planners', title: 'Find the best wedding planner in Mallorca', excerpt: 'A guide to choosing the right local planner for your wedding type and budget.' },
            { href: '/venue/son-marroig', img: '/img/son-marroig-5.webp', cat: 'Venue guide', title: 'Son Marroig wedding cost guide', excerpt: 'Real 2026 rental fees and total estimates for the most iconic venue on the island.' },
            { href: '/blog/realistic-budget-mallorca-wedding-2026', img: '/img/comassema-9.webp', cat: 'Budgeting', title: 'A realistic budget for a Mallorca wedding', excerpt: 'No "price on request" — real ranges by guest count, venue tier, and season.' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="blog-card">
              <div className="blog-card__photo">
                <Image src={c.img} alt="" width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <span className="blog-card__cat">{c.cat}</span>
              <h3 className="blog-card__title">{c.title}</h3>
              <p className="blog-card__excerpt">{c.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
