import React from 'react';

interface StepListProps {
  children: React.ReactNode;
}

export function StepList({ children }: StepListProps) {
  return (
    <div className="my-8">
      {children}
    </div>
  );
}

interface StepProps {
  number: string | number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 mb-6 last:mb-0 group">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm border border-slate-300 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors">
          {number}
        </div>
        <div className="w-px h-full bg-slate-100 mt-2 group-last:hidden"></div>
      </div>
      <div className="pb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-2 mt-0.5">{title}</h3>
        <div className="text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
