import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      <AnimatedBackground />
      <div className="relative z-10 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-sm" style={{ position: 'relative' }}>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certificates />
        <Contact />
        <Footer />
        <CommandPalette />
      </div>
    </div>
  );
}

export default App;
