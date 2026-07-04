"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cryptfolio-watchlist";

export function useWatchlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((newItems: string[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }, []);

  const toggle = useCallback((coinId: string) => {
    persist(items.includes(coinId) ? items.filter((i) => i !== coinId) : [...items, coinId]);
  }, [items, persist]);

  const has = useCallback((coinId: string) => items.includes(coinId), [items]);

  return { items, toggle, has };
}
