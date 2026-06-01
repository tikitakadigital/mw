import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Which cookies Mallorca Wedding uses, why, and how to manage your preferences.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="about-hero">
        <span className="kicker">Legal</span>
        <h1>Cookie Policy</h1>
        <p className="lead">Which cookies we use, why, and how to manage your preferences.</p>
        <p className="muted" style={{ font: 'var(--t-caption)', marginTop: 16 }}>Last updated: 1 June 2026</p>
      </section>

      <div className="wrap--narrow legal-body">

        <h2>1. What are cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. They allow the site to remember information about your visit — such as your consent preferences or which pages you viewed.</p>

        <h2>2. How we use cookies</h2>
        <p>We use cookies in the following categories. You can manage your preferences at any time using the cookie banner on this site.</p>

        <h3>Essential cookies</h3>
        <p>These are required for the site to function. They cannot be disabled.</p>
        <ul>
          <li><strong>cookieyes-consent</strong> — Stores your cookie consent preferences. Set by CookieYes. Expires after 1 year.</li>
        </ul>

        <h3>Analytics cookies</h3>
        <p>These help us understand how visitors use the site so we can improve it. Only set with your consent.</p>
        <ul>
          <li><strong>_ga, _ga_*</strong> — Google Analytics. Used to distinguish users and track sessions. Expires after 2 years / 24 hours.</li>
          <li><strong>_gid</strong> — Google Analytics. Distinguishes users. Expires after 24 hours.</li>
        </ul>

        <h3>Marketing cookies</h3>
        <p>We do not currently run retargeting or advertising campaigns. If this changes, this policy will be updated and consent will be requested separately.</p>

        <h2>3. Third-party cookies</h2>
        <p>Google Analytics is our only current third-party cookie provider. Google may process data in the United States under Standard Contractual Clauses. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a> for details.</p>

        <h2>4. Managing your preferences</h2>
        <p>You can update your cookie preferences at any time by clicking the &ldquo;Cookie settings&rdquo; link in the footer, or by clearing cookies in your browser settings and revisiting the site.</p>
        <p>You can also opt out of Google Analytics across all websites using <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google&apos;s opt-out browser add-on</a>.</p>

        <h2>5. Contact</h2>
        <p>Questions about our use of cookies? Email <a href="mailto:hello@mallorcawedding.co.uk">hello@mallorcawedding.co.uk</a>.</p>

      </div>
    </>
  );
}
