import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Server, Layers, Zap,
  GraduationCap, Briefcase, Brain, MapPin, Mail,
  ExternalLink, Code2, Database, Cloud, MessageCircle
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { projects } from '../data/projects';

const techStack = [
  'Node.js', 'NestJS', 'Angular', 'React', 'TypeScript', 'PostgreSQL',
  'Redis', 'Docker', 'AWS', 'WebSocket', 'OpenAI', 'Claude AI', 'MongoDB', 'Kubernetes'
];

const floatingBadges = [
  { icon: Server, label: 'NestJS', delay: '0s', top: '10%', right: '-130px' },
  { icon: Layers, label: 'Angular', delay: '1.2s', top: '45%', right: '-120px' },
  { icon: Zap, label: 'TypeScript', delay: '2.2s', bottom: '12%', right: '-140px' },
];

const eduTimeline = [
  { year: '2016', label: '10th', sub: '80% · First Class', color: '#059669' },
  { year: '2018', label: '12th PCM', sub: '75% · First Class', color: '#2563eb' },
  { year: '2021', label: 'BCA', sub: '70% · First Class', color: '#d97706' },
  { year: '2023', label: 'MCA', sub: '80.5% · Distinction', color: '#7c3aed' },
];

const strengthCards = [
  { icon: Code2, title: 'Production-First', titleHi: 'प्रोडक्शन-फर्स्ट', desc: 'Real VPS deployments, SSL, monitoring — not just localhost.', descHi: 'रियल VPS डिप्लॉयमेंट, SSL और मॉनिटरिंग।', color: '#2563eb' },
  { icon: Brain, title: 'AI Integration', titleHi: 'AI इंटीग्रेशन', desc: 'OpenAI, Claude AI, LangChain in production conversational systems.', descHi: 'OpenAI, Claude AI, LangChain प्रोडक्शन में।', color: '#7c3aed' },
  { icon: Database, title: 'System Design', titleHi: 'सिस्टम डिज़ाइन', desc: 'HLD/LLD, microservices, SOLID, Clean Architecture for scale.', descHi: 'HLD/LLD, माइक्रोसर्विस, SOLID, क्लीन आर्किटेक्चर।', color: '#d97706' },
  { icon: Cloud, title: 'DevOps & Cloud', titleHi: 'DevOps और क्लाउड', desc: 'AWS, Docker, Kubernetes, GitHub Actions, Prometheus + Grafana.', descHi: 'AWS, Docker, Kubernetes, GitHub Actions।', color: '#059669' },
];

