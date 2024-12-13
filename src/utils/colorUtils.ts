import { ColorThreshold, COLOR_THRESHOLDS } from './colors';

export const getColorForAmount = (btcAmount: number): ColorThreshold => {
  for (let i = 0; i < COLOR_THRESHOLDS.length; i++) {
    if (btcAmount <= COLOR_THRESHOLDS[i].threshold) {
      return COLOR_THRESHOLDS[i];
    }
  }
  return COLOR_THRESHOLDS[COLOR_THRESHOLDS.length - 1];
};

export const getHSLColor = (colorThreshold: ColorThreshold): string => {
  return `hsl(${colorThreshold.hue}, ${colorThreshold.saturation}%, ${colorThreshold.lightness}%)`;
};