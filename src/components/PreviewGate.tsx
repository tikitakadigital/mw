'use client';

import { useState, useEffect } from 'react';

const PREVIEW_KEY = 'mw_preview_access';
const PREVIEW_PASS = 'mallorca2026';

export default function PreviewGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(PREVIEW_KEY) === '1');
  }, []);

  const attempt = () => {
    if (input === PREVIEW_PASS) {
      localStorage.setItem(PREVIEW_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setInput('');
    }
  };

  // Before hydration — render nothing (avoids flash)
  if (unlocked === null) return null;

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#F6F3EE',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em',
        color: '#1A1512', marginBottom: 48,
      }}>
        mallorca wedding<span style={{ color: '#6b7a3a' }}>.</span>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 400,
        background: '#fff',
        border: '1px solid #E4DDD4',
        borderRadius: 20,
        padding: '40px 36px',
        boxShadow: 'rgba(0,0,0,0.04) 0 4px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#6b7a3a', marginBottom: 14,
        }}>
          Site preview
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 32, fontWeight: 400, fontStyle: 'italic',
          color: '#1A1512', lineHeight: 1.15,
          marginBottom: 12,
        }}>
          We&rsquo;re getting<br />things ready.
        </h1>
        <p style={{
          fontSize: 14, color: '#8C7B6B', lineHeight: 1.6,
          fontFamily: "'Manrope', system-ui, sans-serif",
          marginBottom: 28,
        }}>
          This site is in development. Enter the preview password to take a look around.
        </p>

        {/* Input */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          animation: shaking ? 'shake 0.4s ease' : 'none',
        }}>
          <input
            type="password"
            placeholder="Preview password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            autoFocus
            style={{
              width: '100%', padding: '13px 16px',
              border: `1.5px solid ${error ? '#b8341d' : '#E4DDD4'}`,
              borderRadius: 10,
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 15, color: '#1A1512',
              background: '#fff', outline: 'none',
              textAlign: 'center', letterSpacing: '0.08em',
              transition: 'border-color 0.15s',
            }}
          />
          {error && (
            <p style={{ fontSize: 13, color: '#b8341d', fontFamily: "'Manrope', system-ui, sans-serif", margin: 0 }}>
              Incorrect password — try again.
            </p>
          )}
          <button
            onClick={attempt}
            style={{
              background: '#6b7a3a', color: '#fff',
              border: 'none', borderRadius: 100,
              padding: '14px 24px',
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#525e2b')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6b7a3a')}
          >
            Enter preview
          </button>
        </div>
      </div>

      <p style={{
        marginTop: 32, fontSize: 12, color: '#a59f93',
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}>
        mallorcawedding.co.uk &mdash; coming soon
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
