import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Mallorca Wedding collects, uses, and protects your personal data. Our full privacy policy under UK GDPR.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="about-hero">
        <span className="kicker">Legal</span>
        <h1>Privacy Policy</h1>
        <p className="lead">How we collect, use, and protect your personal data.</p>
        <p className="muted" style={{ font: 'var(--t-caption)', marginTop: 16 }}>Last updated: 1 June 2026</p>
      </section>

      <div className="wrap--narrow legal-body">

        <h2>1. Who we are</h2>
        <p>Mallorca Wedding Exchange (&ldquo;Mallorca Wedding&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the website mallorcawedding.co.uk. We are the data controller for personal data collected through this website.</p>
        <p>Contact: <a href="mailto:hello@mallorcawedding.co.uk">hello@mallorcawedding.co.uk</a></p>

        <h2>2. What data we collect</h2>

        <h3>Data you give us directly</h3>
        <ul>
          <li><strong>Planner matching form:</strong> wedding date, guest count, style preferences, budget range, and your email address.</li>
          <li><strong>Enquiry forms:</strong> your name, email address, phone number (optional), and message content.</li>
          <li><strong>Planner claim form:</strong> name, email, phone, website, Instagram handle, and business information.</li>
        </ul>

        <h3>Data collected automatically</h3>
        <ul>
          <li><strong>Analytics:</strong> pages visited, time on site, referral source, and general device/browser type via Google Analytics 4. IP addresses are anonymised.</li>
          <li><strong>Cookies:</strong> see our <a href="/cookie-policy">Cookie Policy</a> for full details.</li>
        </ul>

        <h2>3. How we use your data</h2>
        <ul>
          <li>To match you with relevant wedding planners and send you their details by email.</li>
          <li>To respond to enquiries you send us or planners listed on the site.</li>
          <li>To process planner applications and manage verified listings.</li>
          <li>To understand how the site is used and improve it (analytics).</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>4. Legal basis for processing (UK GDPR)</h2>
        <ul>
          <li><strong>Contract / pre-contract steps:</strong> matching and enquiry forms — processing is necessary to deliver the service you requested.</li>
          <li><strong>Legitimate interests:</strong> analytics and site performance — we have a legitimate interest in understanding how our site is used, balanced against your privacy rights.</li>
          <li><strong>Consent:</strong> non-essential cookies — you can withdraw consent at any time via the cookie banner.</li>
        </ul>

        <h2>5. Who we share data with</h2>
        <ul>
          <li><strong>Wedding planners:</strong> when you use the matcher, your enquiry details are shared with the planners we match you with.</li>
          <li><strong>Resend:</strong> our transactional email provider. Data is processed in the EU/UK.</li>
          <li><strong>Google Analytics:</strong> anonymised usage data. Google LLC, USA (protected by Standard Contractual Clauses).</li>
          <li><strong>CookieYes:</strong> cookie consent management. No personal data is shared beyond consent preferences.</li>
        </ul>
        <p>We do not sell personal data to third parties.</p>

        <h2>6. How long we keep your data</h2>
        <ul>
          <li>Enquiry and matcher submissions: 12 months, then deleted.</li>
          <li>Planner claim data: retained for the duration of the listing relationship.</li>
          <li>Analytics data: 14 months (Google Analytics default, reduced from 26 months).</li>
        </ul>

        <h2>7. Your rights under UK GDPR</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate data.</li>
          <li>Request erasure (&ldquo;right to be forgotten&rdquo;).</li>
          <li>Object to or restrict processing.</li>
          <li>Data portability (where processing is by automated means).</li>
          <li>Withdraw consent at any time (where processing is based on consent).</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:hello@mallorcawedding.co.uk">hello@mallorcawedding.co.uk</a>. We will respond within 30 days.</p>
        <p>You also have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office (ICO)</a>.</p>

        <h2>8. Security</h2>
        <p>We use HTTPS encryption across the site. Form submissions are transmitted securely and stored with access controls. No system is 100% secure — if you have concerns about a specific data submission, contact us directly.</p>

        <h2>9. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of this page reflects the most recent revision. Material changes will be announced via a banner on the site.</p>

      </div>
    </>
  );
}
