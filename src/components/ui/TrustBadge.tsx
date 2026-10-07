import React from 'react';
import { ShieldCheck, ShieldAlert, FileWarning } from 'lucide-react';

interface TrustBadgeProps {
  type: 'official' | 'verified' | 'draft';
}

export function TrustBadge({ type }: TrustBadgeProps) {
  const configs = {
    official: {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1" />,
      label: 'Official'
    },
    verified: {
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1" />,
      label: 'Verified'
    },
    draft: {
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <FileWarning className="w-3.5 h-3.5 mr-1" />,
      label: 'Draft'
    }
  };

  const config = configs[type] || configs.draft;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${config.color}`}>
      {config.icon}
      {config.label}
    </span>
  );
}
