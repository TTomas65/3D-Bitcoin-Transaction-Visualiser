import React from 'react';
import { Bitcoin, Globe } from 'lucide-react';
import { COLOR_THRESHOLDS } from '../utils/colors';
import { getHSLColor } from '../utils/colorUtils';

interface InfoPanelProps {
  btcPrice: number | null;
  totalVolume: number;
  sphereCount: number;
}

const ColorLegend: React.FC = () => (
  <div className="mt-4">
    <p className="text-xs text-gray-500 mb-2">Sphere size/color indicates transaction value:</p>
    <div className="grid grid-cols-2 gap-2">
      {COLOR_THRESHOLDS.map((threshold) => (
        <div key={threshold.threshold} className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getHSLColor(threshold) }}
          />
          <span 
            className="text-xs"
            style={{ color: getHSLColor(threshold) }}
          >
            {threshold.threshold} BTC
          </span>
        </div>
      ))}
    </div>
  </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({ btcPrice, totalVolume, sphereCount }) => {
  return (
    <div className="absolute top-0 left-0 z-10 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Bitcoin className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold">Bitcoin Transaction Visualizer</h1>
      </div>
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-400 border-b border-gray-700 pb-2">
          <Globe className="w-4 h-4" />
          <span>Data Source: blockchain.info WebSocket API</span>
        </div>
        {btcPrice && (
          <p className="text-lg border-b border-gray-700 pb-2">
            BTC Price: <span className="font-mono text-green-400">${btcPrice.toLocaleString()}</span>
          </p>
        )}
        <p className="text-lg">
          Total Volume: <span className="font-mono">{totalVolume.toFixed(2)} BTC</span>
          {btcPrice && (
            <span className="text-sm text-gray-400 ml-2">
              (${(totalVolume * btcPrice).toLocaleString()})
            </span>
          )}
        </p>
        <p className="text-sm text-gray-400">
          Active Spheres: {sphereCount}
        </p>
        <ColorLegend />
      </div>
    </div>
  );
};

export default InfoPanel;