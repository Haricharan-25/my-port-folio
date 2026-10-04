import { motion } from 'framer-motion';
import { GENZAI_FOCUS } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../animations/animations';

/**
 * 現在 (GENZAI) — CURRENTLY
 * A concise live status indicator reflecting active disciplines and pursuits.
 */
export default function Genzai() {
  return (
    <section id="genzai" aria-labelledby="genzai-title" className="relative px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="jp-frame washi relative overflow-hidden rounded-sm border border-gold/20 bg-[#110e0c]/90 p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-crimson/80 via-gold/40 to-transparent" />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Header with live pulse */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
                </span>
                <span className="text-[10px] tracking-[0.45em] text-gold/80 font-mono uppercase">
                  LIVE STATUS // 進行中
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-4">
                <span lang="ja" className="font-jp text-4xl font-light text-crimson md:text-5xl">
                  現在
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.5em] text-ash">GENZAI</p>
                  <h3 id="genzai-title" className="font-jp text-xl tracking-[0.25em] text-washi md:text-2xl">
                    CURRENTLY
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs tracking-wider text-ash/80">
                Daily discipline in motion. Active areas of engineering, learning, and algorithmic refinement.
              </p>
            </div>

            {/* Pursuits List */}
            <div className="lg:col-span-8">
              <ul className="grid gap-3 sm:grid-cols-2" aria-label="Current pursuits">
                {GENZAI_FOCUS.map((item, idx) => (
                  <motion.li
                    key={item.text}
                    variants={fadeUp}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-sm border border-gold/15 bg-[#171311] px-5 py-4 transition-all duration-300 hover:border-crimson/60 hover:bg-[#1e1715] hover:shadow-[0_0_15px_rgba(163,22,33,0.2)]"
                  >
                    <span
                      lang="ja"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gold/20 bg-ink font-jp text-sm text-gold/90 transition-colors group-hover:border-crimson group-hover:text-crimson"
                    >
                      {item.kanji}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-medium tracking-wide text-washi/90 transition-colors group-hover:text-washi">
                        {item.text}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-ash/60">
                        PURSUIT // 0{idx + 1}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
