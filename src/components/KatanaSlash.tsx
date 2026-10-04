import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface KatanaSlashProps {
  active: boolean;
  /** Called at the moment the screen is fully covered — navigate here. */
  onCut: () => void;
  onDone: () => void;
}

/**
 * Cinematic "Enter Dojo" transition:
 * darken → blade crosses → slash line + flash → screen splits apart onto the next section.
 */
export default function KatanaSlash({ active, onCut, onDone }: KatanaSlashProps) {
  const root = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const blade = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const cbs = useRef({ onCut, onDone });
  cbs.current = { onCut, onDone };

  useLayoutEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => cbs.current.onDone() });
      tl.set(root.current, { display: 'block' })
        .set([top.current, bottom.current], { yPercent: 0, opacity: 0 })
        .set(line.current, { scaleX: 0, opacity: 1 })
        .set(blade.current, { x: 0, opacity: 1 })
        .fromTo(dark.current, { opacity: 0 }, { opacity: 0.88, duration: 0.22, ease: 'power2.out' })
        .to(blade.current, { x: '190vw', duration: 0.34, ease: 'power4.in' })
        .to(line.current, { scaleX: 1, duration: 0.2, ease: 'expo.out' }, '-=0.16')
        .fromTo(flash.current, { opacity: 0 }, { opacity: 0.35, duration: 0.05 }, '<')
        .to(flash.current, { opacity: 0, duration: 0.35 })
        .set([top.current, bottom.current], { opacity: 1 }, '<')
        .call(() => cbs.current.onCut())
        .set(dark.current, { opacity: 0 })
        .to(top.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '+=0.08')
        .to(bottom.current, { yPercent: 100, duration: 0.8, ease: 'expo.inOut' }, '<')
        .to(line.current, { opacity: 0, duration: 0.4 }, '<0.1')
        .set(root.current, { display: 'none' });
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[80] hidden overflow-hidden" aria-hidden="true">
      <div ref={dark} className="absolute inset-0 bg-ink opacity-0" />
      {/* rotated stage so the cut is diagonal */}
      <div className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]">
        <div ref={top} className="absolute inset-x-0 top-0 h-1/2 bg-ink opacity-0">
          <div className="absolute inset-x-0 bottom-0 h-px bg-crimson/70 shadow-[0_0_24px_4px_rgba(163,22,33,0.5)]" />
        </div>
        <div ref={bottom} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink opacity-0">
          <div className="absolute inset-x-0 top-0 h-px bg-crimson/70 shadow-[0_0_24px_4px_rgba(163,22,33,0.5)]" />
        </div>
        <div
          ref={line}
          className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 bg-gradient-to-r from-transparent via-washi to-transparent shadow-[0_0_30px_6px_rgba(243,235,221,0.45)]"
        />
        <div ref={blade} className="absolute top-1/2 -left-[70vw] h-[6px] w-[60vw] -translate-y-1/2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#c8cbd1] to-white [clip-path:polygon(0_30%,96%_0,100%_50%,96%_100%,0_70%)]" />
        </div>
      </div>
      <div ref={flash} className="absolute inset-0 bg-washi opacity-0" />
    </div>
  );
}
