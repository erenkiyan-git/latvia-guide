import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SourceBoxProps {
  url: string | string[];
  label?: string;
}

export function SourceBox({ url, label = 'Official source' }: SourceBoxProps) {
  // Normalize url to an array of trimmed URLs, handling arrays and comma-separated strings
  let urls: string[] = [];
  if (Array.isArray(url)) {
    urls = url.flatMap(u => (typeof u === 'string' && u.includes(',') ? u.split(',') : u));
  } else if (typeof url === 'string') {
    urls = url.includes(',') ? url.split(',') : [url];
  }
  urls = urls.map(u => u.trim()).filter(Boolean);

  if (urls.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {urls.map((singleUrl, idx) => {
        let domain = singleUrl;
        try {
          const urlObj = new URL(singleUrl);
          domain = urlObj.hostname.replace('www.', '');
        } catch (e) {
        }

        return (
          <a 
            key={idx}
            href={singleUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-3 py-2 bg-surface border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-colors"
          >
            <span className="font-semibold text-slate-700">{label}:</span>
            <span className="underline decoration-zinc-700 underline-offset-2">{domain}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        );
      })}
    </div>
  );
}
