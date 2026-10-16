import React from 'react';
import { Info } from 'lucide-react';

interface InfoBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function InfoBox({ children, title = 'Note' }: InfoBoxProps) {
  return (
    <div className="my-6 not-prose hud-card border-l-4 border-l-sky-500 border border-sky-600/40 bg-surface/95 rounded-xl p-4 sm:p-5 flex gap-4 shadow-xl shadow-black/40">
      <div className="flex-shrink-0 mt-0.5">
        <div className="p-2 rounded-lg bg-sky-950/80 border border-sky-700/60 text-sky-400 shadow-sm">
          <Info className="w-5 h-5 text-sky-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sky-300 font-bold font-mono text-xs sm:text-sm tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
            <span className="text-sky-500 font-bold">//</span>
            <span>{title}</span>
          </h4>
        )}
        <div 
          className="text-slate-100 leading-relaxed text-sm sm:text-base font-normal [&_p]:text-slate-100 [&_p]:leading-relaxed [&_p:last-child]:mb-0 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-sky-400 [&_a]:underline hover:[&_a]:text-sky-300"
          style={{ color: '#eef0f3' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoBox;

