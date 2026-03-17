import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'AI Receptionist',
    description:
      'Never miss a call. Our 24/7 AI receptionist answers every call, handles family inquiries, and schedules arrangements automatically.',
  },
  {
    num: '02',
    title: 'SEO Dominance',
    description:
      'Dominate Google when families search for funeral homes in your area. Our proven strategies put you at the top, consistently.',
  },
  {
    num: '03',
    title: 'Premium Web Design',
    description:
      'Dignified websites that reflect the quality of your services and convert visitors into calls. Built to outperform.',
  },
  {
    num: '04',
    title: 'Reputation Management',
    description:
      'Build and maintain a 5-star online presence. Automated review generation and response management that works while you sleep.',
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
    maxWidth: '600px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 2fr',
    gap: 'clamp(1.5rem, 3vw, 3rem)',
    alignItems: 'start',
    padding: 'clamp(1.75rem, 3vw, 2.5rem) 0',
    borderTop: '1px solid var(--color-border)',
    opacity: 0,
    transform: 'translateY(40px)',
  },
  rowLast: {
    borderBottom: '1px solid var(--color-border)',
  },
  num: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--color-gold)',
    letterSpacing: '0.05em',
    paddingTop: '0.15rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: 'var(--color-text)',
  },
  description: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-text-secondary)',
    maxWidth: '480px',
  },
};

export default function Services() {
  const rowsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const rows = rowsRef.current.filter(Boolean);

    rows.forEach((row, i) => {
      gsap.to(row, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (rows.includes(t.trigger)) t.kill();
      });
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>What We Do</div>
          <h2 style={styles.heading}>
            Everything your funeral home needs to grow
          </h2>
        </div>

        {services.map((service, i) => (
          <div
            key={service.num}
            ref={(el) => { rowsRef.current[i] = el; }}
            style={{
              ...styles.row,
              ...(i === services.length - 1 ? styles.rowLast : {}),
            }}
            className="services-row"
          >
            <span style={styles.num}>{service.num}</span>
            <h3 style={styles.title}>{service.title}</h3>
            <p style={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-row {
            grid-template-columns: 60px 1fr !important;
            gap: 0.75rem !important;
          }
          .services-row p {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
