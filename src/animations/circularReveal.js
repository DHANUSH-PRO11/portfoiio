import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the scroll-driven circular mask reveal transition.
 * 
 * @param {Object} options
 * @param {HTMLElement} options.container - Pinned viewport wrapper
 * @param {HTMLElement} options.track - Scroll track container
 * @param {Array<HTMLElement>} options.slides - Array of slide DOM nodes
 * @param {Function} options.onSlideChange - Callback with active index and progress
 * @param {boolean} options.reducedMotion - Fallback flag for accessibility
 * @returns {Function} cleanup - Function to kill ScrollTrigger and GSAP timeline
 */
export function initCircularReveal({
  container,
  track,
  slides,
  onSlideChange,
  reducedMotion = false
}) {
  if (!container || !track || !slides || slides.length < 2) return () => {};

  if (reducedMotion) {
    // Accessible fallback: simple opacity cross-fade
    slides.forEach((slide, i) => {
      slide.style.clipPath = 'none';
      slide.style.opacity = i === 0 ? '1' : '0';
      slide.style.position = 'absolute';
      slide.style.inset = '0';
    });

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: () => `+=${window.innerHeight * (slides.length - 1) * 4.5}`,
      pin: container,
      scrub: 1.2,
      onUpdate: (self) => {
        const step = 1 / (slides.length - 1);
        const activeIdx = Math.min(
          slides.length - 1,
          Math.floor(self.progress / step)
        );
        slides.forEach((slide, idx) => {
          slide.style.opacity = idx === activeIdx ? '1' : '0';
        });
        if (onSlideChange) onSlideChange(activeIdx, self.progress);
      }
    });

    return () => trigger.kill();
  }

  // Calculate dynamic max radius to ensure the circle completely covers all 4 screen corners
  const getFullCoverageRadius = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Anchor center is at (w * 0.5, h * 0.85)
    const anchorX = w * 0.5;
    const anchorY = h * 0.85;
    // Furthest corner is top-left (0, 0) or top-right (w, 0)
    const dx = anchorX;
    const dy = anchorY;
    const maxDist = Math.sqrt(dx * dx + dy * dy);
    // Add 15% safety buffer to guarantee full coverage
    return Math.ceil(maxDist * 1.15);
  };

  const projectCount = slides.length;
  // Initialize layers
  slides.forEach((slide, index) => {
    slide.style.position = 'absolute';
    slide.style.inset = '0';
    slide.style.zIndex = index + 1;

    if (index === 0) {
      slide.style.clipPath = 'circle(150% at 50% 85%)';
      slide.style.opacity = '1';
    } else {
      slide.style.clipPath = 'circle(0px at 50% 85%)';
      slide.style.opacity = '1';
    }
  });

  // Create scrubbed master timeline with generous runway for slow, deliberate circular expansion
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      pin: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * (projectCount - 1) * 4.5}`,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        let currentIndex = 0;
        if (projectCount === 3) {
          if (p < 0.38) currentIndex = 0;
          else if (p < 0.78) currentIndex = 1;
          else currentIndex = 2;
        } else {
          const step = 1 / (projectCount - 1);
          currentIndex = Math.min(projectCount - 1, Math.floor(p / step + 0.12));
        }
        if (onSlideChange) {
          onSlideChange(currentIndex, p);
        }
      }
    }
  });

  // Initial comfortable dwell on Project 1
  tl.to({}, { duration: 1.2 });

  // Build sequential animations for each transition: Slide i -> Slide i+1
  for (let i = 1; i < projectCount; i++) {
    const incomingSlide = slides[i];
    const outgoingSlide = slides[i - 1];
    const incomingImg = incomingSlide.querySelector('.slide-bg-img');
    const incomingContent = incomingSlide.querySelector('.slide-content-wrap');
    const outgoingContent = outgoingSlide.querySelector('.slide-content-wrap');

    const maxRadius = getFullCoverageRadius();

    // 1. Initial portal peephole emerges from the circular anchor
    tl.to(incomingSlide, {
      clipPath: 'circle(64px at 50% 85%)',
      ease: 'power1.out',
      duration: 0.4
    });

    // 2. Outgoing content dissolves smoothly
    if (outgoingContent) {
      tl.to(outgoingContent, {
        opacity: 0,
        y: -30,
        filter: 'blur(5px)',
        duration: 0.45,
        ease: 'power1.out'
      }, '<+=0.05');
    }

    // 3. Steady, linear circular expansion across viewport (ease: 'none' for 1:1 scroll responsiveness)
    tl.to(incomingSlide, {
      clipPath: `circle(${maxRadius}px at 50% 85%)`,
      ease: 'none',
      duration: 2.8
    }, '<+=0.1');

    // 4. Subtle parallax zoom on the incoming visual
    if (incomingImg) {
      tl.fromTo(
        incomingImg,
        { scale: 1.15 },
        { scale: 1.0, ease: 'none', duration: 2.8 },
        '<'
      );
    }

    // 5. Incoming editorial content settles in smoothly as the circle reaches wide coverage
    if (incomingContent) {
      tl.fromTo(
        incomingContent,
        { opacity: 0, y: 35, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        '<+=1.4'
      );
    }

    // 6. Extended stationary dwell pause so the user can comfortably view and read the project
    tl.to({}, { duration: 1.8 });
  }

  // Handle window resize to recalculate clip-path coordinates
  const handleResize = () => {
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
}
