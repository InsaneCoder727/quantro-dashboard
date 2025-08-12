import { useState } from 'react';
import Layout from '../components/Layout';
import PriceChart from '../components/PriceChart';
import { useCoins, useChartData, formatChartData } from '../utils/api';

export default function Charts() {
  const { coins, isLoading: coinsLoading } = useCoins();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [selectedDays, setSelectedDays] = useState(7);

  const { chartData, isLoading: chartLoading } = useChartData(selectedCoin, selectedDays);
  const formattedChartData = formatChartData(chartData);

  const selectedCoinData = coins.find((coin: any) => coin.id === selectedCoin);

  return (
    <Layout currentPage="/charts">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Price Charts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Historical price data and charts for cryptocurrencies
          </p>
        </div>

        {/* Chart controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coin selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Cryptocurrency
              </label>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {coins.slice(0, 20).map((coin: any) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Time period selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Period
              </label>
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 Day</option>
                <option value={7}>7 Days</option>
                <option value={30}>30 Days</option>
                <option value={90}>90 Days</option>
                <option value={365}>1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price chart */}
        <PriceChart
          coinId={selectedCoin}
          coinName={selectedCoinData?.name || 'Cryptocurrency'}
          data={formattedChartData}
          isLoading={chartLoading || coinsLoading}
        />

        {/* Quick stats */}
        {selectedCoinData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Current Price</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${selectedCoinData.current_price.toLocaleString()}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">24h Change</div>
              <div className={`text-xl font-bold ${
                selectedCoinData.price_change_percentage_24h >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {selectedCoinData.price_change_percentage_24h >= 0 ? '+' : ''}
                {selectedCoinData.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${selectedCoinData.market_cap.toLocaleString()}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">24h Volume</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${selectedCoinData.total_volume.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Chart info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About Price Charts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Source</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All price data is sourced from CoinGecko API, providing accurate and 
                up-to-date historical price information for thousands of cryptocurrencies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactivity</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hover over the chart to see detailed price information at specific points in time. 
                Charts automatically update with the latest market data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

