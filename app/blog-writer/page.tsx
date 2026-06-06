"use client";

import { useState, useCallback } from "react";
import ToneSelector from "@/components/ToneSelector";
import OutputDisplay from "@/components/OutputDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import { saveToHistory } from "@/lib/history";
import type { Tone } from "@/lib/types";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

export default function BlogWriterPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [customTone, setCustomTone] = useState("");
  const [length, setLength] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayContent, setDisplayContent] = useState("");

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          let event: StreamEvent;
          try {
            event = JSON.parse(line);
          } catch {
            continue;
          }
          if (event.type === "chunk") {
            full += event.content;
            setDisplayContent(full);
          } else if (event.type === "done") {
            saveToHistory({ tool: "blog-writer", topic: topic.trim(), content: full, charCount: [...full].length });
          } else if (event.type === "error") {
            throw new Error(event.content);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setDisplayContent("");
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

      {/* Loading skeleton */}
      {isLoading && !displayContent && (
        <div className="border border-[var(--color-border)] rounded-xl p-8">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-2/3" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-4 text-center">Writing your blog post...</p>
        </div>
      )}

      {(displayContent || (!isLoading && error)) && (
        <div className="space-y-4 animate-in">
          <OutputDisplay
            content={displayContent}
            charCount={[...displayContent].length}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
            showCharCount={false}
          />
          <div className="mt-4">
            <HistoryPanel
              tool="blog-writer"
              onSelect={(item) => setDisplayContent(item.content)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
