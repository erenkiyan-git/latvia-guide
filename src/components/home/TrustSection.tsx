import React from 'react';
import { TrustBadge } from '../ui/TrustBadge';
import { ShieldCheck } from 'lucide-react';

interface TrustSectionProps {
  title: string;
  description: string;
}

export function TrustSection({ title, description }: TrustSectionProps) {
  return (
    <div className="max-w-3xl mx-auto bg-surface border border-slate-300 rounded-2xl p-5 sm:p-12 text-center shadow-lg">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-300 shadow-inner">
        <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h2>
      <p className="text-slate-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">{description}</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-slate-50/50 p-4 sm:p-6 rounded-xl border border-slate-300">
        <div className="flex items-center gap-3">
          <TrustBadge type="official" />
          <span className="text-sm text-slate-500 text-left">Links directly to government sources.</span>
        </div>
        <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
        <div className="flex items-center gap-3">
          <TrustBadge type="verified" />
          <span className="text-sm text-slate-500 text-left">Fact-checked by locals recently.</span>
        </div>
      </div>
    </div>
  );
}
