interface Props {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ToolCard({ title, description, href, icon }: Props) {
  return (
    <a
      href={href}
      className="block p-6 border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-sm transition-all group"
    >
      <div className="text-3xl mb-3" aria-hidden="true">{icon}</div>
      <h2 className="text-lg font-semibold mb-1 group-hover:text-gray-600 transition-colors">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </a>
  );
}
