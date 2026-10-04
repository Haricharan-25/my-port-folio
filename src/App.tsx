import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Genzai from './components/Genzai';
import Skills from './components/Skills';
import Projects from './components/Projects';
import TheForge from './components/TheForge';
import Achievements from './components/Achievements';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SamuraiCursor from './components/SamuraiCursor';
import SectionTransition from './components/SectionTransition';
import KatanaSlash from './components/KatanaSlash';
import GlobalParticles from './components/GlobalParticles';
import { scrollToId, usePrefersReducedMotion } from './animations/animations';

export default function App() {
  const [slashing, setSlashing] = useState(false);
  const reduced = usePrefersReducedMotion();

  const enterDojo = useCallback(() => {
    if (reduced) return scrollToId('about');
    setSlashing(true);
  }, [reduced]);
  const onCut = useCallback(() => scrollToId('about', true), []);
  const onDone = useCallback(() => setSlashing(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="fixed left-4 top-4 z-[110] -translate-y-20 bg-crimson px-4 py-2 text-xs tracking-widest text-washi focus:translate-y-0"
      >
        Skip to content
      </a>
      <SamuraiCursor />
      <GlobalParticles />
      <div className="film-grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero onEnter={enterDojo} slashing={slashing} />
        <SectionTransition variant="slash" />
        <About />
        <Genzai />
        <SectionTransition variant="brush" />
        <Skills />
        <SectionTransition variant="fog" />
        <Projects />
        <SectionTransition variant="wipe" />
        <TheForge />
        <Achievements />
        <Journey />
        <SectionTransition variant="ink" />
        <Contact />
      </main>
      <Footer />
      <KatanaSlash active={slashing} onCut={onCut} onDone={onDone} />
    </MotionConfig>
  );
}
