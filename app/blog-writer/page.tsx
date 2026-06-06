"use client";

import { useState, useCallback } from "react";
import ToneSelector from "@/components/ToneSelector";
import OutputDisplay from "@/components/OutputDisplay";
import type { Tone } from "@/lib/types";

interface BlogResult {
  title: string;
  content: string;
  metaDescription?: string;
  keywords: string[];
  estimatedReadTime: string;
}

export default function BlogWriterPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [customTone, setCustomTone] = useState("");
  const [length, setLength] = useState(1);
  const [result, setResult] = useState<BlogResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayContent, setDisplayContent] = useState("");

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setDisplayContent("");

    try {
      const res = await fetch("/api/blog-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          length,
          keywords: keywords.split(",").map(k => k.trim()).filter(Boolean),
          tone,
          customTone: tone === "custom" ? customTone : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setResult(data);
      setDisplayContent(data.content || JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsLoading(false);
    }
  }, [topic, keywords, tone, customTone, length, isLoading]);

  const handleRegenerate = useCallback(() => {
    if (topic) handleGenerate();
  }, [topic, handleGenerate]);

  const LENGTH_LABELS = ["Short", "Medium", "Long"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI Blog Writer</h1>
        <p className="text-sm text-gray-500 mt-1">Generate SEO-optimized blog posts with AI</p>
      </div>

      <div className="space-y-4">
        <ToneSelector selected={tone} onSelect={setTone} customTone={customTone} onCustomToneChange={setCustomTone} />

        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Length</span>
          <div className="flex gap-2" role="radiogroup" aria-label="Post length">
            {LENGTH_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setLength(i)}
                aria-pressed={length === i}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  length === i ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="blog-topic" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</label>
          <input
            id="blog-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What's your blog post about?"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            maxLength={2000}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="blog-keywords" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords (comma separated)</label>
          <input
            id="blog-keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., AI writing, content marketing, SEO tips"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Writing..." : "Generate Blog Post"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-in">
          <h2 className="text-xl font-bold">{result.title}</h2>
          {result.metaDescription && (
            <p className="text-sm text-gray-500 italic">{result.metaDescription}</p>
          )}
          <OutputDisplay
            content={displayContent}
            charCount={[...displayContent].length}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
            showCharCount={false}
          />
        </div>
      )}
    </div>
  );
}
