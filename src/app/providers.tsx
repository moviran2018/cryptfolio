"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, bsc, polygon, arbitrum, optimism, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { useState } from "react";

const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, optimism, base],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: "CryptFolio" }),
    walletConnect({ projectId: "864d282fdc5393ba6b73c0e9b041441a" }),
  ],
  transports: {
    [mainnet.id]: http("https://eth.drpc.org"),
    [bsc.id]: http("https://bsc.drpc.org"),
    [polygon.id]: http("https://polygon.drpc.org"),
    [arbitrum.id]: http("https://arbitrum.drpc.org"),
    [optimism.id]: http("https://optimism.drpc.org"),
    [base.id]: http("https://base.drpc.org"),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
