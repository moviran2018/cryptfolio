"use client";

import { useSwitchChain } from "wagmi";
import { SUPPORTED_CHAINS } from "../types";

export default function ChainSelector({ currentId, onSelect }: { currentId?: number | null; onSelect?: (id: number) => void }) {
  const { switchChain } = useSwitchChain();

  return (
    <div className="flex gap-1.5 flex-wrap">
      {SUPPORTED_CHAINS.map((chain) => (
        <button key={chain.id} onClick={() => switchChain?.({ chainId: chain.id })}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all ${
            currentId === chain.id
              ? "bg-[var(--accent)]/20 border-[var(--accent)]/40 text-white"
              : "bg-[var(--bg-muted)] border-[var(--border)] text-gray-500 hover:border-gray-600 hover:text-gray-300"
          }`}
          style={currentId === chain.id ? { boxShadow: "0 0 20px rgba(255,107,0,0.15)" } : undefined}>
          {chain.name}
        </button>
      ))}
    </div>
  );
}
