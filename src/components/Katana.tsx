import { useId, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { EASE_BLADE } from '../animations/animations';

interface KatanaProps {
  /** Normalised pointer position (-1..1). Omit for a static katana. */
  mx?: MotionValue<number>;
  my?: MotionValue<number>;
  /** "Ready stance" — drawn back slightly, blade glints. */
  ready?: boolean;
  /** Play the unsheathing reveal on mount. */
  intro?: boolean;
  className?: string;
}

/** Build a wavy hamon (temper line) that follows the cutting edge. */
function buildHamon(): string {
  let d = '';
  for (let x = 266, i = 0; x <= 930; x += 16, i++) {
    const t = (x - 262) / (930 - 262);
    const base = 43.5 - t * t * 11; // follows the blade's curvature (sori)
    const y = base - (i % 2 === 0 ? 1.6 : -0.6) * (1 - t * 0.5);
    d += i === 0 ? `M${x},${y.toFixed(2)}` : ` Q${x - 8},${(y - 2.2).toFixed(2)} ${x},${y.toFixed(2)}`;
  }
  return d;
}

const BLADE_PATH =
  'M262,33 C520,31 790,25 958,12 L997,6 C986,17 972,25 952,29.5 C780,42 520,46.5 262,47 Z';

/**
 * SVG katana, hand-built — tsuka (handle), tsuba (guard), habaki and a curved blade
 * with hamon, shinogi ridge and a pointer-driven metallic sheen.
 */
export default function Katana({ mx, my, ready = false, intro = true, className = '' }: KatanaProps) {
  const uid = useId().replace(/:/g, '');
  const zero = useMotionValue(0);
  const sx = useSpring(mx ?? zero, { stiffness: 55, damping: 18 });
  const sy = useSpring(my ?? zero, { stiffness: 55, damping: 18 });
  const rotate = useTransform(sx, (v) => v * 2.5);
  const x = useTransform(sx, (v) => v * 18);
  const y = useTransform(sy, (v) => v * 12);
  const sheenX = useTransform(sx, [-1, 1], [250, 820]);
  const hamon = useMemo(buildHamon, []);
  const id = (n: string) => `${n}-${uid}`;

  return (
    <motion.div className={className} style={mx ? { rotate, x, y } : undefined} aria-hidden="true">
      <motion.div
        animate={ready ? { x: -26, rotate: -2.2 } : { x: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 15 }}
      >
        <motion.div
          initial={intro ? { clipPath: 'inset(0 100% 0 0)' } : false}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.6, delay: 0.6, ease: EASE_BLADE }}
        >
          <svg viewBox="0 0 1000 80" className="block h-auto w-full overflow-visible">
            <defs>
              <linearGradient id={id('blade')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f4f2ec" />
                <stop offset="0.3" stopColor="#b6b9bf" />
                <stop offset="0.52" stopColor="#5d6168" />
                <stop offset="0.72" stopColor="#c8cbd1" />
                <stop offset="1" stopColor="#3a3d43" />
              </linearGradient>
              <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={id('gold')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e6c65a" />
                <stop offset="0.5" stopColor="#c9a227" />
                <stop offset="1" stopColor="#6e5512" />
              </linearGradient>
              <linearGradient id={id('tsuba')} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2a2420" />
                <stop offset="1" stopColor="#0c0a09" />
              </linearGradient>
              <pattern id={id('ito')} width="20" height="18" patternUnits="userSpaceOnUse" y="31">
                <rect width="20" height="18" fill="#0d0b0b" />
                <path d="M0,4 L4,9 L0,14 L-4,9Z M20,4 L24,9 L20,14 L16,9Z" fill="#d9d0bf" opacity="0.55" />
                <path d="M2,0 L10,9 L2,18 M18,0 L10,9 L18,18" stroke="#3a0d10" strokeWidth="4.5" fill="none" />
                <path d="M2,0 L10,9 L2,18 M18,0 L10,9 L18,18" stroke="#000" strokeOpacity="0.5" strokeWidth="1" fill="none" />
              </pattern>
              <clipPath id={id('clip')}>
                <path d={BLADE_PATH} />
              </clipPath>
              <filter id={id('glow')} x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* ground shadow + faint crimson aura */}
            <ellipse cx="520" cy="66" rx="460" ry="5" fill="#000" opacity="0.6" filter={`url(#${id('glow')})`} />
            <path d={BLADE_PATH} fill="#a31621" opacity={ready ? 0.35 : 0.14} filter={`url(#${id('glow')})`} style={{ transition: 'opacity .5s' }} />

            {/* Blade */}
            <path d={BLADE_PATH} fill={`url(#${id('blade')})`} />
            <g clipPath={`url(#${id('clip')})`}>
              <path d={hamon + ' L930,60 L266,60 Z'} fill="#f3ebdd" opacity="0.22" />
              <path d={hamon} stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
              <path d="M262,37.5 C520,36 790,29.5 952,18" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.7" fill="none" />
              {/* pointer-driven sheen */}
              <motion.rect
                y="0"
                width="160"
                height="80"
                x={-80}
                fill={`url(#${id('sheen')})`}
                style={{ x: sheenX, opacity: ready ? 0.9 : 0.45 }}
              />
              {/* ambient glint */}
              <rect className="katana-sheen" x="0" y="0" width="70" height="80" fill={`url(#${id('sheen')})`} opacity="0.5" />
            </g>
            <path d={BLADE_PATH} fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.5" />

            {/* Habaki (collar) */}
            <path d="M250,30 L266,31.5 L266,48.5 L250,50 Z" fill={`url(#${id('gold')})`} />
            {/* Seppa + Tsuba (guard) */}
            <rect x="247" y="22" width="3" height="36" fill="#7a6420" />
            <rect x="233" y="12" width="13" height="56" rx="4" fill={`url(#${id('tsuba')})`} stroke="#c9a227" strokeOpacity="0.55" strokeWidth="0.8" />
            <circle cx="239.5" cy="20" r="1.4" fill="#c9a227" opacity="0.7" />
            <circle cx="239.5" cy="60" r="1.4" fill="#c9a227" opacity="0.7" />
            <rect x="229" y="22" width="3" height="36" fill="#7a6420" />

            {/* Tsuka (handle) */}
            <path d="M50,31 L229,30 L229,50 L50,49 Z" fill={`url(#${id('ito')})`} />
            <path d="M50,31 L229,30" stroke="#c9a227" strokeOpacity="0.25" strokeWidth="0.6" />
            {/* Menuki ornament */}
            <ellipse cx="148" cy="40" rx="9" ry="3.2" fill={`url(#${id('gold')})`} opacity="0.85" />
            {/* Fuchi + Kashira (pommel) */}
            <rect x="222" y="29" width="7" height="22" fill={`url(#${id('gold')})`} opacity="0.75" />
            <path d="M34,30 Q30,40 34,50 L52,49.5 L52,30.5 Z" fill={`url(#${id('gold')})`} />
            {/* Sageo tassel – the one crimson accent */}
            <path d="M36,50 C34,62 42,70 38,78" stroke="#7a0c0c" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
