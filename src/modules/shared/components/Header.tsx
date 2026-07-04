"use client";

import WalletButton from "@/modules/wallet/components/WalletButton";
import ChainSelector from "@/modules/chains/components/ChainSelector";
import { useAccount } from "wagmi";

export default function Header() {
  const { chainId } = useAccount();

  return (
    <header className="glass-card border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] bg-clip-text text-transparent">
              CryptFolio
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-1 justify-center">
            <ChainSelector currentId={chainId} />
          </div>

          <div className="flex items-center gap-2">
            <WalletButton />
          </div>
        </div>

        <div className="md:hidden pb-3">
          <ChainSelector currentId={chainId} />
        </div>
      </div>
    </header>
  );
}
