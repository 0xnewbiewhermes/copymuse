import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://copymuse.digital";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/caption`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/prompt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog-writer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/twitter-thread`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/seo-optimizer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/social-post`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
}
