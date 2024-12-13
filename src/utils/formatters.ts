export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const formatBTC = (amount: number): string => {
  return amount.toFixed(8);
};