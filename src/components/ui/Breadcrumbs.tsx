import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="inline-flex items-center">
              {!isFirst && <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />}
              {isLast ? (
                <span className="text-slate-700 font-medium">{item.label}</span>
              ) : (
                <a 
                  href={item.href} 
                  className="inline-flex items-center hover:text-primary-600 transition-colors"
                >
                  {isFirst && <Home className="w-4 h-4 mr-1.5" />}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
