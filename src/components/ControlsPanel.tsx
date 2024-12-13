import React from 'react';
import { Mouse, MousePointerClick, RotateCw, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Settings } from 'lucide-react';

interface ControlsPanelProps {
  highQualityRendering: boolean;
  onRenderingQualityChange: (value: boolean) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ 
  highQualityRendering, 
  onRenderingQualityChange 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute bottom-6 left-6 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg 
                   text-white hover:bg-gray-800/80 transition-all duration-200"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="absolute top-0 right-0 z-10 p-6">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-lg font-semibold">Controls</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Rendering Quality Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {highQualityRendering ? 'High Quality Rendering' : 'Low Quality Rendering'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={highQualityRendering}
                onChange={(e) => onRenderingQualityChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Mouse Controls */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mouse className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Mouse Controls</span>
            </div>
            <ul className="space-y-1 pl-6 text-sm">
              <li className="flex items-center space-x-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-gray-400">View Transaction Details</span>
              </li>
              <li className="flex items-center space-x-2">
                <RotateCw className="w-4 h-4" />
                <span className="text-gray-400">Rotate Camera</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mouse className="w-4 h-4" />
                <span className="text-gray-400">Pan Camera</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mouse className="w-4 h-4" />
                <span className="text-gray-400">Zoom Camera</span>
              </li>
            </ul>
          </div>

          {/* Keyboard Controls */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Keyboard Controls</span>
            </div>
            <ul className="space-y-1 pl-6 text-sm">
              <li className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-gray-400">Tilt Left (A)</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4" />
                <span className="text-gray-400">Tilt Right (D)</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowUp className="w-4 h-4" />
                <span className="text-gray-400">Tilt Forward (W)</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowDown className="w-4 h-4" />
                <span className="text-gray-400">Tilt Back (S)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;