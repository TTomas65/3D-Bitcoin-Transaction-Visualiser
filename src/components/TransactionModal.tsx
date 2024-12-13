import React from 'react';
import { X } from 'lucide-react';
import { TransactionDetails } from '../types';
import { formatTimestamp, formatBTC } from '../utils/formatters';
import { getColorForAmount, getHSLColor } from '../utils/colorUtils';

interface TransactionModalProps {
  transaction: TransactionDetails | null;
  onClose: () => void;
  btcPrice: number | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onClose, btcPrice }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/95 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4 sticky top-0 bg-gray-900/95 pb-4">
          <h2 className="text-xl font-bold text-white">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              title="Amount"
              value={
                <>
                  <div 
                    className="font-mono text-xl font-bold"
                    style={{ color: getHSLColor(getColorForAmount(transaction.amount)) }}
                  >
                    {formatBTC(transaction.amount)} BTC
                  </div>
                  {btcPrice && (
                    <div className="text-sm text-gray-400">
                      ≈ ${(transaction.amount * btcPrice).toLocaleString()}
                    </div>
                  )}
                </>
              }
            />
            <InfoCard
              title="Time"
              value={formatTimestamp(transaction.timestamp)}
            />
          </div>

          <InfoCard
            title="Transaction Hash"
            value={
              <a
                href={`https://www.blockchain.com/explorer/transactions/btc/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all font-mono text-sm"
              >
                {transaction.hash}
              </a>
            }
          />

          {transaction.inputs && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-300">Inputs</h3>
              <div className="space-y-2">
                {transaction.inputs.map((input, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-mono text-sm break-all text-gray-400">
                      {input.prev_out.addr}
                    </div>
                    <div className="text-green-400 font-mono text-sm mt-1">
                      {formatBTC(input.prev_out.value / 100000000)} BTC
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {transaction.outputs && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-300">Outputs</h3>
              <div className="space-y-2">
                {transaction.outputs.map((output, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-mono text-sm break-all text-gray-400">
                      {output.addr}
                    </div>
                    <div className="text-green-400 font-mono text-sm mt-1">
                      {formatBTC(output.value / 100000000)} BTC
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoCard: React.FC<{ title: string; value: React.ReactNode }> = ({ title, value }) => (
  <div className="bg-gray-800/50 p-3 rounded-lg">
    <div className="text-sm text-gray-400 mb-1">{title}</div>
    <div className="text-white">{value}</div>
  </div>
);

export default TransactionModal;