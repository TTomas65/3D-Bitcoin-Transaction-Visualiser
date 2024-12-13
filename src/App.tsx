import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import TransactionScene from './components/TransactionScene';
import TransactionList from './components/TransactionList';
import InfoPanel from './components/InfoPanel';
import ControlsPanel from './components/ControlsPanel';
import TransactionModal from './components/TransactionModal';
import { Transaction } from './types';
import { useTransactionDetails } from './hooks/useTransactionDetails';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const activeSpheres = useRef<Map<string, Transaction>>(new Map());
  const [sphereCount, setSphereCount] = useState(0);
  const { 
    selectedTransaction, 
    fetchTransactionDetails, 
    clearSelectedTransaction 
  } = useTransactionDetails();

  const addSphere = useCallback((transaction: Transaction) => {
    activeSpheres.current.set(transaction.hash, transaction);
    setSphereCount(activeSpheres.current.size);
  }, []);

  const removeSphere = useCallback((hash: string) => {
    activeSpheres.current.delete(hash);
    setSphereCount(activeSpheres.current.size);
  }, []);

  const handleSphereClick = useCallback((transaction: Transaction) => {
    fetchTransactionDetails(transaction);
  }, [fetchTransactionDetails]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        setBtcPrice(data.bpi.USD.rate_float);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.blockchain.info/inv');

    ws.onopen = () => {
      ws.send(JSON.stringify({ "op": "unconfirmed_sub" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === 'utx') {
        const newTransaction: Transaction = {
          hash: data.x.hash,
          amount: data.x.out.reduce((acc: number, output: any) => acc + output.value, 0) / 100000000,
          timestamp: Date.now(),
          position: [
            (Math.random() - 0.5) * 10,
            25,
            (Math.random() - 0.5) * 10
          ] as [number, number, number]
        };

        setTransactions(prev => [newTransaction, ...prev].slice(0, 100));
        addSphere(newTransaction);
        setTotalVolume(prev => prev + newTransaction.amount);
      }
    };

    return () => ws.close();
  }, [addSphere]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="flex-1 relative">
        <InfoPanel 
          btcPrice={btcPrice}
          totalVolume={totalVolume}
          sphereCount={sphereCount}
        />
        
        <ControlsPanel />

        <Canvas
          camera={{ position: [0, 20, 30], fov: 75 }}
          className="h-screen w-full"
          shadows
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 30, 100]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <OrbitControls />
          <Physics gravity={[0, -9.81, 0]}>
            <TransactionScene 
              spheres={Array.from(activeSpheres.current.values())} 
              onRemoveSphere={removeSphere}
              onSphereClick={handleSphereClick}
            />
          </Physics>
        </Canvas>

        {selectedTransaction && (
          <TransactionModal
            transaction={selectedTransaction}
            onClose={clearSelectedTransaction}
            btcPrice={btcPrice}
          />
        )}
      </div>

      <TransactionList 
        transactions={transactions} 
        btcPrice={btcPrice}
      />
    </div>
  );
}

export default App;