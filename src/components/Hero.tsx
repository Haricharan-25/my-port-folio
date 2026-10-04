import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import Katana from './Katana';
import HeroLandscape from './HeroLandscape';
import SakuraPetals from './SakuraPetals';
import HankoSeal from './HankoSeal';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SITE } from '../data/site';
import {
  EASE_OUT,
  scrollToId,
  useIsDesktop,
  useIsTouch,
  usePrefersReducedMotion,
} from '../animations/animations';

const DustField = lazy(() => import('./DustField'));

interface HeroProps {
  onEnter: () => void;
  slashing: boolean;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: EASE_OUT },
});

export default function Hero({ onEnter, slashing }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const interactive = !isTouch && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive, mx, my]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} id="home" aria-label="Introduction" className="relative h-[100svh] min-h-[680px] overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <HeroLandscape mx={smx} />
        {isDesktop && !reduced && (
          <Suspense fallback={null}>
            <DustField active={inView} />
          </Suspense>
        )}
        {!reduced && <SakuraPetals count={isDesktop ? 9 : 4} />}
      </motion.div>

      {/* Vertical side accents (desktop) */}
      <motion.div {...rise(1.4)} className="absolute left-10 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex" aria-hidden>
        <span className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
        <span className="vertical-jp font-jp text-xs tracking-[0.6em] text-ash">武士の道</span>
        <span className="h-20 w-px bg-gradient-to-t from-transparent to-gold/40" />
      </motion.div>
      <motion.div {...rise(1.5)} className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden>
        <span className="block origin-center rotate-90 whitespace-nowrap text-[10px] tracking-[0.5em] text-ash/70">EST. 2024 — THE PATH</span>
      </motion.div>

      <motion.div
        style={{ y: yText, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-[16vh] pt-20 text-center md:pb-[18vh]"
      >
        {/* Bushido Title */}
        <motion.p {...rise(0.2)} className="flex items-center gap-4">
          <span lang="ja" className="font-jp text-2xl font-light tracking-[0.3em] text-crimson md:text-3xl">
            武士道
          </span>
          <span className="h-px w-8 bg-gold/40" aria-hidden />
          <span className="text-[10px] tracking-[0.6em] text-gold/80 md:text-xs">BUSHIDŌ</span>
        </motion.p>

        {/* Primary Identity: KAKARLA with Hanko Seal & Full Name */}
        <motion.div {...rise(0.35)} className="relative mt-5 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center">
            <h1 className="font-jp text-[3rem] font-extralight leading-none tracking-[0.16em] text-washi sm:text-7xl md:text-8xl lg:text-9xl">
              KAKARLA
            </h1>
            <div className="absolute -right-7 -top-2 md:-right-12 md:-top-3">
              <HankoSeal size="sm" label="KAKARLA" subLabel="印" />
            </div>
          </div>
          <p className="mt-2 text-xs tracking-[0.35em] text-gold/90 font-medium uppercase sm:text-sm">
            KAKARLA HARI CHARAN
          </p>
          <p lang="ja" className="mt-1 font-jp text-sm tracking-[0.5em] text-ash md:text-base">
            カカルラ・ハリ・チャラン
          </p>
        </motion.div>

        {/* Subtitle & Persona */}
        <motion.div {...rise(0.55)} className="mt-6 flex flex-col items-center gap-1.5 text-[10px] tracking-[0.4em] text-ash md:text-[11px]">
          <span className="text-washi/85 font-medium">COMPUTER SCIENCE STUDENT</span>
          <span>DEVELOPER • BUILDER • CREATOR</span>
        </motion.div>

        {/* Bushido Motto */}
        <motion.blockquote {...rise(0.7)} className="mt-6 font-jp text-lg font-light italic leading-relaxed text-washi/90 md:text-2xl">
          “Code with discipline.
          <br />
          Build with purpose.”
        </motion.blockquote>

        {/* CTA Buttons */}
        <motion.div {...rise(0.85)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            id="cta-enter-dojo"
            type="button"
            className="btn-blade"
            onMouseEnter={() => setReady(true)}
            onMouseLeave={() => setReady(false)}
            onFocus={() => setReady(true)}
            onBlur={() => setReady(false)}
            onClick={onEnter}
            disabled={slashing}
          >
            Enter Dojo <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
          </button>

          <a
            id="cta-view-battles"
            href="#projects"
            className="btn-blade btn-ghost justify-center"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('projects');
            }}
          >
            View My Battles
          </a>

          {/* Japanese scroll/seal-inspired Download Resume button */}
          <a
            id="cta-download-resume"
            href={SITE.resume}
            download="Kakarla_Hari_Charan_Resume.pdf"
            className="jp-frame group relative inline-flex items-center gap-2.5 overflow-hidden bg-[#14100e]/90 px-6 py-[0.88rem] text-[10px] tracking-[0.3em] uppercase text-washi transition-all duration-300 hover:border-gold hover:bg-[#201712] hover:shadow-[0_0_18px_rgba(201,162,39,0.3)]"
          >
            <span className="absolute -left-1 top-1/2 h-3.5 w-1.5 -translate-y-1/2 rounded-[1px] bg-gold/80" />
            <FileText size={13} className="text-gold transition-transform group-hover:scale-110" />
            <span>Download Resume</span>
            <span className="absolute -right-1 top-1/2 h-3.5 w-1.5 -translate-y-1/2 rounded-[1px] bg-gold/80" />
          </a>
        </motion.div>

        {/* Hero Social Links */}
        <motion.div {...rise(1.0)} className="mt-6 flex items-center gap-6 text-xs text-ash">
          <a
            id="hero-github-link"
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[10px] tracking-[0.25em] text-ash transition-colors hover:text-gold uppercase"
          >
            <GithubIcon width={14} height={14} className="transition-transform group-hover:scale-110" />
            <span>Visit GitHub</span>
          </a>
          <span className="h-3 w-px bg-gold/30" aria-hidden />
          <a
            id="hero-linkedin-link"
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[10px] tracking-[0.25em] text-ash transition-colors hover:text-gold uppercase"
          >
            <LinkedinIcon width={14} height={14} className="transition-transform group-hover:scale-110" />
            <span>Connect on LinkedIn</span>
          </a>
        </motion.div>
      </motion.div>

      {/* The katana */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-[6%] z-[5] flex justify-center transition-opacity duration-200 md:bottom-[7%] ${
          slashing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`w-[94vw] max-w-[1100px] -rotate-[4deg] ${interactive ? '' : 'float-slow'}`}>
          <Katana mx={interactive ? mx : undefined} my={interactive ? my : undefined} ready={ready} />
        </div>
      </div>

      {/* scroll cue */}
      <motion.div {...rise(1.6)} className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden>
        <span className="text-[9px] tracking-[0.5em] text-ash/60">SCROLL</span>
        <span className="relative h-9 w-px overflow-hidden bg-washi/10">
          <span className="scroll-line absolute inset-0 bg-gold/70" />
        </span>
      </motion.div>
    </section>
  );
}
