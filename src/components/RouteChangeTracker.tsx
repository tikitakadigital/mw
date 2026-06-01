'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';


function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mounted = useRef(false);

  useEffect(() => {
    // Skip initial mount — GTM's All Pages trigger covers it
    if (!mounted.current) { mounted.current = true; return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer = (window as any).dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((window as any).dataLayer as unknown[]).push({
      event: 'page_view',
      page_path: pathname + (searchParams.toString() ? `?${searchParams}` : ''),
    });
  }, [pathname, searchParams]);

  return null;
}

export default function RouteChangeTracker() {
  return <Suspense><Tracker /></Suspense>;
}
