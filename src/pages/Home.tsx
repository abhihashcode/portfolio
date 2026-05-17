import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Server, Layers, Zap, GraduationCap, Briefcase, Brain, MapPin, Mail, ExternalLink, Code2, Database, Cloud, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { projects } from '../data/projects';

const techStack = [
  'Node.js', 'NestJS', 'Angular', 'React', 'TypeScript', 'PostgreSQL',
  'Redis', 'Docker', 'AWS', 'WebSocket', 'OpenAI', 'Claude AI', 'MongoDB', 'Kubernetes'
];

const floatingBadges = [
  { icon: Server, label: 'NestJS', delay: '0s', top: '20%', right: '5%' },
  { icon: Layers, label: 'Angular', delay: '1.2s', top: '50%', right: '1%' },
  { icon: Zap, label: 'TypeScript', delay: '2.2s', bottom: '22%', right: '9%' },
];

const eduTimeline = [
  { year: '2016', label: '10th', sub: '80% · First Class', color: '#059669' },
  { year: '2018', label: '12th PCM', sub: '75% · First Class', color: 'var(--accent)' },
  { year: '2021', label: 'BCA', sub: '70% · First Class', color: '#d97706' },
  { year: '2023', label: 'MCA', sub: '80.5% · Distinction', color: '#7c3aed' },
];

const strengthCards = [
  { icon: Code2, title: 'Production-First', titleHi: 'प्रोडक्शन-फर्स्ट', desc: 'Real VPS deployments, server management, SSL, monitoring — not just localhost.', descHi: 'रियल VPS डिप्लॉयमेंट, सर्वर मैनेजमेंट, SSL और मॉनिटरिंग।', color: 'var(--accent)' },
  { icon: Brain, title: 'AI Integration', titleHi: 'AI इंटीग्रेशन', desc: 'OpenAI, Claude AI, LangChain in production — conversational AI systems.', descHi: 'OpenAI, Claude AI, LangChain प्रोडक्शन में — कन्वर्सेशनल AI सिस्टम।', color: '#7c3aed' },
  { icon: Database, title: 'System Design', titleHi: 'सिस्टम डिज़ाइन', desc: 'HLD/LLD, microservices, SOLID, Clean Architecture — for scale.', descHi: 'HLD/LLD, माइक्रोसर्विस, SOLID, क्लीन आर्किटेक्चर।', color: '#d97706' },
  { icon: Cloud, title: 'DevOps & Cloud', titleHi: 'DevOps और क्लाउड', desc: 'AWS, Docker, Kubernetes, GitHub Actions, Prometheus + Grafana.', descHi: 'AWS, Docker, Kubernetes, GitHub Actions, Prometheus + Grafana।', color: '#059669' },
];

