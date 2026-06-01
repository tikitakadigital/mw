import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PreviewGate from '@/components/PreviewGate';
import { GoogleTagManager } from '@next/third-parties/google';
import RouteChangeTracker from '@/components/RouteChangeTracker';

export const metadata: Metadata = {
  title: {
    default: 'Mallorca Wedding · Find Verified Wedding Planners in Mallorca',
    template: '%s · Mallorca Wedding',
  },
  description: 'An independent guide to planning a destination wedding in Mallorca. Match with verified local planners in 30 seconds. Real venue cost guides. No "price on request."',
  metadataBase: new URL('https://www.mallorcawedding.co.uk'),
  openGraph: {
    siteName: 'Mallorca Wedding',
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <GoogleTagManager gtmId="GTM-WGTGQBK2" />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <RouteChangeTracker />
        <PreviewGate>
          <Nav />
          <div id="main-content" style={{ paddingTop: 'var(--nav-h)' }}>
            {children}
          </div>
          <Footer />
        </PreviewGate>
      </body>
    </html>
  );
}
