"use client";

import { useState, useEffect, useCallback } from "react";
import { getHistory, toggleFavorite, type HistoryItem } from "@/lib/history";

interface Props {
  tool: string;
  onSelect: (item: HistoryItem) => void;
}

export default function HistoryPanel({ tool, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<HistoryItem[]>([]);

  const refresh = useCallback(() => {
    setItems(getHistory(tool));
  }, [tool]);

  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id, tool);
    refresh();
  };

  const handleSelect = (item: HistoryItem) => {
    onSelect(item);
    setOpen(false);
  };

  if (items.length === 0 && !open) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        aria-expanded={open}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        History ({items.length})
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
      </button>

      {open && items.length > 0 && (
        <div className="space-y-1 max-h-60 overflow-y-auto border border-gray-100 rounded-lg p-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 group cursor-pointer transition-colors"
              onClick={() => handleSelect(item)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{item.topic}</p>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {item.content.slice(0, 60)}...
                </p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id); }}
                  className={`p-1 rounded transition-colors ${item.favorite ? "text-amber-400" : "text-gray-300 hover:text-amber-400"}`}
                  aria-label={item.favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={item.favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
