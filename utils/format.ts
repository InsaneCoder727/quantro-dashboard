/**
 * Format a number as USD currency
 */
export const formatUsd = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format a number in compact notation (e.g., 1.2M, 3.4B)
 */
export const formatCompactNumber = (value: number): string => {
  return value.toLocaleString('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
};
