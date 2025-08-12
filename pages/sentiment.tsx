import Layout from '../components/Layout';
import SentimentWidget from '../components/SentimentWidget';
import { useFearGreedIndex } from '../utils/api';

export default function Sentiment() {
  const { fngData, isLoading, error } = useFearGreedIndex();

  return (
    <Layout currentPage="/sentiment">
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Sentiment Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fear & Greed Index - Market sentiment indicator for Bitcoin and Ethereum
          </p>
        </div>

        {/* Sentiment widget */}
        <div className="max-w-2xl">
          <SentimentWidget fngData={fngData} isLoading={isLoading} />
        </div>

        {/* Sentiment explanation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About the Fear & Greed Index
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How it works</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The Fear & Greed Index is a sentiment indicator that measures market emotions. 
                It analyzes various factors including volatility, market momentum, social media, 
                surveys, and Bitcoin dominance to determine if the market is driven by fear or greed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interpretation</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li><strong>0-25:</strong> Extreme Fear (potential buying opportunity)</li>
                <li><strong>26-45:</strong> Fear (market uncertainty)</li>
                <li><strong>46-55:</strong> Neutral (balanced market)</li>
                <li><strong>56-75:</strong> Greed (market optimism)</li>
                <li><strong>76-100:</strong> Extreme Greed (potential selling opportunity)</li>
              </ul>
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
                  Error loading sentiment data
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error.message || 'Failed to load Fear & Greed Index data'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

