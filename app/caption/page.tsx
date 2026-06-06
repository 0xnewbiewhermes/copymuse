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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI Caption Generator</h1>
        <p className="text-sm text-gray-500 mt-1">Generate social media captions for Instagram, Twitter, and TikTok</p>
      </div>

      <GeneratorForm
        onGenerate={handleGenerate}
        isLoading={isLoading}
        placeholder="What's your post about?"
        buttonLabel="Generate Caption"
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {isLoading && !content && (
        <div className="p-8 text-center text-sm text-gray-400" role="status">
          <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
          Generating caption...
        </div>
      )}

      <OutputDisplay
        content={content}
        charCount={charCount}
        onRegenerate={handleRegenerate}
        isLoading={isLoading}
      />
    </div>
  );
}
