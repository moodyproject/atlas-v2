import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';

const HeroScene = lazy(() => import('./HeroScene'));

const styles = {
  section: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '120px 0 80px',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: '4rem',
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '1.5rem',
    opacity: 0,
  },
  headline: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    color: 'var(--color-text)',
    marginBottom: '1.5rem',
  },
  headlineWord: {
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'top',
    marginRight: '0.3em',
  },
  headlineInner: {
    display: 'inline-block',
    opacity: 0,
    transform: 'translateY(100%)',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
    maxWidth: '480px',
    marginBottom: '2.5rem',
    opacity: 0,
  },
  cta: {
    display: 'inline-block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-text)',
    padding: '1rem 2.5rem',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: 0,
    textDecoration: 'none',
  },
  gradientSide: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientShape: {
    width: '100%',
    aspectRatio: '1 / 1',
    maxWidth: '520px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse at 30% 40%, #d4b876 0%, #b8944f 30%, #f0ece2 60%, transparent 80%)',
    filter: 'blur(60px)',
    opacity: 0.6,
  },
  gradientShapeInner: {
    position: 'absolute',
    width: '70%',
    aspectRatio: '1 / 1.2',
    borderRadius: '40% 60% 50% 50% / 40% 50% 60% 50%',
    background: 'radial-gradient(ellipse at 50% 50%, #b8944f 0%, #d4b876 40%, transparent 70%)',
    filter: 'blur(40px)',
    opacity: 0.4,
    top: '15%',
    right: '10%',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2.5rem',
    left: 'clamp(1.5rem, 4vw, 4rem)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    opacity: 0,
  },
  scrollLine: {
    width: '48px',
    height: '1px',
    backgroundColor: 'var(--color-border)',
  },
  scrollText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const eyebrowRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
    })
    .to(
      wordsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      },
      '-=0.4'
    )
    .to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.5'
    )
    .to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.5'
    )
    .to(
      scrollRef.current,
      {
        opacity: 1,
        duration: 1,
      },
      '-=0.3'
    )
    .to(
      gradientRef.current,
      {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      },
      0.5
    );

    // Set initial states
    gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
    gsap.set(gradientRef.current, { opacity: 0, scale: 0.8 });

    // Replay timeline
    tl.play(0);

    return () => {
      tl.kill();
    };
  }, []);

  const headlineWords = ['We', 'grow', 'funeral', 'homes.'];

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.inner} className="hero-inner">
        <div style={styles.content}>
          <div ref={eyebrowRef} style={styles.eyebrow}>
            Funeral Home Marketing Agency
          </div>

          <h1 style={styles.headline}>
            {headlineWords.map((word, i) => (
              <span key={i} style={styles.headlineWord}>
                <span
                  ref={(el) => { wordsRef.current[i] = el; }}
                  style={styles.headlineInner}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p ref={subtitleRef} style={styles.subtitle}>
            We deliver all-inclusive marketing systems for funeral homes.
            You focus on serving families. We handle everything else.
          </p>

          <a
            ref={ctaRef}
            href="#contact"
            style={styles.cta}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
            onMouseDown={(e) => { e.target.style.transform = 'scale(0.98)'; }}
            onMouseUp={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
          >
            Book Your Call
          </a>
        </div>

        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div ref={scrollRef} style={styles.scrollIndicator} className="hero-scroll-indicator">
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>Scroll to explore</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-scene-container {
            display: none !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
