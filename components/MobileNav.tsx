"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { href: "/caption", label: "Caption Generator" },
  { href: "/prompt", label: "Prompt Generator" },
  { href: "/blog-writer", label: "Blog Writer" },
  { href: "/twitter-thread", label: "Twitter Thread" },
  { href: "/seo-optimizer", label: "SEO Optimizer" },
  { href: "/social-post", label: "Social Post" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sm:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden={true}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white animate-in">
          {/* Top bar with logo + close */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-extrabold text-xl tracking-tight text-[var(--color-coral-accent)]">
              Copymuse
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden={true}>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className="px-5 pt-6 pb-6">
            <nav aria-label="Mobile navigation">
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-gray-800 hover:text-[var(--color-coral-accent)] transition-colors border-b border-gray-50"
                  style={{ animation: `fade-in 0.3s ease-out ${i * 60}ms both` }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer in menu */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">Free AI content tools. No signup needed.</p>
          </div>
        </div>
      )}
    </div>
  );
}
