
import React, { useState, useMemo } from 'react';
import { LeadSourceType, LEAD_SOURCES } from './types';
import { InputSlider } from './components/InputSlider';
import { CurrencyInput } from './components/CurrencyInput';
import { LeadSourceSelect } from './components/LeadSourceSelect';
import { ValuationDisplay } from './components/ValuationDisplay';
import { GuaranteeCard } from './components/GuaranteeCard';

export default function App() {
  const [leads, setLeads] = useState<number>(450);
  const [commission, setCommission] = useState<number>(0);
  const [leadSource, setLeadSource] = useState<LeadSourceType>(LeadSourceType.INTERNET);

  const stats = useMemo(() => {
    const selectedSource = LEAD_SOURCES.find(s => s.id === leadSource) || LEAD_SOURCES[0];
    const rate = selectedSource.rate;
    
    // Logic: Recoverable Deals = Floor(Leads * Rate)
    const recoverableDeals = Math.floor(leads * rate);
    
    // Logic: Pipeline Value = Deals * Commission
    const pipelineValue = recoverableDeals * commission;

    return {
      pipelineValue,
      recoverableDeals,
      recoveryRate: rate
    };
  }, [leads, commission, leadSource]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Database Valuation Calculator
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Discover the hidden revenue potential sitting in your "Dead" archive.
            </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Left: Inputs */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 h-full flex flex-col justify-start space-y-8">
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded mr-3 uppercase tracking-wide">Step 1</span>
                  Database Details
                </h2>
                
                <div className="space-y-8">
                  <InputSlider 
                    label="How many old leads between 31 days and three years old are in your database?" 
                    value={leads} 
                    onChange={setLeads} 
                    min={300} 
                    max={5000} 
                    step={50} 
                  />
                  
                  <CurrencyInput 
                    label="Average Commission" 
                    value={commission} 
                    onChange={setCommission} 
                  />
                  
                  <LeadSourceSelect 
                    selected={leadSource} 
                    onChange={setLeadSource} 
                  />
                </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-400 italic">
                    *Calculations based on industry standard recovery rates for {LEAD_SOURCES.find(s => s.id === leadSource)?.label.toLowerCase()}.
                </p>
            </div>
          </div>

          {/* Right: Valuation Display */}
          <div className="h-full">
             <ValuationDisplay 
                pipelineValue={stats.pipelineValue} 
                recoverableDeals={stats.recoverableDeals}
                recoveryRate={stats.recoveryRate}
                leads={leads}
                commission={commission}
                leadSource={leadSource}
             />
          </div>

        </div>

        {/* Guarantee Section */}
        <div className="w-full">
            <GuaranteeCard leads={leads} />
        </div>

      </div>
    </div>
  );
}