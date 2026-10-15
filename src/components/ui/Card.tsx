import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`hud-card rounded-lg ${hoverable ? 'hud-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}
