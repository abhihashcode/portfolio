import { useEffect, useRef, useState, useCallback } from 'react';

const FloatingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  const [state, setState] = useState<'pip' | 'expanded' | 'hidden'>('pip');
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // offset from bottom-right
  const [appeared, setAppeared] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Delay appearance by 1.5s after load
  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onTime = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  // Drag logic
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (state !== 'pip') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  }, [state, pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({ x: dragRef.current.origX - dx, y: dragRef.current.origY - dy });
  }, []);

  const onPointerUp = useCallback(() => { dragRef.current.dragging = false; }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); }
  };

  const expand = (e: React.MouseEvent) => { e.stopPropagation(); setState('expanded'); };
  const collapse = (e: React.MouseEvent) => { e.stopPropagation(); setState('pip'); };
  const hide = (e: React.MouseEvent) => { e.stopPropagation(); setState('hidden'); };

  if (state === 'hidden') return null;

  // ── EXPANDED MODAL ──
  if (state === 'expanded') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 8000,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fade-in 0.3s ease',
      }} onClick={collapse}>
        <div onClick={e => e.stopPropagation()} style={{
          position: 'relative',
          width: 'min(90vw, 400px)',
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          background: '#000',
        }}>
          <video
            ref={videoRef}
            src="/images/intro-pip.mp4"
            poster="/images/pip-poster.jpg"
            muted={muted}
            loop
            playsInline
            autoPlay
            style={{ width: '100%', display: 'block' }}
          />
          {/* Controls overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '20px 18px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          }}>
            {/* Progress */}
            <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px', marginBottom: '12px', cursor: 'pointer' }}
              onClick={e => {
                const v = videoRef.current;
                if (!v) return;
                const r = e.currentTarget.getBoundingClientRect();
                v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
              }}>
              <div style={{ height: '100%', background: '#fff', borderRadius: '1px', width: `${progress}%`, transition: 'width 0.15s linear' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', padding: 0, lineHeight: 1 }}>
                  {playing ? '⏸' : '▶'}
                </button>
                <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}>
                  {muted ? '🔇' : '🔊'}
                </button>
              </div>
              <button onClick={collapse} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', padding: '5px 12px', borderRadius: '6px', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                MINIMIZE
              </button>
            </div>
          </div>
          {/* Close */}
          <button onClick={hide} style={{
            position: 'absolute', top: '12px', right: '12px',
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
      </div>
    );
  }

  // ── FLOATING PiP ──
  const pipW = 148;
  const pipH = Math.round(pipW * (850 / 478)); // maintain portrait AR

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: `${24 + pos.y}px`,
        right: `${24 + pos.x}px`,
        zIndex: 7000,
        width: pipW,
        height: pipH,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.35), 0 0 0 2px rgba(37,99,235,0.5)'
          : '0 12px 40px rgba(0,0,0,0.25)',
        cursor: 'grab',
        transform: appeared ? 'translateY(0) scale(1)' : 'translateY(120px) scale(0.8)',
        opacity: appeared ? 1 : 0,
        transition: appeared
          ? 'box-shadow 0.25s ease, transform 0.25s ease, opacity 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease',
        userSelect: 'none',
        touchAction: 'none',
        background: '#000',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/images/intro-pip.mp4"
        poster="/images/pip-poster.jpg"
        muted={muted}
        loop
        playsInline
        autoPlay
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
      />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

      {/* Top: label */}
      <div style={{
        position: 'absolute', top: '8px', left: '8px',
        display: 'flex', alignItems: 'center', gap: '4px',
        opacity: hovered ? 1 : 0.7, transition: 'opacity 0.2s',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
        <span style={{ color: '#fff', fontSize: '0.58rem', fontFamily: 'monospace', letterSpacing: '0.06em', fontWeight: 500 }}>LIVE</span>
      </div>

      {/* Top-right: close */}
      <button
        onClick={hide}
        style={{
          position: 'absolute', top: '6px', right: '6px',
          width: 20, height: 20, borderRadius: '50%',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
          fontSize: '10px', lineHeight: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >✕</button>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: '100%', background: 'rgba(255,255,255,0.7)', width: `${progress}%`, transition: 'width 0.2s linear' }} />
      </div>

      {/* Bottom controls - show on hover */}
      <div style={{
        position: 'absolute', bottom: '4px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 7px 4px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.2s, transform 0.2s',
      }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={togglePlay} style={{ background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={toggleMute} style={{ background: 'rgba(0,0,0,0.4)', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {muted ? '🔇' : '🔉'}
          </button>
        </div>
        <button onClick={expand} style={{
          background: 'rgba(37,99,235,0.85)', border: 'none',
          color: '#fff', cursor: 'pointer', padding: '3px 7px',
          borderRadius: '5px', fontSize: '0.58rem',
          fontFamily: 'monospace', letterSpacing: '0.04em',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          ⤢ expand
        </button>
      </div>
    </div>
  );
};

export default FloatingVideo;
