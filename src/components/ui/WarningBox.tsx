import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function WarningBox({ children, title = 'Warning' }: WarningBoxProps) {
  return (
    <div className="my-6 hud-card border-l-4 border-l-primary-500 border border-primary-900/50 bg-surface/90 rounded-xl p-4 sm:p-5 flex gap-4 shadow-lg shadow-black/30">
      <div className="flex-shrink-0 mt-0.5">
        <div className="p-1.5 rounded-lg bg-primary-950/70 border border-primary-800/60 text-primary-400">
          <AlertTriangle className="w-4 h-4 text-primary-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-primary-300 font-bold font-mono text-sm tracking-wide uppercase mb-1">
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

export default WarningBox;
