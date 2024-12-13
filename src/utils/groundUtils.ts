export const GROUND_CONFIG = {
  MAX_TILT: 0.3, // Maximum tilt angle in radians (approximately 17 degrees)
  TILT_SPEED: 0.05, // Speed of the tilt transition
  RETURN_SPEED: 0.03, // Speed of returning to neutral position
};

export const calculateTargetRotation = (keys: { [key: string]: boolean }): number => {
  if (keys['a']) return GROUND_CONFIG.MAX_TILT;
  if (keys['d']) return -GROUND_CONFIG.MAX_TILT;
  return 0;
};

export const interpolateRotation = (
  current: number,
  target: number,
  speed: number
): number => {
  const diff = target - current;
  if (Math.abs(diff) < 0.001) return target;
  return current + diff * speed;
};