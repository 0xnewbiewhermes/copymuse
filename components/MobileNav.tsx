"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { href: "/social-post", label: "Social Media" },
  { href: "/prompt", label: "Prompt Generator" },
  { href: "/blog-writer", label: "Blog Writer" },
  { href: "/twitter-thread", label: "Twitter Thread" },
  { href: "/seo-optimizer", label: "SEO Optimizer" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 -mr-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden={true}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg animate-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <span className="font-extrabold text-xl tracking-tight gideon-gradient-text">
              Copymuse
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 -mr-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden={true}>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-5 pt-8 pb-6">
            <nav aria-label="Mobile navigation" className="space-y-1">
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 px-4 text-base font-medium text-[var(--color-text)] hover:text-[var(--color-coral-accent)] hover:bg-[var(--color-coral-light)] rounded-xl transition-all"
                  style={{ animation: `fade-in 0.3s ease-out ${i * 60}ms both` }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-tertiary)]">Free AI content tools. No signup needed.</p>
          </div>
        </div>
      )}
    </div>
  );
}
