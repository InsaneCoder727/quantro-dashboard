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
  sparkline_in_7d?: {
    price: number[];
  };
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

// News API response types (GNews API)
export interface NewsItem {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  articles: NewsItem[];
  totalArticles: number;
}

// Chart data types
export interface ChartData {
  date: string;
  price: number;
}

export interface ChartResponse {
  prices: [number, number][];
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
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

export interface SentimentWidgetProps {
  fngData: FNGResponse | null;
  isLoading: boolean;
}

export interface NewsFeedProps {
  news: NewsItem[];
  isLoading: boolean;
}

export interface PriceChartProps {
  coinId: string;
  coinName: string;
  data: ChartData[];
  isLoading: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
}

export interface HeaderProps {
  onMenuClick: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}
