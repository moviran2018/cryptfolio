"use client";

import { useTopCoins } from "../hooks/usePrices";
import { useState } from "react";

export default function PriceTicker() {
  const { data: coins, isLoading } = useTopCoins();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <div className="h-8 bg-[var(--bg-muted)] rounded animate-pulse" />;

  const ticker = coins?.slice(0, 20) ?? [];

  return (
    <div className="overflow-hidden relative h-8 glass-card rounded-lg">
      <div className="flex animate-scroll-left gap-8 whitespace-nowrap px-4 h-full items-center text-xs">
        {[...ticker, ...ticker].map((coin, i) => (
          <span key={`${coin.id}-${i}`} className="flex items-center gap-2">
            <img src={coin.image} alt="" className="w-4 h-4 rounded-full" />
            <span className="text-[var(--muted-text)] font-mono uppercase">{coin.symbol}</span>
            <span className="text-white font-mono">${coin.current_price.toLocaleString()}</span>
            <span className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
              {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
