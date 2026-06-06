"use client";

import { useState, useCallback } from "react";
import OutputDisplay from "@/components/OutputDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import { saveToHistory } from "@/lib/history";

type StreamEvent = { type: "chunk"; content: string } | { type: "done" } | { type: "error"; content: string };

interface SeoAnalysis {
  title: string;
  metaDescription: string;
  suggestions: string[];
  keywordDensity: { keyword: string; count: number; density: string }[];
  headingStructure: { issue: string; suggestion: string }[];
  readabilityScore: string;
}

function parseSeoAnalysis(text: string): SeoAnalysis {
  const res: SeoAnalysis = {
    title: "", metaDescription: "", suggestions: [],
    keywordDensity: [], headingStructure: [], readabilityScore: "",
  };

  const titleM = text.match(/^TITLE:\s*(.+)$/m);
  if (titleM) res.title = titleM[1].trim().slice(0, 120);

  const metaM = text.match(/^META:\s*(.+)$/m);
  if (metaM) res.metaDescription = metaM[1].trim().slice(0, 200);

  const readabilityM = text.match(/^READABILITY:\s*(.+)$/m);
  if (readabilityM) res.readabilityScore = readabilityM[1].trim().slice(0, 50);

  const suggM = text.match(/SUGGESTIONS:\n([\s\S]*?)(?=\n\w+\s*(?::|\n)|---CONTENT---)/);
  if (suggM) {
    res.suggestions = suggM[1].split("\n")
      .map(l => l.replace(/^-\s*/, "").trim())
      .filter(Boolean);
  }

  const kwSection = text.match(/KEYWORD DENSITY:\n([\s\S]*?)(?=\n\w+\s*(?::|\n)|---CONTENT---)/);
  if (kwSection) {
    const lines = kwSection[1].split("\n").filter(Boolean);
    for (const line of lines) {
      const m = line.match(/^(.+?):\s*(\d+)\s+occurrences?\s*\(([^)]+)\)/i);
      if (m) res.keywordDensity.push({ keyword: m[1].trim(), count: Number(m[2]), density: m[3].trim() });
    }
  }

  const hSection = text.match(/HEADINGS:\n([\s\S]*?)(?=\n---CONTENT---)/);
  if (hSection) {
    const lines = hSection[1].split("\n").filter(Boolean);
    for (const line of lines) {
      const m = line.match(/^(.+?)\s*->\s*(.+)$/);
      if (m) res.headingStructure.push({ issue: m[1].trim(), suggestion: m[2].trim() });
    }
  }

  return res;
}

const CONTENT_MARKER = "---CONTENT---";

export default function SeoOptimizerPage() {
  const [inputContent, setInputContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [contentType, setContentType] = useState("");
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);
  const [optimizedContent, setOptimizedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"analysis" | "optimized">("analysis");
  const [analysisDone, setAnalysisDone] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!inputContent.trim() || !targetKeyword.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setOptimizedContent("");
    setAnalysisDone(false);
    setActiveTab("analysis");

    try {
      const res = await fetch("/api/seo-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: inputContent.trim(),
          targetKeyword: targetKeyword.trim(),
          contentType,
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
      let markerFound = false;
      let analysisText = "";

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

            if (!markerFound) {
              const idx = full.indexOf(CONTENT_MARKER);
              if (idx !== -1) {
                markerFound = true;
                analysisText = full.slice(0, idx);
                const parsed = parseSeoAnalysis(analysisText);
                setAnalysis(parsed);
                setAnalysisDone(true);
                // Remaining content after marker
                const after = full.slice(idx + CONTENT_MARKER.length);
                setOptimizedContent(after);
              }
            } else {
              setOptimizedContent(full.slice(full.indexOf(CONTENT_MARKER) + CONTENT_MARKER.length));
            }
          } else if (event.type === "done") {
            if (!markerFound) {
              // No marker found — treat entire output as content
              setOptimizedContent(full);
              setAnalysisDone(true);
            }
            saveToHistory({ tool: "seo-optimizer", topic: targetKeyword.trim(), content: optimizedContent || full, charCount: 0 });
          } else if (event.type === "error") {
            throw new Error(event.content);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  }, [inputContent, targetKeyword, contentType, isLoading]);

  const handleRegenerate = useCallback(() => {
    if (inputContent && targetKeyword) handleGenerate();
  }, [inputContent, targetKeyword, handleGenerate]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI SEO Optimizer</h1>
        <p className="text-sm text-gray-500 mt-1">Analyze and optimize your content for search engines</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="seo-keyword" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Target Keyword</label>
          <input
            id="seo-keyword"
            type="text"
            value={targetKeyword}
            onChange={(e) => setTargetKeyword(e.target.value)}
            placeholder="e.g., best AI writing tools"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="seo-type" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Content Type (optional)</label>
          <input
            id="seo-type"
            type="text"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            placeholder="e.g., blog post, product page, landing page"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="seo-content" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Content to Analyze</label>
          <textarea
            id="seo-content"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Paste your content here (min 50 characters)..."
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[200px] resize-y"
            maxLength={10000}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !inputContent.trim() || !targetKeyword.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Analyzing..." : "Analyze & Optimize"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && !analysisDone && !optimizedContent && (
        <div className="border border-[var(--color-border)] rounded-xl p-8">
          <div className="space-y-3 animate-pulse">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-4/5" />
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-4 text-center">Analyzing your content...</p>
        </div>
      )}

      {(analysis || optimizedContent) && (
        <div className="space-y-6 animate-in">
          {/* Tab toggle */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                activeTab === "analysis" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab("optimized")}
              className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                activeTab === "optimized" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Optimized Content
            </button>
          </div>

          {activeTab === "analysis" && analysis && (
            <div className="space-y-4">
              {analysis.title && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Optimized Title</h2>
                  <p className="text-sm font-medium">{analysis.title}</p>
                </div>
              )}
              {analysis.metaDescription && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Meta Description</h2>
                  <p className="text-sm text-gray-600">{analysis.metaDescription}</p>
                </div>
              )}
              <div>
                <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Readability Score</h2>
                <p className="text-sm">{analysis.readabilityScore || "N/A"}</p>
              </div>
              {analysis.suggestions.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Suggestions</h2>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-400">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.keywordDensity.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Keyword Density</h2>
                  <div className="space-y-1">
                    {analysis.keywordDensity.map((k, i) => (
                      <div key={i} className="text-sm text-gray-600 flex gap-4">
                        <span className="font-medium min-w-[120px]">{k.keyword}</span>
                        <span>Count: {k.count}</span>
                        <span>Density: {k.density}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {analysis.headingStructure.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Heading Structure</h2>
                  <ul className="space-y-1">
                    {analysis.headingStructure.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        <span className="text-amber-600">*</span> {h.issue} - {h.suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!analysisDone && (
                <p className="text-xs text-gray-400 animate-pulse">Analysis updating...</p>
              )}
            </div>
          )}

          {activeTab === "optimized" && (
            <OutputDisplay
              content={optimizedContent}
              charCount={[...optimizedContent].length}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
              showCharCount={false}
            />
          )}

          <div className="mt-6">
            <HistoryPanel
              tool="seo-optimizer"
              onSelect={(item) => setOptimizedContent(item.content)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
