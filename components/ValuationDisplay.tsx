import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils';

interface ValuationDisplayProps {
  pipelineValue: number;
  recoverableDeals: number;
  recoveryRate: number;
}

export const ValuationDisplay: React.FC<ValuationDisplayProps> = ({ pipelineValue, recoverableDeals, recoveryRate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] h-full flex flex-col">
      {/* Red Accent Bar for Loss Aversion */}
      <div className="absolute top-0 w-full h-2 bg-red-600" />
      
      <div className="p-8 flex flex-col items-center text-center space-y-8 flex-grow justify-center">
        
        {/* Icon & Title */}
        <div className="flex flex-col items-center space-y-4 w-full">
            <div className="bg-red-50 p-4 rounded-full ring-1 ring-red-100">
                <AlertCircle className="w-10 h-10 text-red-600" />
            </div>

            <div className="space-y-1">
                <h3 className="text-slate-500 font-bold tracking-wider text-xs uppercase">Total Revenue Loss</h3>
                <div className="text-4xl sm:text-6xl font-extrabold tracking-tight text-red-600">
                    {formatCurrency(pipelineValue)}
                </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 max-w-sm">
                <p className="text-sm text-red-800 font-medium">
                    Based on a <strong>{(recoveryRate * 100).toFixed(1)}%</strong> recovery rate. This money is currently sitting (and decaying) in your archive.
                </p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-semibold">Lost Deals</p>
                <p className="text-xl font-bold text-slate-800">{recoverableDeals}</p>
            </div>
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-semibold">Avg Check</p>
                <p className="text-xl font-bold text-slate-800">
                    {formatCurrency(pipelineValue / (recoverableDeals || 1))}
                </p>
            </div>
        </div>

        {/* Action Area */}
        <div className="w-full space-y-3">
            <button className="w-full group relative flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-500/30 transition-all active:scale-[0.98]">
                Unlock this Revenue ($997 Pilot)
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-slate-400">
                Includes $997 Pilot + Risk-Free Guarantee
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
                *Pilot fee billed immediately. Monthly subscription billing begins 45 days after signup (allows 15 days setup + 30 days usage).
            </p>
        </div>

      </div>
    </div>
  );
};