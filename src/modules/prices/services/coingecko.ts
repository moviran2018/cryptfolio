import type { PriceData, ChartDataPoint } from "../types";

const PROXY = "/api/coingecko";

async function proxy(path: string, search: string) {
  const res = await fetch(`${PROXY}?path=${encodeURIComponent(path)}&${search}`);
  if (!res.ok) throw new Error("CoinGecko failed");
  return res.json();
}

export async function fetchTopCoins(limit = 50): Promise<PriceData[]> {
  return proxy(
    "coins/markets",
    `vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
  );
}

export async function fetchCoinChart(coinId: string, days: number): Promise<ChartDataPoint[]> {
  const data = await proxy(
    `coins/${coinId}/market_chart`,
    `vs_currency=usd&days=${days}`
  );
  return data.prices.map(([time, value]: [number, number]) => ({ time: Math.floor(time / 1000), value }));
}

export async function fetchCoinPrice(coinId: string): Promise<number> {
  const data = await proxy("simple/price", `ids=${coinId}&vs_currencies=usd`);
  return data[coinId]?.usd ?? 0;
}
