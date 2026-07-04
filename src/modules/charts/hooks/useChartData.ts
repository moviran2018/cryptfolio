"use client";

import { useCoinChart } from "@/modules/prices/hooks/usePrices";

export function useChartData(coinId: string | null) {
  return useCoinChart(coinId, 7);
}
