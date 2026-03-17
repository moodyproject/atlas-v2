import { useEffect, useState, useRef } from 'react';
import { List, X } from '@phosphor-icons/react';

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  navScrolled: {
    backgroundColor: 'rgba(250, 248, 244, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--color-border)',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: 'var(--color-text)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  link: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 400,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.03em',
    transition: 'color 0.3s ease',
    textTransform: 'uppercase',
  },
  cta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-text)',
    padding: '0.65rem 1.5rem',
    borderRadius: '2px',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text)',
    padding: '0.5rem',
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-bg)',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '2rem clamp(1.5rem, 4vw, 4rem)',
    gap: '2rem',
  },
  mobileLink: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: 800,
    color: 'var(--color-text)',
    letterSpacing: '-0.02em',
    textDecoration: 'none',
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          ...styles.nav,
          ...(scrolled ? styles.navScrolled : {}),
        }}
      >
        <div style={styles.inner}>
          <a href="#" style={styles.logo}>ATLAS</a>

          <div style={styles.links} className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={styles.link}
                onMouseEnter={(e) => { e.target.style.color = 'var(--color-text)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--color-text-secondary)'; }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              style={styles.cta}
              onMouseEnter={(e) => { e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
              onMouseDown={(e) => { e.target.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { e.target.style.transform = 'translateY(-1px)'; }}
            >
              Book Your Call
            </a>
          </div>

          <button
            style={styles.hamburger}
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={styles.mobileMenu}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: 'clamp(1.5rem, 4vw, 4rem)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
            }}
            aria-label="Close menu"
          >
            <X size={32} weight="bold" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{ ...styles.mobileLink, color: 'var(--color-gold)' }}
            onClick={() => setMobileOpen(false)}
          >
            Book Your Call
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
