"use client";

import { useState, useCallback } from "react";
import OutputDisplay from "@/components/OutputDisplay";

export default function TwitterThreadPage() {
  const [topic, setTopic] = useState("");
  const [threadLength, setThreadLength] = useState(5);
  const [result, setResult] = useState<{ tweets: string[]; totalTweets: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setDisplayText("");

    try {
      const res = await fetch("/api/twitter-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), threadLength }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setResult(data);
      const text = data.tweets?.map((t: string, i: number) => `${i + 1}/${data.totalTweets}\n${t}`).join("\n\n") || "";
      setDisplayText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsLoading(false);
    }
  }, [topic, threadLength, isLoading]);

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
          <div className="flex gap-2" role="radiogroup" aria-label="Thread length">
            {LENGTH_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setThreadLength(n)}
                aria-pressed={threadLength === n}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
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

      {result && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">{result.totalTweets} tweets generated</p>
        </div>
      )}

      <OutputDisplay
        content={displayText}
        charCount={[...displayText].length}
        onRegenerate={handleRegenerate}
        isLoading={isLoading}
        showCharCount={false}
      />
    </div>
  );
}
