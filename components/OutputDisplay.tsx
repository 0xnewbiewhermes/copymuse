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
        <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Result</h2>
        {showCharCount && (
          <span className="text-xs tabular-nums text-[var(--color-text-tertiary)]">
            {charCount}{maxChars ? ` / ${maxChars}` : ""}
          </span>
        )}
      </div>

      <div className="gideon-output">
        <pre className="whitespace-pre-wrap break-words text-sm text-[var(--color-text)] leading-relaxed font-sans">
          {content}
        </pre>
      </div>

      <div className="flex gap-3">
        <button onClick={handleCopy} className="gideon-btn flex-1">
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
          className="px-4 py-2 border border-[var(--color-border)] text-sm font-medium rounded-lg hover:bg-[var(--color-surface-muted)] disabled:opacity-50 transition-all"
        >
          <IconRefresh className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
}
