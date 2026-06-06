"use client";

import { useState, useCallback } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import OutputDisplay from "@/components/OutputDisplay";
import type { Tone } from "@/lib/types";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

export default function CaptionPage() {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTopic, setLastTopic] = useState("");
  const [lastTone, setLastTone] = useState<Tone>("casual");
  const [lastCustomTone, setLastCustomTone] = useState("");

  const handleGenerate = useCallback(async (topic: string, tone: Tone, customTone: string) => {
    setIsLoading(true);
    setError(null);
    setContent("");
    setLastTopic(topic);
    setLastTone(tone);
    setLastCustomTone(customTone);

    try {
      const res = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform: "instagram",
          tone,
          customTone: tone === "custom" ? customTone : undefined,
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
  }, []);

  const handleRegenerate = useCallback(() => {
    if (lastTopic) handleGenerate(lastTopic, lastTone, lastCustomTone);
  }, [lastTopic, lastTone, lastCustomTone, handleGenerate]);

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider text-[var(--color-coral-accent)] bg-[var(--color-coral-light)]">
          Tool
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Caption Generator
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Instagram, Twitter, and TikTok captions in seconds
        </p>
      </div>

      {/* Generator */}
      <div className="max-w-xl mx-auto">
        <GeneratorForm
          onGenerate={handleGenerate}
          isLoading={isLoading}
          placeholder="What's your post about?"
          buttonLabel="Generate Caption"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-xl mx-auto">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !content && (
        <div className="max-w-xl mx-auto">
          <div className="border border-[var(--color-border)] rounded-xl p-8">
            <div className="space-y-3 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-4 text-center">Writing your caption...</p>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="max-w-xl mx-auto">
        <OutputDisplay
          content={content}
          charCount={charCount}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
