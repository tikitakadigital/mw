'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '@/components/Icon';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on hero bg image
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Hero content entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(kickerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .fromTo(ledeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65)
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
        .fromTo(trustRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.1);

      // Subtle hero image scale-in
      if (bgRef.current?.firstElementChild) {
        gsap.fromTo(
          bgRef.current.firstElementChild,
          { scale: 1.08 },
          { scale: 1, duration: 1.8, ease: 'power2.out' }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" style={{ marginTop: 'calc(-1 * var(--nav-h))', paddingTop: 'var(--nav-h)' }}>
      <div ref={bgRef} className="hero__bg">
        <Image
          src="/img/son-marroig-2.webp"
          alt="Son Marroig rotunda at sunset above the Deià coast, Mallorca"
          fill
          priority
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </div>
      <div className="hero__scrim" />
      <div className="hero__inner">
        <span ref={kickerRef} className="hero__kicker" style={{ opacity: 0 }}>
          Planning a wedding in Mallorca
        </span>
        <h1 ref={titleRef} className="hero__title" style={{ opacity: 0 }}>
          Get married<br />in Mallorca.
        </h1>
        <p ref={ledeRef} className="hero__lede" style={{ opacity: 0 }}>
          Mallorca has become one of Europe&apos;s most-loved destinations for weddings — coastal venues, historic fincas, Mediterranean light. We help you skip the spreadsheets and find the planner who actually fits your wedding, in under 30 seconds.
        </p>
        <div ref={ctaRef} className="hero__cta-row" style={{ opacity: 0 }}>
          <Link href="/matcher" className="btn btn--primary btn--xl">
            <Icon name="sparkle" size={16} /> Start the planner matcher
          </Link>
          <Link href="/planners" className="btn btn--light btn--xl">
            Browse the directory
          </Link>
        </div>
        <div ref={trustRef} className="hero__trust" style={{ opacity: 0 }}>
          <Icon name="check" size={14} /> Free
          <span className="sep">·</span>
          <Icon name="check" size={14} /> Personalised matches
          <span className="sep">·</span>
          <Icon name="check" size={14} /> No obligation
        </div>
      </div>
    </section>
  );
}
