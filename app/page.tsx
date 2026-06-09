import Link from "next/link";
import ToolCard from "@/components/ToolCard";

function IconPen() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
}
function IconSparkle() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M12 3v4m0 10v4M5 12H3m18 0h-2M7.05 7.05 5.64 5.64m12.72 12.72-1.41-1.41M7.05 16.95l-1.41 1.41M16.95 7.05l1.41-1.41"/></svg>;
}
function IconDoc() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M10 9H8"/></svg>;
}
function IconThread() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h6"/></svg>;
}
function IconSearch() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
function IconBolt() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}

const TOOLS = [
  { title: "Social Media Content", description: "Posts & captions for Instagram, TikTok, Twitter, LinkedIn.", href: "/social-post", icon: <IconPen /> },
  { title: "Master Prompt Generator", description: "Optimized prompts for ChatGPT, Claude, Gemini.", href: "/prompt", icon: <IconSparkle /> },
  { title: "Blog Writer", description: "SEO-optimized blog posts with AI.", href: "/blog-writer", icon: <IconDoc /> },
  { title: "Twitter Thread Generator", description: "Engaging Twitter/X threads from any topic.", href: "/twitter-thread", icon: <IconThread /> },
  { title: "SEO Optimizer", description: "Analyze & optimize for search rankings.", href: "/seo-optimizer", icon: <IconSearch /> },
  { title: "AI Image Prompts", description: "Generate detailed image prompts for Midjourney, DALL-E, SD.", href: "/social-post", icon: <IconBolt /> },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="text-center pt-6 sm:pt-16 pb-4 space-y-5 sm:space-y-6">
        <p className="text-xs font-semibold text-[var(--color-coral-accent)] uppercase tracking-[2px] reveal">AI Content Suite · No Signup Needed</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[var(--color-text)] reveal">
          Create Content That<br />
          <span className="gideon-gradient-text">Actually Works</span>
        </h1>
        <p className="text-sm sm:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed reveal">
          Captions, prompts, blog posts, threads, SEO, and social. All AI-powered, all free. No signup needed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 reveal">
          <Link href="/social-post" className="gideon-btn">Explore tools →</Link>
          <Link href="/social-post" className="gideon-btn gideon-btn-ghost">Try Social Media</Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.href} {...tool} delay={i} />
        ))}
      </div>

      {/* Features */}
      <div className="pt-8 pb-4 space-y-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center reveal tracking-tight">Why Copymuse?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger">
          {[
            { icon: "⚡", title: "Blazing Fast", desc: "AI-powered generation in seconds. No queues, no waiting." },
            { icon: "🔓", title: "Completely Free", desc: "No signup, no credit card, no hidden limits." },
            { icon: "🎯", title: "Purpose-Built", desc: "Each tool is crafted for a specific content need." },
          ].map((f, i) => (
            <div key={i} className="text-center px-4" style={{animation: i === 0 ? '' : ''}}>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-coral-light)] flex items-center justify-center mx-auto mb-4 text-lg">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed max-w-[220px] mx-auto">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8 pb-4 reveal">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">Start creating in seconds</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">No account. No credit card. Just pick a tool and go.</p>
        <Link href="/social-post" className="gideon-btn">Try Social Media Content →</Link>
      </div>
    </div>
  );
}
