import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { JOURNEY } from '../data/site';
import { EASE_OUT } from '../animations/animations';

/** Vertical timeline where the line is a katana that "draws" itself on scroll. */
export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div id="journey-heading">
          <SectionHeading index="04" kanji="道" romaji="DŌ" title="THE PATH" align="center" />
        </div>

        <div ref={trackRef} className="relative pb-6 pt-16">
          {/* katana handle at the top */}
          <div className="absolute left-4 top-0 flex -translate-x-1/2 flex-col items-center md:left-1/2" aria-hidden>
            <span className="h-2 w-3 rounded-sm bg-gold/80" />
            <span className="h-12 w-[7px] bg-[repeating-linear-gradient(135deg,#3a0d10_0_4px,#0d0b0b_4px_8px)]" />
            <span className="h-[5px] w-7 rounded-sm border border-gold/60 bg-[#1a1614]" />
            <span className="h-2 w-[5px] bg-gold" />
          </div>
          {/* blade track + drawn blade */}
          <div className="absolute bottom-0 left-4 top-[86px] w-[3px] -translate-x-1/2 bg-washi/[0.05] md:left-1/2" aria-hidden>
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#e9e7e1] via-[#9ea2a9] to-[#d8dade] shadow-[0_0_12px_rgba(243,235,221,0.25)] [clip-path:polygon(0_0,100%_0,100%_97%,50%_100%,0_97%)]"
            />
          </div>

          <ol className="relative space-y-20 pt-10 md:space-y-28">
            {JOURNEY.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={m.year}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  className="relative grid pl-12 md:grid-cols-2 md:pl-0"
                >
                  <motion.span
                    aria-hidden
                    variants={{ hidden: { scale: 0, rotate: 0 }, show: { scale: 1, rotate: 45, transition: { duration: 0.6, ease: EASE_OUT } } }}
                    className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 border border-gold bg-ink shadow-[0_0_14px_rgba(201,162,39,0.6)] md:left-1/2"
                  />
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: right ? 40 : -40 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_OUT } },
                    }}
                    className={right ? 'md:col-start-2 md:pl-16' : 'md:pr-16 md:text-right'}
                  >
                    <p className={`flex items-baseline gap-4 ${right ? '' : 'md:justify-end'}`}>
                      <span className="font-jp text-4xl font-extralight tracking-wider text-gold md:text-5xl">{m.year}</span>
                      <span lang="ja" className="font-jp text-lg text-crimson/80" aria-hidden>{m.kanji}</span>
                    </p>
                    <h3 className="mt-3 text-sm tracking-[0.35em] text-washi">{m.title}</h3>
                    <p className="mt-3 leading-relaxed text-ash">{m.description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
