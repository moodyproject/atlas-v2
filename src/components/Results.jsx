import useCounter from '../hooks/useCounter';
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
    gridTemplateColumns: '3fr 2fr',
    gap: 'clamp(3rem, 6vw, 8rem)',
    alignItems: 'start',
  },
  leftCol: {},
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '1rem',
  },
  bigStat: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(4rem, 10vw, 8rem)',
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.04em',
    color: 'var(--color-text)',
    marginBottom: '1rem',
  },
  bigLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
    fontWeight: 300,
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
    maxWidth: '400px',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  smallStat: {
    padding: 'clamp(1.5rem, 2.5vw, 2rem) 0',
    borderBottom: '1px solid var(--color-border)',
  },
  smallStatFirst: {
    borderTop: '1px solid var(--color-border)',
  },
  smallNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: 'var(--color-text)',
    marginBottom: '0.25rem',
  },
  smallLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--color-text-secondary)',
  },
};

function SmallStatCard({ end, prefix, suffix, label, isFirst }) {
  const { ref, display } = useCounter(end, 2, prefix, suffix);

  return (
    <div
      ref={ref}
      style={{
        ...styles.smallStat,
        ...(isFirst ? styles.smallStatFirst : {}),
      }}
    >
      <div style={styles.smallNum}>{display}</div>
      <div style={styles.smallLabel}>{label}</div>
    </div>
  );
}

export default function Results() {
  const { ref: bigRef, display: bigDisplay } = useCounter(50, 2.5, '', '+');
  const sectionRef = useScrollReveal({ y: 40, duration: 1 });

  return (
    <section id="results" style={styles.section}>
      <div ref={sectionRef} style={styles.inner} className="results-inner">
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>Our Impact</div>
          <div ref={bigRef} style={styles.bigStat}>
            {bigDisplay}
          </div>
          <div style={styles.bigLabel}>
            Funeral homes served across the country, generating more calls,
            more arrangements, and more revenue.
          </div>
        </div>

        <div style={styles.rightCol}>
          <SmallStatCard end={15} suffix="+" label="States covered" isFirst />
          <SmallStatCard end={2} prefix="$" suffix="M+" label="Additional revenue generated" />
          <SmallStatCard end={98} suffix="%" label="Client retention rate" />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .results-inner {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
