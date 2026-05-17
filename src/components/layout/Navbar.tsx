import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/projects', label: t.nav.projects },
    { path: '/experience', label: t.nav.experience },
    { path: '/resume', label: t.nav.resume },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 0' : '16px 0',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(223,227,238,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        transition: 'padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 34, height: 34, borderRadius: '9px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: '#fff' }}>AV</div>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Abhishek</span>
            </div>
          </NavLink>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden-mobile">
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} end={path === '/'} style={({ isActive }) => ({
                textDecoration: 'none', padding: '7px 13px', borderRadius: '7px',
                fontSize: '0.85rem', fontWeight: 500,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
                transition: 'color 0.2s, background 0.2s',
                fontFamily: 'var(--font-body)',
              })}>{label}</NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '6px 12px', borderRadius: '16px',
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-muted)', cursor: 'pointer',
              fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.color = ''; }}
            >
              <Globe size={13} />{lang === 'en' ? 'हिं' : 'EN'}
            </button>

            <NavLink to="/hire" style={{ textDecoration: 'none' }} className="hidden-mobile">
              <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.83rem', borderRadius: '7px' }}>
                {t.nav.hire}
              </button>
            </NavLink>

            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }} className="show-mobile">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', animation: 'fade-in 0.2s ease' }}>
          {navLinks.map(({ path, label }, i) => (
            <NavLink key={path} to={path} end={path === '/'} style={({ isActive }) => ({
              textDecoration: 'none', fontSize: '1.6rem',
              fontFamily: 'var(--font-body)', fontWeight: 700,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              padding: '10px 0', animation: `slide-up 0.3s ease ${i * 0.05}s both`, display: 'block',
            })}>{label}</NavLink>
          ))}
          <NavLink to="/hire" style={{ marginTop: '14px', animation: 'slide-up 0.3s ease 0.4s both', display: 'block' }}>
            <button className="btn-primary" style={{ padding: '11px 32px', fontSize: '0.95rem' }}>{t.nav.hire}</button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
