"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi } from "lightweight-charts";
import { useChartData } from "../hooks/useChartData";

export default function PriceChart({ coinId }: { coinId: string | null }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const { data: chartData, isLoading } = useChartData(coinId);

  useEffect(() => {
    if (!chartRef.current || !chartData || chartData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.remove();
    }

    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#666",
      },
      width: chartRef.current.clientWidth,
      height: 200,
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",
        timeVisible: false,
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.06)",
      },
      crosshair: {
        vertLine: { color: "rgba(255,107,0,0.4)", width: 1, style: 2 },
        horzLine: { color: "rgba(255,107,0,0.4)", width: 1, style: 2 },
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: "#ff6b00",
      topColor: "rgba(255,107,0,0.3)",
      bottomColor: "rgba(255,107,0,0.01)",
      lineWidth: 2,
    });

    areaSeries.setData(chartData);

    chart.timeScale().fitContent();

    chartInstance.current = chart;

    const handleResize = () => {
      if (chartRef.current && chartInstance.current) {
        chartInstance.current.applyOptions({ width: chartRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, [chartData]);

  if (isLoading) {
    return <div className="h-[200px] bg-[var(--bg-muted)] rounded-xl animate-pulse" />;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] live-dot" />
        <span className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">7D Price Chart</span>
      </div>
      <div ref={chartRef} className="w-full rounded-xl" />
    </div>
  );
}
