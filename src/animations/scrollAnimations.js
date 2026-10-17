import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements into view with subtle upward drift and opacity fade.
 */
export function initFadeInOnScroll(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const ctx = gsap.context(() => {
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: options.y || 40,
          filter: options.blur ? 'blur(6px)' : 'none'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'none',
          duration: options.duration || 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  });

  return () => ctx.revert();
}
