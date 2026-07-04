export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  valueUsd: number;
  change24h: number;
  logo: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  topAsset: string;
  assetCount: number;
}
