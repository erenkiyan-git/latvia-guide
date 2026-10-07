import React, { useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Tag } from './ui/Tag';

interface LinkItem {
  title: string;
  url: string;
  description: string;
  isOfficial: boolean;
  languages: string[];
}

interface CategoryGroup {
  category: string;
  links: LinkItem[];
}

interface UsefulLinksProps {
  data: CategoryGroup[];
  filterLabel: string;
}

export function UsefulLinks({ data, filterLabel }: UsefulLinksProps) {
  const [officialOnly, setOfficialOnly] = useState(false);

  const formatCategory = (cat: string) => cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div>
      <div className="flex justify-center mb-12">
        <label className="flex items-center gap-3 cursor-pointer bg-zinc-900 border border-zinc-800 py-2 px-5 rounded-full hover:border-primary-600 transition-colors">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={officialOnly}
              onChange={(e) => setOfficialOnly(e.target.checked)}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${officialOnly ? 'bg-primary-600' : 'bg-zinc-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${officialOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <span className="text-zinc-300 font-medium select-none">{filterLabel}</span>
        </label>
      </div>

      <div className="space-y-16">
        {data.map((group) => {
          const visibleLinks = officialOnly ? group.links.filter(l => l.isOfficial) : group.links;
          
          if (visibleLinks.length === 0) return null;

          return (
            <section key={group.category}>
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-2">
                {formatCategory(group.category)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-primary-600 hover:bg-zinc-800/80 transition-all group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors leading-tight">
                        {link.title}
                      </h3>
                      {link.isOfficial && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 bg-emerald-950/40 text-emerald-500 border border-emerald-900/50 text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          Official
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
                      {link.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {link.languages.map(l => (
                          <span key={l} className="text-[0.65rem] font-bold text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                            {l}
                          </span>
                        ))}
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
