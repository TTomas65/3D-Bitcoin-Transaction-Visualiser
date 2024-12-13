import { useState, useCallback } from 'react';
import { Transaction, TransactionDetails } from '../types';

export function useTransactionDetails() {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactionDetails = useCallback(async (transaction: Transaction) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://blockchain.info/rawtx/${transaction.hash}`);
      const data = await response.json();
      
      setSelectedTransaction({
        ...transaction,
        inputs: data.inputs,
        outputs: data.out,
        size: data.size,
        weight: data.weight,
        fee: data.fee,
        relayed_by: data.relayed_by,
      });
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    selectedTransaction,
    isLoading,
    fetchTransactionDetails,
    clearSelectedTransaction: () => setSelectedTransaction(null),
  };
}