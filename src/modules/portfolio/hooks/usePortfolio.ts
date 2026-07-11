"use client";

import { useAccount, useBalance } from "wagmi";
import { useTopCoins } from "@/modules/prices/hooks/usePrices";
import { useMemo } from "react";

// Demo portfolio with predefined holdings for connected wallet users
const DEMO_HOLDINGS: Record<string, { id: string; symbol: string; name: string; amount: number; logo: string }[]> = {
  demo: [
    { id: "bitcoin", symbol: "btc", name: "Bitcoin", amount: 0.42, logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    { id: "ethereum", symbol: "eth", name: "Ethereum", amount: 5.7, logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    { id: "binancecoin", symbol: "bnb", name: "BNB", amount: 12, logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
    { id: "solana", symbol: "sol", name: "Solana", amount: 25, logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
    { id: "cardano", symbol: "ada", name: "Cardano", amount: 1500, logo: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
    { id: "polygon", symbol: "matic", name: "Polygon", amount: 800, logo: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png" },
  ],
};

export function usePortfolio() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const { data: coins, isLoading: coinsLoading } = useTopCoins(100);

  const assets = useMemo(() => {
    const priceMap = new Map((coins ?? []).map((c) => [c.id, c]));
    const holdings = DEMO_HOLDINGS.demo;

    const result = holdings.map((h) => {
      const price = priceMap.get(h.id);
      return {
        ...h,
        amount: h.amount,
        price: price?.current_price ?? 0,
        valueUsd: (price?.current_price ?? 0) * h.amount,
        change24h: price?.price_change_percentage_24h ?? 0,
      };
    });

    // Add native ETH balance if wallet connected
    if (isConnected && ethBalance) {
      const eth = priceMap.get("ethereum");
      const ethAmount = parseFloat(ethBalance.formatted);
      result.push({
        id: "ethereum-wallet",
        symbol: "eth",
        name: "Ethereum (Wallet)",
        amount: ethAmount,
        price: eth?.current_price ?? 0,
        valueUsd: (eth?.current_price ?? 0) * ethAmount,
        change24h: eth?.price_change_percentage_24h ?? 0,
        logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      });
    }

    return result.sort((a, b) => b.valueUsd - a.valueUsd);
  }, [coins, isConnected, ethBalance]);

  const summary = useMemo(() => ({
    totalValue: assets.reduce((s, a) => s + a.valueUsd, 0),
    totalChange24h: assets.length > 0
      ? assets.reduce((s, a) => s + a.change24h * a.valueUsd, 0) / assets.reduce((s, a) => s + a.valueUsd, 0)
      : 0,
    topAsset: assets[0]?.name ?? "—",
    assetCount: assets.length,
  }), [assets]);

  return { assets, summary, isLoading: coinsLoading };
}
