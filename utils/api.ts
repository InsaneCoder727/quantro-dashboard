import useSWR from 'swr';

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check for API-specific error responses
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// CoinGecko API endpoints
export const useCoins = () => {
  const { data, error, isLoading } = useSWR(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true',
    fetcher,
    {
      refreshInterval: 60000, // Auto-refresh every 60 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    coins: data || [],
    isLoading,
    error,
  };
};

// Fear & Greed Index API
export const useFearGreedIndex = () => {
  const { data, error, isLoading } = useSWR(
    'https://api.alternative.me/fng/',
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    fngData: data,
    isLoading,
    error,
  };
};

// Crypto News API using GNews (more reliable free tier)
export const useCryptoNews = () => {
  const { data, error, isLoading } = useSWR(
    'https://gnews.io/api/v4/search?q=cryptocurrency&lang=en&country=us&max=20&apikey=test',
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
      onError: (err) => {
        console.error('News API error:', err);
      },
      errorRetryCount: 2,
      errorRetryInterval: 5000,
    }
  );

  // Handle API errors gracefully
  if (error) {
    console.error('Failed to fetch news:', error);
  }

  return {
    news: data?.articles || [],
    isLoading,
    error: error ? new Error('Failed to fetch news. Please try again later.') : null,
  };
};

// Historical price data for charts
export const useChartData = (coinId: string, days: number = 7) => {
  const { data, error, isLoading } = useSWR(
    coinId ? `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}` : null,
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    chartData: data,
    isLoading,
    error,
  };
};

// Format chart data for Recharts
export const formatChartData = (rawData: any): Array<{ date: string; price: number }> => {
  if (!rawData?.prices) return [];
  
  return rawData.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price: price,
  }));
};

