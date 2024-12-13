import React, { useState } from 'react';
import { Mouse, Keyboard, X, Eye, EyeOff } from 'lucide-react';

interface ControlsPanelProps {
  className?: string;
}

const ControlsPanel: React.FC<ControlsPanelProps> = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute bottom-6 left-6 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg 
                   text-white hover:bg-gray-800/80 transition-all duration-200"
      >
        <Eye className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="absolute bottom-6 left-6 z-10 p-6">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 space-y-4 min-w-[300px]">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Controls</h2>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <EyeOff className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-blue-400">
              <Mouse className="w-4 h-4" />
              <span className="text-sm font-semibold">Mouse Controls</span>
            </div>
            <div className="space-y-1 pl-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">View Transaction Details</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Click on Sphere</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Rotate Camera</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Left Click + Drag</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Pan Camera</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Right Click + Drag</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Zoom Camera</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Mouse Wheel</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-blue-400">
              <Keyboard className="w-4 h-4" />
              <span className="text-sm font-semibold">Keyboard Controls</span>
            </div>
            <div className="space-y-1 pl-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tilt Left</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">A</kbd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tilt Right</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">D</kbd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tilt Forward</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">W</kbd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tilt Back</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">S</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;