import ToolCard from "@/components/ToolCard";

function IconPen() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
}
function IconSparkle() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M12 3v4m0 10v4M5 12H3m18 0h-2M7.05 7.05 5.64 5.64m12.72 12.72-1.41-1.41M7.05 16.95l-1.41 1.41M16.95 7.05l1.41-1.41"/></svg>;
}
function IconDoc() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M10 9H8"/></svg>;
}
function IconThread() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h6"/></svg>;
}
function IconSearch() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
function IconMegaphone() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="m3 11 18-5v12L3 13v-2Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>;
}

const TOOLS = [
  { title: "Caption Generator", description: "Instagram, Twitter, and TikTok captions.", href: "/caption", icon: <IconPen /> },
  { title: "Master Prompt Generator", description: "Optimized prompts for ChatGPT, Claude, Gemini.", href: "/prompt", icon: <IconSparkle /> },
  { title: "Blog Writer", description: "SEO-optimized blog posts with AI.", href: "/blog-writer", icon: <IconDoc /> },
  { title: "Twitter Thread Generator", description: "Engaging Twitter/X threads from any topic.", href: "/twitter-thread", icon: <IconThread /> },
  { title: "SEO Optimizer", description: "Analyze & optimize for search rankings.", href: "/seo-optimizer", icon: <IconSearch /> },
  { title: "Social Post Generator", description: "LinkedIn, IG, Twitter & TikTok posts.", href: "/social-post", icon: <IconMegaphone /> },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center pt-8 sm:pt-24 pb-6 animate-in-up space-y-5 sm:space-y-6">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] sm:leading-[1.05] text-[var(--color-text)] text-balance">
          Create Content That<br />
          <span className="text-[var(--color-coral-accent)]">
            Actually Works
          </span>
        </h1>
        <p className="text-sm sm:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed px-2">
          Captions, prompts, blog posts, threads, SEO, and social. All AI-powered, all free. No signup needed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center pt-2">
          <a href="/caption" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--color-coral-accent)] hover:bg-[var(--color-coral-600)] transition-colors">
            Try Caption Generator
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.href} {...tool} delay={i} />
        ))}
      </div>
    </div>
  );
}
