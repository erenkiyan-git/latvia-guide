import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children,
  href,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-primary-700 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:ring-zinc-500",
    outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white focus:ring-primary-500 bg-transparent",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800 focus:ring-zinc-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
