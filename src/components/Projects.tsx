import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ProjectVisual from './ProjectVisual';
import ProjectDetail, { ProjectLink } from './ProjectDetail';
import { PROJECTS, type Project } from '../data/projects';
import { EASE_BLADE, EASE_OUT, curtainReveal, fadeUp, stagger, usePrefersReducedMotion } from '../animations/animations';

const STATUS_LABEL: Record<Project['status'], string> = {
  complete: 'COMPLETED',
  'in-progress': 'IN PROGRESS',
  upcoming: 'UPCOMING',
};

function Battle({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const [cutting, setCutting] = useState(false);
  const reduced = usePrefersReducedMotion();
  const flip = index % 2 === 1;

  const open = () => {
    if (cutting) return;
    if (reduced) return onOpen(project);
    setCutting(true);
    window.setTimeout(() => {
      onOpen(project);
      setCutting(false);
    }, 340);
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby={`project-${project.id}`}
      data-cursor="katana"
      className="jp-frame washi group relative grid overflow-hidden bg-coal/70 transition-all duration-500 hover:border-crimson/50 hover:shadow-[0_0_30px_rgba(163,22,33,0.22)] lg:grid-cols-12"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-crimson/80 via-crimson/20 to-transparent" aria-hidden />

      {/* vertical Japanese label */}
      <div
        className={`hidden items-center justify-center border-gold/10 py-10 transition-colors duration-500 group-hover:border-crimson/40 lg:col-span-1 lg:flex ${
          flip ? 'lg:order-3 lg:border-l' : 'lg:border-r'
        }`}
      >
        <span
          lang="ja"
          className="vertical-jp font-jp text-2xl tracking-[0.5em] text-crimson/60 transition-all duration-500 group-hover:text-crimson group-hover:drop-shadow-[0_0_8px_rgba(163,22,33,0.8)]"
        >
          {project.jp}
        </span>
      </div>

      {/* visual preview with hover movement and katana cursor */}
      <motion.button
        type="button"
        variants={curtainReveal}
        onClick={open}
        aria-label={`Open ${project.title} details`}
        className={`relative aspect-[3/2] overflow-hidden border-gold/10 lg:col-span-6 lg:aspect-auto lg:min-h-[480px] ${
          flip ? 'lg:order-1 lg:border-r' : 'lg:order-2 lg:border-l'
        } max-lg:border-b`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05] group-hover:-translate-y-1">
          <ProjectVisual kind={project.visual} title={project.title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" aria-hidden />
        {/* Subtle crimson sheen overlay on hover */}
        <div className="absolute inset-0 bg-crimson/0 transition-colors duration-500 group-hover:bg-crimson/[0.04] pointer-events-none" aria-hidden />
      </motion.button>

      {/* content */}
      <motion.div
        variants={stagger(0.08, 0.3)}
        className={`relative flex flex-col justify-center p-7 md:p-12 lg:col-span-5 ${flip ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <span
          className="text-outline pointer-events-none absolute right-6 top-4 font-jp text-[6rem] font-extralight leading-none opacity-40 transition-opacity group-hover:opacity-75 md:text-[9rem]"
          aria-hidden
        >
          {project.number}
        </span>
        <motion.p variants={fadeUp} className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-gold/80">
          <span lang="ja" className="font-jp">戦 {project.number}</span>
          <span className="h-px w-6 bg-gold/30" aria-hidden />
          <span className="text-ash">{STATUS_LABEL[project.status]}</span>
        </motion.p>
        <motion.h3
          variants={fadeUp}
          id={`project-${project.id}`}
          className="mt-5 font-jp text-3xl font-light tracking-[0.12em] text-washi transition-colors group-hover:text-washi md:text-5xl"
        >
          {project.title}
        </motion.h3>
        <motion.p variants={fadeUp} className="mt-3 text-xs tracking-[0.3em] text-ash uppercase">
          {project.subtitle} <span lang="ja" className="ml-2 font-jp normal-case tracking-normal text-ash/70 lg:hidden">· {project.jp}</span>
        </motion.p>
        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE_BLADE } } }}
          className="my-7 h-px w-full origin-left bg-gold/20"
          aria-hidden
        />
        <motion.p variants={fadeUp} className="leading-relaxed text-washi/75">{project.description}</motion.p>
        <motion.p variants={fadeUp} className="mt-6 text-[11px] tracking-[0.2em] text-ash font-mono">{project.tech.join('  •  ')}</motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
          <button id={`view-${project.id}`} type="button" onClick={open} className="btn-blade !px-5 !py-3">
            View Battle
          </button>
          <ProjectLink id={`github-${project.id}`} href={project.github} label="GitHub" />
          {project.demo && <ProjectLink id={`demo-${project.id}`} href={project.demo} label="Live Demo" />}
        </motion.div>
      </motion.div>

      {/* click slash transition */}
      <AnimatePresence>
        {cutting && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-[-10%] top-1/2 z-20 h-[2px] w-[120%] origin-left -rotate-[12deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_24px_4px_rgba(163,22,33,0.8)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative px-4 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div id="projects-heading" className="px-2 md:px-0">
          <SectionHeading index="03" kanji="戦" romaji="IKUSA" title="THE BATTLES" />
        </div>
        <div className="space-y-12 md:space-y-20">
          {PROJECTS.map((p, i) => (
            <Battle key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>
      <AnimatePresence>{selected && <ProjectDetail key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
}
