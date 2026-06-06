import ToolCard from "@/components/ToolCard";

const TOOLS = [
  { title: "Caption Generator", description: "Generate social media captions for Instagram, Twitter, and TikTok.", href: "/caption", icon: "📝" },
  { title: "Master Prompt Generator", description: "Create optimized prompts for ChatGPT, Claude, Gemini, and more.", href: "/prompt", icon: "✨" },
  { title: "Blog Writer", description: "Write SEO-optimized blog posts with AI assistance.", href: "/blog-writer", icon: "📄" },
  { title: "Twitter Thread Generator", description: "Create engaging Twitter/X threads from any topic.", href: "/twitter-thread", icon: "🧵" },
  { title: "SEO Optimizer", description: "Analyze and optimize your content for better search rankings.", href: "/seo-optimizer", icon: "🔍" },
  { title: "Social Post Generator", description: "Generate platform-optimized posts for LinkedIn, Instagram, Twitter, and TikTok.", href: "/social-post", icon: "📢" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">AI Content Tools, Free</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Create better content faster. Captions, prompts, blog posts, and threads — all powered by AI, all free.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  );
}
