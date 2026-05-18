import { useEffect, useRef, useState, useCallback } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

const IntroSplash = ({ onComplete }: IntroSplashProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'enter' | 'playing' | 'exit'>('enter');
  const [textVisible, setTextVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showAudioHint, setShowAudioHint] = useState(false);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 400);
    const t2 = setTimeout(() => {
      setPhase('playing');
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, 800);
    const t3 = setTimeout(() => setShowAudioHint(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };
    const onEnded = () => triggerExit();
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    const video = videoRef.current;
    if (!video) return;
    const pos = video.currentTime;
    video.pause();
    video.muted = false;
    video.volume = 0.85;
    video.currentTime = pos;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
    setMuted(false);
    setAudioUnlocked(true);
    setShowAudioHint(false);
  }, []);

  const triggerExit = () => {
    setPhase('exit');
    setTimeout(onComplete, 900);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioUnlocked) { unlockAudio(); return; }
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      onClick={unlockAudio}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)' : 'opacity 0.5s ease',
        overflow: 'hidden',
        cursor: audioUnlocked ? 'default' : 'pointer',
      }}
    >
      <video
        ref={videoRef}
        src="/images/intro-splash.mp4"
        muted playsInline preload="auto"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: phase === 'enter' ? 0 : 0.72,
          transition: 'opacity 1.2s ease',
          filter: 'brightness(0.75)',
        }}
      />

      {/* Bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 'clamp(40px,6vh,70px)', background: '#000', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 'clamp(40px,6vh,70px)', background: '#000', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

      {/* Audio unlock hint - tap anywhere */}
      {showAudioHint && !audioUnlocked && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', animation: 'hintIn 0.6s ease both', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: 64, height: 64 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', animation: 'ripple 1.8s ease-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', animation: 'ripple 1.8s ease-out 0.6s infinite' }} />
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', fontSize: 26 }}>🔊</div>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Tap anywhere for sound</span>
        </div>
      )}

      {/* Name text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ width: textVisible ? '120px' : '0px', height: '1px', background: 'rgba(255,255,255,0.3)', marginBottom: '28px', transition: 'width 1s ease 0.2s' }} />
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 'clamp(1.6rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase', opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s', textAlign: 'center', lineHeight: 1.1 }}>
          Abhishek<br /><span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, letterSpacing: '0.28em', fontSize: '0.58em' }}>VISHWAKARMA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0', opacity: textVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.6s' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: 32, height: '0.5px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }} />
          <div style={{ width: 32, height: '0.5px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.62rem,1.2vw,0.8rem)', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', opacity: textVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.8s', textAlign: 'center' }}>
          Full-Stack Engineer &nbsp;·&nbsp; AI Product Builder
        </div>
        <div style={{ width: textVisible ? '80px' : '0px', height: '1px', background: 'rgba(255,255,255,0.15)', marginTop: '28px', transition: 'width 1s ease 0.5s' }} />
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 'clamp(40px,6vh,70px)', left: 0, right: 0, height: '2px', zIndex: 10, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'rgba(255,255,255,0.5)', transition: 'width 0.2s linear' }} />
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: 'clamp(50px,7.5vh,85px)', right: '28px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px', opacity: textVisible ? 1 : 0, transition: 'opacity 0.6s ease 1.2s' }}>
        <button onClick={toggleMute} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: audioUnlocked ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.18)', border: `1px solid ${audioUnlocked ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.5)'}`, cursor: 'pointer', padding: '6px 13px', borderRadius: '4px', color: audioUnlocked ? 'rgba(255,255,255,0.45)' : '#fff', fontFamily: 'monospace', fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
          <span style={{ fontSize: 13 }}>{muted ? '🔇' : '🔊'}</span>
          <span>{muted ? 'Sound Off' : 'Sound On'}</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); triggerExit(); }} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '6px 16px', borderRadius: '4px', color: 'rgba(255,255,255,0.42)', fontFamily: 'monospace', fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}>
          Skip ›
        </button>
      </div>

      <div style={{ position: 'absolute', top: 'clamp(12px,2vh,20px)', left: '28px', zIndex: 10, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', opacity: textVisible ? 1 : 0, transition: 'opacity 0.6s ease 1s' }}>
        AV / PORTFOLIO
      </div>

      <style>{`
        @keyframes ripple { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes hintIn { from{opacity:0;transform:translate(-50%,calc(-50% + 12px))} to{opacity:1;transform:translate(-50%,-50%)} }
      `}</style>
    </div>
  );
};

export default IntroSplash;
