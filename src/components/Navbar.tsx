import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '../data/site';
import { EASE_BLADE, scrollToId } from '../animations/animations';
import HankoSeal from './HankoSeal';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled && !open ? 'border-gold/15 bg-ink/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.7)]' : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <a id="nav-logo" href="#home" onClick={go('home')} className="group flex flex-col leading-none">
            <span className="font-jp text-[13px] tracking-[0.35em] text-washi font-medium">KAKARLA</span>
            <span className="mt-1 font-jp text-[10px] tracking-[0.25em] text-ash transition-colors group-hover:text-gold">
              Kakarla Hari Charan
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  id={`nav-${l.id}`}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={`relative py-2 text-[11px] tracking-[0.28em] transition-colors duration-300 ${
                    active === l.id ? 'text-washi' : 'text-ash hover:text-washi'
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-0 right-[0.28em] h-px bg-crimson" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            id="nav-menu-toggle"
            className="-mr-2 p-2 text-washi transition-transform hover:scale-105 active:scale-95 md:hidden"
            aria-label={open ? 'Close slidebar' : 'Open slidebar'}
            aria-expanded={open}
            aria-controls="mobile-slidebar"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} strokeWidth={1.5} className="text-gold" /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Themed Samurai Slidebar (Mobile Drawer Menu) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/80 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-slidebar"
              className="washi fixed inset-y-0 right-0 z-50 flex w-full max-w-[340px] flex-col justify-between overflow-y-auto border-l border-gold/30 bg-[#0d0b0a] p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE_BLADE }}
            >
              {/* Giant faint calligraphy in background */}
              <span
                lang="ja"
                className="vertical-jp pointer-events-none absolute right-4 top-16 select-none font-jp text-[8rem] leading-none text-washi/[0.03]"
                aria-hidden
              >
                武士道
              </span>

              {/* Slidebar Header with KAKARLA Hanko Seal */}
              <div>
                <div className="flex items-center justify-between border-b border-gold/15 pb-6">
                  <div className="flex items-center gap-3">
                    <HankoSeal size="sm" label="KAKARLA" subLabel="印" />
                    <div>
                      <p className="font-jp text-sm tracking-[0.25em] text-washi font-medium">KAKARLA</p>
                      <p className="text-[9px] tracking-[0.2em] text-ash">Kakarla Hari Charan</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close slidebar"
                    className="p-1.5 text-ash transition-colors hover:text-gold"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Katana golden line */}
                <div className="h-px w-full bg-gradient-to-r from-crimson via-gold/40 to-transparent" />

                {/* Nav Links */}
                <ul className="mt-8 space-y-4">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04, duration: 0.4 }}
                    >
                      <a
                        href={`#${l.id}`}
                        onClick={go(l.id)}
                        className={`group flex items-center justify-between rounded-sm border px-4 py-2.5 transition-all ${
                          active === l.id
                            ? 'border-crimson/60 bg-crimson/10 text-washi shadow-[0_0_12px_rgba(163,22,33,0.3)]'
                            : 'border-transparent text-ash hover:border-gold/20 hover:bg-washi/[0.02] hover:text-washi'
                        }`}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="w-6 font-jp text-sm text-crimson group-hover:text-gold transition-colors">
                            {l.kanji}
                          </span>
                          <span className="font-jp text-base tracking-[0.2em]">
                            {l.label}
                          </span>
                        </div>
                        {active === l.id && (
                          <span className="h-1.5 w-1.5 rotate-45 bg-crimson shadow-[0_0_6px_#a31621]" />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Slidebar Footer */}
              <div className="border-t border-gold/15 pt-6">
                <p className="text-[9px] tracking-[0.3em] text-gold/70 font-mono uppercase">
                  CODE • CREATE • EVOLVE
                </p>
                <div className="mt-4 flex items-center gap-5">
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[10px] tracking-wider text-ash transition-colors hover:text-gold"
                  >
                    <GithubIcon width={14} height={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[10px] tracking-wider text-ash transition-colors hover:text-gold"
                  >
                    <LinkedinIcon width={14} height={14} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
