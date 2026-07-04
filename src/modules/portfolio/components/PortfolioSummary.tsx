"use client";

import { usePortfolio } from "../hooks/usePortfolio";

export default function PortfolioSummary() {
  const { summary, isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="h-8 w-40 bg-[var(--bg-muted)] rounded animate-pulse" />
        <div className="h-12 w-60 bg-[var(--bg-muted)] rounded animate-pulse" />
        <div className="h-4 w-32 bg-[var(--bg-muted)] rounded animate-pulse" />
      </div>
    );
  }

  const isPositive = summary.totalChange24h >= 0;

  return (
    <div className="glass-card rounded-2xl p-6 glow-orange animate-fade-in">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-text)] font-medium mb-1">Portfolio Value</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-white font-mono">
        ${summary.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h1>
      <div className="flex items-center gap-3 mt-2">
        <span className={`text-xs font-mono font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "+" : ""}{summary.totalChange24h.toFixed(2)}% (24h)
        </span>
        <span className="text-[10px] text-[var(--muted-text)]">
          {summary.assetCount} assets · Top: {summary.topAsset}
        </span>
      </div>
    </div>
  );
}
