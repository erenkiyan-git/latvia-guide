import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LinkItem {
  label: string;
  href: string;
  description?: string;
}

interface LinkListProps {
  items: LinkItem[];
}

export function LinkList({ items }: LinkListProps) {
  return (
    <ul className="space-y-3 my-6">
      {items.map((item, idx) => (
        <li key={idx}>
          <a 
            href={item.href}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div>
              <span className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors block mb-1 sm:mb-0">
                {item.label}
              </span>
              {item.description && (
                <span className="text-sm text-slate-500 block">
                  {item.description}
                </span>
              )}
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:-translate-x-1 transition-all mt-2 sm:mt-0" />
          </a>
        </li>
      ))}
    </ul>
  );
}
