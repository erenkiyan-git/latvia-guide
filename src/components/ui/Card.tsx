import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${hoverable ? 'transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary-200' : ''} ${className}`}>
      {children}
    </div>
  );
}
