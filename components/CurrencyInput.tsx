import React from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onChange }) => {
  const isEmpty = value === 0;

  return (
    <div className="flex flex-col space-y-2">
      <label className={`text-sm font-medium ${isEmpty ? 'text-red-600' : 'text-slate-700'}`}>
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <DollarSign className={`h-5 w-5 ${isEmpty ? 'text-red-400' : 'text-slate-400'}`} aria-hidden="true" />
        </div>
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`block w-full rounded-lg border-0 py-3 pl-10 pr-3 sm:text-sm sm:leading-6 transition-all 
            ${isEmpty 
              ? 'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 bg-red-50' 
              : 'text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 bg-slate-50 hover:bg-white'
            }`}
          placeholder="0.00"
        />
      </div>
    </div>
  );
};