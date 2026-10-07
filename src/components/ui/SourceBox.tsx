import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceBoxProps {
  url: string;
  label?: string;
}

export function SourceBox({ url, label = 'Official source' }: SourceBoxProps) {
  // Try to extract a clean domain name
  let domain = url;
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname.replace('www.', '');
  } catch (e) {
    // leave as is
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
    >
      <span className="font-semibold">{label}:</span>
      <span className="underline decoration-slate-300 underline-offset-2">{domain}</span>
      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
    </a>
  );
}
