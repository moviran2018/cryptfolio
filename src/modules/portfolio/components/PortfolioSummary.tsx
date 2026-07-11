"use client";

import { usePortfolio } from "../hooks/usePortfolio";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function RefreshIcon({ refreshing }: { refreshing: boolean }) {
  return (
    <svg className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PortfolioSummary() {
  const { summary, isLoading } = usePortfolio();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["top-coins"] });
    setTimeout(() => setRefreshing(false), 800);
  };

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
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-text)] font-medium">Portfolio Value</p>
        <button onClick={refresh} className="text-[var(--muted-text)] hover:text-[var(--accent)] transition-colors p-1" title="Refresh prices">
          <RefreshIcon refreshing={refreshing} />
        </button>
      </div>
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
