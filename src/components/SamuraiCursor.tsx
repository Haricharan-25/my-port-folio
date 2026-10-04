import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouch } from '../animations/animations';

type Variant = 'default' | 'hover' | 'katana';
interface Ink {
  id: number;
  x: number;
  y: number;
}

const RING_SIZE: Record<Variant, number> = { default: 32, hover: 54, katana: 70 };

/** Glowing point + ring cursor with ink splash on click. Disabled on touch devices. */
export default function SamuraiCursor() {
  const isTouch = useIsTouch();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [variant, setVariant] = useState<Variant>('default');
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const [inks, setInks] = useState<Ink[]>([]);
  const visibleRef = useRef(false);
  const inkId = useRef(0);

  useEffect(() => {
    if (isTouch) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.('a, button, input, textarea, select, [data-cursor]');
      if (!t) return setVariant('default');
      setVariant(t.getAttribute('data-cursor') === 'katana' ? 'katana' : 'hover');
    };
    const pDown = (e: PointerEvent) => {
      setDown(true);
      const id = ++inkId.current;
      setInks((s) => [...s.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setInks((s) => s.filter((i) => i.id !== id)), 800);
    };
    const pUp = () => setDown(false);
    const leave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', pDown);
    window.addEventListener('pointerup', pUp);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', pDown);
      window.removeEventListener('pointerup', pUp);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;
  const size = RING_SIZE[variant];

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <AnimatePresence>
        {inks.map((ink) => (
          <motion.svg
            key={ink.id}
            viewBox="0 0 100 100"
            className="absolute h-14 w-14"
            style={{ left: ink.x - 28, top: ink.y - 28 }}
            initial={{ scale: 0.2, opacity: 0.55, rotate: ink.id * 47 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d="M50 10c12 0 17 9 27 13s17 13 13 25-1 21-13 28-21 15-34 9S21 75 13 63 3 41 11 29 38 10 50 10z"
              fill="#7a0c0c"
            />
            <circle cx="88" cy="20" r="3" fill="#7a0c0c" />
            <circle cx="14" cy="86" r="2" fill="#7a0c0c" />
          </motion.svg>
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: down ? 0.8 : 1,
          borderColor: variant === 'default' ? 'rgba(201,162,39,0.35)' : 'rgba(201,162,39,0.8)',
          backgroundColor: variant === 'default' ? 'rgba(0,0,0,0)' : 'rgba(122,12,12,0.08)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {variant === 'katana' && (
            <motion.span
              className="block h-px w-10 -rotate-45 bg-gradient-to-r from-transparent via-washi to-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-crimson shadow-[0_0_12px_3px_rgba(163,22,33,0.7)]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: variant === 'default' ? 1 : 0.6 }}
      />
    </div>
  );
}
