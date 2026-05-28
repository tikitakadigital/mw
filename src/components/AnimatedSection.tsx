'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: boolean;
  y?: number;
  delay?: number;
}

export default function AnimatedSection({ children, className = '', style, stagger = false, y = 28, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      const targets = stagger ? Array.from(ref.current.children) : [ref.current];

      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            delay,
            ease: 'power3.out',
            stagger: stagger ? 0.1 : 0,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, [stagger, y, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
