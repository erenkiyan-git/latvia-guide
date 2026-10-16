import React from 'react';
import { ShieldCheck, ShieldAlert, FileWarning } from 'lucide-react';

interface TrustBadgeProps {
  type: 'official' | 'verified' | 'draft';
  lang?: string;
  label?: string;
}

export function TrustBadge({ type, lang = 'en', label }: TrustBadgeProps) {
  const configs = {
    official: {
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />,
      label: lang === 'tr' ? 'Resmi' : 'Official'
    },
    verified: {
      color: 'bg-sky-50 text-sky-800 border-sky-300',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1 text-sky-600" />,
      label: lang === 'tr' ? 'Doğrulandı' : 'Verified'
    },
    draft: {
      color: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: <FileWarning className="w-3.5 h-3.5 mr-1 text-slate-500" />,
      label: lang === 'tr' ? 'Taslak' : 'Draft'
    }
  };

  const config = configs[type] || configs.draft;
  const displayLabel = label || config.label;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${config.color}`}>
      {config.icon}
      {displayLabel}
    </span>
  );
}
