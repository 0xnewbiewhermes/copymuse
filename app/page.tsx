import ToolCard from "@/components/ToolCard";

const TOOLS = [
  { title: "Caption Generator", description: "Instagram, Twitter, and TikTok captions.", href: "/caption", icon: "📝" },
  { title: "Master Prompt Generator", description: "Optimized prompts for ChatGPT, Claude, Gemini.", href: "/prompt", icon: "✨" },
  { title: "Blog Writer", description: "SEO-optimized blog posts with AI.", href: "/blog-writer", icon: "📄" },
  { title: "Twitter Thread Generator", description: "Engaging Twitter/X threads from any topic.", href: "/twitter-thread", icon: "🧵" },
  { title: "SEO Optimizer", description: "Analyze & optimize for search rankings.", href: "/seo-optimizer", icon: "🔍" },
  { title: "Social Post Generator", description: "LinkedIn, IG, Twitter & TikTok posts.", href: "/social-post", icon: "📢" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center pt-8 sm:pt-16 pb-4 animate-in-up space-y-5">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-[var(--color-text)]">
          Create Content That<br />
          <span className="bg-gradient-to-r from-[var(--color-coral-accent)] to-amber-400 bg-clip-text text-transparent">
            Actually Works
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
          Captions, prompts, blog posts, threads, SEO, and social. All AI-powered, all free. No signup needed.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <a href="/caption" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-coral-accent)] to-amber-500 hover:opacity-90 transition-opacity shadow-sm">
            ✨ Try Caption Generator
          </a>
          <a href="#tools" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
            View All Tools
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-8 sm:gap-12 py-4 text-center">
        <div><div className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">6</div><div className="text-xs text-[var(--color-text-tertiary)]">Free Tools</div></div>
        <div className="w-px bg-gray-200" />
        <div><div className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">0</div><div className="text-xs text-[var(--color-text-tertiary)]">Signups Required</div></div>
        <div className="w-px bg-gray-200" />
        <div><div className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">∞</div><div className="text-xs text-[var(--color-text-tertiary)]">Unlimited Use</div></div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.href} {...tool} delay={i} />
        ))}
      </div>
    </div>
  );
}
