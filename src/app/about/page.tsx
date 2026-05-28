import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CtaStrip from '@/components/CtaStrip';

export const metadata: Metadata = {
  title: 'About Mallorca Wedding · An Independent Guide',
  description: 'Mallorca Wedding is an independent, data-driven marketplace. We match UK couples with verified local wedding planners. No referral fees. No "price on request."',
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <span className="kicker">About Mallorca Wedding</span>
        <h1>An independent guide to getting married in Mallorca.</h1>
        <p className="lead">We&apos;re not a booking agent. We don&apos;t take a cut of your wedding spend. We&apos;re a data-driven marketplace built to solve one specific problem: the price-transparency gap in the destination wedding industry.</p>
      </section>

      <section className="sec wrap">
        <div className="band">
          <div className="band__copy">
            <span className="kicker">Our mission</span>
            <h2>Honest numbers. Verified planners. No marketing fluff.</h2>
            <p className="lead">For too long, planning a wedding in Mallorca has meant chasing &ldquo;price on request&rdquo; venues, fielding pitches from planners who can&apos;t actually take you, and assembling a 40-tab Pinterest board to figure out what €80k buys.</p>
            <p className="body-md">We built Mallorca Wedding because we kept hearing the same complaint from couples: &ldquo;no-one will tell me what it actually costs.&rdquo; So we benchmarked the prices, vetted the planners, and built a matcher that does in 30 seconds what currently takes three weeks.</p>
          </div>
          <div className="band__media">
            <Image src="/img/comassema-9.webp" alt="Long-table dinner with string lights at a Mallorca finca" width={700} height={525} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </div>
        </div>
      </section>

      <section className="sec sec--alt">
        <div className="wrap">
          <header className="sec__head sec__head--center">
            <span className="kicker">How we work</span>
            <h2>Five principles we don&apos;t break.</h2>
          </header>
          <div className="values-grid">
            {[
              { n: '01', h: 'Independent', p: "We're not owned by a planner or a venue. We never take a referral fee from a couple. The recommendations we make are the recommendations we'd make to a friend." },
              { n: '02', h: 'Transparent', p: "Every cost guide shows real ranges, not \"price on request.\" Every planner shows their minimum budget upfront. No surprises." },
              { n: '03', h: 'Verified', p: "Every planner on the platform has been met in person. Every portfolio has been checked. Every reference has been called." },
              { n: '04', h: 'Local', p: "We're based in Palma. Our team has worked in or around Mallorca's wedding industry for a combined 28 years." },
              { n: '05', h: 'Data-driven', p: "Our 2026 cost estimates are built from real recent weddings, with a published methodology. We update the benchmarks twice a year." },
              { n: '06', h: 'Restrained', p: "We don't recommend twelve planners. We recommend three. The point is to make a decision easier, not harder." },
            ].map(v => (
              <div key={v.n} className="value">
                <span className="value__num">{v.n}</span>
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="band band--reverse">
          <div className="band__media band__media--wide">
            <Image src="/img/son-marroig-10.webp" alt="An evening wedding reception at Son Marroig" width={700} height={437} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
          </div>
          <div className="band__copy">
            <span className="kicker">How we make money</span>
            <h2>Planners pay us. Couples never do.</h2>
            <p className="lead">When we shortlist a planner for you and you choose to contact them, the planner pays us a small fee. That&apos;s the entire business model.</p>
            <p className="body-md">We never inflate planner prices. We never recommend the highest payer. The planners on our directory pay the same fee regardless of how often they&apos;re matched — so there&apos;s no incentive for us to bias the matches.</p>
            <p className="body-md">Read more about how this works on our <Link href="/for-pros" className="t-link t-link--brand">For planners page</Link>.</p>
          </div>
        </div>
      </section>

      <section className="sec sec--sm wrap">
        <CtaStrip
          title="Ready to find your Mallorca wedding planner?"
          body="The matcher takes 30 seconds. Three personalised matches. Independent recommendations."
          ctaLabel="Start the matcher"
        />
      </section>
    </>
  );
}
