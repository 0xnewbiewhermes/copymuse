"use client";

import { useState, useCallback } from "react";
import OutputDisplay from "@/components/OutputDisplay";

interface SeoResult {
  title: string;
  metaDescription: string;
  suggestions: string[];
  keywordDensity: { keyword: string; count: number; density: string }[];
  headingStructure: { issue: string; suggestion: string }[];
  readabilityScore: string;
  optimizedContent: string;
}

export default function SeoOptimizerPage() {
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [contentType, setContentType] = useState("");
  const [result, setResult] = useState<SeoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"analysis" | "optimized">("analysis");

  const handleGenerate = useCallback(async () => {
    if (!content.trim() || !targetKeyword.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/seo-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          targetKeyword: targetKeyword.trim(),
          contentType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  }, [content, targetKeyword, contentType, isLoading]);

  const handleRegenerate = useCallback(() => {
    if (content && targetKeyword) handleGenerate();
  }, [content, targetKeyword, handleGenerate]);

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your content here (min 50 characters)..."
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[200px] resize-y"
            maxLength={10000}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !content.trim() || !targetKeyword.trim()}
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

      {result && (
        <div className="space-y-6 animate-in">
          {/* Tab toggle */}
          <div className="flex gap-2 border-b border-gray-200 pb-2">
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

          {activeTab === "analysis" && (
            <div className="space-y-4">
              {result.title && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Optimized Title</h2>
                  <p className="text-sm font-medium">{result.title}</p>
                </div>
              )}
              {result.metaDescription && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Meta Description</h2>
                  <p className="text-sm text-gray-600">{result.metaDescription}</p>
                </div>
              )}
              <div>
                <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Readability Score</h2>
                <p className="text-sm">{result.readabilityScore}</p>
              </div>
              {result.suggestions.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Suggestions</h2>
                  <ul className="space-y-1">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-400">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.keywordDensity.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Keyword Density</h2>
                  <div className="space-y-1">
                    {result.keywordDensity.map((k, i) => (
                      <div key={i} className="text-sm text-gray-600 flex gap-4">
                        <span className="font-medium min-w-[120px]">{k.keyword}</span>
                        <span>Count: {k.count}</span>
                        <span>Density: {k.density}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.headingStructure.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Heading Structure</h2>
                  <ul className="space-y-1">
                    {result.headingStructure.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        <span className="text-amber-600">*</span> {h.issue} - {h.suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "optimized" && (
            <OutputDisplay
              content={result.optimizedContent}
              charCount={[...result.optimizedContent].length}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
              showCharCount={false}
            />
          )}
        </div>
      )}
    </div>
  );
}
