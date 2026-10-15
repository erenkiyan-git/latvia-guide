import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceBoxProps {
  url: string;
  label?: string;
}

export function SourceBox({ url, label = 'Official source' }: SourceBoxProps) {
  let domain = url;
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname.replace('www.', '');
  } catch (e) {
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-flex items-center gap-2 px-3 py-2 bg-surface border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-colors"
    >
      <span className="font-semibold text-slate-700">{label}:</span>
      <span className="underline decoration-zinc-700 underline-offset-2">{domain}</span>
      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
    </a>
  );
}
