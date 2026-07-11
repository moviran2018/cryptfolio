"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTopCoins, fetchCoinChart } from "../services";
import type { PriceData, ChartDataPoint } from "../types";

export function useTopCoins(limit = 50) {
  return useQuery<PriceData[]>({
    queryKey: ["top-coins", limit],
    queryFn: () => fetchTopCoins(limit),
    refetchInterval: 60_000,
    staleTime: 30_000,
    retry: 3,
    retryDelay: 5_000,
  });
}

export function useCoinChart(coinId: string | null, days = 7) {
  return useQuery<ChartDataPoint[]>({
    queryKey: ["coin-chart", coinId, days],
    queryFn: () => fetchCoinChart(coinId!, days),
    enabled: !!coinId,
    refetchInterval: 120_000,
    staleTime: 60_000,
    retry: 2,
  });
}
