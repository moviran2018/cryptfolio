import type { PriceData, ChartDataPoint } from "../types";

const CG_PROXY = "/api/coingecko";

function buildUrl(path: string, params: Record<string, string | number>): string {
  const qs = new URLSearchParams();
  qs.set("path", path);
  for (const [k, v] of Object.entries(params)) {
    qs.set(k, String(v));
  }
  return `${CG_PROXY}?${qs.toString()}`;
}

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

export async function fetchTopCoins(limit = 100): Promise<PriceData[]> {
  const res = await fetchWithFallback(
    buildUrl("/coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: limit,
      page: 1,
      sparkline: "true",
      price_change_percentage: "24h",
    })
  );
  return res.json();
}

export async function fetchCoinChart(coinId: string, days = 7): Promise<ChartDataPoint[]> {
  const res = await fetchWithFallback(
    buildUrl(`/coins/${coinId}/market_chart`, { vs_currency: "usd", days })
  );
  const data = await res.json();
  return data.prices.map(([t, v]: [number, number]) => ({ time: Math.floor(t / 1000), value: v }));
}

export async function fetchCoinPrice(coinId: string): Promise<number> {
  const res = await fetchWithFallback(
    buildUrl("/simple/price", { ids: coinId, vs_currencies: "usd" })
  );
  const data = await res.json();
  return data[coinId]?.usd ?? 0;
}
