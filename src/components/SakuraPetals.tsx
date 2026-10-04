import { useMemo } from 'react';

/** A few CSS-animated sakura petals. Intentionally sparse. */
export default function SakuraPetals({ count = 8 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: 10 + ((i * 37) % 95),
        delay: (i * 2.7) % 14,
        duration: 14 + ((i * 5) % 10),
        size: 7 + ((i * 3) % 6),
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite, petal-sway ${p.duration / 3}s ease-in-out infinite`,
            opacity: 0,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <path d="M10 1 C15 5 17 11 10 19 C3 11 5 5 10 1 Z M10 1 L10 5" fill="#c97b84" fillOpacity="0.55" />
          </svg>
        </span>
      ))}
    </div>
  );
}
