import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import HankoSeal from './HankoSeal';
import { EASE_OUT, fadeUp, lineReveal, stagger, viewportOnce, usePrefersReducedMotion } from '../animations/animations';

const ROLES = [
  { jp: '学生', en: 'Computer Science Student' },
  { jp: '開発者', en: 'Developer' },
  { jp: '人工知能', en: 'AI Enthusiast' },
  { jp: '問題解決', en: 'Problem Solver' },
  { jp: '職人', en: 'Builder' },
];

const PATH_WORDS = ['Learning.', 'Building.', 'Failing.', 'Improving.', 'Repeating.'];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const kanjiY = useTransform(scrollYProgress, [0, 1], ['-10%', '15%']);
  const artY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      {/* BACKGROUND: Huge faint Japanese character 我 with subtle parallax */}
      <motion.div
        style={{ y: reduced ? 0 : kanjiY }}
        className="pointer-events-none absolute -left-12 top-1/2 -translate-y-1/2 select-none md:left-8"
        aria-hidden
      >
        <span
          lang="ja"
          className="font-jp text-[18rem] font-black leading-none text-washi/[0.022] sm:text-[26rem] md:text-[34rem]"
        >
          我
        </span>
      </motion.div>

      {/* Geometric Japanese pattern background accent (Asanoha geometry) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30zM30 15L45 30L30 45L15 30z' fill='none' stroke='%23C9A227' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div id="about-title">
          <SectionHeading index="01" kanji="我" romaji="WARE" title="THE WARRIOR" />
        </div>

        {/* Asymmetric composition: LEFT = Text & Principles, RIGHT = Large Cinematic Artwork */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: About text, path words, and persona roles */}
          <div className="lg:col-span-6">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(0.15)}>
              <motion.p variants={fadeUp} className="font-jp text-xl font-light leading-relaxed text-washi md:text-2xl">
                I am Kakarla Hari Charan, a Computer Science student who enjoys building systems, experimenting with AI, and turning ideas into working products.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-8 leading-relaxed text-ash">
                My path is not about knowing everything.
                <br />
                It is about —
              </motion.p>
            </motion.div>

            {/* Path Words with line reveal */}
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.12, 0.3)}
              className="mt-6 space-y-1.5"
              aria-label="The path"
            >
              {PATH_WORDS.map((w, i) => (
                <li key={w} className="overflow-hidden">
                  <motion.span
                    variants={lineReveal}
                    className={`block font-jp text-3xl font-extralight tracking-wider md:text-4xl ${
                      i === PATH_WORDS.length - 1 ? 'text-crimson' : 'text-washi/90'
                    }`}
                  >
                    {w}
                  </motion.span>
                </li>
              ))}
            </motion.ul>

            {/* Discipline roles list */}
            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.08, 0.2)}
              className="mt-12 border-t border-gold/15"
            >
              {ROLES.map((r) => (
                <motion.div
                  key={r.en}
                  variants={fadeUp}
                  className="group flex items-center justify-between border-b border-gold/10 py-3.5 transition-colors hover:border-crimson/40"
                >
                  <dt className="text-xs tracking-[0.3em] text-washi/90 uppercase transition-transform duration-500 group-hover:translate-x-2">
                    {r.en}
                  </dt>
                  <dd lang="ja" className="font-jp text-sm text-ash transition-colors group-hover:text-gold">
                    {r.jp}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          {/* CENTER / RIGHT: Large Artistic Samurai Silhouette, Katana, Torii & Red Moon Composition */}
          <motion.div
            style={{ y: reduced ? 0 : artY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="lg:col-span-6"
          >
            <div className="jp-frame washi relative mx-auto w-full max-w-lg overflow-hidden rounded-sm border border-gold/25 bg-[#0e0c0b] shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              {/* Gold framing top accent line */}
              <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-crimson/80 via-gold/40 to-transparent" />

              {/* Masterwork Sumi-e Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4]">
                <img
                  src="/images/about-samurai.jpg"
                  alt="Fine art Japanese sumi-e ink brush painting of a samurai silhouette standing with katana overlooking Mount Fuji and Torii gate"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="lazy"
                />

                {/* Atmospheric gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-transparent to-transparent opacity-80" />

                {/* Overlaid Vertical Calligraphy */}
                <div className="pointer-events-none absolute left-6 top-6 z-10 flex flex-col gap-3" aria-hidden>
                  <span className="vertical-jp font-jp text-xs tracking-[0.5em] text-washi/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    武士道
                  </span>
                  <span className="h-6 w-px bg-gold/50" />
                  <span className="vertical-jp font-jp text-[10px] tracking-[0.4em] text-ash/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    不撓不屈
                  </span>
                </div>

                {/* KAKARLA Hanko Seal signature on the artwork */}
                <div className="absolute bottom-5 right-5 z-20">
                  <HankoSeal size="sm" label="KAKARLA" subLabel="印" />
                </div>
              </div>

              {/* Composition caption strip */}
              <div className="flex items-center justify-between border-t border-gold/15 bg-[#120f0d] px-6 py-3.5 text-[9px] tracking-[0.35em] text-ash">
                <span lang="ja" className="font-jp text-gold/70">
                  初心忘るべからず
                </span>
                <span className="uppercase text-ash/80">DISCIPLINE • KAISEN • THE PATH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
