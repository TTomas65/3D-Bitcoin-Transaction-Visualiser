export const GROUND_CONFIG = {
  MAX_TILT: 0.3, // Maximum tilt angle in radians (approximately 17 degrees)
  TILT_SPEED: 0.05, // Speed of the tilt transition
  RETURN_SPEED: 0.03, // Speed of returning to neutral position
};

interface GroundRotation {
  x: number; // Forward/Back rotation (W/S)
  z: number; // Left/Right rotation (A/D)
}

export const calculateTargetRotation = (keys: { [key: string]: boolean }): GroundRotation => {
  const rotation: GroundRotation = { x: 0, z: 0 };

  // Left/Right tilt (A/D)
  if (keys['a']) rotation.z = GROUND_CONFIG.MAX_TILT;
  if (keys['d']) rotation.z = -GROUND_CONFIG.MAX_TILT;

  // Forward/Back tilt (W/S)
  if (keys['w']) rotation.x = -GROUND_CONFIG.MAX_TILT;
  if (keys['s']) rotation.x = GROUND_CONFIG.MAX_TILT;

  return rotation;
};

export const interpolateRotation = (
  current: GroundRotation,
  target: GroundRotation,
  speed: number
): GroundRotation => {
  return {
    x: interpolateValue(current.x, target.x, speed),
    z: interpolateValue(current.z, target.z, speed)
  };
};

const interpolateValue = (current: number, target: number, speed: number): number => {
  const diff = target - current;
  if (Math.abs(diff) < 0.001) return target;
  return current + diff * speed;
};