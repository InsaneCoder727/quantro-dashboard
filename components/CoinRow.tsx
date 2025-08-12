import { formatUsd, formatCompactNumber } from '../utils/format';
import { CoinRowProps } from '../types';

export default function CoinRow({ coin, rank }: CoinRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
      {/* Rank */}
      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
        {rank}
      </td>

      {/* Coin */}
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
            loading="lazy"
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {coin.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
        {formatUsd(coin.current_price)}
      </td>

      {/* 24h Change */}
      <td className={`px-4 py-4 text-sm font-medium ${
        isPositive 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
      </td>

      {/* Market Cap */}
      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
        {formatCompactNumber(coin.market_cap)}
      </td>

      {/* Volume */}
      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
        {formatCompactNumber(coin.total_volume)}
      </td>
    </tr>
  );
}
