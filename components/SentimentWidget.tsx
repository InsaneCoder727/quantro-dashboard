import { SentimentWidgetProps } from '../types';

export default function SentimentWidget({ fngData, isLoading }: SentimentWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Market Sentiment
          </h2>
        </div>
        <div className="flex justify-center items-center py-8">
          <div className="spinner"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading sentiment...</span>
        </div>
      </div>
    );
  }

  if (!fngData || !fngData.data || fngData.data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Market Sentiment
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Unable to load sentiment data</p>
      </div>
    );
  }

  const latestData = fngData.data[0];
  const score = parseInt(latestData.value);
  
  // Determine sentiment color and label
  let sentimentColor = '';
  let sentimentLabel = '';
  let gaugeColor = '';
  
  if (score >= 80) {
    sentimentColor = 'text-red-600 dark:text-red-400';
    sentimentLabel = 'Extreme Greed';
    gaugeColor = 'bg-red-500';
  } else if (score >= 60) {
    sentimentColor = 'text-orange-600 dark:text-orange-400';
    sentimentLabel = 'Greed';
    gaugeColor = 'bg-orange-500';
  } else if (score >= 40) {
    sentimentColor = 'text-yellow-600 dark:text-yellow-400';
    sentimentLabel = 'Neutral';
    gaugeColor = 'bg-yellow-500';
  } else if (score >= 20) {
    sentimentColor = 'text-blue-600 dark:text-blue-400';
    sentimentLabel = 'Fear';
    gaugeColor = 'bg-blue-500';
  } else {
    sentimentColor = 'text-purple-600 dark:text-purple-400';
    sentimentLabel = 'Extreme Fear';
    gaugeColor = 'bg-purple-500';
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Market Sentiment
        </h2>
      </div>

      {/* Gauge */}
      <div className="mb-6">
        <div className="relative">
          {/* Gauge background */}
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            {/* Gauge fill */}
            <div 
              className={`h-full ${gaugeColor} transition-all duration-1000 ease-out`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          {/* Score indicator */}
          <div 
            className="absolute top-0 -mt-2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full"
            style={{ left: `${score}%` }}
          ></div>
        </div>
        
        {/* Score labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Score and classification */}
      <div className="text-center">
        <div className={`text-4xl font-bold ${sentimentColor} mb-2`}>
          {score}
        </div>
        <div className={`text-lg font-semibold ${sentimentColor} mb-4`}>
          {sentimentLabel}
        </div>
        
        {/* Last updated */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(parseInt(latestData.timestamp) * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
