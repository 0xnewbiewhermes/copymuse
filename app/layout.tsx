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
      <body className="antialiased min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <nav className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100" aria-label="Main navigation">
            <a href="/" className="font-bold text-lg tracking-tight hover:text-gray-600 transition-colors">
              Copymuse
            </a>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="/caption" className="hover:text-gray-800 transition-colors">Caption</a>
              <a href="/prompt" className="hover:text-gray-800 transition-colors">Prompt</a>
              <a href="/blog-writer" className="hover:text-gray-800 transition-colors">Blog</a>
              <a href="/twitter-thread" className="hover:text-gray-800 transition-colors">Thread</a>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
