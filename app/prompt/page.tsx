"use client";

import { useState, useCallback } from "react";
import { generatePrompt, AI_TARGETS, type TargetAI } from "@/lib/prompts/prompt";
import OutputDisplay from "@/components/OutputDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import { saveToHistory } from "@/lib/history";

export default function PromptPage() {
  const [targetAI, setTargetAI] = useState<TargetAI>("universal");
  const [request, setRequest] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequest, setLastRequest] = useState("");

  const handleGenerate = useCallback(() => {
    if (!request.trim() || isLoading) return;
    setIsLoading(true);
    setOutput("");
    setLastRequest(request);

    // Simulate brief delay for UX (generation is client-side, instant)
    setTimeout(() => {
      const prompt = generatePrompt(request, targetAI);
      setOutput(prompt);
      saveToHistory({ tool: "prompt", topic: request, content: prompt, charCount: [...prompt].length });
      setIsLoading(false);
    }, 300);
  }, [request, targetAI, isLoading]);

  const handleRegenerate = useCallback(() => {
    if (lastRequest) {
      setIsLoading(true);
      setOutput("");
      setTimeout(() => {
        const prompt = generatePrompt(lastRequest, targetAI);
        setOutput(prompt);
        saveToHistory({ tool: "prompt", topic: lastRequest, content: prompt, charCount: [...prompt].length });
        setIsLoading(false);
      }, 300);
    }
  }, [lastRequest, targetAI]);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-lg mx-auto space-y-3">
        <h1 className="text-2xl font-bold">AI Master Prompt Generator</h1>
        <p className="text-sm text-gray-500">Generate optimized prompts for ChatGPT, Claude, Gemini, and more</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Target AI</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Target AI">
            {AI_TARGETS.map((ai) => (
              <button
                key={ai.id}
                onClick={() => setTargetAI(ai.id)}
                aria-pressed={targetAI === ai.id}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors inline-flex items-center gap-1.5 sm:gap-2 ${
                  targetAI === ai.id
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {ai.icon.startsWith("/") ? (
                  <img src={ai.icon} alt="" className="w-5 h-5" />
                ) : (
                  <span>{ai.icon}</span>
                )}
                <span>{ai.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="prompt-request" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            What do you need?
          </label>
          <textarea
            id="prompt-request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Describe what you want the AI to help you with..."
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[80px] resize-y"
            disabled={isLoading}
            maxLength={1000}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !request.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Master Prompt"}
        </button>
      </div>

      <OutputDisplay
        content={output}
        charCount={[...output].length}
        onRegenerate={handleRegenerate}
        isLoading={isLoading}
        showCharCount={false}
      />
      <div className="mt-4">
        <HistoryPanel
          tool="prompt"
          onSelect={(item) => setOutput(item.content)}
        />
      </div>
    </div>
  );
}
