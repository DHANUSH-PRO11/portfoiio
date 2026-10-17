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
      end: () => `+=${window.innerHeight * (slides.length - 1)}`,
      pin: container,
      scrub: 0.5,
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

  // Create scrubbed master timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      pin: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * (projectCount - 1) * 1.6}`,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const step = 1 / (projectCount - 1);
        const currentIndex = Math.min(
          projectCount - 1,
          Math.floor(self.progress / step + 0.15)
        );
        if (onSlideChange) {
          onSlideChange(currentIndex, self.progress);
        }
      }
    }
  });

  // Build sequential animations for each transition: Slide i -> Slide i+1
  for (let i = 1; i < projectCount; i++) {
    const incomingSlide = slides[i];
    const outgoingSlide = slides[i - 1];
    const incomingImg = incomingSlide.querySelector('.slide-bg-img');
    const incomingContent = incomingSlide.querySelector('.slide-content-wrap');
    const outgoingContent = outgoingSlide.querySelector('.slide-content-wrap');

    const maxRadius = getFullCoverageRadius();

    // 1. Initial peephole entrance
    tl.to(incomingSlide, {
      clipPath: 'circle(48px at 50% 85%)',
      ease: 'power2.in',
      duration: 0.25
    });

    // 2. Outgoing content lifts and dissolves
    if (outgoingContent) {
      tl.to(outgoingContent, {
        opacity: 0,
        y: -40,
        filter: 'blur(6px)',
        duration: 0.35,
        ease: 'power2.out'
      }, '<+=0.05');
    }

    // 3. Circle expansion across viewport
    tl.to(incomingSlide, {
      clipPath: `circle(${maxRadius}px at 50% 85%)`,
      ease: 'power1.inOut',
      duration: 0.75
    });

    // 4. Parallax scale on incoming visual
    if (incomingImg) {
      tl.fromTo(
        incomingImg,
        { scale: 1.18 },
        { scale: 1.0, ease: 'power1.out', duration: 0.75 },
        '<'
      );
    }

    // 5. Incoming content settles into view
    if (incomingContent) {
      tl.fromTo(
        incomingContent,
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' },
        '<+=0.3'
      );
    }

    // Small dwell pause on fully revealed slide before next transition
    if (i < projectCount - 1) {
      tl.to({}, { duration: 0.3 });
    }
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
