import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`bg-zinc-900 rounded-xl border border-zinc-800 shadow-sm ${hoverable ? 'transition-all hover:shadow-lg hover:shadow-black/50 hover:-translate-y-0.5 hover:border-primary-500/50' : ''} ${className}`}>
      {children}
    </div>
  );
}
