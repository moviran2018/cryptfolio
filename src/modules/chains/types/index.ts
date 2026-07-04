export interface ChainInfo {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export const SUPPORTED_CHAINS: ChainInfo[] = [
  { id: 1, name: "Ethereum", icon: "⟠", color: "#627eea" },
  { id: 56, name: "BSC", icon: "◆", color: "#f0b90b" },
  { id: 137, name: "Polygon", icon: "⬡", color: "#8247e5" },
  { id: 42161, name: "Arbitrum", icon: "🔷", color: "#2d374b" },
  { id: 10, name: "Optimism", icon: "🔴", color: "#ff0420" },
  { id: 8453, name: "Base", icon: "🔵", color: "#0052ff" },
];
