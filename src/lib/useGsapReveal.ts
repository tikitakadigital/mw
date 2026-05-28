'use client';

import { useEffect, useRef } from 'react';

// Lazy-load GSAP only on client to avoid SSR issues
export function useGsapReveal(selector = '[data-reveal]', options?: { stagger?: number; y?: number; duration?: number }) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;
      const els = containerRef.current.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          Array.from(els),
          { opacity: 0, y: options?.y ?? 30 },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.7,
            ease: 'power3.out',
            stagger: options?.stagger ?? 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }, containerRef);
    }

    init();
    return () => ctx?.revert();
  }, [selector, options?.stagger, options?.y, options?.duration]);

  return containerRef;
}

export default useGsapReveal;
