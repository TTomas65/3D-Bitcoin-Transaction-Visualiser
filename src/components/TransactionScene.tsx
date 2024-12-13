import React from 'react';
import { Environment } from '@react-three/drei';
import TransactionSphere from './TransactionSphere';
import Ground from './Ground';
import { Transaction } from '../types';

interface TransactionSceneProps {
  spheres: Transaction[];
  onRemoveSphere: (hash: string) => void;
  onSphereClick: (transaction: Transaction) => void;
}

function TransactionScene({ spheres, onRemoveSphere, onSphereClick }: TransactionSceneProps) {
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
        />
      ))}
    </>
  );
}

export default React.memo(TransactionScene);