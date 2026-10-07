import React from 'react';
import { TrustBadge } from '../ui/TrustBadge';
import { ShieldCheck } from 'lucide-react';

interface TrustSectionProps {
  title: string;
  description: string;
}

export function TrustSection({ title, description }: TrustSectionProps) {
  return (
    <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-12 text-center shadow-lg shadow-black/20">
      <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-800 shadow-inner">
        <ShieldCheck className="w-8 h-8 text-primary-500" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{title}</h2>
      <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">{description}</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-zinc-950/50 p-6 rounded-xl border border-zinc-800/50">
        <div className="flex items-center gap-3">
          <TrustBadge type="official" />
          <span className="text-sm text-zinc-500 text-left">Links directly to government sources.</span>
        </div>
        <div className="hidden sm:block w-px h-8 bg-zinc-800"></div>
        <div className="flex items-center gap-3">
          <TrustBadge type="verified" />
          <span className="text-sm text-zinc-500 text-left">Fact-checked by locals recently.</span>
        </div>
      </div>
    </div>
  );
}
