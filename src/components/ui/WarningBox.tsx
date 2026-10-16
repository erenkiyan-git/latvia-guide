import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function WarningBox({ children, title = 'Warning' }: WarningBoxProps) {
  return (
    <aside className="my-6 not-prose hud-card border-l-4 border-l-amber-500 border border-amber-500/40 bg-surface/95 rounded-xl p-4 sm:p-5 flex gap-4 shadow-xl shadow-black/40" role="alert">
      <div className="flex-shrink-0 mt-0.5">
        <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-600/60 text-amber-400 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-amber-400 font-bold font-mono text-xs sm:text-sm tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
            <span className="text-amber-500 font-bold">//</span>
            <span>{title}</span>
          </h4>
        )}
        <div 
          className="warning-box-body text-sm sm:text-base leading-relaxed font-normal [&_p]:!text-[#f3f4f6] [&_p]:!mb-3 last:[&_p]:!mb-0 [&_strong]:!text-white [&_strong]:!font-bold [&_a]:!text-[#fbbf24] [&_a]:!underline"
          style={{ color: '#f3f4f6' }}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}

export default WarningBox;
