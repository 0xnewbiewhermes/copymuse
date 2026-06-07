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

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="gideon-input"
          disabled={isLoading}
          aria-label="Topic"
          autoComplete="off"
          name="topic"
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="gideon-btn gideon-btn-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
