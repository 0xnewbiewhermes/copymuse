"use client";

import { useState } from "react";

const LINKS = [
  { href: "/caption", label: "Caption" },
  { href: "/prompt", label: "Prompt" },
  { href: "/blog-writer", label: "Blog" },
  { href: "/twitter-thread", label: "Thread" },
  { href: "/seo-optimizer", label: "SEO" },
  { href: "/social-post", label: "Social" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden={true}>
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10 bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden={true}
          />
          {/* Menu — right-aligned dropdown */}
          <div className="absolute right-0 top-full z-20 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
            <div className="py-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[var(--color-coral-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
