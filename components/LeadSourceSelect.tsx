
import React from 'react';
import { LEAD_SOURCES, LeadSourceType } from '../types';
import { ChevronDown } from 'lucide-react';

interface LeadSourceSelectProps {
  selected: LeadSourceType;
  onChange: (val: LeadSourceType) => void;
}

export const LeadSourceSelect: React.FC<LeadSourceSelectProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-700">Lead Source Quality</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as LeadSourceType)}
          className="appearance-none block w-full rounded-lg border-0 py-3 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 bg-slate-50 cursor-pointer transition-all hover:bg-white"
        >
          {LEAD_SOURCES.map((source) => (
            <option key={source.id} value={source.id}>
              {source.label}
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
