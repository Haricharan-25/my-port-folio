import { SITE } from '../data/site';
import { KatanaIcon, GithubIcon, LinkedinIcon } from './Icons';
import { Mail } from 'lucide-react';
import HankoSeal from './HankoSeal';

export default function Footer() {
  const footerLinks = [
    { label: 'GitHub', href: SITE.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: SITE.linkedin, Icon: LinkedinIcon },
    { label: 'Email', href: `mailto:${SITE.email}`, Icon: Mail },
  ];

  return (
    <footer className="relative border-t border-gold/15 bg-[#090807] px-6 pb-12 pt-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        {/* Identity & Hanko Seal */}
        <div className="flex items-center gap-5">
          <div>
            <p lang="ja" className="font-jp text-sm tracking-[0.4em] text-ash">
              カカルラ・ハリ・チャラン
            </p>
            <p className="mt-1.5 font-jp text-2xl font-light tracking-[0.25em] text-washi">
              KAKARLA
            </p>
            <p className="mt-1 text-xs tracking-[0.25em] text-gold/80 font-mono">
              KAKARLA HARI CHARAN
            </p>
            <p className="mt-1.5 text-[10px] tracking-[0.45em] text-ash/70 font-mono">
              CODE • CREATE • EVOLVE
            </p>
          </div>
          <HankoSeal size="sm" label="KAKARLA" subLabel="印" />
        </div>

        {/* Katana Visual */}
        <div className="order-first md:order-none opacity-85 hover:opacity-100 transition-opacity">
          <KatanaIcon className="w-36 h-6 text-washi" />
        </div>

        {/* Social Links */}
        <ul className="flex items-center gap-6">
          {footerLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                id={`footer-${label.toLowerCase()}`}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="group flex items-center gap-2 p-2 text-xs tracking-widest text-ash transition-colors hover:text-gold"
              >
                <Icon width={16} height={16} className="transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline uppercase text-[10px] tracking-[0.2em]">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gold/10 pt-6 text-center">
        <p className="text-[10px] tracking-[0.4em] text-ash/70 font-mono uppercase">
          © 2026 Kakarla Hari Charan
        </p>
      </div>
    </footer>
  );
}
