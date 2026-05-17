import { useState, useEffect } from 'react';
import { ExternalLink, GitFork, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { projects, projectCategories, type Project } from '../data/projects';

const categoryLabels: Record<string, string> = {
  all: 'All', fullstack: 'Full Stack', ai: 'AI / ML', frontend: 'Frontend', backend: 'Backend',
};
const categoryLabelsHi: Record<string, string> = {
  all: 'सभी', fullstack: 'फुल स्टैक', ai: 'AI / ML', frontend: 'फ्रंटएंड', backend: 'बैकएंड',
};

const Projects = () => {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    // Small timeout to let DOM update after category change
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
        // If already in view, show immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 0);
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, [activeCategory]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {t.projects.subtitle}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800 }}>{t.projects.title}</h1>
        </div>

        {/* Filter pills */}
        <div className="reveal" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: '20px',
                border: `1.5px solid ${activeCategory === cat ? 'transparent' : 'var(--border)'}`,
                background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontWeight: activeCategory === cat ? 700 : 500,
                fontSize: '0.85rem', cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
                outline: 'none',
                boxShadow: activeCategory === cat ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
              }}
            >
              {lang === 'hi' ? categoryLabelsHi[cat] : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="reveal glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'var(--transition)',
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => { setSelectedProject(project); setImgIndex(0); }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(10,10,15,0.9) 0%, transparent 60%)',
                }} />
                {project.featured && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'var(--accent)',
                    color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}>Featured</div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {lang === 'hi' ? project.titleHi : project.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  {lang === 'hi' ? project.descriptionHi : project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                  {project.tags.length > 4 && <span className="tag-pill">+{project.tags.length - 4}</span>}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', transition: 'opacity 0.2s' }}>
                      <ExternalLink size={13} /> {t.projects.view_live}
                    </span>
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ textDecoration: 'none' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      <GitFork size={13} /> {t.projects.view_code}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(5,5,10,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fade-in 0.2s ease',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '860px', width: '100%',
              maxHeight: '90vh', overflowY: 'auto',
              animation: 'slide-up 0.3s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image carousel */}
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
              <img
                src={selectedProject.screenshots[imgIndex]}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'opacity 0.3s' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,10,15,0.85) 0%, transparent 50%)' }} />

              {/* Arrows */}
              {selectedProject.screenshots.length > 1 && (
                <>
                  <button onClick={() => setImgIndex(i => (i - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length)}
                    style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setImgIndex(i => (i + 1) % selectedProject.screenshots.length)}
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800 }}>
                  {lang === 'hi' ? selectedProject.titleHi : selectedProject.title}
                </h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: 'var(--accent)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      <ExternalLink size={14} /> {t.projects.view_live}
                    </button>
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                      <GitFork size={14} /> {t.projects.view_code}
                    </button>
                  </a>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px', fontSize: '1rem' }}>
                {lang === 'hi' ? selectedProject.longDescriptionHi : selectedProject.longDescription}
              </p>

              <h4 style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {t.projects.tech_used}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="tag-pill" style={{ fontSize: '0.82rem' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
