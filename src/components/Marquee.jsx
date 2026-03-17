import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const keywords = [
  'AI Receptionist',
  'SEO',
  'Web Design',
  'Reputation',
  'Lead Generation',
  '24/7 Support',
  'AI Receptionist',
  'SEO',
  'Web Design',
  'Reputation',
  'Lead Generation',
  '24/7 Support',
];

const styles = {
  section: {
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    overflow: 'hidden',
    padding: '1.25rem 0',
    position: 'relative',
  },
  track: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    width: 'fit-content',
    willChange: 'transform',
  },
  item: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
    fontWeight: 500,
    color: 'var(--color-gold)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  separator: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-gold)',
    opacity: 0.4,
    flexShrink: 0,
  },
};

export default function Marquee() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure the width of a single set of items
    const totalWidth = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (!tweenRef.current) return;
    if (paused) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
    } else {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  }, [paused]);

  return (
    <section
      style={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} style={styles.track}>
        {[...keywords, ...keywords].map((word, i) => (
          <span key={i} style={styles.item}>
            <span>{word}</span>
            <span style={styles.separator} />
          </span>
        ))}
      </div>
    </section>
  );
}
