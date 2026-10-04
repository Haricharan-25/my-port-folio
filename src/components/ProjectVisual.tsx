import type { ProjectVisualKind } from '../data/projects';

const G = '#C9A227';
const R = '#A31621';
const W = '#F3EBDD';

function Invoice() {
  const qr: JSX.Element[] = [];
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if ((i * 7 + j * 13 + i * j) % 5 < 2 || (i < 3 && j < 3) || (i < 3 && j > 5) || (i > 5 && j < 3))
        qr.push(<rect key={`${i}-${j}`} x={400 + j * 9} y={230 + i * 9} width="8" height="8" fill={W} opacity="0.75" />);
  return (
    <g>
      <rect x="150" y="60" width="300" height="290" fill="#121110" stroke={G} strokeOpacity="0.35" />
      <rect x="170" y="85" width="120" height="8" fill={W} opacity="0.8" />
      <rect x="170" y="100" width="70" height="5" fill={W} opacity="0.3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="170" y={140 + i * 22} width={140 - (i % 3) * 25} height="4" fill={W} opacity="0.35" />
          <rect x="380" y={140 + i * 22} width="50" height="4" fill={W} opacity="0.35" />
        </g>
      ))}
      <line x1="170" y1="255" x2="430" y2="255" stroke={G} strokeOpacity="0.4" />
      <rect x="170" y="270" width="80" height="7" fill={G} opacity="0.8" />
      {qr}
      <g transform="translate(330 300) rotate(-14)">
        <circle r="34" fill="none" stroke={R} strokeWidth="3" opacity="0.85" />
        <text textAnchor="middle" dy="11" fontSize="30" fill={R} fontFamily="Noto Serif JP">済</text>
      </g>
    </g>
  );
}

function Attendance() {
  const cells: JSX.Element[] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 7; c++) {
      const v = (r * 7 + c * 3) % 9;
      const fill = v === 0 ? R : v < 6 ? G : '#222';
      cells.push(<rect key={`${r}-${c}`} x={120 + c * 34} y={90 + r * 34} width="28" height="28" fill={fill} opacity={v < 6 && v !== 0 ? 0.25 + v * 0.08 : 0.8} />);
    }
  return (
    <g>
      {cells}
      <polyline points="400,250 430,210 460,225 490,170 520,185 550,130" fill="none" stroke={W} strokeOpacity="0.7" strokeWidth="1.5" />
      {[[430, 210], [490, 170], [550, 130]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.5" fill={G} />
      ))}
      <line x1="400" y1="280" x2="560" y2="280" stroke={G} strokeOpacity="0.3" />
      <path d="M420,320 L540,300 L470,340 L460,330 Z" fill="none" stroke={W} strokeOpacity="0.5" />
    </g>
  );
}

function Depth() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * -55})`} opacity={1 - i * 0.2}>
          <path d="M150,280 L300,220 L450,280 L300,340 Z" fill="#141210" stroke={i === 2 ? R : G} strokeOpacity={i === 2 ? 0.9 : 0.4} />
        </g>
      ))}
      {[[230, 160], [300, 140], [370, 170], [260, 225], [340, 220], [300, 290]].map(([x, y], i, a) => (
        <g key={i}>
          {i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke={W} strokeOpacity="0.3" />}
          <circle cx={x} cy={y} r="4" fill={i === 1 ? R : W} opacity="0.85" />
        </g>
      ))}
    </g>
  );
}

function Yatra() {
  return (
    <g>
      <image href="/images/yatraai.jpg" x="0" y="0" width="600" height="400" preserveAspectRatio="xMidYMid slice" />
      {/* Cinematic dark vignette */}
      <rect width="600" height="400" fill="url(#yatra-vignette)" opacity="0.75" />
      {/* Japanese stamp overlay */}
      <g transform="translate(520, 50)">
        <rect x="-24" y="-24" width="48" height="48" rx="2" fill="none" stroke={R} strokeWidth="2" opacity="0.85" />
        <text textAnchor="middle" dy="8" fontSize="24" fill={R} fontFamily="Noto Serif JP" fontWeight="bold">旅</text>
      </g>
      {/* Telemetry crosshair */}
      <circle cx="80" cy="340" r="16" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="80" y1="316" x2="80" y2="364" stroke={G} strokeOpacity="0.4" />
      <line x1="56" y1="340" x2="104" y2="340" stroke={G} strokeOpacity="0.4" />
      <text x="110" y="344" fontSize="10" fill={W} fontFamily="monospace" letterSpacing="2" opacity="0.8">
        AI_ROUTING // N 35° 28' E 138° 42'
      </text>
    </g>
  );
}

const MAP: Record<ProjectVisualKind, () => JSX.Element> = {
  invoice: Invoice,
  attendance: Attendance,
  depth: Depth,
  yatra: Yatra,
};

/** Abstract SVG / Image preview per project */
export default function ProjectVisual({ kind, title }: { kind: ProjectVisualKind; title: string }) {
  const Art = MAP[kind] || Yatra;
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full object-cover" role="img" aria-label={`Visual preview of ${title}`}>
      <defs>
        <radialGradient id="yatra-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="30%" stopColor="#080808" stopOpacity="0.1" />
          <stop offset="90%" stopColor="#080808" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="#0c0b0b" />
      <g stroke={W} strokeOpacity="0.03">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="400" />
        ))}
      </g>
      <Art />
    </svg>
  );
}
