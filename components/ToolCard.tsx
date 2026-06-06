import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  variant?: "default" | "featured";
  delay?: number;
}

export default function ToolCard({ title, description, href, icon, variant = "default", delay = 0 }: Props) {
  const delayMs = delay * 60;

  if (variant === "featured") {
    return (
      <a
        href={href}
        className="block p-6 rounded-xl bg-[var(--color-coral-accent)] text-white hover:bg-[var(--color-coral-600)] transition-colors duration-200"
        style={{ animation: `fade-in-up 0.4s ease-out ${delayMs}ms both` }}
      >
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4" aria-hidden="true">
          {icon}
        </div>
        <h2 className="text-base font-bold mb-1">{title}</h2>
        <p className="text-sm text-white/80">{description}</p>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="block p-5 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-coral-200)] hover:shadow-[0_2px_8px_rgba(232,93,58,0.08)] transition-colors duration-200 group"
      style={{ animation: `fade-in-up 0.4s ease-out ${delayMs}ms both` }}
    >
      <div className="w-9 h-9 rounded-lg bg-[var(--color-coral-light)] flex items-center justify-center mb-3" aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-coral-accent)] transition-colors">{title}</h2>
      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{description}</p>
    </a>
  );
}
