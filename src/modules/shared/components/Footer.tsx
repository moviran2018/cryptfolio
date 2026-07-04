export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-[var(--muted-text)]">
            CryptFolio — Multi-Chain Portfolio Tracker
          </p>
          <p className="text-[10px] text-[var(--muted-text)]">
            Powered by CoinGecko & Binance APIs
          </p>
        </div>
      </div>
    </footer>
  );
}
