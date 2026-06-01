import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using mallorcawedding.co.uk — the independent Mallorca wedding planner marketplace.',
};

export default function TermsPage() {
  return (
    <>
      <section className="about-hero">
        <span className="kicker">Legal</span>
        <h1>Terms of Use</h1>
        <p className="lead">The rules for using mallorcawedding.co.uk.</p>
        <p className="muted" style={{ font: 'var(--t-caption)', marginTop: 16 }}>Last updated: 1 June 2026</p>
      </section>

      <div className="wrap--narrow legal-body">

        <h2>1. About this site</h2>
        <p>mallorcawedding.co.uk is operated by Mallorca Wedding Exchange. We provide an independent directory and matching service connecting couples planning destination weddings in Mallorca with local wedding planners.</p>
        <p>By using this site, you agree to these terms. If you do not agree, please do not use the site.</p>

        <h2>2. What we are — and are not</h2>
        <p>Mallorca Wedding is an independent marketplace. We are <strong>not</strong> a wedding agency, booking agent, or party to any contract between you and a wedding planner. We do not take a commission from couples. Any agreement you reach with a planner is between you and them directly.</p>
        <p>Planner listings represent information provided by or verified about each planner at the time of listing. We make reasonable efforts to keep information accurate but cannot guarantee it is current at the time of your enquiry.</p>

        <h2>3. Using the site</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for any unlawful purpose or in violation of any regulations.</li>
          <li>Submit false, misleading, or fraudulent information via any form.</li>
          <li>Attempt to scrape, harvest, or systematically collect data from the site without permission.</li>
          <li>Interfere with the security or operation of the site.</li>
        </ul>

        <h2>4. Planner listings</h2>
        <p>Planners listed on the site have been independently vetted by our editorial team. &ldquo;Verified Partner&rdquo; status means we have met the planner, reviewed their portfolio, and checked references. It is an editorial assessment — not a guarantee of performance or a contractual warranty.</p>
        <p>We reserve the right to remove or suspend any listing at our discretion.</p>

        <h2>5. Pricing and cost guides</h2>
        <p>Venue cost guides and budget estimates published on this site are based on market research and real wedding data. They are indicative ranges, not quotes. Actual costs will vary based on date, guest count, supplier availability, and your specific requirements. Always obtain a formal quote from a planner or venue before committing.</p>

        <h2>6. Intellectual property</h2>
        <p>All content on this site — including text, editorial guides, cost benchmarks, photographs, and design — is owned by or licensed to Mallorca Wedding Exchange. You may not reproduce, republish, or distribute it without prior written permission.</p>
        <p>Planner logos and photographs remain the property of the respective planners.</p>

        <h2>7. Limitation of liability</h2>
        <p>To the fullest extent permitted by law, Mallorca Wedding Exchange shall not be liable for:</p>
        <ul>
          <li>Any loss or damage arising from your use of, or inability to use, this site.</li>
          <li>The conduct, services, or performance of any wedding planner listed on the site.</li>
          <li>Any inaccuracy in planner profiles or cost estimates.</li>
        </ul>
        <p>Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>

        <h2>8. External links</h2>
        <p>This site may contain links to external websites. We are not responsible for the content or privacy practices of those sites.</p>

        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

        <h2>10. Changes to these terms</h2>
        <p>We may update these terms from time to time. The &ldquo;last updated&rdquo; date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the revised terms.</p>

        <h2>11. Contact</h2>
        <p>Questions about these terms: <a href="mailto:hello@mallorcawedding.co.uk">hello@mallorcawedding.co.uk</a></p>

      </div>
    </>
  );
}
