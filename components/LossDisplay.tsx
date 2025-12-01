import React from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import { formatCurrency } from '../utils';

interface LossDisplayProps {
  leakageMin: number;
  leakageMax: number;
}

export const LossDisplay: React.FC<LossDisplayProps> = ({ leakageMin, leakageMax }) => {
  const hasValue = leakageMax > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] h-full flex flex-col">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-500 to-loss" />
      
      <div className="p-8 flex flex-col items-center text-center space-y-6 flex-grow justify-between">
        
        {/* Icon & Title */}
        <div className="flex flex-col items-center space-y-6 w-full">
            <div className="bg-red-50 p-3 rounded-full">
            <Lock className="w-8 h-8 text-loss" />
            </div>

            <div className="space-y-2 w-full">
            <h3 className="text-slate-500 font-semibold tracking-wide text-sm uppercase">Commissions Trapped in Database</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-2">
                <span className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${hasValue ? 'text-loss' : 'text-slate-300'}`}>
                {hasValue ? formatCurrency(leakageMin) : '$ —'}
                </span>
                <span className="text-2xl sm:text-4xl font-bold text-slate-300 hidden sm:inline">–</span>
                <span className="text-xl sm:text-3xl font-bold text-slate-300 sm:hidden">to</span>
                <span className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${hasValue ? 'text-loss' : 'text-slate-300'}`}>
                {hasValue ? formatCurrency(leakageMax) : '$ —'}
                </span>
            </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start space-x-3 text-left max-w-md">
                <AlertCircle className="w-5 h-5 text-loss flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-medium">
                    This revenue is currently "locked" in your dormant leads. Without a reactivation campaign, this money remains lost forever.
                </p>
            </div>
        </div>

        {/* Action Area */}
        <div className="w-full pt-4 border-t border-slate-100 mt-4">
             <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Cost to extract this revenue</p>
                        <p className="text-xl font-bold text-slate-900">$997 <span className="text-sm font-normal text-slate-500">(One-time Pilot)</span></p>
                    </div>
                    <button className="w-full xl:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center whitespace-nowrap">
                        Launch Reactivation
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 text-center leading-tight">
                    *Pilot fee billed immediately. Monthly subscription billing begins 45 days after signup (allows 15 days setup + 30 days usage).
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};