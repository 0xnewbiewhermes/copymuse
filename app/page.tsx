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
      <div className="text-center pt-12 sm:pt-24 pb-6 animate-in-up space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[var(--color-text)]">
          Create Content That<br />
          <span className="text-[var(--color-coral-accent)]">
            Actually Works
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
          Captions, prompts, blog posts, threads, SEO, and social. All AI-powered, all free. No signup needed.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <a href="/caption" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--color-coral-accent)] hover:bg-[var(--color-coral-600)] transition-colors">
            Try Caption Generator
          </a>
          <a href="#tools" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-coral-accent)] hover:text-[var(--color-coral-accent)] transition-colors">
            View All Tools
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.href} {...tool} delay={i} variant={tool.href === "/caption" ? "featured" : "default"} />
        ))}
      </div>
    </div>
  );
}
