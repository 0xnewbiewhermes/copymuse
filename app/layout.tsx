import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copymuse — AI Content Tools",
  description: "Free AI tools for content creation: captions, prompts, blog posts, threads, SEO, and social media.",
  metadataBase: new URL("https://copymuse.digital"),
  openGraph: {
    title: "Copymuse — Free AI Content Tools",
    description: "Free AI tools for content creation: captions, prompts, blog posts, threads, SEO, and social media.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copymuse — Free AI Content Tools",
    description: "Free AI tools for content creation: captions, prompts, blog posts, threads, SEO, and social media.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-gray-900">
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
