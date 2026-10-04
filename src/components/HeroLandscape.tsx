import { motion, useTransform, type MotionValue } from 'framer-motion';

interface Props {
  mx: MotionValue<number>;
}

/** Layered night landscape: red moon, mountains, pagoda, torii. Pure SVG, parallax by layer. */
export default function HeroLandscape({ mx }: Props) {
  const far = useTransform(mx, (v) => v * -6);
  const mid = useTransform(mx, (v) => v * -14);
  const near = useTransform(mx, (v) => v * -26);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_30%,#1a0c0c_0%,#0b0909_45%,#080808_80%)]" />

      {/* moon */}
      <motion.div style={{ x: far }} className="absolute left-1/2 top-[14%] h-[34vmin] w-[34vmin] md:left-[66%] md:top-[12%]">
        <div className="absolute -inset-1/2 rounded-full bg-[radial-gradient(circle,rgba(163,22,33,0.22),transparent_60%)]" />
        <div className="h-full w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#b0242c_0%,#7a0c0c_55%,#3d0608_100%)] opacity-80 md:translate-x-0" />
      </motion.div>

      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <motion.g style={{ x: far }}>
          <path
            d="M-40,620 L120,560 L260,600 L420,470 L560,560 L700,520 L860,400 L980,500 L1100,460 L1260,540 L1400,480 L1640,560 L1640,900 L-40,900Z"
            fill="#141011"
          />
        </motion.g>
        <motion.g style={{ x: mid }}>
          <path
            d="M-60,700 L180,640 L320,680 L520,600 L700,690 L900,620 L1080,680 L1240,590 L1420,660 L1660,630 L1660,900 L-60,900Z"
            fill="#0d0b0b"
          />
          {/* pagoda on the ridge */}
          <g transform="translate(1240 594)" fill="#0d0b0b">
            <rect x="-11" y="-78" width="22" height="78" />
            {[-12, -36, -58, -76].map((yy, i) => {
              const w = 30 - i * 4;
              return <path key={yy} d={`M${-w},${yy} Q${-w / 2},${yy - 3} ${-w / 2 + 3},${yy - 8} L${w / 2 - 3},${yy - 8} Q${w / 2},${yy - 3} ${w},${yy} Z`} />;
            })}
            <rect x="-1" y="-104" width="2" height="22" />
            <rect x="-2" y="-40" width="4" height="5" fill="#c9a227" opacity="0.55" />
          </g>
        </motion.g>
        <motion.g style={{ x: near }}>
          <path d="M-80,830 Q400,790 800,832 T1680,812 L1680,900 L-80,900Z" fill="#050505" />
          {/* torii */}
          <g transform="translate(250 840)" fill="#040404">
            <rect x="-92" y="-330" width="17" height="330" />
            <rect x="75" y="-330" width="17" height="330" />
            <path d="M-148,-352 Q0,-330 148,-352 L142,-330 Q0,-314 -142,-330 Z" />
            <rect x="-122" y="-330" width="244" height="13" />
            <rect x="-112" y="-282" width="224" height="11" />
            <rect x="-7" y="-318" width="14" height="36" />
          </g>
        </motion.g>
      </svg>

      {/* fog */}
      <div className="fog-layer absolute -inset-x-1/4 bottom-[12%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(243,235,221,0.06),transparent_65%)] blur-2xl" />
      <div className="fog-layer-slow absolute -inset-x-1/4 bottom-0 h-[25%] bg-[radial-gradient(ellipse_at_30%_80%,rgba(243,235,221,0.05),transparent_60%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