const Home = () => {
  const { t, lang } = useLang();
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current)
        heroBgRef.current.style.transform = `scale(1.04) translateY(${window.scrollY * 0.08}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const roles = lang === 'hi'
      ? ['फुल-स्टैक इंजीनियर', 'AI प्रोडक्ट बिल्डर', 'बैकएंड आर्किटेक्ट', 'प्रोडक्शन-रेडी डेव']
      : ['Full-Stack Engineer', 'AI Product Builder', 'Backend Architect', 'Production-Ready Dev'];
    let ri = 0, ci = 0, del = false;
    const el = document.getElementById('typewriter');
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const cur = roles[ri];
      if (!del) { el.textContent = cur.slice(0, ++ci); if (ci === cur.length) { del = true; timer = setTimeout(type, 2200); return; } }
      else { el.textContent = cur.slice(0, --ci); if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
      timer = setTimeout(type, del ? 42 : 72);
    };
    type();
    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <main style={{ minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── HERO with video background ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        <div ref={heroBgRef} style={{ position: 'absolute', inset: '-4% -2%', zIndex: 0, willChange: 'transform', transform: 'scale(1.04)' }}>
          <video src="/images/hero-loop.mp4" autoPlay muted loop playsInline preload="auto" poster="/images/pip-poster.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(10,12,24,0.72)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right,rgba(10,12,24,0.9) 0%,rgba(10,12,24,0.6) 55%,rgba(10,12,24,0.35) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', zIndex: 1, background: 'linear-gradient(to top,#dfe3ee 0%,transparent 100%)' }} />
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.1, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.18) 1px,transparent 1px)' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', paddingTop: '90px', paddingBottom: '60px' }}>

          {/* ── Single grid — responsive via CSS ── */}
          <div className="hero-grid">

            {/* Photo — appears first on mobile via order */}
            <div className="hero-photo-wrap" style={{ position: 'relative', flexShrink: 0 }}>
              {/* Glow blob behind photo */}
              <div style={{ position: 'absolute', inset: '-18px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)', zIndex: 0 }} />

              {/* Photo frame */}
              <div className="hero-photo-inner" style={{ position: 'relative', zIndex: 2, width: '270px', height: '330px' }}>
                <div className="curvy-clip" style={{ width: '100%', height: '100%', overflow: 'hidden', border: '2px solid rgba(147,197,253,0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  <img src="/images/abhishek-formal.png" alt="Abhishek Vishwakarma"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>

                {/* Badges — positioned relative to photo frame so they always sit OUTSIDE it */}
                {floatingBadges.map(({ icon: Icon, label, delay }, i) => (
                  <div key={label} className="float-anim" style={{
                    position: 'absolute',
                    top: i === 0 ? '12%' : i === 1 ? '46%' : undefined,
                    bottom: i === 2 ? '10%' : undefined,
                    right: '-8px',
                    transform: 'translateX(100%)',
                    animationDelay: delay,
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)', fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)', color: '#93c5fd',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)', zIndex: 5, whiteSpace: 'nowrap'
                  }}>
                    <Icon size={11} /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Text content */}
            <div className="hero-text" style={{ animation: 'slide-up 0.7s ease 0.1s both' }}>
              <p className="hero-greeting" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {lang === 'hi' ? 'नमस्ते, मैं हूँ' : 'Hello, I am'}
              </p>
              <h1 style={{ fontSize: 'clamp(2.6rem,7vw,5.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: '8px' }}>
                Abhishek<br /><span style={{ color: '#93c5fd' }}>Vishwakarma</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', minHeight: '44px', marginBottom: '14px' }} className="hero-tw-wrap">
                <span id="typewriter" style={{ fontSize: 'clamp(0.95rem,2.5vw,1.45rem)', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }} />
                <span style={{ width: '2px', height: '1.3em', background: '#93c5fd', marginLeft: '3px', display: 'inline-block', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
              </div>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', maxWidth: '460px', lineHeight: 1.7, marginBottom: '12px' }}>
                {t.hero.subtitle}
              </p>
              <div className="hero-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                <MapPin size={12} color="#93c5fd" /><span>Ghazipur, UP · India</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <Mail size={12} color="#93c5fd" /><span>abhishekvish2332@gmail.com</span>
              </div>
              <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <Link to="/projects">
                  <button className="btn-primary" style={{ boxShadow: '0 4px 24px rgba(37,99,235,0.35)' }}>
                    {t.hero.cta_projects} <ArrowRight size={15} />
                  </button>
                </Link>
                <Link to="/contact">
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.875rem', fontWeight: 500, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'var(--font-body)', backdropFilter: 'blur(8px)' }}>
                    <MessageCircle size={15} /> {lang === 'hi' ? 'संपर्क करें' : 'Contact Me'}
                  </button>
                </Link>
              </div>
              <div className="hero-stats" style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                {t.about.stats.map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#93c5fd', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', animation: 'float 2.5s ease-in-out infinite' }}>
          <span>{t.hero.scroll}</span><ChevronDown size={14} />
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <div className="dot-grid" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Tech stack */}
          <div className="reveal glass-card" style={{ padding: '18px 28px', marginBottom: '24px' }}>
            <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {lang === 'hi' ? 'तकनीकें जो मैं उपयोग करता हूँ' : 'Technologies I work with'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {techStack.map(tag => <span key={tag} className="tech-badge">{tag}</span>)}
            </div>
          </div>

          {/* Core Strengths */}
          <div className="reveal" style={{ marginBottom: '12px' }}>
            <p className="section-tag">{lang === 'hi' ? 'मुझे अलग क्या बनाता है' : 'What Sets Me Apart'}</p>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px' }}>
              {lang === 'hi' ? 'मुख्य विशेषताएं' : 'Core Strengths'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px', marginBottom: '36px' }}>
            {strengthCards.map(card => (
              <div key={card.title} className="reveal glass-card" style={{ padding: '20px 22px' }}>
                <div style={{ width: 38, height: 38, borderRadius: '9px', background: `${card.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '11px' }}>
                  <card.icon size={17} color={card.color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '5px', color: 'var(--text-primary)' }}>{lang === 'hi' ? card.titleHi : card.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{lang === 'hi' ? card.descHi : card.desc}</p>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div>
              <p className="section-tag">{lang === 'hi' ? 'मेरा काम' : 'My Work'}</p>
              <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)' }}>{lang === 'hi' ? 'फीचर्ड प्रोजेक्ट' : 'Featured Projects'}</h2>
            </div>
            <Link to="/projects"><button className="btn-outline" style={{ fontSize: '0.8rem', padding: '7px 14px' }}>{lang === 'hi' ? 'सभी देखें' : 'View All'} <ArrowRight size={13} /></button></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '16px', marginBottom: '32px' }}>
            {featuredProjects.map(proj => (
              <div key={proj.id} className="reveal glass-card" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{lang === 'hi' ? proj.titleHi : proj.title}</h3>
                  <span style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: '8px', background: proj.status === 'Building' ? 'rgba(217,119,6,0.1)' : 'rgba(5,150,105,0.1)', color: proj.status === 'Building' ? '#d97706' : '#059669', fontFamily: 'var(--font-mono)', fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>{proj.status}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{lang === 'hi' ? proj.descriptionHi : proj.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {proj.tags.slice(0, 4).map(tag => <span key={tag} className="tech-badge">{tag}</span>)}
                  {proj.tags.length > 4 && <span className="tech-badge">+{proj.tags.length - 4}</span>}
                </div>
                <Link to="/projects">
                  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: '2px 0', fontFamily: 'var(--font-body)' }}>
                    <ExternalLink size={12} /> {lang === 'hi' ? 'और देखें' : 'View More'}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Education Timeline — vertical on mobile */}
          <div className="reveal glass-card" style={{ padding: '28px 32px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
              <div>
                <p className="section-tag"><GraduationCap size={13} /> {lang === 'hi' ? 'शिक्षा यात्रा' : 'Education Journey'}</p>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>{lang === 'hi' ? 'शैक्षणिक पृष्ठभूमि' : 'Academic Background'}</h2>
              </div>
              <Link to="/experience"><button className="btn-outline" style={{ fontSize: '0.78rem', padding: '6px 13px' }}>{lang === 'hi' ? 'पूरी यात्रा' : 'Full Journey'} <ArrowRight size={12} /></button></Link>
            </div>
            {/* Desktop: 4-col horizontal | Mobile: vertical list */}
            <div className="edu-grid-desktop">
              <div style={{ position: 'absolute', top: '21px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(90deg,#059669,#2563eb,#d97706,#7c3aed)', opacity: 0.25, zIndex: 0 }} />
              {eduTimeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 4px' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: `${item.color}10`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <GraduationCap size={16} color={item.color} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: item.color, fontWeight: 600, marginBottom: '2px' }}>{item.year}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.87rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              ))}
            </div>
            {/* Mobile: vertical list */}
            <div className="edu-list-mobile">
              {eduTimeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: i < eduTimeline.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${item.color}10`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <GraduationCap size={16} color={item.color} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: item.color, fontWeight: 600 }}>{item.year}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience — Card layout matching Experience page */}
          <div className="reveal glass-card" style={{ padding: '22px 28px', marginBottom: '32px' }}>
            <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              {lang === 'hi' ? 'वर्तमान कार्य' : 'Current Position'}
            </p>

            {/* Petco — Current */}
            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Briefcase size={20} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Petco</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(5,150,105,0.1)', color: '#059669', fontWeight: 600 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#059669', display: 'inline-block' }} /> Current
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '2px' }}>Full Stack Engineer</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>May 2026 — Present</div>
              </div>
            </div>

            {/* Previously divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '14px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-hint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Previously</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {/* Digital Navigation */}
            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 18px', display: 'flex', gap: '14px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Briefcase size={20} color="var(--text-muted)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '2px' }}>Digital Navigation Pvt Ltd</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Software Engineer</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Mar 2023 — Feb 2026</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {['Node.js', 'Angular', 'WebSocket', 'Redis', 'AWS', 'Docker'].map(tag => <span key={tag} className="tech-badge">{tag}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* LeadNirvana card */}
          <div className="reveal glass-card" style={{ padding: '22px 28px', marginBottom: '32px', borderLeft: '3px solid #7c3aed' }}>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={20} color="#7c3aed" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>LeadNirvana</span>
                  <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '8px', background: 'rgba(217,119,6,0.1)', color: '#d97706', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Building</span>
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#7c3aed', marginBottom: '6px' }}>Founder & Lead Engineer</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.6 }}>
                  AI Sales Execution Engine for high-ticket B2B businesses.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {['NestJS', 'OpenAI', 'Claude AI', 'BullMQ', 'WhatsApp API', 'WebSocket'].map(tag => (
                    <span key={tag} className="tech-badge" style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.18)', color: '#7c3aed' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="reveal">
            <div style={{ background: '#2563eb', borderRadius: '14px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '5px' }}>{lang === 'hi' ? 'कुछ बनाते हैं?' : "Let's Build Something"}</h2>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>{lang === 'hi' ? 'फ्रीलांस, फुल-टाइम और AI रोल के लिए उपलब्ध।' : 'Available for freelance, full-time, and AI engineering roles.'}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/contact">
                  <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#fff', color: '#2563eb', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={14} /> {lang === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
                  </button>
                </Link>
                <Link to="/hire">
                  <button style={{ padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    {lang === 'hi' ? 'हायर करें' : 'Hire Me'}
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* ── Desktop hero: photo right, text left ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
          width: 100%;
          animation: slide-up 0.7s ease 0.1s both;
        }
        .hero-photo-wrap { order: 2; }
        .hero-text { order: 1; }

        /* Work row: 3-col on desktop */
        .work-row { display: grid; grid-template-columns: auto 1px 1fr; gap: 20px; align-items: center; }

        /* Education: 4-col on desktop, hidden on mobile */
        .edu-grid-desktop { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; position: relative; }
        .edu-list-mobile { display: none; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          /* Hero: single column, photo on top centered */
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            text-align: center;
          }

          /* Photo wrap on mobile:
             padding-right = badge overflow width (~110px)
             This makes flex center the photo within a narrowed space,
             so photo sits slightly left and badges to the right —
             the COMBINED photo+badges unit is centered on screen */
          .hero-photo-wrap {
            order: -1;
            display: flex !important;
            justify-content: center;
            padding-left: 0;
            overflow: visible;
          }
          /* Inner photo container — smaller on mobile */
          .hero-photo-inner {
            width: 180px !important;
            height: 220px !important;
          }

          /* Center text items */
          .hero-text { text-align: center; }
          .hero-meta { justify-content: center; }
          .hero-btns { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-tw-wrap { justify-content: center; }
          .hero-greeting { text-align: center; }

          /* Work row: stacked on mobile */
          .work-row { grid-template-columns: 1fr; gap: 14px; }
          .work-divider { display: none; }

          /* Education: hide horizontal grid, show vertical list */
          .edu-grid-desktop { display: none; }
          .edu-list-mobile { display: block; }
        }
      `}</style>
    </main>
  );
};

export default Home;
