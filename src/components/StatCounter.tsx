'use client';

import { useEffect, useRef } from 'react';

interface Props {
  num: string;
  label: string;
}

export default function StatCounter({ num, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current || animated.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 90%',
              once: true,
              onEnter: () => { animated.current = true; },
            },
          }
        );
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className="stat" style={{ opacity: 0 }}>
      <span className="stat__num" dangerouslySetInnerHTML={{ __html: num }} />
      <span className="stat__lbl">{label}</span>
    </div>
  );
}
