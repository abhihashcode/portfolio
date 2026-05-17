import { useEffect } from 'react';
import { Briefcase, GraduationCap, MapPin, Award, Calendar } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { timeline } from '../data/experience';

const Experience = () => {
  const { t, lang } = useLang();

  const workItems = timeline.filter(i => i.type === 'work');
  const eduItems = timeline.filter(i => i.type === 'education');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const gradeColor = (grade?: string) => {
    if (!grade) return 'var(--accent)';
    if (grade.includes('Distinction')) return '#7c3aed';
    return 'var(--accent)';
  };

  const WorkCard = ({ item }: { item: typeof timeline[0] }) => (
    <div className="reveal glass-card" style={{ padding: '28px 32px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
            <Briefcase size={19} color="var(--accent)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {lang === 'hi' ? item.titleHi : item.title}
              </h3>
              {item.current && (
                <span style={{ fontSize: '0.68rem', padding: '2px 9px', borderRadius: '10px', background: 'rgba(5,150,105,0.1)', color: 'var(--accent-green)', fontWeight: 600, fontFamily: 'var(--font-mono)', border: '1px solid rgba(5,150,105,0.2)' }}>
                  {lang === 'hi' ? 'अभी' : 'Current'}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent)', marginTop: '2px' }}>
              {lang === 'hi' ? item.organizationHi : item.organization}
            </div>
            {item.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                <MapPin size={12} /> {item.location}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '6px', flexShrink: 0 }}>
          <Calendar size={11} />{lang === 'hi' ? item.periodHi : item.period}
        </div>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
        {lang === 'hi' ? item.descriptionHi : item.description}
      </p>
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.tags.map(tag => <span key={tag} className="tech-badge">{tag}</span>)}
        </div>
      )}
    </div>
  );

  const EduCard = ({ item }: { item: typeof timeline[0] }) => (
    <div className="reveal glass-card" style={{ padding: '24px 28px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <GraduationCap size={18} color="#7c3aed" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
              {lang === 'hi' ? item.titleHi : item.title}
            </h3>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#7c3aed', marginBottom: '3px' }}>
              {lang === 'hi' ? item.organizationHi : item.organization}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <Calendar size={11} />{lang === 'hi' ? item.periodHi : item.period}
            </div>
          </div>
        </div>
        {(item.marks || item.cgpa) && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            {item.marks && (
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: gradeColor(item.grade), fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{item.marks}</div>
            )}
            {item.cgpa && (
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CGPA: {item.cgpa}</div>
            )}
            {item.grade && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: gradeColor(item.grade), marginTop: '4px', fontWeight: 600 }}>
                <Award size={10} />{item.grade}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        <div className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-tag">{lang === 'hi' ? 'मेरी यात्रा' : t.experience.subtitle}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{t.experience.title}</h1>
        </div>

        {/* ── WORK EXPERIENCE ── */}
        <div style={{ marginBottom: '56px' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '9px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={17} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {lang === 'hi' ? 'कार्य अनुभव' : 'Work Experience'}
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)', marginLeft: '8px' }} />
          </div>
          {workItems.map(item => <WorkCard key={item.id} item={item} />)}
        </div>

        {/* ── EDUCATION ── */}
        <div>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '9px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={17} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {lang === 'hi' ? 'शिक्षा' : 'Education'}
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)', marginLeft: '8px' }} />
          </div>
          {eduItems.map(item => <EduCard key={item.id} item={item} />)}
        </div>

      </div>
    </div>
  );
};

export default Experience;
