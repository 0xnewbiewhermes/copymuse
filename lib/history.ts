export interface HistoryItem {
  id: string;
  tool: string;
  topic: string;
  content: string;
  charCount: number;
  favorite: boolean;
  createdAt: number;
}

const MAX_ITEMS = 50;

export function getHistory(tool: string): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`copymuse_history_${tool}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(item: Omit<HistoryItem, "id" | "favorite" | "createdAt">): HistoryItem {
  const history = getHistory(item.tool);
  const newItem: HistoryItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    favorite: false,
    createdAt: Date.now(),
  };
  history.unshift(newItem);

  if (history.length > MAX_ITEMS) {
    const favorites = history.filter((h) => h.favorite).slice(0, MAX_ITEMS);
    const nonFavorites = history.filter((h) => !h.favorite).slice(0, MAX_ITEMS - favorites.length);
    const trimmed = [...favorites, ...nonFavorites].sort((a, b) => b.createdAt - a.createdAt);
    localStorage.setItem(`copymuse_history_${item.tool}`, JSON.stringify(trimmed));
  } else {
    localStorage.setItem(`copymuse_history_${item.tool}`, JSON.stringify(history));
  }
  return newItem;
}

export function toggleFavorite(id: string, tool: string): HistoryItem | null {
  const history = getHistory(tool);
  const item = history.find((h) => h.id === id);
  if (item) {
    item.favorite = !item.favorite;
    localStorage.setItem(`copymuse_history_${tool}`, JSON.stringify(history));
  }
  return item ?? null;
}
