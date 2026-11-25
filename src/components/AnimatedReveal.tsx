'use client';

import React, { useEffect, useRef } from 'react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 20,
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.75,
        delay,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
};
