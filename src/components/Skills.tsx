import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { SKILL_CATEGORIES, type SkillCategory, type SkillItemData } from '../data/skills';
import { TechIcon } from './TechIcons';
import { EASE_BLADE, placeWeapon, stagger, viewportOnce } from '../animations/animations';

function SkillItem({ item }: { item: SkillItemData }) {
  return (
    <motion.li variants={placeWeapon} className="list-none">
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="group relative flex items-center gap-3 overflow-hidden rounded-sm border border-gold/25 bg-[#141210]/80 px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-crimson/70 hover:bg-[#1c1616] hover:shadow-[0_0_15px_rgba(163,22,33,0.3)]"
      >
        {/* Japanese corner tick mark */}
        <span className="absolute left-0 top-0 h-2 w-[1px] bg-gold/50 transition-colors group-hover:bg-crimson" />
        <span className="absolute left-0 top-0 h-[1px] w-2 bg-gold/50 transition-colors group-hover:bg-crimson" />

        {/* Subtle ink-brush background sheen on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-crimson/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

        {/* Tech Icon */}
        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <TechIcon id={item.iconId} className="h-5 w-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Tech Name */}
        <span className="font-sans text-xs tracking-wider text-washi/90 transition-colors duration-200 group-hover:text-washi">
          {item.name}
        </span>

        {/* Ink brush underline stroke animation on hover */}
        <svg
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-1 left-3 h-2 w-[calc(100%-1.5rem)]"
          aria-hidden
        >
          <motion.path
            d="M2,8 C25,3 55,10 98,4"
            stroke="#A31621"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileHover={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </motion.li>
  );
}

function WeaponRack({ cat, index }: { cat: SkillCategory; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0.06, 0.12)}
      className="group relative grid gap-6 border-t border-gold/10 py-10 md:grid-cols-12 md:items-center md:gap-8"
    >
      {/* Rack rail draws in */}
      <motion.span
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_BLADE } } }}
        className="absolute -top-px left-0 h-px w-full origin-left bg-gradient-to-r from-crimson/70 via-gold/30 to-transparent"
        aria-hidden
      />

      {/* Category header */}
      <div className="flex items-baseline gap-5 md:col-span-4">
        <span className="text-[10px] tracking-[0.3em] text-gold/60 font-mono">0{index + 1}</span>
        <span
          lang="ja"
          className="min-w-[3.5rem] font-jp text-4xl font-light text-crimson/90 transition-colors duration-500 group-hover:text-crimson md:text-5xl"
        >
          {cat.kanji}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-jp text-lg tracking-[0.35em] text-washi">{cat.weapon}</h3>
            <span className="text-[10px] tracking-widest text-ash/60">({cat.reading})</span>
          </div>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-gold/80 uppercase font-sans">{cat.domain}</p>
        </div>
      </div>

      {/* Skills list with official vector logos */}
      <ul className="flex flex-wrap gap-3 md:col-span-8" aria-label={`${cat.domain} skills`}>
        {cat.skills.map((s) => (
          <SkillItem key={s.name} item={s} />
        ))}
      </ul>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="washi relative bg-coal/60 px-6 py-24 md:px-10 md:py-32">
      <span
        lang="ja"
        aria-hidden
        className="vertical-jp pointer-events-none absolute right-6 top-24 hidden font-jp text-[11rem] leading-none text-washi/[0.02] lg:block"
      >
        武器庫
      </span>
      <div className="mx-auto max-w-7xl">
        <div id="skills-heading">
          <SectionHeading index="02" kanji="技" romaji="WAZA" title="THE ARSENAL" />
        </div>
        <div className="border-b border-gold/10">
          {SKILL_CATEGORIES.map((cat, i) => (
            <WeaponRack key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
