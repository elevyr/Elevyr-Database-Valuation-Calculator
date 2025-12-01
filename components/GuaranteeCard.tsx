import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface GuaranteeCardProps {
  leads: number;
}

export const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ leads }) => {
  // Logic: 1 appointment per 100 leads, capped at 5.
  // Minimum leads is 300 (handled by slider min), so min guarantee is 3.
  const guaranteedAppointments = Math.min(5, Math.floor(leads / 100));

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl overflow-hidden border border-slate-700 relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheck className="w-32 h-32" />
      </div>
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-center space-x-2 mb-4">
            <div className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Risk-Free Guarantee
            </div>
            <div className="h-px bg-slate-600 flex-grow"></div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">
          The "Pilot" Promise
        </h3>

        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
                <p className="text-slate-300 text-sm font-semibold uppercase tracking-wide mb-1">Our Commitment</p>
                <p className="text-white leading-relaxed">
                  We guarantee to generate at least <span className="text-yellow-400 font-bold text-lg">{guaranteedAppointments} Booked Listing Appointments</span> (or qualified 'Ready to Sell' conversations) within 30 days of launching your Reactivation Campaign.
                </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 flex-shrink-0 mt-1 font-bold text-xs border border-red-500/50">
                !
             </div>
             <div>
                <p className="text-slate-300 text-sm font-semibold uppercase tracking-wide mb-1">The Penalty (If We Fail)</p>
                <p className="text-slate-200 leading-relaxed text-sm">
                  If we don't hit that number, we will <span className="text-white font-bold decoration-yellow-500 underline decoration-2 underline-offset-2">refund your $997 in full</span>. You get your money back, and you keep the cleaned database and the appointments we did generate.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};