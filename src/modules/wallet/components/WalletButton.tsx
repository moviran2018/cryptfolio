"use client";

import { useWallet } from "../hooks/useWallet";
import { useState } from "react";

export default function WalletButton() {
  const { address, isConnected, balance, symbol, connectors, isPending, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);

  if (!isConnected) {
    return (
      <div className="relative">
        <button onClick={() => setOpen(!open)}
          className="px-4 py-2 text-xs font-bold bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl transition-all glow-orange">
          Connect Wallet
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-2 w-52 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-2 z-50 shadow-2xl shadow-black/60 animate-fade-in">
            {connectors.map((c, i) => (
              <button key={c.id} onClick={() => { connect(i); setOpen(false); }}
                disabled={isPending}
                className="w-full text-left px-3 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-[var(--bg-muted)] rounded-lg transition-colors disabled:opacity-50">
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-muted)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-all text-xs">
        <span className="w-2 h-2 rounded-full bg-green-500 live-dot" />
        <span className="text-white font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        <span className="text-[var(--gold)] font-mono">{parseFloat(balance || "0").toFixed(3)} {symbol}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-2 z-50 shadow-2xl shadow-black/60 animate-fade-in">
          <button onClick={() => { disconnect(); setOpen(false); }}
            className="w-full text-left px-3 py-2.5 text-xs text-red-400 hover:bg-[var(--bg-muted)] rounded-lg transition-colors">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
