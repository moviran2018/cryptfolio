import type { TickerData } from "../types";

const BASE = "https://api.binance.com/api/v3";

export async function fetchBinanceTickers(): Promise<TickerData[]> {
  const res = await fetch(`${BASE}/ticker/24hr`);
  if (!res.ok) throw new Error("Binance failed");
  const data = await res.json();
  return data
    .filter((t: any) => t.symbol.endsWith("USDT"))
    .slice(0, 30)
    .map((t: any) => ({
      symbol: t.symbol.replace("USDT", ""),
      price: parseFloat(t.lastPrice),
      change24h: parseFloat(t.priceChangePercent),
      exchange: "Binance",
    }));
}

export async function fetchBinancePrice(symbol: string): Promise<number> {
  const res = await fetch(`${BASE}/ticker/price?symbol=${symbol}USDT`);
  if (!res.ok) throw new Error("Binance price failed");
  const data = await res.json();
  return parseFloat(data.price);
}
