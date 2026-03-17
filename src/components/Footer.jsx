const styles = {
  footer: {
    borderTop: '1px solid var(--color-border)',
    padding: '2rem 0',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: 'var(--color-text)',
  },
  copyright: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-text-secondary)',
  },
  link: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'var(--color-text)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '2px',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <span style={styles.logo}>ATLAS</span>
        <span style={styles.copyright}>
          &copy; {new Date().getFullYear()} Atlas. All rights reserved.
        </span>
        <a
          href="#contact"
          style={styles.link}
          onMouseEnter={(e) => { e.target.style.color = 'var(--color-gold)'; e.target.style.borderColor = 'var(--color-gold)'; }}
          onMouseLeave={(e) => { e.target.style.color = 'var(--color-text)'; e.target.style.borderColor = 'var(--color-border)'; }}
        >
          Book a call
        </a>
      </div>
    </footer>
  );
}
