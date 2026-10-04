import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SITE } from '../data/site';
import { EASE_BLADE, EASE_OUT, fadeUp, stagger, viewportOnce } from '../animations/animations';

type Phase = 'idle' | 'ink' | 'sent';

const FIELDS = [
  { id: 'name', label: 'Name', jp: '名前', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'Email', jp: 'メール', type: 'email', autoComplete: 'email' },
] as const;

export const CONTACT_LINKS = [
  { label: 'Visit GitHub', href: SITE.github, Icon: GithubIcon },
  { label: 'Connect on LinkedIn', href: SITE.linkedin, Icon: LinkedinIcon },
  { label: 'charanhari072@gmail.com', href: `mailto:${SITE.email}`, Icon: Mail },
];

function Roller() {
  return (
    <div className="relative mx-[-14px] h-4 bg-gradient-to-b from-[#2a1a12] via-[#1a100b] to-[#0c0806]" aria-hidden>
      <span className="absolute -left-2 top-1/2 h-6 w-3 -translate-y-1/2 rounded-sm bg-gold/70" />
      <span className="absolute -right-2 top-1/2 h-6 w-3 -translate-y-1/2 rounded-sm bg-gold/70" />
    </div>
  );
}

export default function Contact() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [origin, setOrigin] = useState({ x: '50%', y: '80%' });
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !form.checkValidity()) return form?.reportValidity();
    const b = btnRef.current?.getBoundingClientRect();
    const f = form.getBoundingClientRect();
    if (b) setOrigin({ x: `${b.left - f.left + b.width / 2}px`, y: `${b.top - f.top + b.height / 2}px` });
    setPhase('ink');
    window.setTimeout(() => setPhase('sent'), 1000);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div id="contact-heading">
          <SectionHeading index="06" kanji="連絡" romaji="RENRAKU" title="THE SCROLL" />
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left information & social paths */}
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(0.1)} className="lg:col-span-4">
            <motion.p variants={fadeUp} className="font-jp text-xl font-light leading-relaxed text-washi/90">
              Every great collaboration begins with a single message.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-ash">
              Open to internships, engineering opportunities, collaborations, and conversations about systems, AI, and building purposeful software.
            </motion.p>

            <motion.ul variants={stagger(0.08)} className="mt-10 space-y-1 border-t border-gold/10">
              {CONTACT_LINKS.map(({ label, href, Icon }) => (
                <motion.li key={label} variants={fadeUp}>
                  <a
                    id={`contact-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-gold/10 py-4 text-ash transition-colors hover:text-washi"
                  >
                    <span className="flex items-center gap-4 text-xs tracking-[0.25em] uppercase">
                      <Icon width={16} height={16} className="text-gold/80 transition-transform group-hover:scale-110" />
                      {label}
                    </span>
                    <span className="h-px w-6 bg-gold/30 transition-all duration-500 group-hover:w-12 group-hover:bg-crimson" aria-hidden />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* The Scroll Contact Form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: EASE_BLADE }}
          >
            <Roller />
            <div className="washi relative overflow-hidden border-x border-gold/15 bg-[#100e0c]">
              {/* Ink bleeding around edges */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(122,12,12,0.18),transparent_40%),radial-gradient(ellipse_at_100%_100%,rgba(0,0,0,0.7),transparent_50%)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 2, delay: 0.6 }}
              />
              <span lang="ja" aria-hidden className="vertical-jp pointer-events-none absolute right-6 top-8 font-jp text-sm tracking-[0.6em] text-ash/40">
                文をしたためる
              </span>

              <form ref={formRef} onSubmit={onSubmit} noValidate className="relative px-6 py-12 md:px-16 md:py-16" aria-describedby="contact-status">
                <div className="grid gap-10 md:grid-cols-2">
                  {FIELDS.map((f) => (
                    <div key={f.id}>
                      <label htmlFor={`contact-field-${f.id}`} className="flex items-baseline gap-3 text-[10px] tracking-[0.4em] text-ash uppercase">
                        {f.label} <span lang="ja" className="font-jp tracking-normal text-crimson/70">{f.jp}</span>
                      </label>
                      <input
                        id={`contact-field-${f.id}`}
                        name={f.id}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        required
                        className="scroll-input"
                        disabled={phase !== 'idle'}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <label htmlFor="contact-field-message" className="flex items-baseline gap-3 text-[10px] tracking-[0.4em] text-ash uppercase">
                    Message <span lang="ja" className="font-jp tracking-normal text-crimson/70">伝言</span>
                  </label>
                  <textarea
                    id="contact-field-message"
                    name="message"
                    rows={5}
                    required
                    className="scroll-input resize-none"
                    disabled={phase !== 'idle'}
                  />
                </div>
                <div className="mt-12 flex justify-end">
                  <button ref={btnRef} id="contact-submit" type="submit" className="btn-blade" disabled={phase !== 'idle'}>
                    Send Message
                  </button>
                </div>

                {/* Ink spread animation on submit */}
                <AnimatePresence>
                  {phase !== 'idle' && (
                    <motion.div
                      key="ink"
                      aria-hidden
                      className="absolute inset-0 bg-[#0a0606]"
                      initial={{ clipPath: `circle(0% at ${origin.x} ${origin.y})` }}
                      animate={{ clipPath: `circle(150% at ${origin.x} ${origin.y})` }}
                      transition={{ duration: 1, ease: EASE_OUT }}
                    />
                  )}
                </AnimatePresence>
                <div id="contact-status" role="status" aria-live="polite" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {phase === 'sent' && (
                    <motion.div className="text-center" initial="hidden" animate="show" variants={stagger(0.25)}>
                      <motion.p
                        lang="ja"
                        variants={{ hidden: { opacity: 0, filter: 'blur(10px)' }, show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.2 } } }}
                        className="font-jp text-2xl font-light tracking-[0.2em] text-washi md:text-4xl"
                      >
                        よろしくお願いします
                      </motion.p>
                      <motion.p variants={fadeUp} className="mt-4 text-xs tracking-[0.4em] text-gold/80">
                        YOROSHIKU ONEGAISHIMASU
                      </motion.p>
                      <motion.p variants={fadeUp} className="mt-6 text-xs text-ash/70">
                        Your message has been inscribed. I look forward to connecting with you.
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
            <Roller />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
