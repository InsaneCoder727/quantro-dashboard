import Layout from '../components/Layout';
import NewsFeed from '../components/NewsFeed';
import { useCryptoNews } from '../utils/api';

export default function News() {
  const { news, isLoading, error } = useCryptoNews();

  return (
    <Layout currentPage="/news">
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crypto News
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Latest cryptocurrency news and market updates
          </p>
        </div>

        {/* News feed */}
        <div className="max-w-4xl">
          <NewsFeed news={news} isLoading={isLoading} />
        </div>

        {/* News sources info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About Our News Feed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sources</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We aggregate news from multiple cryptocurrency news sources to provide you with 
                comprehensive coverage of the latest developments in the crypto market.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Updates</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                News is automatically refreshed every 5 minutes to ensure you have access to 
                the most recent headlines and market-moving stories.
              </p>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error loading news
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error.message || 'Failed to load cryptocurrency news'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

