import { useMemo } from 'react';
import { useIsDesktop, usePrefersReducedMotion } from '../animations/animations';

/**
 * Global atmospheric particles that float across all pages and sections:
 * - Traditional Japanese Sakura Petals gently falling
 * - Golden & Crimson Embers rising from the samurai forge
 */
export default function GlobalParticles() {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  const petalCount = isDesktop ? 14 : 7;
  const emberCount = isDesktop ? 22 : 10;

  const petals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => ({
        id: `petal-${i}`,
        left: 5 + ((i * 31 + 17) % 90),
        delay: (i * 2.1) % 15,
        duration: 13 + ((i * 3.7) % 10),
        size: 8 + ((i * 3) % 7),
        opacity: 0.45 + ((i * 7) % 35) / 100,
      })),
    [petalCount],
  );

  const embers = useMemo(
    () =>
      Array.from({ length: emberCount }, (_, i) => ({
        id: `ember-${i}`,
        left: 3 + ((i * 43 + 23) % 94),
        delay: (i * 1.8) % 12,
        duration: 9 + ((i * 4.2) % 8),
        size: 2.5 + ((i * 2) % 3.5),
        color: i % 3 === 0 ? '#A31621' : i % 3 === 1 ? '#C9A227' : '#F3EBDD',
        glow: i % 2 === 0 ? 'rgba(201, 162, 39, 0.7)' : 'rgba(163, 22, 33, 0.7)',
      })),
    [emberCount],
  );

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[28] overflow-hidden"
      aria-hidden="true"
    >
      {/* Falling Sakura Petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${p.left}%`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite, petal-sway ${p.duration / 3.2}s ease-in-out infinite`,
            opacity: 0,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <path
              d="M10 1 C15 5 17 11 10 19 C3 11 5 5 10 1 Z M10 1 L10 5"
              fill="#d47983"
              fillOpacity={p.opacity}
            />
          </svg>
        </span>
      ))}

      {/* Rising Samurai Embers / Golden Sparks */}
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 will-change-transform rounded-full"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            backgroundColor: e.color,
            boxShadow: `0 0 8px 2px ${e.glow}`,
            animation: `ember-rise ${e.duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${e.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
