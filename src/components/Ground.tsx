import React, { useState, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { GROUND_CONFIG, calculateTargetRotation, interpolateRotation } from '../utils/groundUtils';
import { createGroundTextures } from '../utils/textureUtils';

interface GroundRotation {
  x: number;
  z: number;
}

function Ground() {
  const [currentRotation, setCurrentRotation] = useState<GroundRotation>({ x: 0, z: 0 });
  const [textures, setTextures] = useState<{ baseTexture: THREE.Texture; normalMap: THREE.Texture } | null>(null);
  const keys = useKeyboardControls();

  useEffect(() => {
    createGroundTextures().then(loadedTextures => {
      console.log('Textures loaded in Ground component:', loadedTextures);
      setTextures(loadedTextures);
    }).catch(error => {
      console.error('Error loading textures:', error);
    });
  }, []);

  useFrame(() => {
    const targetRotation = calculateTargetRotation(keys);
    const speed = (targetRotation.x === 0 && targetRotation.z === 0) 
      ? GROUND_CONFIG.RETURN_SPEED 
      : GROUND_CONFIG.TILT_SPEED;
    const newRotation = interpolateRotation(currentRotation, targetRotation, speed);
    setCurrentRotation(newRotation);
  });

  if (!textures) {
    return null; // Várunk amíg a textúrák betöltődnek
  }

  return (
    <RigidBody type="fixed" position={[0, -2, 0]} rotation={[currentRotation.x, 0, currentRotation.z]}>
      <group>
        <mesh receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[30, 0.1, 30]} />
          <meshPhysicalMaterial
            map={textures.baseTexture}
            normalMap={textures.normalMap}
            normalScale={new THREE.Vector2(0.5, 0.5)}
            color="#ffffff"
            roughness={0.7}
            metalness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[30, 0.9, 30]} />
          <meshPhysicalMaterial
            color="#404040"
            roughness={0.7}
            metalness={0.2}
            envMapIntensity={1}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

export default Ground;