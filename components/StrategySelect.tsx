import React from 'react';
import { STRATEGIES, StrategyType } from '../types';
import { ChevronDown } from 'lucide-react';

interface StrategySelectProps {
  selected: StrategyType;
  onChange: (val: StrategyType) => void;
}

export const StrategySelect: React.FC<StrategySelectProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-700">Current Follow-Up Strategy</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as StrategyType)}
          className="appearance-none block w-full rounded-lg border-0 py-3 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 bg-slate-50 cursor-pointer transition-all hover:bg-white"
        >
          {STRATEGIES.map((strategy) => (
            <option key={strategy.id} value={strategy.id}>
              {strategy.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </div>
  );
};