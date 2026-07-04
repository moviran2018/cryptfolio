export interface WalletState {
  address: `0x${string}` | null;
  chainId: number | null;
  isConnected: boolean;
  balance: string | null;
}

export interface TokenBalance {
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  balance: bigint;
  balanceFormatted: string;
  logo?: string;
  price?: number;
  valueUsd?: number;
}
