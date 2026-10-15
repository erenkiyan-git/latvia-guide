import React from 'react';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  asChild?: boolean;
  href?: string;
}

export function Tag({ children, active = false, onClick, href }: TagProps) {
  const baseClasses = "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border";
  const activeClasses = active 
    ? "bg-primary-600 text-white border-primary-600 shadow-sm" 
    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400";

  const classes = `${baseClasses} ${activeClasses}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
