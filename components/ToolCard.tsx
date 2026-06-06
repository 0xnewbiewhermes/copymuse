interface Props {
  title: string;
  description: string;
  href: string;
  icon: string;
  delay?: number;
}

export default function ToolCard({ title, description, href, icon, delay = 0 }: Props) {
  const delayMs = delay * 60;
  return (
    <a
      href={href}
      className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-[var(--color-coral-accent)] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group"
      style={{ animation: `fade-in-up 0.4s ease-out ${delayMs}ms both` }}
    >
      <div className="w-9 h-9 rounded-lg bg-[var(--color-coral-light)] flex items-center justify-center text-lg mb-3" aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-coral-accent)] transition-colors">{title}</h2>
      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{description}</p>
    </a>
  );
}
