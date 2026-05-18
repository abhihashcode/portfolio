import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import IntroSplash from './components/ui/IntroSplash';
import FloatingVideo from './components/ui/FloatingVideo';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import HireMe from './pages/HireMe';
import './styles/globals.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('av_intro_seen'));
  const [introComplete, setIntroComplete] = useState(() => !!sessionStorage.getItem('av_intro_seen'));

  const handleIntroComplete = () => {
    sessionStorage.setItem('av_intro_seen', '1');
    setShowIntro(false);
    document.body.style.overflow = '';
    // Small delay before showing FloatingVideo
    setTimeout(() => setIntroComplete(true), 800);
  };

  useEffect(() => {
    if (showIntro) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}
      {introComplete && <FloatingVideo />}
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hire" element={<HireMe />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
