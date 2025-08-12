import { CoinTableProps } from '../types';
import CoinRow from './CoinRow';

export default function CoinTable({ coins, isLoading }: CoinTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading market data...</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop table view */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Volume
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {coins.map((coin, index) => (
              <CoinRow key={coin.id} coin={coin} rank={index + 1} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {coins.map((coin, index) => (
          <div
            key={coin.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {coin.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                    {coin.symbol} • #{index + 1}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {coin.current_price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className={`text-xs font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                <div className="text-gray-900 dark:text-white font-medium">
                  {coin.market_cap.toLocaleString('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  })}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Volume</div>
                <div className="text-gray-900 dark:text-white font-medium">
                  {coin.total_volume.toLocaleString('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
