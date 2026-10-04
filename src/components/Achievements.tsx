import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { VICTORIES, type VictoryMetric } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../animations/animations';

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(frame);
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [inView, target]);

  return <span ref={ref}>{count < 10 ? `0${count}` : count}</span>;
}

function VictoryCard({ metric, index }: { metric: VictoryMetric; index: number }) {
  return (
    <motion.li
      variants={fadeUp}
      className="group relative flex flex-col justify-between border-b border-r border-gold/15 bg-[#120f0d]/50 p-8 transition-all duration-500 hover:border-crimson/50 hover:bg-[#181311] hover:shadow-[0_0_20px_rgba(163,22,33,0.15)]"
    >
      {/* Top corner Japanese kanji numeral & index */}
      <div className="flex items-center justify-between">
        <span
          lang="ja"
          aria-hidden
          className="font-jp text-4xl font-light text-crimson/80 transition-colors duration-500 group-hover:text-crimson md:text-5xl"
        >
          {metric.kanji}
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold/60">
          RANK // 0{index + 1}
        </span>
      </div>

      {/* Category Name */}
      <div className="mt-8">
        <h3 className="font-jp text-xs tracking-[0.35em] text-washi/90 uppercase transition-colors group-hover:text-washi">
          {metric.category}
        </h3>
        <p className="mt-1 text-[10px] tracking-[0.25em] text-ash">
          HONORABLE MILESTONES
        </p>
      </div>

      {/* Large Typography Animated Number Counter */}
      <div className="mt-8 flex items-baseline justify-between border-t border-gold/10 pt-4">
        <div className="font-jp text-5xl font-extralight tracking-tight text-washi group-hover:text-gold transition-colors md:text-6xl">
          <AnimatedCounter target={metric.count} />
        </div>
        <span className="font-jp text-xs tracking-[0.3em] text-ash/60">
          RECORDED
        </span>
      </div>

      {/* Bottom golden line indicator on hover */}
      <span
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-crimson via-gold to-transparent transition-all duration-700 group-hover:w-full"
        aria-hidden
      />
    </motion.li>
  );
}

/**
 * 勝 SHŌ — VICTORIES section.
 * Prominently displays required totals:
 * Hackathons = 4, Projects = 6, Competitions = 2, Certifications = 4.
 * Uses Japanese-inspired numbering and animated counters.
 */
export default function Achievements() {
  return (
    <section id="victories" aria-labelledby="victories-title" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex items-end gap-6 border-b border-gold/10 pb-8">
          <span lang="ja" aria-hidden className="font-jp text-6xl font-light leading-none text-crimson md:text-7xl">
            勝
          </span>
          <div>
            <p className="text-[10px] tracking-[0.5em] text-gold/80 uppercase font-mono">SHŌ // TRIUMPHS</p>
            <h2 id="victories-title" className="mt-2 font-jp text-2xl tracking-[0.25em] text-washi md:text-4xl">
              VICTORIES
            </h2>
          </div>
        </div>

        {/* Prominent Japanese-inspired Grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="grid border-l border-t border-gold/15 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VICTORIES.map((metric, i) => (
            <VictoryCard key={metric.id} metric={metric} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
