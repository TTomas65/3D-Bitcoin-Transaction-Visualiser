import React from 'react';
import { Environment } from '@react-three/drei';
import TransactionSphere from './TransactionSphere';
import Ground from './Ground';
import { Transaction } from '../types';

interface TransactionSceneProps {
  spheres: Transaction[];
  onRemoveSphere: (hash: string) => void;
  onSphereClick: (transaction: Transaction) => void;
  highQualityRendering: boolean;
}

function TransactionScene({ 
  spheres, 
  onRemoveSphere, 
  onSphereClick,
  highQualityRendering 
}: TransactionSceneProps) {
  return (
    <>
      <Environment preset="city" />
      <Ground />
      {spheres.map((sphere) => (
        <TransactionSphere
          key={sphere.hash}
          transaction={sphere}
          onRemove={onRemoveSphere}
          onClick={onSphereClick}
          highQualityRendering={highQualityRendering}
        />
      ))}
    </>
  );
}

export default React.memo(TransactionScene);