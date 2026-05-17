import { useEffect, useRef } from 'react';
import { MapPin, Coffee, Camera, Gamepad2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { skillCategories } from '../data/skills';

const interests = [
  { icon: Coffee, label: 'Coffee & Code', labelHi: 'कॉफी और कोड' },
  { icon: Camera, label: 'Photography', labelHi: 'फोटोग्राफी' },
  { icon: Gamepad2, label: 'Gaming', labelHi: 'गेमिंग' },
  { icon: MapPin, label: 'Travelling', labelHi: 'यात्रा' },
];

const About = () => {
  const { t, lang } = useLang();
  const skillsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reveal on scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Animate skill bars
            const bars = e.target.querySelectorAll<HTMLElement>('.skill-bar-fill');
            bars.forEach((bar) => {
              const level = bar.dataset.level || '0';
              bar.style.width = level + '%';
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: '64px' }}>
          <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {t.about.subtitle}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '0' }}>
            {t.about.title}
          </h1>
        </div>

        {/* Two columns: photo + text */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', marginBottom: '80px', alignItems: 'center' }}>
          {/* Photos collage */}
          <div className="reveal" style={{ position: 'relative' }}>
            {/* Main photo */}
            <div style={{
              width: '100%', maxWidth: '360px',
              clipPath: 'polygon(0% 4%, 8% 0%, 92% 0%, 100% 4%, 100% 90%, 92% 100%, 8% 100%, 0% 90%)',
              overflow: 'hidden', borderRadius: '4px',
              border: '1px solid var(--border-accent)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/images/abhishek-casual.jpg"
                alt="Abhishek casual"
                style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>

            {/* Accent photo */}
            <div style={{
              position: 'absolute', bottom: '-30px', right: '-20px',
              width: '150px', height: '190px',
              clipPath: 'polygon(0% 6%, 6% 0%, 94% 0%, 100% 6%, 100% 88%, 88% 100%, 12% 100%, 0% 88%)',
              overflow: 'hidden',
              border: '2px solid var(--bg-primary)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              zIndex: 3,
            }}>
              <img
                src="/images/abhishek-outdoor.jpg"
                alt="Abhishek outdoor"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>

            {/* Location badge */}
            <div style={{
              position: 'absolute', top: '20px', right: '-10px',
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '20px',
              background: 'rgba(15,15,26,0.95)',
              border: '1px solid var(--border-accent)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              zIndex: 4,
            }}>
              <MapPin size={13} color="var(--accent-cyan)" />
              <span style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{t.contact.location}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="reveal">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[t.about.bio1, t.about.bio2, t.about.bio3].map((bio, i) => (
                <p key={i} style={{ color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: i === 0 ? 500 : 400 }}>
                  {bio}
                </p>
              ))}
            </div>

            {/* Interests */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {interests.map(({ icon: Icon, label, labelHi }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '20px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-secondary)', fontSize: '0.85rem',
                    transition: 'var(--transition)', cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--accent-cyan)';
                      el.style.color = 'var(--accent-cyan)';
                      el.style.background = 'rgba(100,220,255,0.06)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '';
                      el.style.color = '';
                      el.style.background = '';
                    }}
                  >
                    <Icon size={15} />
                    {lang === 'hi' ? labelHi : label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '24px', marginBottom: '80px',
        }}>
          {t.about.stats.map((stat) => (
            <div key={stat.label} className="glass-card" style={{ padding: '28px 24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--accent)', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {t.skills.subtitle}
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>{t.skills.title}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {skillCategories.map((cat) => (
              <div key={cat.id} className="reveal glass-card" style={{ padding: '28px', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>
                  {lang === 'hi' ? cat.labelHi : cat.label}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{skill.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          data-level={skill.level}
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
