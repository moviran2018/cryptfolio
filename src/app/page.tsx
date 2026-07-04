"use client";

import PriceTicker from "@/modules/prices/components/PriceTicker";
import PortfolioSummary from "@/modules/portfolio/components/PortfolioSummary";
import AssetTable from "@/modules/portfolio/components/AssetTable";
import MarketOverview from "@/modules/prices/components/MarketOverview";
import Watchlist from "@/modules/watchlist/components/Watchlist";
import Header from "@/modules/shared/components/Header";
import Footer from "@/modules/shared/components/Footer";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Live Ticker */}
        <PriceTicker />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Portfolio / Main */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <PortfolioSummary />
            <AssetTable />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Watchlist />
            <MarketOverview />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
