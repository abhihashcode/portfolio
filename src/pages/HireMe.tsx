import { useState } from 'react';
import { Monitor, Smartphone, Server, Zap, GitBranch, Cloud, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { services } from '../data/skills';


const iconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, Server, Zap, GitBranch, Cloud,
};

const budgetOptions = ['< $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000+'];
const timelineOptions = ['< 1 week', '1–2 weeks', '1 month', '2+ months'];
const budgetOptionsHi = ['< ₹40,000', '₹40,000 – ₹1,60,000', '₹1,60,000 – ₹4,00,000', '₹4,00,000+'];
const timelineOptionsHi = ['< 1 सप्ताह', '1–2 सप्ताह', '1 महीना', '2+ महीने'];

const HireMe = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ project: '', budget: '', timeline: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Hire Me — Portfolio Enquiry*\n\n*Project Type:* ${form.project}\n*Budget:* ${form.budget}\n*Timeline:* ${form.timeline}\n\n*Details:*\n${form.description}`;
    window.open(`https://wa.me/918840466745?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ project: '', budget: '', timeline: '', description: '' }); }, 5000);
  };

  const budgets = lang === 'hi' ? budgetOptionsHi : budgetOptions;
  const timelines = lang === 'hi' ? timelineOptionsHi : timelineOptions;

  const selectStyle = (selected: boolean) => ({
    padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem',
    border: selected ? 'none' : '1px solid var(--border)',
    background: selected ? 'var(--accent-gradient)' : 'var(--bg-card)',
    color: selected ? '#000' : 'var(--text-secondary)',
    cursor: 'pointer', fontWeight: selected ? 700 : 500,
    fontFamily: 'var(--font-display)', transition: 'var(--transition)',
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px', maxWidth: '680px', animation: 'slide-up 0.6s ease both' }}>
          <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {t.hire.subtitle}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '20px' }}>{t.hire.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>{t.hire.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Services */}
          <div style={{ animation: 'slide-left 0.6s ease 0.1s both' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '28px', color: 'var(--text-primary)' }}>
              {t.hire.services}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {services.map((svc) => {
                const Icon = iconMap[svc.icon] || Monitor;
                return (
                  <div key={svc.id} className="glass-card" style={{
                    display: 'flex', gap: '16px', padding: '20px', borderRadius: 'var(--radius-md)',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(100,220,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', flexShrink: 0 }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                        {lang === 'hi' ? svc.titleHi : svc.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {lang === 'hi' ? svc.descriptionHi : svc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discuss Form */}
          <div style={{ animation: 'slide-right 0.6s ease 0.2s both' }}>
            <div className="glass-card" style={{ padding: '36px', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-gradient)' }} />

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ArrowRight size={20} color="var(--accent-cyan)" />
                {t.hire.discuss}
              </h2>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '48px 0', animation: 'slide-up 0.4s ease both' }}>
                  <CheckCircle2 size={56} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '8px' }}>
                    Project Received!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>I will review and respond within 48 hours with a proposal.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Project name */}
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '8px', letterSpacing: '0.04em' }}>{t.hire.form_project}</label>
                    <input
                      type="text" value={form.project} required
                      onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', transition: 'var(--transition)' }}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent-cyan)'; }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = ''; }}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '10px', letterSpacing: '0.04em' }}>{t.hire.form_budget}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {budgets.map(b => (
                        <button key={b} type="button" style={selectStyle(form.budget === b)} onClick={() => setForm(f => ({ ...f, budget: b }))}>{b}</button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '10px', letterSpacing: '0.04em' }}>{t.hire.form_timeline}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {timelines.map(tl => (
                        <button key={tl} type="button" style={selectStyle(form.timeline === tl)} onClick={() => setForm(f => ({ ...f, timeline: tl }))}>{tl}</button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '8px', letterSpacing: '0.04em' }}>{t.hire.form_description}</label>
                    <textarea
                      value={form.description} required rows={4}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none', transition: 'var(--transition)', boxSizing: 'border-box', minHeight: '100px' }}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent-cyan)'; }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = ''; }}
                    />
                  </div>

                  <button type="submit" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px', borderRadius: '12px',
                    background: 'var(--accent-gradient)',
                    color: '#000', fontWeight: 700, fontSize: '0.95rem',
                    border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)',
                    boxShadow: '0 8px 24px rgba(100,220,255,0.25)',
                    transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                  >
                    {t.hire.form_submit} <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
