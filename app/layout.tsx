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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-6">
          <nav className="flex items-center justify-between mb-12 pb-5 border-b border-gray-100" aria-label="Main navigation">
            <a href="/" className="font-extrabold text-xl tracking-tight text-[var(--color-coral-accent)] hover:opacity-80 transition-opacity">
              Copymuse
            </a>
            <div className="hidden sm:flex gap-1 text-sm">
              <a href="/caption" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">Caption</a>
              <a href="/prompt" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">Prompt</a>
              <a href="/blog-writer" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">Blog</a>
              <a href="/twitter-thread" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">Thread</a>
              <a href="/seo-optimizer" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">SEO</a>
              <a href="/social-post" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors">Social</a>
            </div>
            {/* Mobile hamburger */}
            <MobileNav />
          </nav>
          {children}

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-100 text-xs text-[var(--color-text-tertiary)]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--color-text)]">Copymuse</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">Free AI content tools</span>
              </div>
              <div className="flex gap-4">
                <a href="/caption" className="hover:text-[var(--color-coral-accent)] transition-colors">Caption</a>
                <a href="/prompt" className="hover:text-[var(--color-coral-accent)] transition-colors">Prompt</a>
                <a href="/blog-writer" className="hover:text-[var(--color-coral-accent)] transition-colors">Blog</a>
                <a href="/twitter-thread" className="hover:text-[var(--color-coral-accent)] transition-colors">Thread</a>
                <a href="/seo-optimizer" className="hover:text-[var(--color-coral-accent)] transition-colors">SEO</a>
                <a href="/social-post" className="hover:text-[var(--color-coral-accent)] transition-colors">Social</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
