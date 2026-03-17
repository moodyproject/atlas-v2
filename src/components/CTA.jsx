import useScrollReveal from '../hooks/useScrollReveal';

const styles = {
  section: {
    backgroundColor: 'var(--color-gold)',
    padding: 'clamp(80px, 10vw, 140px) 0',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: 'var(--color-white)',
  },
  button: {
    display: 'inline-block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    backgroundColor: 'var(--color-white)',
    padding: '1.1rem 3rem',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    flexShrink: 0,
  },
};

export default function CTA() {
  const ref = useScrollReveal({ y: 40, duration: 0.8 });

  return (
    <section id="contact" style={styles.section}>
      <div ref={ref} style={styles.inner}>
        <h2 style={styles.heading}>Ready to grow?</h2>
        <a
          href="#contact"
          style={styles.button}
          onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
          onMouseDown={(e) => { e.target.style.transform = 'scale(0.98)'; }}
          onMouseUp={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
        >
          Book Your Call
        </a>
      </div>
    </section>
  );
}
