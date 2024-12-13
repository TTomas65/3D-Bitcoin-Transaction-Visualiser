import React, { useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { GROUND_CONFIG, calculateTargetRotation, interpolateRotation } from '../utils/groundUtils';
import { useGroundTextures } from '../hooks/useGroundTextures';

function Ground() {
  const [currentRotation, setCurrentRotation] = useState(0);
  const keys = useKeyboardControls();
  const { baseTexture, normalMap } = useGroundTextures();

  useFrame(() => {
    const targetRotation = calculateTargetRotation(keys);
    const speed = targetRotation === 0 ? GROUND_CONFIG.RETURN_SPEED : GROUND_CONFIG.TILT_SPEED;
    const newRotation = interpolateRotation(currentRotation, targetRotation, speed);
    setCurrentRotation(newRotation);
  });

  return (
    <RigidBody type="fixed" position={[0, -2, 0]} rotation={[0, 0, currentRotation]}>
      <group>
        {/* Top surface with checkerboard pattern */}
        <mesh receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[30, 0.1, 30]} />
          <meshStandardMaterial
            map={baseTexture}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.5, 0.5)}
            color="#ffffff"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Main body with solid color */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[30, 0.9, 30]} />
          <meshStandardMaterial
            color="#404040"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

export default Ground;