import { useEffect, useRef, useState } from 'react';
import { MapPin, Coffee, Camera, Gamepad2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { skillCategories } from '../data/skills';

const interests = [
  { icon: Coffee, label: 'Coffee & Code', labelHi: 'कॉफी और कोड' },
  { icon: Camera, label: 'Photography', labelHi: 'फोटोग्राफी' },
  { icon: Gamepad2, label: 'Gaming', labelHi: 'गेमिंग' },
  { icon: MapPin, label: 'Travelling', labelHi: 'यात्रा' },
];

const AboutVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    const onMeta = () => setDuration(v.duration);
    const onEnd = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('ended', onEnd);
    return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('ended', onEnd); };
  }, []);

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
      {/* Video Player */}
      <div
        style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000', aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto', cursor: 'pointer', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src="/images/intro-opt.mp4"
          poster="/images/intro-poster.jpg"
          muted={muted}
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Play button overlay */}
        {!playing && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
              <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '12px 0 12px 22px', borderColor: 'transparent transparent transparent #2563eb', marginLeft: '4px' }} />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', opacity: (showControls || !playing) ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 2 }}>
          {/* Progress bar */}
          <div onClick={handleSeek} style={{ height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '10px', cursor: 'pointer', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: '#fff', borderRadius: '2px', transition: 'width 0.15s linear' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', padding: '2px', lineHeight: 1 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                {fmt(videoRef.current?.currentTime || 0)} / {fmt(duration)}
              </span>
            </div>
            <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '14px', padding: '2px', lineHeight: 1 }}>
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </div>

      {/* Text beside video */}
      <div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '12px', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.18)', marginBottom: '14px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
            <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Full-Stack Engineer</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>
            3.5 Years of<br />Production Experience
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
            From healthcare platforms to AI-powered sales engines — I build systems that scale. Currently at Bonami Software Pvt Ltd, and building LeadNirvana on the side.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Enterprise Deployments', value: '5+' },
            { label: 'Concurrent Users Handled', value: '100+' },
            { label: 'DB Query Improvement', value: '93%' },
            { label: 'Production Bug Reduction', value: '60%' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


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


        {/* ── MY STORY VIDEO ── */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <div style={{ marginBottom: '32px' }}>
            <p className="section-tag">My Story</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {lang === 'hi' ? 'मुझे खुद देखें' : 'See Me In Action'}
            </h2>
          </div>
          <AboutVideoPlayer />
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
