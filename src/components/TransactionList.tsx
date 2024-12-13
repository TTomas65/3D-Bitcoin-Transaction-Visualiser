import React from 'react';
import { Transaction } from '../types';
import { getColorForAmount, getHSLColor } from '../utils/colorUtils';

interface TransactionListProps {
  transactions: Transaction[];
  btcPrice: number | null;
}

const TransactionItem: React.FC<{ tx: Transaction; btcPrice: number | null }> = ({ tx, btcPrice }) => {
  const color = getHSLColor(getColorForAmount(tx.amount));
  
  return (
    <div
      key={`${tx.hash}-${tx.timestamp}`}
      className="bg-gray-800 rounded-lg p-4 transition-all hover:bg-gray-700"
    >
      <div className="flex justify-between items-center mb-2">
        <span 
          className="font-mono text-lg"
          style={{ color }}
        >
          {tx.amount.toFixed(8)} BTC
        </span>
        <span className="text-sm text-gray-400">
          {new Date(tx.timestamp).toLocaleTimeString()}
        </span>
      </div>
      {btcPrice && (
        <div className="text-sm text-green-400 mb-2">
          ${(tx.amount * btcPrice).toLocaleString()}
        </div>
      )}
      <div className="text-xs text-gray-500 font-mono truncate">
        {tx.hash}
      </div>
    </div>
  );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, btcPrice }) => {
  return (
    <div className="w-96 h-screen overflow-y-auto bg-gray-900 p-6">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <TransactionItem 
            key={`${tx.hash}-${tx.timestamp}`}
            tx={tx} 
            btcPrice={btcPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;