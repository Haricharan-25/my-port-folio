import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame, GitBranch, GitCommit, Shield } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { SITE } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../animations/animations';

interface GitHubProfile {
  public_repos?: number;
  followers?: number;
  following?: number;
  updated_at?: string;
}

/**
 * 鍛 (KATÁ) — THE FORGE
 * Represents the samurai forge where discipline meets code.
 * Connects to live public GitHub activity without fabricating any statistics.
 */
export default function TheForge() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt real GitHub public profile lookup
    let isMounted = true;
    fetch('https://api.github.com/users/Haricharan-25')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          setProfile({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            updated_at: data.updated_at,
          });
        }
      })
      .catch(() => {
        // Fallback to honest placeholder without fabricating numbers
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="forge" aria-labelledby="forge-heading" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div id="forge-heading">
          <SectionHeading index="04" kanji="鍛" romaji="KATÁ" title="THE FORGE" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="jp-frame washi relative overflow-hidden rounded-sm border border-gold/20 bg-[#100d0b] p-8 md:p-14"
        >
          {/* Subtle anvil & furnace flame background glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-crimson/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Forge narrative */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-crimson">
                <Flame size={16} className="animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold/80">
                  TAMAHAGANE // FOLDING CODE
                </span>
              </div>

              <h3 className="mt-4 font-jp text-3xl font-light tracking-wide text-washi md:text-4xl">
                Tempered by repetition.
              </h3>
              <p className="mt-4 leading-relaxed text-ash">
                Just as the samurai's blade is folded in fire until impurities vanish, code is refined through
                daily practice, refactoring, and purposeful architecture.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-blade group inline-flex items-center gap-2"
                >
                  <span>Visit GitHub</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Live Forge Terminal & Architecture Placeholder */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-sm border border-gold/20 bg-[#0a0807] shadow-2xl">
                {/* Terminal top header */}
                <div className="flex items-center justify-between border-b border-gold/15 bg-[#15110e] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-crimson/80" />
                    <span className="h-2 w-2 rounded-full bg-gold/80" />
                    <span className="h-2 w-2 rounded-full bg-washi/40" />
                    <span className="ml-2 font-mono text-[10px] tracking-wider text-ash">
                      forge://github.com/Haricharan-25
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-gold/70">LIVE FEED</span>
                </div>

                {/* Content body */}
                <div className="p-6 font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                    <span className="flex items-center gap-2 text-ash">
                      <Shield size={14} className="text-gold" />
                      Craftsman
                    </span>
                    <span className="text-washi">Kakarla Hari Charan</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                    <span className="flex items-center gap-2 text-ash">
                      <GitBranch size={14} className="text-crimson" />
                      Public Repositories
                    </span>
                    <span className="text-washi">
                      {loading ? (
                        <span className="animate-pulse text-ash">Verifying...</span>
                      ) : profile?.public_repos !== undefined ? (
                        `${profile.public_repos} verified`
                      ) : (
                        'Active on GitHub'
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                    <span className="flex items-center gap-2 text-ash">
                      <GitCommit size={14} className="text-gold" />
                      Forge Pipeline
                    </span>
                    <span className="text-emerald-400/90 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Continuous Kaizen
                    </span>
                  </div>

                  <p className="pt-2 text-[10px] leading-relaxed text-ash/60">
                    * No synthetic counts or fabricated statistics are displayed. Live synchronization linked to public GitHub profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
