import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.copymuse.digital";

export const metadata: Metadata = {
  title: "MergeProof — Know what you're merging",
  description: "Evidence gates for AI-assisted pull requests. Map acceptance criteria to implementation and test evidence before merge.",
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/icon.svg" },
  openGraph: { title: "MergeProof — Know what you're merging", description: "Evidence gates for AI-assisted pull requests.", type: "website", url: SITE_URL, siteName: "CopyMuse" },
  twitter: { card: "summary_large_image", title: "MergeProof — Know what you're merging", description: "Evidence gates for AI-assisted pull requests." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen bg-[#fbfbfe] antialiased">{children}<footer className="border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-500">MergeProof is a CopyMuse product · Built for teams shipping AI-assisted code.</footer></body></html>;
}