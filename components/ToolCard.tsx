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
  const delayMs = delay * 80;

  return (
    <a
      href={href}
      className={`block gideon-card ${variant === "featured" ? "bg-[var(--color-coral-accent)] text-white border-none [&_.gideon-icon]:bg-white/20 [&_.gideon-icon]:text-white [&_p]:text-white/80" : ""}`}
      style={{ animation: `fade-in-up 0.5s ease-out ${delayMs}ms both` }}
    >
      <div className="gideon-icon">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs mt-1.5 leading-relaxed">{description}</p>
    </a>
  );
}
