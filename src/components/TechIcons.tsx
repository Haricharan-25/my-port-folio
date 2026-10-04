import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function TechIcon({ id, className = 'w-4 h-4', ...props }: { id: string } & IconProps) {
  switch (id) {
    case 'html':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
          <path d="M4 2l1.6 18 6.4 2 6.4-2 1.6-18H4z" fill="#E44D26" stroke="none" />
          <path d="M12 3.6v16.7l5.1-1.6 1.3-15.1H12z" fill="#F16529" stroke="none" />
          <path d="M7.7 7h8.6l-.3 3H12v2.7h3.7l-.4 4.5-3.3 1-3.3-1-.2-2.3H6.8l.4 4.3 4.8 1.4 4.8-1.4.6-6.8.1-1.3H12V7H7.7z" fill="#fff" stroke="none" />
        </svg>
      );

    case 'css':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
          <path d="M4 2l1.6 18 6.4 2 6.4-2 1.6-18H4z" fill="#1572B6" stroke="none" />
          <path d="M12 3.6v16.7l5.1-1.6 1.3-15.1H12z" fill="#33A9DC" stroke="none" />
          <path d="M7.7 7h8.6l-.8 8.2-3.5 1.1-3.5-1.1-.2-2.3H6.8l.4 4.3 4.8 1.4 4.8-1.4.9-9.1.1-1.1H7.7z" fill="#fff" stroke="none" />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={className} {...props}>
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path d="M6 18.5l2.2-1.3c.4.8.9 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.5v-7h2.6v7.1c0 2.4-1.4 3.5-3.8 3.5-2.1 0-3.4-1-4.3-2.2zM15 18.6l2.1-1.2c.6.9 1.3 1.5 2.4 1.5 1 0 1.6-.4 1.6-1 0-.7-.5-1-1.8-1.5l-.8-.3c-2.2-.9-3.3-2-3.3-3.6 0-2 1.6-3.4 4-3.4 1.7 0 3 .6 3.9 2.2l-2 1.3c-.4-.8-1-1.1-1.9-1.1-.9 0-1.4.4-1.4.9 0 .6.4.9 1.5 1.3l.8.3c2.5 1 3.6 2 3.6 3.8 0 2.2-1.7 3.6-4.3 3.6-2.4 0-3.8-1.1-4.4-2.5z" fill="#000" />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="#38BDF8" className={className} {...props}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M8.5 17.5c3.5 1 7.5.5 10-.5-2.5-.5-5.5-.3-10 .5z" fill="#E76F00" />
          <path d="M6.5 19.5c4.5 1.5 10 1 13-.5-3.5-.5-8-.2-13 1z" fill="#5382A1" />
          <path d="M13 3c-1.5 2-2 3.5 0 5 1.8 1.4.5 3-1.5 4.5 2.5-1.5 3.5-3.5 1.5-5.5-1.5-1.5-1-2.5 0-4z" fill="#E76F00" />
          <path d="M10 5c-1 1.5-1.5 2.5 0 4 1.3 1.3.4 2.5-1 3.5 1.8-1 2.5-2.5 1-4-1.2-1.2-.8-2 0-3.5z" fill="#E76F00" />
          <path d="M4 14.5c0 2 2.5 3.5 6.5 3.5 5 0 7.5-2 7.5-3.5H4z" stroke="#5382A1" strokeWidth="1.2" />
        </svg>
      );

    case 'springboot':
      return (
        <svg viewBox="0 0 24 24" fill="#6DB33F" className={className} {...props}>
          <path d="M21.2 14.5c-.7 3.5-3.6 6.1-7.2 6.5-4.5.5-8.6-2.6-9.5-7.1-.9-4.5 1.9-8.8 6.4-9.8 1.4-.3 2.7-.2 3.9.2-1.3.8-2.3 2-2.8 3.5-1.2 3.4.4 7.2 3.8 8.4 1.7.6 3.6.4 5.4-1.7zm-2.5-6.8c.2-.5.5-.9.9-1.2-1.8-1.5-4.2-2.2-6.6-1.8-4.5.8-7.9 4.6-8 9.2 0 1.1.2 2.2.6 3.2 1.3-4.5 5.3-7.8 10-8.2 1.1-.1 2.1-.3 3.1-1.2z" />
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M11.9 2c-3.1 0-5 .9-5 2.6v2.1h5v.6H5.2C3.4 7.3 2 9.1 2 11.2c0 2.2 1.5 3.7 3.4 3.7h1.4v-1.8c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.7-1.2 2.7-2.7V4.6c0-1.7-1.9-2.6-6-2.6zm-1.8 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB" />
          <path d="M12.1 22c3.1 0 5-.9 5-2.6v-2.1h-5v-.6h6.7c1.8 0 3.2-1.8 3.2-3.9 0-2.2-1.5-3.7-3.4-3.7h-1.4v1.8c0 1.8-1.5 3.3-3.3 3.3H8.8c-1.5 0-2.7 1.2-2.7 2.7v2.5c0 1.7 1.9 2.6 6 2.6zm1.8-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B" />
        </svg>
      );

    case 'django':
      return (
        <svg viewBox="0 0 24 24" fill="#092E20" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#092E20" />
          <path d="M12.9 6h2.2v9.3c-.6.2-1.3.3-2 .3-2.6 0-3.8-1.3-3.8-3.5 0-2.2 1.4-3.7 3.6-3.7.8 0 1.4.2 1.8.4V6h-1.8zm0 4.3c-.3-.1-.7-.2-1.1-.2-1.2 0-1.8.8-1.8 2 0 1.2.6 1.9 1.7 1.9.4 0 .8-.1 1.2-.2v-3.7zM16.8 4.2h2.2V6h-2.2V4.2zm0 4.2h2.2v9.8h-2.2V8.4z" fill="#44B78B" />
        </svg>
      );

    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4z" fill="#00758F" opacity="0.2" stroke="#00758F" strokeWidth="1.2" />
          <path d="M3 12c0 2.2 4.03 4 9 4s9-1.8 9-4M3 7c0 2.2 4.03 4 9 4s9-1.8 9-4" stroke="#F29111" strokeWidth="1.2" />
          <circle cx="12" cy="7" r="1.5" fill="#F29111" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M11.9 2s-5.9 5.8-5.9 11.2c0 4.2 3.2 7.7 5.9 8.8 2.7-1.1 5.9-4.6 5.9-8.8 0-5.4-5.9-11.2-5.9-11.2z" fill="#47A248" />
          <path d="M11.9 2v20c.3-.1.6-.3.9-.5 2.5-1.5 5-4.7 5-8.3 0-5.4-5.9-11.2-5.9-11.2z" fill="#499D4A" opacity="0.8" />
          <path d="M11.9 22V2c-.3 0-.6.3-.9.5-2.5 1.5-5 4.7-5 8.3 0 5.4 5.9 11.2 5.9 11.2z" fill="#3FA037" />
        </svg>
      );

    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M4.5 18.2l2.3-14.4c.1-.4.6-.5.8-.2l3.4 6.4-6.5 8.2z" fill="#FFA000" />
          <path d="M13.2 9.5l2.4-4.6c.2-.4.8-.3.9.1l3 13.2-6.3-8.7z" fill="#F57C00" />
          <path d="M4.5 18.2L3.6 17c-.3-.4 0-1 .5-1.1l7.8-1.5 1.3-4.9 6.3 8.7-15 0z" fill="#FFCA28" />
          <path d="M19.5 18.2l-7.5 4.2c-.4.2-.8.2-1.2 0L3.3 18.2l1.2-1 7.5 4.2 7.5-4.2z" fill="#FFA000" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="#F05032" className={className} {...props}>
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.7 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.4.4.4.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V9.4c-.6-.3-1-.9-1-1.6 0-.3.1-.6.2-.9L7.1 4.7 2.4 9.4c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.5-.5.5-1.5 0-2.1z" />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="#2496ED" className={className} {...props}>
          <path d="M13.9 8.2h2.2v2.1h-2.2V8.2zm-2.8 0h2.2v2.1h-2.2V8.2zm-2.8 0h2.2v2.1H8.3V8.2zm5.6-2.7h2.2v2.1h-2.2V5.5zm-2.8 0h2.2v2.1h-2.2V5.5zm-2.8 0h2.2v2.1H8.3V5.5zm8.4 2.7h2.2v2.1h-2.2V8.2zm-11.2 0h2.2v2.1H5.5V8.2zm0 2.7h2.2V13H5.5v-2.1zm2.8 0h2.2V13H8.3v-2.1zm2.8 0h2.2V13h-2.2v-2.1zm2.8 0h2.2V13h-2.2v-2.1zm2.8 0h2.2V13h-2.2v-2.1zM23.9 12.8c-.3-.2-1.5-.7-3.1-.3-.4-1.3-1.4-2.1-1.5-2.2l-.4-.3-.3.4c-.6.9-.9 2-.9 3.1 0 .5.1.9.2 1.4-1.2.7-2.6.9-4 .9H1.4c-.3 0-.6.1-.8.4-.5.8-.3 1.9.1 2.5 1.5 2.5 4.3 4.1 7.4 4.1 6.3 0 11.4-3.8 12.4-8.8 1.4-.1 2.8-.7 3.4-1.2z" />
        </svg>
      );

    case 'maven':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M18.8 3.5c-3.1 0-6.1 2.2-7.5 5.4-1.4-3.2-4.4-5.4-7.5-5.4C1.7 3.5 0 5.4 0 7.8c0 4.6 6.3 11 11.3 12.7.5.2 1 .2 1.5 0C17.7 18.8 24 12.4 24 7.8c0-2.4-1.7-4.3-5.2-4.3z" fill="#C71A36" opacity="0.85" />
          <path d="M6.5 7.5L12 17l5.5-9.5H6.5z" fill="#E8B038" />
        </svg>
      );

    case 'ml':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" className={className} {...props}>
          <circle cx="5" cy="6" r="2.5" fill="#151413" />
          <circle cx="5" cy="18" r="2.5" fill="#151413" />
          <circle cx="12" cy="12" r="2.5" fill="#A31621" />
          <circle cx="19" cy="6" r="2.5" fill="#151413" />
          <circle cx="19" cy="18" r="2.5" fill="#151413" />
          <path d="M7.5 6L9.5 11M7.5 18L9.5 13M14.5 11L16.5 6M14.5 13L16.5 18" stroke="#F3EBDD" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      );

    case 'ai':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#A31621" strokeWidth="1.5" className={className} {...props}>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#C9A227" strokeLinecap="round" />
          <rect x="6" y="6" width="12" height="12" rx="3" stroke="#F3EBDD" strokeOpacity="0.8" />
          <circle cx="9.5" cy="10.5" r="1" fill="#C9A227" />
          <circle cx="14.5" cy="10.5" r="1" fill="#C9A227" />
          <path d="M9.5 14.5c.8.8 2.2.8 3 0" stroke="#A31621" strokeLinecap="round" />
        </svg>
      );

    case 'llm':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F3EBDD" strokeWidth="1.4" className={className} {...props}>
          <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" strokeOpacity="0.7" />
          <circle cx="18" cy="12" r="2.5" fill="#A31621" stroke="#C9A227" strokeWidth="1" />
          <path d="M18 10.5v3M16.5 12h3" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.4" className={className} {...props}>
          <path d="M4 4h7v7H4z" fill="#A31621" fillOpacity="0.25" />
          <path d="M13 13h7v7h-7z" fill="#C9A227" fillOpacity="0.25" />
          <path d="M11 7.5h5a2 2 0 0 1 2 2v3.5" stroke="#F3EBDD" strokeDasharray="2 2" strokeWidth="1.2" />
          <circle cx="18" cy="13" r="1.5" fill="#fff" />
          <circle cx="11" cy="7.5" r="1.5" fill="#A31621" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
  }
}
