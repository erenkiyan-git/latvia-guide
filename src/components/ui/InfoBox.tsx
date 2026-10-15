import React from 'react';
import { Info } from 'lucide-react';

interface InfoBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function InfoBox({ children, title = 'Note' }: InfoBoxProps) {
  return (
    <div className="my-6 hud-card border-l-4 border-l-sky-500 border border-sky-900/40 bg-surface/90 rounded-xl p-4 sm:p-5 flex gap-4 shadow-lg shadow-black/20">
      <div className="flex-shrink-0 mt-0.5">
        <div className="p-1.5 rounded-lg bg-sky-950/60 border border-sky-800/50 text-sky-400">
          <Info className="w-4 h-4" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sky-300 font-bold font-mono text-sm tracking-wide uppercase mb-1">
            // {title}
          </h4>
        )}
        <div className="text-slate-800 leading-relaxed text-sm sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
