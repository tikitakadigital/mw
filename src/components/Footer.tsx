import Link from 'next/link';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="mw-footer">
      <div className="mw-footer__inner">
        <div className="mw-footer__cols">
          <div>
            <h4 className="mw-footer__brand">mallorca wedding<span className="dot">.</span></h4>
            <p className="mw-footer__about">An independent guide to planning a destination wedding in Mallorca. We match UK couples with verified local planners.</p>
            <span className="kicker" style={{ color: 'rgba(255,255,255,0.35)' }}>Made in Palma · For couples worldwide</span>
          </div>
          <div>
            <h4 className="mw-footer__head">Couples</h4>
            <Link href="/matcher">Find a planner</Link>
            <Link href="/planners">Planner directory</Link>
            <Link href="/find-a-planner">Best planners in Mallorca</Link>
            <Link href="/blog">Inspiration &amp; guides</Link>
          </div>
          <div>
            <h4 className="mw-footer__head">Venue cost guides</h4>
            <Link href="/venue/son-marroig">Son Marroig</Link>
            <Link href="/venue/finca-comassema">Finca Comassema</Link>
            <Link href="/venue/finca-son-mir">Finca Son Mir</Link>
            <Link href="/venue/son-togores">Son Togores</Link>
            <Link href="/venue/finca-son-berga">Finca Son Berga</Link>
          </div>
          <div>
            <h4 className="mw-footer__head">For planners</h4>
            <Link href="/for-pros">List your service</Link>
            <Link href="/for-pros">How leads work</Link>
            <Link href="/for-pros">Standards &amp; vetting</Link>
          </div>
          <div>
            <h4 className="mw-footer__head">Company</h4>
            <Link href="/about">About us</Link>
            <Link href="/standards">Editorial standards</Link>
            <Link href="/real-weddings">Real weddings</Link>
            <a href="mailto:hello@mallorcawedding.co.uk">Contact</a>
          </div>
        </div>
        <hr className="mw-footer__rule" />
        <div className="mw-footer__legal">
          <span>© 2026 Mallorca Wedding Exchange · An independent, data-driven marketplace</span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/privacy-policy" style={{ color: 'inherit', opacity: 0.5, fontSize: 12 }}>Privacy Policy</Link>
            <Link href="/cookie-policy" style={{ color: 'inherit', opacity: 0.5, fontSize: 12 }}>Cookie Policy</Link>
            <Link href="/terms" style={{ color: 'inherit', opacity: 0.5, fontSize: 12 }}>Terms of Use</Link>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="globe" size={14} /> English (UK) · £ GBP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
