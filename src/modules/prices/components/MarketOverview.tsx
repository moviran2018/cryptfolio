"use client";

import { useTopCoins } from "../hooks/usePrices";
import { useWatchlist } from "@/modules/watchlist/hooks/useWatchlist";

export default function MarketOverview() {
  const { data: coins, isLoading } = useTopCoins(10);
  const { has, toggle } = useWatchlist();

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <div className="h-4 w-24 bg-[var(--bg-muted)] rounded animate-pulse" />
        {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-[var(--bg-muted)] rounded animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white">Market</h2>
        <span className="text-[10px] text-[var(--muted-text)]">Top 10</span>
      </div>
      <div className="space-y-1.5">
        {(coins ?? []).slice(0, 10).map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          const watched = has(coin.id);

          return (
            <div key={coin.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <img src={coin.image} alt="" className="w-5 h-5 rounded-full shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-white font-semibold truncate">{coin.symbol.toUpperCase()}</p>
                  <p className="text-[9px] text-[var(--muted-text)]">${coin.current_price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono font-bold hidden sm:block" style={{ color: isPositive ? "#22c55e" : "#ef4444" }}>
                  {isPositive ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
                <button onClick={() => toggle(coin.id)}
                  className={watched ? "text-[var(--gold)]" : "text-gray-600 hover:text-gray-400"} transition-colors>
                  <svg className="w-3 h-3" fill={watched ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={watched ? 0 : 1.5}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
