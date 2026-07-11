import type { PriceData, ChartDataPoint } from "../types";

const CG = "/api/cg";

async function fetchWithFallback(url: string): Promise<Response> {
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CoinGecko ${res.status}: ${text.slice(0, 80)}`);
  }
  return res;
}

export async function fetchTopCoins(limit = 50): Promise<PriceData[]> {
  const res = await fetchWithFallback(
    `${CG}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
  );
  return res.json();
}

export async function fetchCoinChart(coinId: string, days = 7): Promise<ChartDataPoint[]> {
  const res = await fetchWithFallback(
    `${CG}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = await res.json();
  return data.prices.map(([t, v]: [number, number]) => ({ time: Math.floor(t / 1000), value: v }));
}

export async function fetchCoinPrice(coinId: string): Promise<number> {
  const res = await fetchWithFallback(`${CG}/simple/price?ids=${coinId}&vs_currencies=usd`);
  const data = await res.json();
  return data[coinId]?.usd ?? 0;
}
