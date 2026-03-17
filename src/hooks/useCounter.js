import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated counter hook
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in seconds
 * @param {string} prefix - Text before the number (e.g. "$")
 * @param {string} suffix - Text after the number (e.g. "+")
 */
export default function useCounter(end, duration = 2, prefix = '', suffix = '') {
  const ref = useRef(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const val = Math.round(obj.value);
            setDisplay(`${prefix}${val.toLocaleString()}${suffix}`);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration, prefix, suffix]);

  return { ref, display };
}
