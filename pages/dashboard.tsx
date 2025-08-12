import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import SentimentWidget from '../components/SentimentWidget';
import NewsFeed from '../components/NewsFeed';
import { useCoins, useFearGreedIndex, useCryptoNews } from '../utils/api';

// Dynamically import CoinTable to prevent SSR issues
const CoinTable = dynamic(() => import('../components/CoinTable'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-12">
      <div className="spinner"></div>
      <span className="ml-3 text-gray-600 dark:text-gray-400">Loading table...</span>
    </div>
  ),
});

export default function Dashboard() {
  const { coins, isLoading: coinsLoading, error: coinsError } = useCoins();
  const { fngData, isLoading: fngLoading, error: fngError } = useFearGreedIndex();
  const { news, isLoading: newsLoading, error: newsError } = useCryptoNews();

  return (
    <Layout currentPage="/">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time cryptocurrency market data and sentiment analysis
          </p>
        </div>

        {/* Top row - Sentiment and News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentWidget fngData={fngData} isLoading={fngLoading} />
          <NewsFeed news={news} isLoading={newsLoading} />
        </div>

        {/* Market Data Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Top 50 Cryptocurrencies
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Auto-refreshing every 60 seconds</span>
            </div>
          </div>

          {coinsError ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Error Loading Market Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {coinsError.message || 'Failed to load cryptocurrency data'}
                </p>
              </div>
            </div>
          ) : (
            <CoinTable coins={coins} isLoading={coinsLoading} />
          )}
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Market Data</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${fngError ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Sentiment Analysis</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${newsError ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">News Feed</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
