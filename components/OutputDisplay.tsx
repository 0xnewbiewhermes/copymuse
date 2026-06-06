"use client";

import { useState, useRef, useEffect } from "react";
import { IconCopy, IconCheck, IconRefresh } from "./icons";

interface Props {
  content: string;
  charCount: number;
  onRegenerate: () => void;
  isLoading: boolean;
  showCharCount?: boolean;
  maxChars?: number;
}

export default function OutputDisplay({
  content,
  charCount,
  onRegenerate,
  isLoading,
  showCharCount = true,
  maxChars,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = content;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Result</h2>
        {showCharCount && (
          <span className="text-xs tabular-nums text-gray-400">
            {charCount}{maxChars ? ` / ${maxChars}` : ""}
          </span>
        )}
      </div>

      <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
        <pre className="whitespace-pre-wrap text-sm text-gray-900 leading-relaxed font-sans">
          {content}
        </pre>
      </div>

      <div className="flex gap-3">
        <button onClick={handleCopy} className="flex-1 px-4 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-[var(--color-coral-accent)] to-amber-500 hover:opacity-90 flex items-center justify-center gap-2 transition-all shadow-sm">
          {copied ? (
            <><IconCheck className="w-4 h-4" /> Copied</>
          ) : (
            <><IconCopy className="w-4 h-4" /> Copy</>
          )}
        </button>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          aria-label="Regenerate"
          className="px-4 py-2 border border-gray-200 text-sm font-medium rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <IconRefresh className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
}
