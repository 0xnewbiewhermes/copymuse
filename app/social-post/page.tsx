"use client";

import { useState, useCallback } from "react";
import ToneSelector from "@/components/ToneSelector";
import OutputDisplay from "@/components/OutputDisplay";
import { SOCIAL_PLATFORMS, getCharLimit, type SocialPlatform } from "@/lib/prompts/social-post";
import type { Tone } from "@/lib/types";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

export default function SocialPostPage() {
  const [platform, setPlatform] = useState<SocialPlatform>("linkedin");
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI Social Post Generator</h1>
        <p className="text-sm text-gray-500 mt-1">Generate platform-optimized social media posts</p>
      </div>

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
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  platform === p.id ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        <ToneSelector selected={tone} onSelect={setTone} customTone={customTone} onCustomToneChange={setCustomTone} />

        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What's your post about?"
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            Generate
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {isLoading && !content && (
        <div className="p-8 text-center text-sm text-gray-400" role="status">
          <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
          Writing post...
        </div>
      )}

      <OutputDisplay
        content={content}
        charCount={charCount}
        maxChars={charLimit}
        onRegenerate={handleRegenerate}
        isLoading={isLoading}
      />
    </div>
  );
}
