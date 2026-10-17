import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'slide-left', 'slide-right'
  delay = 0,
  duration = 0.8,
  y = 35,
  className = '',
  ...props
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let fromVars = { opacity: 0 };
    if (animation === 'fade-up') fromVars.y = y;
    if (animation === 'slide-left') fromVars.x = -y;
    if (animation === 'slide-right') fromVars.x = y;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, [animation, delay, duration, y]);

  return (
    <div ref={elementRef} className={`scroll-reveal-box ${className}`} {...props}>
      {children}
    </div>
  );
}
