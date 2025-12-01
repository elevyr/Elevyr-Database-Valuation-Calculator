
import React, { useEffect, useState } from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = ''
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const numVal = Number(val);
    if (!isNaN(numVal)) {
      onChange(numVal);
    }
  };

  const handleBlur = () => {
    let numVal = Number(inputValue);
    // Ensure value is not below the minimum or invalid
    if (isNaN(numVal) || numVal < min) {
      numVal = min;
    }
    // We allow typing numbers larger than max (slider just stays at max)
    setInputValue(numVal.toString());
    onChange(numVal);
  };

  // Determine slider percentage for visual tracking if needed, 
  // but standard input[type=range] handles handle position automatically based on min/max.
  // We clamp the value passed to the range input so the handle doesn't disappear if user types 5000.
  const sliderValue = Math.min(Math.max(value, min), max);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center relative">
          <span className="absolute left-3 text-blue-600 font-semibold z-10 pointer-events-none">{prefix}</span>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`text-lg font-semibold text-blue-600 bg-blue-50 py-1 rounded-md w-24 text-center border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${prefix ? 'pl-4' : ''} ${suffix ? 'pr-6' : ''}`}
          />
          <span className="absolute right-3 text-blue-600 font-semibold z-10 pointer-events-none">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) => {
            const val = Number(e.target.value);
            setInputValue(val.toString());
            onChange(val);
        }}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex justify-between text-xs text-slate-400 font-medium">
        <span>{prefix}{min}</span>
        <span>{prefix}{max}+</span>
      </div>
    </div>
  );
};
