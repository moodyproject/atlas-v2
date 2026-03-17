import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger reveal hook
 * @param {Object} options
 * @param {number} options.y - Starting Y offset (default 60)
 * @param {number} options.duration - Animation duration (default 1)
 * @param {number} options.stagger - Stagger between children (default 0.15)
 * @param {string} options.start - ScrollTrigger start position (default "top 85%")
 * @param {boolean} options.children - Whether to animate children instead of container
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  const {
    y = 60,
    duration = 1,
    stagger = 0.15,
    start = 'top 85%',
    children = false,
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;

    gsap.set(targets, {
      y,
      opacity: 0,
    });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      stagger: children ? stagger : 0,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, duration, stagger, start, children, delay]);

  return ref;
}
