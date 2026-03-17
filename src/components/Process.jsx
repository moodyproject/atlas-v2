import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Audit & Strategy',
    description:
      'We audit your current digital presence and identify every gap. Then we build a custom marketing strategy tailored to your market, your competition, and your growth goals.',
  },
  {
    num: '02',
    title: 'Execute',
    description:
      'From SEO to AI call agents to ad campaigns, we execute everything. No more juggling vendors or wondering what is working. One team, total accountability.',
  },
  {
    num: '03',
    title: 'Track & Grow',
    description:
      'We track every call, every arrangement, every dollar. You get real results with real reporting. Then we optimize, scale, and push for more.',
  },
];

const styles = {
  section: {
    padding: 'clamp(80px, 12vw, 160px) 0',
    backgroundColor: 'var(--color-bg-cream)',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
  },
  header: {
    marginBottom: 'clamp(3rem, 6vw, 5rem)',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '1rem',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: 'var(--color-text)',
    maxWidth: '500px',
  },
  stepsContainer: {
    maxWidth: '640px',
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: '15px',
    top: '0',
    bottom: '0',
    width: '1px',
    backgroundColor: 'var(--color-border)',
    transformOrigin: 'top',
  },
  verticalLineProgress: {
    position: 'absolute',
    left: '15px',
    top: '0',
    width: '1px',
    height: '0%',
    backgroundColor: 'var(--color-gold)',
    transformOrigin: 'top',
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr',
    gap: '2rem',
    paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
    position: 'relative',
    opacity: 0,
    transform: 'translateY(40px)',
  },
  stepDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-gold)',
    marginTop: '0.5rem',
    justifySelf: 'center',
    position: 'relative',
    zIndex: 2,
  },
  stepContent: {},
  stepNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'var(--color-gold)',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
  },
  stepTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: 'var(--color-text)',
    marginBottom: '1rem',
  },
  stepDescription: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
    fontWeight: 300,
    lineHeight: 1.8,
    color: 'var(--color-text-secondary)',
    maxWidth: '480px',
  },
};

export default function Process() {
  const stepsRef = useRef([]);
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const stepEls = stepsRef.current.filter(Boolean);

    // Animate each step in
    stepEls.forEach((step, i) => {
      gsap.to(step, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Animate the vertical line
    if (lineRef.current && containerRef.current) {
      gsap.to(lineRef.current, {
        height: '100%',
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="process" style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>How It Works</div>
          <h2 style={styles.heading}>Three steps to measurable growth</h2>
        </div>

        <div ref={containerRef} style={styles.stepsContainer}>
          <div style={styles.verticalLine} />
          <div ref={lineRef} style={styles.verticalLineProgress} />

          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepsRef.current[i] = el; }}
              style={styles.step}
            >
              <div style={styles.stepDot} />
              <div style={styles.stepContent}>
                <div style={styles.stepNum}>Step {step.num}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
