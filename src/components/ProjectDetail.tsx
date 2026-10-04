import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { isPlaceholder } from '../data/site';
import ProjectVisual from './ProjectVisual';
import { EASE_BLADE } from '../animations/animations';

export function ProjectLink({ href, label, id }: { href: string; label: string; id: string }) {
  const inactive = isPlaceholder(href);
  return (
    <a
      id={id}
      href={inactive ? undefined : href}
      target={inactive ? undefined : '_blank'}
      rel="noreferrer"
      aria-disabled={inactive || undefined}
      title={inactive ? 'Link coming soon' : undefined}
      tabIndex={inactive ? -1 : 0}
      className="btn-blade !px-5 !py-3"
      onClick={(e) => e.stopPropagation()}
    >
      {label} <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
    </a>
  );
}

/** Battle-scroll detail dialog. */
export default function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-${project.id}`}
        className="jp-frame washi relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-coal"
        initial={{ clipPath: 'inset(50% 0 50% 0)' }}
        animate={{ clipPath: 'inset(0% 0 0% 0)' }}
        exit={{ clipPath: 'inset(50% 0 50% 0)' }}
        transition={{ duration: 0.6, ease: EASE_BLADE }}
      >
        <div className="h-px w-full bg-gradient-to-r from-crimson via-crimson/40 to-transparent" />
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 p-2 text-ash transition-colors hover:text-washi"
        >
          <X size={20} strokeWidth={1.25} />
        </button>
        <div className="aspect-[3/2] w-full border-b border-gold/10 md:aspect-[21/9]">
          <ProjectVisual kind={project.visual} title={project.title} />
        </div>
        <div className="grid gap-10 p-6 md:grid-cols-[auto_1fr] md:p-12">
          <span lang="ja" className="vertical-jp hidden font-jp text-3xl tracking-[0.4em] text-crimson md:block">
            {project.jp}
          </span>
          <div>
            <p className="text-[10px] tracking-[0.5em] text-gold/80">戦 {project.number} · {project.jpMeaning}</p>
            <h3 id={`detail-${project.id}`} className="mt-3 font-jp text-3xl font-light tracking-[0.15em] md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm tracking-[0.25em] text-ash uppercase">{project.subtitle}</p>
            <p className="mt-8 max-w-2xl leading-relaxed text-washi/85">{project.description}</p>
            <ul className="mt-8 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-4 text-sm text-washi/80">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs tracking-[0.25em] text-ash">{project.tech.join('  •  ')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ProjectLink id={`detail-github-${project.id}`} href={project.github} label="GitHub" />
              <ProjectLink id={`detail-demo-${project.id}`} href={project.demo} label="Live Demo" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
