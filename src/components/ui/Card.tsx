import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-300 shadow-sm ${hoverable ? 'transition-all hover:shadow-lg hover:shadow-slate-300 hover:-translate-y-0.5 hover:border-primary-500/50' : ''} ${className}`}>
      {children}
    </div>
  );
}
