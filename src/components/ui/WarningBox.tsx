import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function WarningBox({ children, title = 'Warning' }: WarningBoxProps) {
  return (
    <div className="my-6 bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 flex gap-4">
      <div className="flex-shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5 text-rose-600" />
      </div>
      <div>
        {title && <h4 className="text-rose-900 font-bold mb-1">{title}</h4>}
        <div className="text-rose-800 leading-relaxed text-sm sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
