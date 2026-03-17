import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Atlas completely transformed how we attract families. Our monthly call volume is up 85% and we finally feel like we have a real marketing partner, not just another vendor.',
    name: 'Margaret Holloway',
    role: 'Director, Heritage Memorial Chapel',
  },
  {
    quote:
      'The AI receptionist alone saved us $50,000 a year in staffing costs. Every call gets answered, every family gets taken care of. It is the single best investment we have made.',
    name: 'Richard Castellano',
    role: 'Owner, Peaceful Rest Funeral Home',
  },
  {
    quote:
      'Within six months, we went from page three on Google to the top three results in our city. The increase in visibility translated directly to more arrangements. Atlas delivers.',
    name: 'Evelyn Whitfield',
    role: 'General Manager, Golden Gate Memorial',
  },
];

const styles = {
  section: {
    padding: 'clamp(80px, 12vw, 140px) 0',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 4vw, 4rem)',
  },
  header: {
    marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
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
  },
  track: {
    display: 'flex',
    gap: 'clamp(1.5rem, 2.5vw, 2rem)',
    cursor: 'grab',
    userSelect: 'none',
    paddingBottom: '1rem',
  },
  card: {
    minWidth: 'clamp(320px, 40vw, 520px)',
    backgroundColor: 'var(--color-bg-cream)',
    padding: 'clamp(2rem, 3.5vw, 3rem)',
    borderRadius: '4px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '2rem',
    opacity: 0,
    transform: 'translateY(30px)',
  },
  quoteMarks: {
    fontFamily: 'var(--font-heading)',
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1,
    color: 'var(--color-gold)',
    opacity: 0.3,
    userSelect: 'none',
  },
  quoteText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
    fontWeight: 300,
    lineHeight: 1.8,
    color: 'var(--color-text)',
    fontStyle: 'italic',
  },
  attribution: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  name: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--color-text)',
    letterSpacing: '-0.01em',
  },
  role: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: 'var(--color-text-secondary)',
  },
};

export default function Testimonials() {
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, i) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (cards.includes(t.trigger)) t.kill();
      });
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const track = trackRef.current;
    dragState.current.startX = e.pageX - track.offsetLeft;
    dragState.current.scrollLeft = track.parentElement.scrollLeft;
    track.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const track = trackRef.current;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    track.parentElement.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>Testimonials</div>
          <h2 style={styles.heading}>Trusted by funeral homes nationwide</h2>
        </div>
      </div>

      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingLeft: 'clamp(1.5rem, 4vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="testimonials-scroll"
      >
        <div
          ref={trackRef}
          style={styles.track}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={styles.card}
            >
              <div>
                <div style={styles.quoteMarks}>&ldquo;</div>
                <p style={styles.quoteText}>{t.quote}</p>
              </div>
              <div style={styles.attribution}>
                <span style={styles.name}>{t.name}</span>
                <span style={styles.role}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
