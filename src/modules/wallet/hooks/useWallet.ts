"use client";

import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    address,
    chainId,
    isConnected: mounted && isConnected,
    balance: balance?.formatted ?? null,
    symbol: balance?.symbol ?? null,
    connectors,
    isPending,
    connect: (connectorIndex: number) => connect({ connector: connectors[connectorIndex] }),
    disconnect,
  };
}
