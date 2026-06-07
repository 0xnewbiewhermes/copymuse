import type { Metadata } from "next";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

const SITE_URL = "https://www.copymuse.digital";

export const metadata: Metadata = {
  title: {
    default: "Copymuse - Free AI Content Tools",
    template: "%s - Copymuse",
  },
  description: "Free AI-powered content creation tools: captions, prompts, blog posts, Twitter threads, SEO optimization, and social media posts. No signup required.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Copymuse - Free AI Content Tools",
    description: "Create better content faster with AI. Free tools for captions, prompts, blog posts, threads, SEO, and social media.",
    type: "website",
    url: SITE_URL,
    siteName: "Copymuse",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copymuse - Free AI Content Tools",
    description: "Create better content faster with AI. Free tools for captions, prompts, blog posts, threads, SEO, and social media.",
    creator: "@0xnewbiewhermes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "qD56RsCo1emAfAszPQudXAlFCo3TzAheHmqKezBIrJc",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Copymuse",
              description: "Free AI-powered content creation tools",
              url: "https://www.copymuse.digital",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-[var(--color-text)]">
        {/* Cursor follower */}
        <div id="cursor-follower" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Glassmorphism Nav */}
          <nav
            id="main-nav"
            className="gideon-nav flex items-center justify-between py-4 mb-8 sticky top-0 z-50 -mx-4 sm:-mx-6 px-4 sm:px-6"
            aria-label="Main navigation"
          >
            <a href="/" className="text-xl font-extrabold tracking-tight gideon-gradient-text hover:opacity-90 transition-opacity">
              Copymuse
            </a>
            <div className="hidden sm:flex gap-1 text-sm font-medium">
              <a href="/social-post" className="nav-link px-3.5 py-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Social</a>
              <a href="/prompt" className="nav-link px-3.5 py-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Prompt</a>
              <a href="/blog-writer" className="nav-link px-3.5 py-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Blog</a>
              <a href="/twitter-thread" className="nav-link px-3.5 py-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Thread</a>
              <a href="/seo-optimizer" className="nav-link px-3.5 py-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">SEO</a>
            </div>
            <MobileNav />
          </nav>

          {children}

          {/* Footer */}
          <footer className="mt-20 pt-8 pb-10 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--color-text)]">Copymuse</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">Free AI content tools</span>
              </div>
              <div className="flex gap-6">
                <a href="/social-post" className="hover:text-[var(--color-coral-accent)] transition-colors">Social</a>
                <a href="/prompt" className="hover:text-[var(--color-coral-accent)] transition-colors">Prompt</a>
                <a href="/blog-writer" className="hover:text-[var(--color-coral-accent)] transition-colors">Blog</a>
                <a href="/twitter-thread" className="hover:text-[var(--color-coral-accent)] transition-colors">Thread</a>
                <a href="/seo-optimizer" className="hover:text-[var(--color-coral-accent)] transition-colors">SEO</a>
              </div>
            </div>
          </footer>
        </div>

        {/* Global scripts: nav scroll, cursor, reveals */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            // Nav scroll
            var nav = document.getElementById('main-nav');
            if(nav) {
              window.addEventListener('scroll', function(){
                nav.classList.toggle('scrolled', window.scrollY > 30);
              });
            }

            // Cursor follower
            var cursor = document.getElementById('cursor-follower');
            if(cursor) {
              var mx = 0, my = 0, cx = 0, cy = 0;
              document.addEventListener('mousemove', function(e){
                mx = e.clientX; my = e.clientY;
                cursor.classList.add('visible');
              });
              document.addEventListener('mouseleave', function(){
                cursor.classList.remove('visible');
              });
              function anim(){
                cx += (mx - cx) * 0.12;
                cy += (my - cy) * 0.12;
                cursor.style.left = cx + 'px';
                cursor.style.top = cy + 'px';
                requestAnimationFrame(anim);
              }
              anim();
              document.querySelectorAll('a, button, .gideon-card, .tool-card').forEach(function(el){
                el.addEventListener('mouseenter', function(){ cursor.classList.add('hovering'); });
                el.addEventListener('mouseleave', function(){ cursor.classList.remove('hovering'); });
              });
            }

            // IntersectionObserver for reveals
            var obs = new IntersectionObserver(function(entries){
              entries.forEach(function(entry){
                if(entry.isIntersecting) {
                  if(entry.target.classList.contains('stagger')) {
                    entry.target.classList.add('visible');
                  } else {
                    entry.target.classList.add('visible');
                  }
                }
              });
            }, { threshold: 0.12 });
            document.querySelectorAll('.reveal, .stagger').forEach(function(el){ obs.observe(el); });
          })();
        `}} />
      </body>
    </html>
  );
}
