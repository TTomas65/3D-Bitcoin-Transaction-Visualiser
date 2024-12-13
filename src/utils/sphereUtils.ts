export const calculateSphereSize = (btcAmount: number): number => {
  const MIN_SIZE = 0.3;
  const MAX_SIZE = 8;
  
  const logSize = Math.log(btcAmount + 1) * 2;
  return Math.min(Math.max(logSize, MIN_SIZE), MAX_SIZE);
};