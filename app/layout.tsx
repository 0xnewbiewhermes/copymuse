import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copymuse — Free AI Content Tools",
  description: "Free AI-powered content creation tools: captions, prompts, blog posts, Twitter threads, SEO optimization, and social media posts. No signup required.",
  metadataBase: new URL("https://copymuse.digital"),
  openGraph: {
    title: "Copymuse — Free AI Content Tools",
    description: "Create better content faster with AI. Free tools for captions, prompts, blog posts, threads, SEO, and social media.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copymuse — Free AI Content Tools",
    description: "Create better content faster with AI. Free tools for captions, prompts, blog posts, threads, SEO, and social media.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Copymuse",
              description: "Free AI-powered content creation tools",
              url: "https://copymuse.digital",
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
            <a href="/" className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[var(--color-coral-accent)] to-amber-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Copymuse
            </a>
            <div className="hidden sm:flex gap-1 text-sm">
              <a href="/caption" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">Caption</a>
              <a href="/prompt" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">Prompt</a>
              <a href="/blog-writer" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">Blog</a>
              <a href="/twitter-thread" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">Thread</a>
              <a href="/seo-optimizer" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">SEO</a>
              <a href="/social-post" className="px-3.5 py-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">Social</a>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
