// CoinGecko API response types
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

// Fear and Greed Index API response types
export interface FNGResponse {
  name: string;
  data: FNGData[];
  metadata: FNGMetadata;
}

export interface FNGData {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export interface FNGMetadata {
  error: string | null;
}

// Component props types
export interface CoinRowProps {
  coin: Coin;
  rank: number;
}

export interface CoinTableProps {
  coins: Coin[];
  isLoading: boolean;
}
