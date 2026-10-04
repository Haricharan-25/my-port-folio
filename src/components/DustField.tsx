import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const [positions, speeds] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
      s[i] = 0.04 + Math.random() * 0.12;
    }
    return [p, s];
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.0015;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    attr.needsUpdate = true;
    pts.rotation.y = Math.sin(t * 0.05) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C9A227"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Lightweight floating dust — desktop only, paused when off-screen. */
export default function DustField({ active }: { active: boolean }) {
  return (
    <Canvas
      className="!pointer-events-none !absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Dust count={180} />
    </Canvas>
  );
}
