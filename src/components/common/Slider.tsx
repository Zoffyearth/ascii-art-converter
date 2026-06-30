import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  unit?: string;
  description?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  unit = '',
  description,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-terminal-text/80">{label}</label>
        {showValue && (
          <span className="text-sm text-terminal-green font-mono">
            {value}{unit}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-terminal-dim">{description}</p>
      )}
      <div className="relative">
        <div className="absolute inset-0 h-2 rounded-full bg-terminal-green/10 top-1/2 -translate-y-1/2" />
        <div 
          className="absolute h-2 rounded-full bg-gradient-to-r from-terminal-green to-terminal-purple top-1/2 -translate-y-1/2 transition-all"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-2 rounded-full appearance-none cursor-pointer bg-transparent z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-terminal-green
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,159,0.5)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-terminal-green
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,255,159,0.5)]"
        />
      </div>
    </div>
  );
};
