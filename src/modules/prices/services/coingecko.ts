import type { PriceData, ChartDataPoint } from "../types";

const BASE = "https://api.coingecko.com/api/v3";

export async function fetchTopCoins(limit = 50): Promise<PriceData[]> {
  const res = await fetch(
    `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
    { next: { revalidate: 30 } }
  );
  if (!res.ok) throw new Error("CoinGecko failed");
  return res.json();
}

export async function fetchCoinChart(coinId: string, days: number): Promise<ChartDataPoint[]> {
  const res = await fetch(
    `${BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Chart fetch failed");
  const data = await res.json();
  return data.prices.map(([time, value]: [number, number]) => ({ time: Math.floor(time / 1000), value }));
}

export async function fetchCoinPrice(coinId: string): Promise<number> {
  const res = await fetch(`${BASE}/simple/price?ids=${coinId}&vs_currencies=usd`);
  if (!res.ok) throw new Error("Price fetch failed");
  const data = await res.json();
  return data[coinId]?.usd ?? 0;
}
