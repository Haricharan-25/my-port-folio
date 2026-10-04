import { motion } from 'framer-motion';
import { EASE_BLADE, EASE_OUT } from '../animations/animations';

interface SectionHeadingProps {
  index: string;
  kanji: string;
  romaji: string;
  title: string;
  align?: 'left' | 'center';
}

/** Kanji + romaji + English title, e.g. 我 / WARE / THE WARRIOR */
export default function SectionHeading({ index, kanji, romaji, title, align = 'left' }: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={`relative mb-16 md:mb-24 ${center ? 'text-center' : ''}`}
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}
        className={`flex items-center gap-4 text-[10px] tracking-[0.5em] text-ash ${center ? 'justify-center' : ''}`}
      >
        <span className="text-gold/80">{index}</span>
        <motion.span
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE_BLADE } } }}
          className="h-px w-12 origin-left bg-crimson"
          aria-hidden
        />
        <span>{romaji}</span>
      </motion.div>
      <div className={`mt-6 flex items-end gap-6 md:gap-8 ${center ? 'justify-center' : ''}`}>
        <motion.span
          lang="ja"
          aria-hidden
          variants={{
            hidden: { opacity: 0, scale: 1.15, filter: 'blur(8px)' },
            show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE_OUT } },
          }}
          className="font-jp text-6xl font-light leading-none text-crimson md:text-8xl"
        >
          {kanji}
        </motion.span>
        <span className="overflow-hidden pb-1">
          <motion.h2
            variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 0.9, delay: 0.2, ease: EASE_OUT } } }}
            className="font-jp text-2xl font-light tracking-[0.25em] text-washi md:text-4xl"
          >
            {title}
          </motion.h2>
        </span>
      </div>
    </motion.header>
  );
}
