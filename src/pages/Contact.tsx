import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Phone, GitFork, Link2, MessageCircle, Clock } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const WA_NUMBER = '918840466745';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'abhishekvish2332@gmail.com',
    href: 'mailto:abhishekvish2332@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+91 8840466745',
    href: 'tel:+918840466745',
  },
  {
    icon: GitFork,
    label: 'GitHub',
    value: 'github.com/abhihashcode',
    href: 'https://github.com/abhihashcode/',
  },
  {
    icon: Link2,
    label: 'LinkedIn',
    value: 'linkedin.com/in/abhishek-vishwakarma-92b4981a9',
    href: 'https://www.linkedin.com/in/abhishek-vishwakarma-92b4981a9/',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ghazipur, UP · India',
    href: 'https://maps.google.com/?q=Ghazipur,Uttar+Pradesh,India',
  },
];

const Contact = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    // Immediately reveal anything already in viewport
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    const text = `*New Portfolio Contact*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n\n*Message:*\n${form.message}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <div className="reveal" style={{ marginBottom: '48px' }}>
          <p className="section-tag">{t.contact.subtitle}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{t.contact.title}</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '10px', maxWidth: '500px' }}>
            {lang === 'hi' ? 'नीचे फॉर्म भरें — आपका संदेश सीधे WhatsApp पर आएगा।' : 'Fill the form below — your message will be sent directly to WhatsApp.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Left: Contact info */}
          <div className="reveal">
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                {lang === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {contactMethods.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', borderRadius: '9px',
                    background: 'var(--bg-primary)', border: '1px solid var(--border)',
                    transition: 'border-color 0.2s, background 0.2s',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.background = ''; }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="var(--accent)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '1px' }}>{label}</div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text-primary)' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: '20px', padding: '14px', borderRadius: '9px', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.18)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-green)' }}>
                    {lang === 'hi' ? 'उपलब्ध' : 'Available'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Clock size={11} />
                  {lang === 'hi' ? 'तत्काल से 60 दिन नोटिस पीरियड' : 'Immediate to 60-day notice period'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <MessageCircle size={17} color="var(--accent)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {lang === 'hi' ? 'संदेश भेजें (WhatsApp)' : 'Send Message via WhatsApp'}
                </h3>
              </div>

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✅</div>
                  <p style={{ fontWeight: 600, color: 'var(--accent-green)' }}>
                    {lang === 'hi' ? 'WhatsApp खुल रहा है...' : 'Opening WhatsApp...'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '5px' }}>{t.contact.name} *</label>
                      <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Rahul Sharma" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '5px' }}>{t.contact.email}</label>
                      <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="rahul@email.com" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '5px' }}>{t.contact.subject}</label>
                    <input className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder={lang === 'hi' ? 'फ्रीलांस प्रोजेक्ट' : 'Freelance Project'} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '5px' }}>{t.contact.message} *</label>
                    <textarea className="form-input" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder={lang === 'hi' ? 'आपका संदेश...' : 'Your message...'} required style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px' }}>
                    <Send size={15} />{lang === 'hi' ? 'WhatsApp पर भेजें' : 'Send on WhatsApp'}
                  </button>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-hint)', textAlign: 'center', marginTop: '8px' }}>
                    {lang === 'hi' ? 'WhatsApp Web/App में खुलेगा' : 'Will open in WhatsApp Web/App'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
