"use client";

import { useState } from "react";
import ToneSelector from "./ToneSelector";
import type { Tone } from "@/lib/types";
import { IconSend } from "./icons";

interface Props {
  onGenerate: (topic: string, tone: Tone, customTone: string) => void;
  isLoading: boolean;
  showTone?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  maxLength?: number;
}

export default function GeneratorForm({
  onGenerate,
  isLoading,
  showTone = true,
  placeholder = "Enter your topic...",
  buttonLabel = "Generate",
  maxLength = 500,
}: Props) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("casual");
  const [customTone, setCustomTone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onGenerate(topic.trim(), tone, customTone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showTone && (
        <ToneSelector
          selected={tone}
          onSelect={setTone}
          customTone={customTone}
          onCustomToneChange={setCustomTone}
        />
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          disabled={isLoading}
          aria-label="Topic"
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <IconSend className="w-4 h-4" />
          )}
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
