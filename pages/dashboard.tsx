import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CoinTable from '../components/CoinTable';
import { Coin, FNGResponse } from '../types';

export default function Dashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [fngData, setFngData] = useState<FNGResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from both APIs
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch top 20 coins from CoinGecko with timeout
      const coinsResponse = await Promise.race([
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000))
      ]);

      // Fetch Fear and Greed Index with timeout
      const fngResponse = await Promise.race([
        fetch('https://api.alternative.me/fng/'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000))
      ]);

      if (!coinsResponse.ok) {
        throw new Error('Failed to fetch cryptocurrency data');
      }

      if (!fngResponse.ok) {
        throw new Error('Failed to fetch Fear & Greed Index');
      }

      const coinsData = await coinsResponse.json();
      const fngData = await fngResponse.json();

      setCoins(coinsData);
      setFngData(fngData);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Get FNG score and classification
  const getFNGInfo = () => {
    if (!fngData || !fngData.data || fngData.data.length === 0) {
      return null;
    }

    const latestData = fngData.data[0];
    const score = parseInt(latestData.value);
    
    let colorClass = '';
    if (score >= 70) colorClass = 'green';
    else if (score >= 40) colorClass = 'yellow';
    else colorClass = 'red';

    return {
      score,
      classification: latestData.value_classification,
      colorClass,
      timestamp: latestData.timestamp,
    };
  };

  const fngInfo = getFNGInfo();

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time cryptocurrency market data and sentiment analysis
          </p>
        </div>

        {/* Fear & Greed Index Summary */}
        {fngInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Fear & Greed Index
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Market sentiment indicator
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fngInfo.score}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {fngInfo.classification}
                  </div>
                </div>
                <div className={`fng-badge ${fngInfo.colorClass}`}>
                  {fngInfo.classification}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {formatTimestamp(fngInfo.timestamp)}
              </p>
            </div>
          </div>
        )}

        {/* Market Data Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Top 20 Cryptocurrencies
            </h2>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Refreshing...
                </div>
              ) : (
                'Refresh Data'
              )}
            </button>
          </div>

          <CoinTable coins={coins} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}
