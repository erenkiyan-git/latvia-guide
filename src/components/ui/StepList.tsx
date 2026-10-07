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
        <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-sm border border-zinc-700 group-hover:bg-primary-700 group-hover:text-white group-hover:border-primary-600 transition-colors">
          {number}
        </div>
        <div className="w-px h-full bg-zinc-800 mt-2 group-last:hidden"></div>
      </div>
      <div className="pb-6">
        <h3 className="text-lg font-bold text-zinc-100 mb-2 mt-0.5">{title}</h3>
        <div className="text-zinc-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
