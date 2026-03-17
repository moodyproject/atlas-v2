import useScrollReveal from '../hooks/useScrollReveal';

const styles = {
  section: {
    padding: 'clamp(80px, 12vw, 160px) 0',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(3rem, 6vw, 8rem)',
    alignItems: 'start',
  },
  leftCol: {},
  stat: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: 'var(--color-text)',
    marginBottom: '1.5rem',
  },
  statAccent: {
    color: 'var(--color-gold)',
  },
  pullQuoteBar: {
    width: '48px',
    height: '2px',
    backgroundColor: 'var(--color-gold)',
    marginBottom: '2rem',
  },
  rightCol: {},
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '1.5rem',
  },
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.1vw, 1.125rem)',
    fontWeight: 300,
    lineHeight: 1.8,
    color: 'var(--color-text-secondary)',
    marginBottom: '1.5rem',
    maxWidth: '520px',
  },
  bodyTextLast: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.1vw, 1.125rem)',
    fontWeight: 300,
    lineHeight: 1.8,
    color: 'var(--color-text-secondary)',
    maxWidth: '520px',
  },
};

export default function AboutSplit() {
  const leftRef = useScrollReveal({ y: 50, duration: 1 });
  const rightRef = useScrollReveal({ y: 50, duration: 1, delay: 0.2 });

  return (
    <section id="about" style={styles.section}>
      <div style={styles.inner} className="about-inner">
        <div ref={leftRef} style={styles.leftCol}>
          <div style={styles.pullQuoteBar} />
          <div style={styles.stat}>
            <span style={styles.statAccent}>$2M+</span> in additional
            revenue generated for funeral homes
          </div>
        </div>

        <div ref={rightRef} style={styles.rightCol}>
          <div style={styles.eyebrow}>About Atlas</div>
          <p style={styles.bodyText}>
            Atlas is the premier funeral home marketing agency, trusted by
            funeral homes nationwide. Founded by a team of top-tier engineers
            and marketing professionals, we started with one mission: help
            funeral homes stop losing calls and start generating qualified leads.
          </p>
          <p style={styles.bodyTextLast}>
            Our systems combine SEO dominance, AI-powered call handling, and
            proven lead conversion to create a predictable pipeline of families
            who need your services. You bring the funeral home. We bring the
            playbook.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
