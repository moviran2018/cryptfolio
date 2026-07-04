export interface PriceData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  sparkline_in_7d: number[];
}

export interface TickerData {
  symbol: string;
  price: number;
  change24h: number;
  exchange: string;
}

export interface ChartDataPoint {
  time: number;
  value: number;
}
