'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { VENUES } from '@/lib/data';

const tabs = [
  { key: 'home',          label: 'Planning guide',    href: '/',             hasMega: false },
  { key: 'planners',      label: 'Wedding planners',  href: '/planners',     hasMega: false },
  { key: 'venues',        label: 'Venue cost guides', href: '/venues',       hasMega: true  },
  { key: 'real-weddings', label: 'Real weddings',     href: '/real-weddings', hasMega: false },
  { key: 'blog',          label: 'Inspiration',       href: '/blog',         hasMega: false },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="mw-nav"
        style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none' }}
      >
        <Link href="/" className="mw-nav__brand">
          mallorca wedding<span className="dot">.</span>
        </Link>

        <nav className="mw-nav__tabs" role="navigation" aria-label="Main navigation">
          {tabs.map(t => t.hasMega ? (
            <div key={t.key} className="mw-nav__has-sub">
              <Link href={t.href} className="mw-nav__tab mw-nav__tab--sub"
                aria-current={isActive(t.href) ? 'page' : undefined}>
                {t.label}
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)', opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
              </Link>
              <div className="mw-nav__dropdown">
                <Link href="/venues" className="mw-nav__drop-all">
                  All venue cost guides <Icon name="arrow" size={12} />
                </Link>
                <div className="mw-nav__drop-grid">
                  {VENUES.map(v => (
                    <Link key={v.id} href={`/venues/${v.slug}`} className="mw-nav__drop-item">
                      <div className="mw-nav__drop-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.img} alt={v.name} />
                      </div>
                      <div>
                        <strong>{v.name}</strong>
                        <span><span>€{(v.estTotal80.low / 1000).toFixed(0)}k–€{(v.estTotal80.high / 1000).toFixed(0)}k</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={t.key}
              href={t.href}
              className="mw-nav__tab"
              aria-current={isActive(t.href) ? 'page' : undefined}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mw-nav__util">
          <Link href="/for-pros" className="mw-nav__ghost">For planners</Link>
          <Link href="/matcher" className="mw-nav__cta">
            <Icon name="sparkle" size={14} />
            Find my planner
          </Link>
          <button
            className="mw-nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 'var(--nav-h) 0 0 0', zIndex: 49,
          background: 'var(--canvas)', padding: '32px',
          display: 'flex', flexDirection: 'column', gap: '8px',
          overflowY: 'auto',
        }}>
          {tabs.map(t => (
            <div key={t.key}>
              <Link href={t.href} style={{
                padding: '14px 0', borderBottom: '1px solid var(--hairline)',
                font: 'var(--t-body-lg)', color: 'var(--ink)', fontWeight: 600,
                display: 'block',
              }}>
                {t.label}
              </Link>
              {t.hasMega && (
                <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                  {VENUES.map(v => (
                    <Link key={v.id} href={`/venues/${v.slug}`}
                      style={{ display: 'block', padding: '8px 0', font: 'var(--t-body-sm)', color: 'var(--muted)', borderBottom: '1px solid var(--hairline-soft)' }}>
                      {v.name} · €{(v.estTotal80.low / 1000).toFixed(0)}k–€{(v.estTotal80.high / 1000).toFixed(0)}k
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/for-pros" style={{ padding: '14px 0', font: 'var(--t-body-lg)', color: 'var(--ink)', fontWeight: 600 }}>
            For planners
          </Link>
          <Link href="/matcher" className="btn btn--primary btn--lg" style={{ marginTop: 16 }}>
            <Icon name="sparkle" size={16} /> Find my planner
          </Link>
        </div>
      )}
    </>
  );
}
