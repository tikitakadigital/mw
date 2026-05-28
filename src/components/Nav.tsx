'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const tabs = [
  { key: 'home',          label: 'Planning guide',  href: '/' },
  { key: 'planners',      label: 'Wedding planners', href: '/planners' },
  { key: 'venue',         label: 'Venue cost guides', href: '/venue/son-marroig' },
  { key: 'real-weddings', label: 'Real weddings',    href: '/real-weddings' },
  { key: 'blog',          label: 'Inspiration',      href: '/blog' },
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

  // Close mobile menu on route change
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
          {tabs.map(t => (
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
        <div
          style={{
            position: 'fixed', inset: 'var(--nav-h) 0 0 0', zIndex: 49,
            background: 'var(--canvas)', padding: '32px',
            display: 'flex', flexDirection: 'column', gap: '8px',
            overflowY: 'auto',
          }}
        >
          {tabs.map(t => (
            <Link
              key={t.key}
              href={t.href}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--hairline)',
                font: 'var(--t-body-lg)',
                color: 'var(--ink)',
                fontWeight: 600,
              }}
              aria-current={isActive(t.href) ? 'page' : undefined}
            >
              {t.label}
            </Link>
          ))}
          <Link
            href="/for-pros"
            style={{ padding: '14px 0', font: 'var(--t-body-lg)', color: 'var(--ink)', fontWeight: 600 }}
          >
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
