import { motion } from 'framer-motion';
import { EASE_BLADE, EASE_OUT } from '../animations/animations';

export type TransitionVariant = 'brush' | 'slash' | 'fog' | 'wipe' | 'ink';

const vp = { once: true, amount: 0.6 } as const;

/** Decorative ink / blade dividers between sections — each variant is distinct. */
export default function SectionTransition({ variant }: { variant: TransitionVariant }) {
  return (
    <div aria-hidden="true" className="relative h-28 overflow-hidden md:h-40">
      {variant === 'brush' && (
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <filter id="brush-rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.9" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="9" />
            </filter>
          </defs>
          <motion.path
            d="M-20,72 C200,44 380,92 600,62 S1000,42 1220,66"
            stroke="#7A0C0C"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            filter="url(#brush-rough)"
            initial={{ pathLength: 0, opacity: 0.2 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={vp}
            transition={{ duration: 1.6, ease: EASE_OUT }}
          />
          <motion.path
            d="M200,80 C420,70 700,88 1000,74"
            stroke="#C9A227"
            strokeOpacity="0.4"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={vp}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE_OUT }}
          />
        </svg>
      )}

      {variant === 'slash' && (
        <motion.div
          className="absolute left-[-10%] top-1/2 h-px w-[120%] origin-left -rotate-[3deg] bg-gradient-to-r from-transparent via-washi/80 to-transparent shadow-[0_0_18px_2px_rgba(163,22,33,0.5)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, ease: EASE_BLADE }}
        />
      )}

      {variant === 'fog' && (
        <>
          <motion.div
            className="fog-layer absolute -inset-x-1/4 inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(243,235,221,0.06),transparent_60%)] blur-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 2 }}
          />
          <motion.span
            className="absolute inset-0 flex items-center justify-center font-jp text-xs tracking-[1em] text-ash/40"
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '1em' }}
            viewport={vp}
            transition={{ duration: 2, ease: EASE_OUT }}
          >
            霧
          </motion.span>
        </>
      )}

      {variant === 'wipe' && (
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-24">
          <motion.div
            className="washi h-10 origin-left border-y border-gold/15 bg-washi/[0.025]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={vp}
            transition={{ duration: 1.1, ease: EASE_BLADE }}
          />
        </div>
      )}

      {variant === 'ink' && (
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 md:h-56 md:w-56"
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={vp}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <circle cx="100" cy="100" r="62" fill="none" stroke="#7A0C0C" strokeWidth="5" strokeDasharray="330 60" strokeLinecap="round" opacity="0.8" />
          <circle cx="100" cy="100" r="3" fill="#C9A227" />
        </motion.svg>
      )}
    </div>
  );
}
