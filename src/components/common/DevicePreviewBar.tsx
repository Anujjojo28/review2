import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface DevicePreviewBarProps {
  deviceMode: DeviceMode;
  onChangeDevice: (mode: DeviceMode) => void;
}

export const DevicePreviewBar: React.FC<DevicePreviewBarProps> = ({ deviceMode, onChangeDevice }) => {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
      <button
        onClick={() => onChangeDevice('desktop')}
        title="Desktop View (Full Width)"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
          deviceMode === 'desktop'
            ? 'bg-white text-indigo-700 shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Desktop</span>
      </button>

      <button
        onClick={() => onChangeDevice('tablet')}
        title="Tablet View (768px)"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
          deviceMode === 'tablet'
            ? 'bg-white text-indigo-700 shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Tablet className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Tablet</span>
      </button>

      <button
        onClick={() => onChangeDevice('mobile')}
        title="Mobile View (375px)"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
          deviceMode === 'mobile'
            ? 'bg-white text-indigo-700 shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Mobile</span>
      </button>
    </div>
  );
};
