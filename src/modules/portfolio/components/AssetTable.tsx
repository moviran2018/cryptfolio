"use client";

import { usePortfolio } from "../hooks/usePortfolio";
import { useState } from "react";
import PriceChart from "@/modules/charts/components/PriceChart";

export default function AssetTable() {
  const { assets, isLoading } = usePortfolio();
  const [chartCoin, setChartCoin] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-3">
        {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-[var(--bg-muted)] rounded animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 border-b border-[var(--border)]">
        <h2 className="text-sm font-bold text-white">Your Assets</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider border-b border-[var(--border)]">
              <th className="text-right p-4 font-medium">Asset</th>
              <th className="text-right p-4 font-medium">Amount</th>
              <th className="text-right p-4 font-medium">Price</th>
              <th className="text-right p-4 font-medium">24h</th>
              <th className="text-right p-4 font-medium">Value</th>
              <th className="text-right p-4 font-medium">Allocation</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const totalValue = assets.reduce((s, a) => s + a.valueUsd, 0);
              const allocation = totalValue > 0 ? (asset.valueUsd / totalValue) * 100 : 0;
              const isPositive = asset.change24h >= 0;

              return (
                <tr key={asset.id} className="border-b border-[var(--border)]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img src={asset.logo} alt="" className="w-6 h-6 rounded-full" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><circle cx=%2212%22 cy=%2212%22 r=%2212%22 fill=%22%23ff6b00%22/></svg>" }} />
                      <div>
                        <p className="text-white font-semibold">{asset.name}</p>
                        <p className="text-[10px] text-[var(--muted-text)] uppercase">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-white">{asset.amount < 1 ? asset.amount.toFixed(4) : asset.amount.toFixed(2)}</td>
                  <td className="p-4 font-mono text-white">${asset.price.toLocaleString()}</td>
                  <td className={`p-4 font-mono font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
                  </td>
                  <td className="p-4 font-mono text-white font-bold">${asset.valueUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--gold)]" style={{ width: `${allocation}%` }} />
                      </div>
                      <span className="text-[10px] text-[var(--muted-text)] font-mono">{allocation.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setChartCoin(chartCoin === asset.id ? null : asset.id)}
                      className="text-[10px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
                      Chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {chartCoin && (
        <div className="p-4 border-t border-[var(--border)]">
          <PriceChart coinId={chartCoin} />
        </div>
      )}
    </div>
  );
}
