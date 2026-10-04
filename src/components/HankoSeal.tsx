import { motion } from 'framer-motion';

interface HankoSealProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  subLabel?: string;
}

/**
 * Traditional Japanese red seal / Hanko (判子 / 落款印).
 * Vermilion cinnabar ink with distressed border, authentic seal frame, and KAKARLA inscription.
 */
export default function HankoSeal({
  className = '',
  size = 'md',
  label = 'KAKARLA',
  subLabel = '印',
}: HankoSealProps) {
  const dimensions = {
    sm: 'w-10 h-10 text-[7px]',
    md: 'w-14 h-14 text-[9px]',
    lg: 'w-20 h-20 text-[12px]',
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`relative inline-flex select-none items-center justify-center p-[2px] ${dimensions} ${className}`}
      title="KAKARLA Japanese Seal (落款印)"
      aria-label="KAKARLA Hanko Seal"
    >
      {/* Outer weathered stamp border */}
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[3px] border-2 border-[#b82329] bg-[#871115]/35 p-1 shadow-[0_0_14px_rgba(184,35,41,0.4),inset_0_0_8px_rgba(184,35,41,0.35)] backdrop-blur-[1px]">
        {/* Inner seal border */}
        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[1px] border border-[#d6343b]/80 px-1 py-0.5">
          {/* Weathered stamp texture dots */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 0.75px, transparent 0.75px)',
              backgroundSize: '4px 4px',
            }}
          />

          <span
            lang="ja"
            className="font-jp text-[8px] font-bold leading-none tracking-widest text-[#f5c6c8]"
            style={{ textShadow: '0 0 2px #ff4d4f' }}
          >
            {subLabel}
          </span>
          <span
            className="font-jp font-bold tracking-[0.18em] text-[#ffdede]"
            style={{
              letterSpacing: '0.12em',
              textShadow: '0 0 3px rgba(255, 120, 120, 0.6)',
              writingMode: size === 'lg' ? 'horizontal-tb' : 'horizontal-tb',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
