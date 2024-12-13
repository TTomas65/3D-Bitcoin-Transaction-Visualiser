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
}

const TransactionSphere: React.FC<TransactionSphereProps> = ({ 
  transaction, 
  onRemove,
  onClick 
}) => {
  const rigidBodyRef = useRef<RigidBodyApi>(null);
  
  const size = calculateSphereSize(transaction.amount);
  const colorProps = getColorForAmount(transaction.amount);
  const color = new THREE.Color().setHSL(
    colorProps.hue / 360,
    colorProps.saturation / 100,
    colorProps.lightness / 100
  );

  useFrame(() => {
    if (rigidBodyRef.current) {
      const position = rigidBodyRef.current.translation();
      if (position.y < -10) {
        onRemove(transaction.hash);
      }
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
    >
      <mesh 
        castShadow 
        receiveShadow
        onClick={handleClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </RigidBody>
  );
};

export default React.memo(TransactionSphere);