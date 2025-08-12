import Layout from '../components/Layout';
import CoinTable from '../components/CoinTable';
import { useCoins } from '../utils/api';

export default function Prices() {
  const { coins, isLoading, error } = useCoins();

  return (
    <Layout currentPage="/prices">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cryptocurrency Prices
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time prices for the top 50 cryptocurrencies by market cap
          </p>
        </div>

        {/* Market overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Market Cap</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${coins.reduce((sum: any, coin: any) => sum + coin.market_cap, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">24h Volume</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${coins.reduce((sum: any, coin: any) => sum + coin.total_volume, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Coins</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {coins.length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Prices table */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Market Data
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Auto-refreshing every 60 seconds</span>
            </div>
          </div>

          {error ? (
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
                  {error.message || 'Failed to load cryptocurrency data'}
                </p>
              </div>
            </div>
          ) : (
            <CoinTable coins={coins} isLoading={isLoading} />
          )}
        </div>
      </div>
    </Layout>
  );
}

