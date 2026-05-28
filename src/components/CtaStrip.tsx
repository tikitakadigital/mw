import Link from 'next/link';
import Icon from './Icon';

interface CtaStripProps {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaPath?: string;
  variant?: 'ink' | 'brand';
}

export default function CtaStrip({
  title,
  body,
  ctaLabel = 'Start the matcher',
  ctaPath = '/matcher',
  variant = 'ink',
}: CtaStripProps) {
  return (
    <div className={`cta-strip${variant === 'brand' ? ' cta-strip--brand' : ''}`}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link href={ctaPath} className="btn btn--primary btn--xl">
        <Icon name="sparkle" size={16} /> {ctaLabel}
      </Link>
    </div>
  );
}
