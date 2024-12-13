import { COLOR_THRESHOLDS } from './colors';

export const calculateSphereSize = (btcAmount: number): number => {
  const MIN_SIZE = 0.3;
  const MAX_SIZE = 8;
  
  const logSize = Math.log(btcAmount + 1) * 2;
  return Math.min(Math.max(logSize, MIN_SIZE), MAX_SIZE);
};

export const getColorForAmount = (btcAmount: number) => {
  // Find the appropriate color threshold
  for (let i = 0; i < COLOR_THRESHOLDS.length; i++) {
    if (btcAmount <= COLOR_THRESHOLDS[i].threshold) {
      return COLOR_THRESHOLDS[i];
    }
  }
  // If amount is larger than the highest threshold, return the last color
  return COLOR_THRESHOLDS[COLOR_THRESHOLDS.length - 1];
};