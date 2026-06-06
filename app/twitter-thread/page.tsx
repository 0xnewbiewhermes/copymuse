"use client";

import { useState, useCallback } from "react";
import OutputDisplay from "@/components/OutputDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import { saveToHistory } from "@/lib/history";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

export default function TwitterThreadPage() {
  const [topic, setTopic] = useState("");
  const [threadLength, setThreadLength] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");

  const formatThread = useCallback((raw: string) => {
    const tweets = raw.split(/^---$/m).map(t => t.trim()).filter(Boolean);
    return tweets.map((t, i) => `${i + 1}\n${t}`).join("\n\n");
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setDisplayText("");

    try {
      const res = await fetch("/api/twitter-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), threadLength }),
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
            setDisplayText(formatThread(full));
          } else if (event.type === "done") {
            saveToHistory({ tool: "twitter-thread", topic: topic.trim(), content: formatThread(full), charCount: [...full].length });
          } else if (event.type === "error") {
            throw new Error(event.content);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setDisplayText("");
    } finally {
      setIsLoading(false);
    }
  }, [topic, threadLength, isLoading, formatThread]);

  const handleRegenerate = useCallback(() => {
    if (topic) handleGenerate();
  }, [topic, handleGenerate]);

  const LENGTH_OPTIONS = [3, 5, 7, 10, 15];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI Twitter Thread Generator</h1>
        <p className="text-sm text-gray-500 mt-1">Create engaging Twitter/X threads from any topic</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Thread Length</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Thread length">
            {LENGTH_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setThreadLength(n)}
                aria-pressed={threadLength === n}
                className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-colors ${
                  threadLength === n ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {n} tweets
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="thread-topic" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</label>
          <textarea
            id="thread-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What's the thread about?"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[60px] resize-y"
            maxLength={1000}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Writing thread..." : "Generate Thread"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && !displayText && (
        <div className="border border-[var(--color-border)] rounded-xl p-8">
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-12" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-4 text-center">Writing your thread...</p>
        </div>
      )}

      {(displayText || (!isLoading && error)) && (
        <>
          <OutputDisplay
            content={displayText}
            charCount={[...displayText].length}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
            showCharCount={false}
          />
          <div className="mt-4">
            <HistoryPanel
              tool="twitter-thread"
              onSelect={(item) => setDisplayText(item.content)}
            />
          </div>
        </>
      )}
    </div>
  );
}
