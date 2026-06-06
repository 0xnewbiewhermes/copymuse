"use client";

import type { Tone } from "@/lib/types";

const TONES: { id: Tone; label: string }[] = [
  { id: "casual", label: "Casual" },
  { id: "professional", label: "Professional" },
  { id: "funny", label: "Funny" },
  { id: "motivational", label: "Motivational" },
  { id: "storytelling", label: "Storytelling" },
  { id: "witty", label: "Witty" },
  { id: "educational", label: "Educational" },
  { id: "promo", label: "Promo" },
  { id: "custom", label: "Custom" },
];

interface Props {
  selected: Tone;
  onSelect: (tone: Tone) => void;
  customTone: string;
  onCustomToneChange: (val: string) => void;
}

export default function ToneSelector({ selected, onSelect, customTone, onCustomToneChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tone">
        {TONES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            aria-pressed={selected === t.id}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full border transition-colors ${
              selected === t.id
                ? "bg-[var(--color-coral-accent)] text-white border-[var(--color-coral-accent)]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-coral-accent)] hover:text-[var(--color-coral-accent)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {selected === "custom" && (
        <input
          type="text"
          value={customTone}
          onChange={(e) => onCustomToneChange(e.target.value)}
          placeholder="Describe your desired tone..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-coral-accent)]/30 focus:border-[var(--color-coral-accent)]"
          maxLength={200}
          aria-label="Custom tone description"
        />
      )}
    </div>
  );
}
