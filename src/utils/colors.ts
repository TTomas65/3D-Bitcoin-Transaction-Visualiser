// Color constants for different BTC thresholds
export const COLORS = {
  WHITE: 0,    // 0.5 BTC
  YELLOW: 60,  // 1 BTC
  PURPLE: 280, // 2.5 BTC
  BLUE: 240,   // 5 BTC
  GREEN: 120,  // 10 BTC
  ORANGE: 30,  // 25 BTC
  GOLD: 45,    // 50 BTC
  RED: 0,      // 100 BTC
} as const;

export interface ColorThreshold {
  threshold: number;
  hue: number;
  saturation: number;
  lightness: number;
}

export const COLOR_THRESHOLDS: ColorThreshold[] = [
  { threshold: 0.5, hue: COLORS.WHITE, saturation: 0, lightness: 100 },   // White
  { threshold: 1, hue: COLORS.YELLOW, saturation: 100, lightness: 50 },   // Yellow
  { threshold: 2.5, hue: COLORS.PURPLE, saturation: 100, lightness: 50 }, // Purple
  { threshold: 5, hue: COLORS.BLUE, saturation: 100, lightness: 50 },     // Blue
  { threshold: 10, hue: COLORS.GREEN, saturation: 100, lightness: 50 },   // Green
  { threshold: 25, hue: COLORS.ORANGE, saturation: 100, lightness: 50 },  // Orange
  { threshold: 50, hue: COLORS.GOLD, saturation: 100, lightness: 50 },    // Gold
  { threshold: 100, hue: COLORS.RED, saturation: 100, lightness: 50 },    // Red
];