const Home = () => {
  const { t, lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.10}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const roles = lang === 'hi'
      ? ['फुल-स्टैक इंजीनियर', 'AI प्रोडक्ट बिल्डर', 'बैकएंड आर्किटेक्ट', 'प्रोडक्शन-रेडी डेव']
      : ['Full-Stack Engineer', 'AI Product Builder', 'Backend Architect', 'Production-Ready Dev'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const el = document.getElementById('typewriter');
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const cur = roles[roleIdx];
      if (!deleting) { el.textContent = cur.slice(0, ++charIdx); if (charIdx === cur.length) { deleting = true; timer = setTimeout(type, 2000); return; } }
      else { el.textContent = cur.slice(0, --charIdx); if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; } }
      timer = setTimeout(type, deleting ? 45 : 75);
    };
    type();
    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <div className="dot-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.6, pointerEvents: 'none' }} />

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 24px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center', width: '100%', paddingTop: '80px', paddingBottom: '40px' }}>

          {/* Mobile Photo — shown only on mobile, above text */}
          <div className="hero-photo-mobile">
            <div style={{ position: 'relative', width: '100%', animation: 'slide-up 0.6s ease 0.1s both' }}>
              <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 2, width: '180px', height: '220px', margin: '0 auto' }}>
                <div className="curvy-clip" style={{ width: '100%', height: '100%', overflow: 'hidden', border: '2.5px solid rgba(37,99,235,0.22)', boxShadow: '0 20px 60px rgba(37,99,235,0.18), 0 4px 20px rgba(0,0,0,0.10)' }}>
                  <img src="/images/abhishek-formal.png" alt="Abhishek Vishwakarma" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div className="float-anim" style={{ position: 'absolute', top: '8%', right: '-52px', animationDelay: '0s', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', background: '#fff', border: '1px solid var(--border-accent)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', boxShadow: 'var(--shadow-md)', zIndex: 5, whiteSpace: 'nowrap' }}>
                  <Server size={10} /> NestJS
                </div>
                <div className="float-anim" style={{ position: 'absolute', top: '46%', right: '-52px', animationDelay: '1.2s', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', background: '#fff', border: '1px solid var(--border-accent)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', boxShadow: 'var(--shadow-md)', zIndex: 5, whiteSpace: 'nowrap' }}>
                  <Layers size={10} /> Angular
                </div>
                <div className="float-anim" style={{ position: 'absolute', bottom: '10%', right: '-60px', animationDelay: '2.2s', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', background: '#fff', border: '1px solid var(--border-accent)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', boxShadow: 'var(--shadow-md)', zIndex: 5, whiteSpace: 'nowrap' }}>
                  <Zap size={10} /> TypeScript
                </div>
              </div>
            </div>
          </div>

          <div style={{ animation: 'slide-up 0.7s ease 0.1s both' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px', letterSpacing: '0.06em' }}>
              {lang === 'hi' ? 'नमस्ते, मैं हूँ' : 'Hello, I am'}
            </p>

            <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 5.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Abhishek<br />
              <span style={{ color: 'var(--accent)' }}>Vishwakarma</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', minHeight: '44px', marginBottom: '18px' }}>
              <span id="typewriter" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', fontWeight: 600, color: 'var(--text-secondary)' }} />
              <span style={{ width: '2px', height: '1.3em', background: 'var(--accent)', marginLeft: '3px', display: 'inline-block', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '14px' }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '30px', color: 'var(--text-muted)', fontSize: '0.82rem', flexWrap: 'wrap' }}>
              <MapPin size={13} color="var(--accent)" />
              <span>Ghazipur, UP · India</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <Mail size={13} color="var(--accent)" />
              <span>abhishekvish2332@gmail.com</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link to="/projects">
                <button className="btn-primary">{t.hero.cta_projects} <ArrowRight size={16} /></button>
              </Link>
              <Link to="/contact">
                <button className="btn-outline"><MessageCircle size={15} /> {lang === 'hi' ? 'संपर्क करें' : 'Contact Me'}</button>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
              {t.about.stats.map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Photo */}
          <div className="hero-photo-wrap" style={{ position: 'relative', animation: 'slide-right 0.7s ease 0.3s both', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 2, width: '270px', height: '330px' }}>
              <div className="curvy-clip" style={{ width: '100%', height: '100%', overflow: 'hidden', border: '2px solid rgba(37,99,235,0.18)', boxShadow: 'var(--shadow-lg)' }}>
                <img src="/images/abhishek-formal.png" alt="Abhishek Vishwakarma" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
            </div>
            {floatingBadges.map(({ icon: Icon, label, delay, top, right, bottom }) => (
              <div key={label} className="float-anim" style={{ position: 'absolute', top, right, bottom, animationDelay: delay, display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: '#fff', border: '1px solid var(--border-accent)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', boxShadow: 'var(--shadow-md)', zIndex: 5, whiteSpace: 'nowrap' }}>
                <Icon size={11} /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', color: 'var(--text-hint)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', animation: 'float 2.5s ease-in-out infinite', position: 'relative', zIndex: 2, marginTop: '-20px', marginBottom: '16px' }}>
        <span>{t.hero.scroll}</span>
        <ChevronDown size={15} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── TECH STACK STRIP ── */}
        <div className="reveal glass-card" style={{ padding: '20px 28px', marginBottom: '24px', overflow: 'hidden' }}>
          <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
            {lang === 'hi' ? 'तकनीकें जो मैं उपयोग करता हूँ' : 'Technologies I work with'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {techStack.map(t => <span key={t} className="tech-badge" style={{ fontSize: '0.72rem', padding: '4px 11px' }}>{t}</span>)}
          </div>
        </div>

        {/* ── CORE STRENGTHS ── */}
        <div className="reveal" style={{ marginBottom: '12px' }}>
          <p className="section-tag">{lang === 'hi' ? 'मुझे अलग क्या बनाता है' : 'What Sets Me Apart'}</p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
            {lang === 'hi' ? 'मुख्य विशेषताएं' : 'Core Strengths'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {strengthCards.map(card => (
            <div key={card.title} className="reveal glass-card" style={{ padding: '22px 24px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${card.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <card.icon size={18} color={card.color} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                {lang === 'hi' ? card.titleHi : card.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {lang === 'hi' ? card.descHi : card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── FEATURED PROJECTS ── */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <p className="section-tag">{lang === 'hi' ? 'मेरा काम' : 'My Work'}</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {lang === 'hi' ? 'फीचर्ड प्रोजेक्ट' : 'Featured Projects'}
            </h2>
          </div>
          <Link to="/projects">
            <button className="btn-outline" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              {lang === 'hi' ? 'सभी प्रोजेक्ट देखें' : 'View All Projects'} <ArrowRight size={14} />
            </button>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '32px' }}>
          {featuredProjects.map(proj => (
            <div key={proj.id} className="reveal glass-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>{lang === 'hi' ? proj.titleHi : proj.title}</h3>
                <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '8px', background: proj.status === 'Building' ? 'rgba(217,119,6,0.1)' : 'rgba(5,150,105,0.1)', color: proj.status === 'Building' ? '#d97706' : '#059669', fontFamily: 'var(--font-mono)', fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>{proj.status}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
                {lang === 'hi' ? proj.descriptionHi : proj.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {proj.tags.slice(0, 4).map(tag => <span key={tag} className="tech-badge">{tag}</span>)}
                {proj.tags.length > 4 && <span className="tech-badge">+{proj.tags.length - 4}</span>}
              </div>
              <Link to="/projects" style={{ marginTop: '4px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)' }}>
                  <ExternalLink size={13} /> {lang === 'hi' ? 'और देखें' : 'View More'}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* ── EDUCATION TIMELINE ── */}
        <div className="reveal glass-card" style={{ padding: '28px 24px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <p className="section-tag"><GraduationCap size={13} /> {lang === 'hi' ? 'शिक्षा यात्रा' : 'Education Journey'}</p>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {lang === 'hi' ? 'शैक्षणिक पृष्ठभूमि' : 'Academic Background'}
              </h2>
            </div>
            <Link to="/experience">
              <button className="btn-outline" style={{ fontSize: '0.8rem', padding: '7px 14px' }}>{lang === 'hi' ? 'पूरी यात्रा' : 'Full Journey'} <ArrowRight size={13} /></button>
            </Link>
          </div>
          {/* Desktop: horizontal timeline */}
          <div className="edu-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '22px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(90deg, #059669, var(--accent), #d97706, #7c3aed)', opacity: 0.3, zIndex: 0 }} />
            {eduTimeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 6px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${item.color}12`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: `0 3px 12px ${item.color}18` }}>
                  <GraduationCap size={17} color={item.color} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: item.color, fontWeight: 600, marginBottom: '3px' }}>{item.year}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.sub}</div>
              </div>
            ))}
          </div>
          {/* Mobile: vertical timeline */}
          <div className="edu-mobile" style={{ display: 'none', flexDirection: 'column', gap: '0' }}>
            {eduTimeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', paddingBottom: i < eduTimeline.length - 1 ? '20px' : '0' }}>
                {/* Vertical line */}
                {i < eduTimeline.length - 1 && (
                  <div style={{ position: 'absolute', left: '21px', top: '44px', bottom: 0, width: '2px', background: `linear-gradient(180deg, ${item.color}40, ${eduTimeline[i+1].color}40)`, zIndex: 0 }} />
                )}
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${item.color}12`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 3px 14px ${item.color}22`, zIndex: 1, position: 'relative' }}>
                  <GraduationCap size={17} color={item.color} />
                </div>
                <div style={{ paddingTop: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: item.color, fontWeight: 700 }}>{item.year}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WORK HIGHLIGHT ── */}
        <div className="reveal glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {lang === 'hi' ? 'वर्तमान कार्य' : 'Current Position'}
          </p>

          {/* Current job card */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', borderRadius: '12px', background: 'var(--accent-light)', border: '1px solid rgba(37,99,235,0.12)', marginBottom: '12px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Briefcase size={20} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>Petco</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#059669', fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'rgba(5,150,105,0.1)', padding: '2px 8px', borderRadius: '20px' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
                  Current
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '2px' }}>Full Stack Engineer</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>May 2026 — Present</div>
            </div>
          </div>

          {/* Divider with "Previously" label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Previously</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Previous job card */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}>
            <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'rgba(100,116,139,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Briefcase size={20} color="var(--text-secondary)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '2px' }}>Digital Navigation Pvt Ltd</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>Software Engineer</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Mar 2023 — Feb 2026</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Node.js', 'Angular', 'WebSocket', 'Redis', 'AWS', 'Docker'].map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── LeadNirvana AI Project ── */}
        <div className="reveal glass-card" style={{ padding: '24px', marginBottom: '20px', borderLeft: '3px solid #7c3aed' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '11px', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Brain size={20} color="#7c3aed" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>LeadNirvana</span>
                <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '20px', background: 'rgba(217,119,6,0.1)', color: '#d97706', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Building</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#7c3aed', fontWeight: 600 }}>
                {lang === 'hi' ? 'फाउंडर और लीड इंजीनियर' : 'Founder & Lead Engineer'}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.65, paddingLeft: '58px' }}>
            {lang === 'hi' ? 'हाई-टिकट B2B के लिए AI सेल्स इंजन।' : 'AI Sales Execution Engine for high-ticket B2B businesses.'}
          </p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingLeft: '58px' }}>
            {['NestJS', 'OpenAI', 'Claude AI', 'BullMQ', 'WhatsApp API', 'WebSocket'].map(t => (
              <span key={t} className="tech-badge" style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.18)', color: '#7c3aed' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── CONTACT CTA ── */}
        <div className="reveal" style={{ marginTop: '40px' }}>
          <div style={{ background: 'var(--accent)', borderRadius: '16px', padding: '40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                {lang === 'hi' ? 'कुछ बनाते हैं?' : "Let's Build Something"}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                {lang === 'hi' ? 'फ्रीलांस, फुल-टाइम और AI प्रोजेक्ट के लिए उपलब्ध।' : 'Available for freelance, full-time, and AI engineering roles.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <button style={{ padding: '11px 22px', borderRadius: '8px', background: '#fff', color: 'var(--accent)', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={15} /> {lang === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
                </button>
              </Link>
              <Link to="/hire">
                <button style={{ padding: '11px 22px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.875rem' }}>
                  {lang === 'hi' ? 'हायर करें' : 'Hire Me'}
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* ── Mobile Hero ── */
        .hero-photo-mobile { display: none; }
        .edu-mobile { display: none !important; }
        .edu-desktop { display: grid !important; }

        @media (max-width: 768px) {
          /* Hide desktop photo, show mobile photo */
          .hero-photo-wrap { display: none !important; }
          .hero-photo-mobile { display: block !important; }

          /* Stack hero: photo on top, text below, centered */
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 32px !important;
            padding-top: 96px !important;
            padding-bottom: 32px !important;
            min-height: unset !important;
            justify-items: center !important;
            text-align: center !important;
          }
          .hero-photo-mobile {
            display: flex !important;
            justify-content: center !important;
            padding: 0 60px 0 0 !important;
            width: 100% !important;
          }

          /* Education: hide horizontal, show vertical */
          .edu-desktop { display: none !important; }
          .edu-mobile {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
