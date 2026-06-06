"use client";

import { useState, useCallback } from "react";
import ToneSelector from "@/components/ToneSelector";
import OutputDisplay from "@/components/OutputDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import { saveToHistory } from "@/lib/history";
import { SOCIAL_PLATFORMS, getCharLimit, type SocialPlatform } from "@/lib/prompts/social-post";
import type { Tone } from "@/lib/types";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

export default function SocialPostPage() {
  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [tone, setTone] = useState<Tone>("casual");
  const [customTone, setCustomTone] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTopic, setLastTopic] = useState("");
  const [lastTone, setLastTone] = useState<Tone>("casual");
  const [lastCustomTone, setLastCustomTone] = useState("");

  const handleGenerate = useCallback(async (inputTopic: string, inputTone: Tone, inputCustomTone: string) => {
    if (!inputTopic.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setContent("");
    setLastTopic(inputTopic);
    setLastTone(inputTone);
    setLastCustomTone(inputCustomTone);

    try {
      const res = await fetch("/api/social-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: inputTopic,
          platform,
          tone: inputTone,
          customTone: inputTone === "custom" ? inputCustomTone : undefined,
          stream: true,
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
            setContent(full);
          } else if (event.type === "done") {
            setCharCount([...full].length);
            saveToHistory({ tool: "social-post", topic: inputTopic, content: full, charCount: [...full].length });
          } else if (event.type === "error") {
            throw new Error(event.content);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setContent("");
    } finally {
      setIsLoading(false);
    }
  }, [platform, isLoading]);

  const handleRegenerate = useCallback(() => {
    if (lastTopic) handleGenerate(lastTopic, lastTone, lastCustomTone);
  }, [lastTopic, lastTone, lastCustomTone, handleGenerate]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(topic, tone, customTone);
  }, [topic, tone, customTone, handleGenerate]);

  const charLimit = getCharLimit(platform);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-lg mx-auto space-y-1.5 sm:space-y-2">
        <span className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[var(--color-coral-accent)] bg-[var(--color-coral-light)]">
          Tool
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Social Media Content
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
          Captions and posts for Instagram, TikTok, Twitter/X, and LinkedIn
        </p>
      </div>

      {/* Generator */}
      <div className="max-w-xl mx-auto space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</span>
            <div className="flex gap-2" role="radiogroup" aria-label="Social platform">
              {SOCIAL_PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  aria-pressed={platform === p.id}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors inline-flex items-center gap-2 ${
                    platform === p.id
                      ? "bg-[var(--color-coral-accent)] text-white border-[var(--color-coral-accent)]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-coral-accent)]"
                  }`}
                >
                  {p.icon.startsWith("/") ? (
                    <img src={p.icon} alt="" className="w-5 h-5" />
                  ) : (
                    <span>{p.icon}</span>
                  )}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <ToneSelector selected={tone} onSelect={setTone} customTone={customTone} onCustomToneChange={setCustomTone} />

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What's your post about?"
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-coral-accent)]/30 focus:border-[var(--color-coral-accent)]"
              maxLength={500}
              autoComplete="off"
              name="topic"
            />
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold rounded-full text-white bg-[var(--color-coral-accent)] hover:bg-[var(--color-coral-600)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              Generate
            </button>
          </div>
        </form>

        {platform !== "twitter" && (
          <p className="text-[11px] text-gray-400 text-center">
            Max {charLimit.toLocaleString()} characters
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-xl mx-auto">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && !content && (
        <div className="max-w-xl mx-auto">
          <div className="border border-[var(--color-border)] rounded-xl p-8">
            <div className="space-y-3 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-4 text-center">Writing your post...</p>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="max-w-xl mx-auto">
        <OutputDisplay
          content={content}
          charCount={charCount}
          maxChars={charLimit}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
        <div className="mt-4">
          <HistoryPanel
            tool="social-post"
            onSelect={(item) => {
              setContent(item.content);
              setCharCount(item.charCount);
            }}
          />
        </div>
      </div>
    </div>
  );
}
