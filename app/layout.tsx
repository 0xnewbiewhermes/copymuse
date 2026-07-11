import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.copymuse.digital";

export const metadata: Metadata = {
  title: "MergeProof — Know what you're merging",
  description: "Evidence gates for AI-assisted pull requests. Map acceptance criteria to implementation and test evidence before merge.",
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/icon.svg?v=mergeproof-2" },
  openGraph: { title: "MergeProof — Know what you're merging", description: "Evidence gates for AI-assisted pull requests.", type: "website", url: SITE_URL, siteName: "CopyMuse" },
  twitter: { card: "summary_large_image", title: "MergeProof — Know what you're merging", description: "Evidence gates for AI-assisted pull requests." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet" /></head><body className="min-h-screen antialiased">{children}<footer className="border-t border-[#1c1b19]/15 bg-[#f4f2ed] px-5 py-8 text-center text-xs tracking-wide text-[#817a70]">MergeProof is a CopyMuse product · Built for teams shipping AI-assisted code.</footer></body></html>;
}