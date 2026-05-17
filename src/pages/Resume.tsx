import { Download, Eye, FileText, Code2, Briefcase, GraduationCap } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { skillCategories } from '../data/skills';
import { timeline } from '../data/experience';

const Resume = () => {
  const { t, lang } = useLang();

  const highlights = [
    { icon: Briefcase, label: '3.5+ Years Experience', labelHi: '3.5+ वर्षों का अनुभव' },
    { icon: Code2, label: '25+ Technologies', labelHi: '25+ तकनीकें' },
    { icon: GraduationCap, label: 'MCA (AKTU)', labelHi: 'MCA (AKTU)' },
    { icon: FileText, label: '10+ Projects', labelHi: '10+ प्रोजेक्ट्स' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', animation: 'slide-up 0.6s ease both' }}>
          <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {t.resume.subtitle}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '16px' }}>{t.resume.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px' }}>
            {t.resume.description}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'var(--accent-gradient)',
                color: '#000', fontSize: '0.95rem', fontWeight: 700,
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)',
                boxShadow: '0 8px 30px rgba(100,220,255,0.3)',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
              >
                <Download size={18} /> {t.resume.download}
              </button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'transparent',
                color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600,
                border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-display)',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--accent-cyan)';
                  el.style.color = 'var(--accent-cyan)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '';
                  el.style.color = '';
                }}
              >
                <Eye size={18} /> {t.resume.view}
              </button>
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px', animation: 'slide-up 0.6s ease 0.1s both' }}>
          {highlights.map(({ icon: Icon, label, labelHi }) => (
            <div key={label} className="glass-card" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '20px', borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(100,220,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                {lang === 'hi' ? labelHi : label}
              </span>
            </div>
          ))}
        </div>

        {/* Resume Preview Card */}
        <div className="glass-card" style={{ borderRadius: 'var(--radius-xl)', padding: '40px', animation: 'slide-up 0.6s ease 0.2s both', position: 'relative', overflow: 'hidden' }}>
          {/* Gradient accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-gradient)' }} />

          {/* Name header */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>Abhishek Vishwakarma</h2>
            <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '12px' }}>Software Developer · Delhi, India</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {['abhishek@example.com', 'github.com/abhishek', 'linkedin.com/in/abhishek'].map(link => (
                <span key={link} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{link}</span>
              ))}
            </div>
          </div>

          {/* Experience section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Experience</h3>
            {timeline.filter(t => t.type === 'work').map(item => (
              <div key={item.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{item.period}</span>
                </div>
                <span style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>{item.organization}</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Education</h3>
            {timeline.filter(t => t.type === 'education').map(item => (
              <div key={item.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '2px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{item.period}</span>
                </div>
                <span style={{ color: 'var(--accent-purple)', fontSize: '0.9rem' }}>{item.organization}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skillCategories.map(cat => (
                <div key={cat.id} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', minWidth: '80px' }}>{cat.label}:</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {cat.skills.map(s => <span key={s.name} className="tag-pill">{s.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
