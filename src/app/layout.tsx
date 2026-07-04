import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CryptFolio — Multi-Chain Portfolio Tracker",
  description: "Track your crypto portfolio across multiple chains in real-time",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--foreground)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
