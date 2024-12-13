import React, { useRef, useCallback } from 'react';
import { RigidBody, RigidBodyApi } from '@react-three/rapier';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Transaction } from '../types';
import { calculateSphereSize } from '../utils/sphereUtils';
import { getColorForAmount } from '../utils/colorUtils';

interface TransactionSphereProps {
  transaction: Transaction;
  onRemove: (hash: string) => void;
  onClick: (transaction: Transaction) => void;
  highQualityRendering: boolean;
}

// Alacsony minőségű rendereléshez
const lowQualitySphereGeom = new THREE.SphereGeometry(1, 16, 16);
const lowQualityMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  envMapIntensity: 0.8
});

// Magas minőségű rendereléshez
const highQualitySphereGeom = new THREE.SphereGeometry(1, 32, 32);

const TransactionSphere: React.FC<TransactionSphereProps> = ({ 
  transaction, 
  onRemove,
  onClick,
  highQualityRendering
}) => {
  const rigidBodyRef = useRef<RigidBodyApi>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>();
  
  const size = calculateSphereSize(transaction.amount);
  const colorProps = getColorForAmount(transaction.amount);
  const color = new THREE.Color().setHSL(
    colorProps.hue / 360,
    colorProps.saturation / 100,
    colorProps.lightness / 100
  );

  // Csak akkor ellenőrizzük a pozíciót, ha a gömb aktív
  useFrame(() => {
    if (rigidBodyRef.current?.translation().y < -10) {
      onRemove(transaction.hash);
    }
  });

  const handleClick = useCallback((event: THREE.Event) => {
    event.stopPropagation();
    onClick(transaction);
  }, [onClick, transaction]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={transaction.position}
      colliders="ball"
      restitution={0.7}
      friction={0.5}
      linearDamping={0.2}
      angularDamping={0.2}
    >
      <mesh 
        castShadow 
        receiveShadow
        onClick={handleClick}
        geometry={highQualityRendering ? highQualitySphereGeom : lowQualitySphereGeom}
        scale={size}
      >
        {highQualityRendering ? (
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        ) : (
          <meshStandardMaterial
            ref={materialRef}
            {...lowQualityMaterial}
            color={color}
          />
        )}
      </mesh>
    </RigidBody>
  );
};

export default React.memo(TransactionSphere);