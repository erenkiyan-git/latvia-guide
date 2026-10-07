import React from 'react';
import { Info } from 'lucide-react';

interface InfoBoxProps {
  children: React.ReactNode;
  title?: string;
}

export function InfoBox({ children, title = 'Note' }: InfoBoxProps) {
  return (
    <div className="my-6 bg-sky-950/30 border border-sky-900/50 rounded-xl p-4 sm:p-5 flex gap-4">
      <div className="flex-shrink-0 mt-0.5">
        <Info className="w-5 h-5 text-sky-500" />
      </div>
      <div>
        {title && <h4 className="text-sky-400 font-bold mb-1">{title}</h4>}
        <div className="text-sky-200/80 leading-relaxed text-sm sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
