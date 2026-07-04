"use client";

import { useWatchlist } from "../hooks/useWatchlist";
import { useTopCoins } from "@/modules/prices/hooks/usePrices";

export default function Watchlist() {
  const { items, toggle } = useWatchlist();
  const { data: coins } = useTopCoins(100);

  const watched = (coins ?? []).filter((c) => items.includes(c.id));

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center animate-fade-in">
        <p className="text-xs text-[var(--muted-text)]">No watched coins yet</p>
        <p className="text-[10px] text-gray-600 mt-1">Click the star icon on any coin to add it</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white">Watchlist</h2>
        <span className="text-[10px] text-[var(--muted-text)]">{items.length} coins</span>
      </div>
      <div className="space-y-2">
        {watched.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between p-2.5 bg-[var(--bg-muted)] rounded-xl border border-[var(--border)]">
            <div className="flex items-center gap-2">
              <img src={coin.image} alt="" className="w-5 h-5 rounded-full" />
              <div>
                <p className="text-xs text-white font-semibold">{coin.symbol.toUpperCase()}</p>
                <p className="text-[9px] text-[var(--muted-text)]">${coin.current_price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-mono font-bold ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
              <button onClick={() => toggle(coin.id)} className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
