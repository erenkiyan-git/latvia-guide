import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, CornerDownLeft, FileText, X } from 'lucide-react';

interface SearchBoxProps {
  lang: string;
  placeholder: string;
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  section: string;
  url: string;
  searchableText: string;
}

interface SearchIndex {
  synonyms: Record<string, string[]>;
  index: SearchItem[];
}

export function SearchBox({ lang, placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [indexData, setIndexData] = useState<SearchIndex | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load index data on first focus or interaction
  const loadIndex = async () => {
    if (indexData || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/${lang}/search-index.json`);
      const data = await res.json();
      setIndexData(data);
    } catch (e) {
      console.error("Failed to load search index", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const expandSearchQuery = (q: string) => {
    const words = q.toLowerCase().trim().split(/\s+/);
    let expandedWords = [...words];
    
    if (indexData && indexData.synonyms) {
      words.forEach(word => {
        Object.entries(indexData.synonyms).forEach(([mainWord, syns]) => {
          if (mainWord === word || syns.includes(word)) {
            expandedWords.push(mainWord, ...syns);
          }
        });
      });
    }
    return [...new Set(expandedWords)];
  };

  const scoreResult = (item: SearchItem, expandedQueryTerms: string[]) => {
    let score = 0;
    expandedQueryTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) score += 10;
      if (item.section.toLowerCase().includes(term)) score += 5;
      if (item.searchableText.includes(term)) score += 1;
    });
    return score;
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (!indexData) {
      loadIndex();
      return;
    }

    const queryTerms = expandSearchQuery(query);
    const scored = indexData.index.map(item => ({
      item,
      score: scoreResult(item, queryTerms)
    })).filter(r => r.score > 0);
    
    scored.sort((a, b) => b.score - a.score);
    setResults(scored.map(r => r.item).slice(0, 8)); // Top 8 results
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query, indexData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        window.location.href = results[selectedIndex].url;
      } else if (results.length > 0) {
        window.location.href = results[0].url;
      }
    }
  };

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      {/* Search Input Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary-400 group-focus-within:text-primary-300 transition-colors" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            loadIndex();
            if (query.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-surface/95 backdrop-blur-md border-2 border-slate-300 text-slate-100 rounded-2xl py-4 sm:py-4.5 pl-12 sm:pl-14 pr-24 text-base sm:text-lg placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all shadow-2xl shadow-black/50"
          aria-expanded={isOpen}
          role="combobox"
          aria-controls="search-results"
        />

        {/* Clear Button & Loading Spinner */}
        <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center gap-2">
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
          )}
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => { setQuery(''); setIsOpen(false); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={lang === 'tr' ? 'Temizle' : 'Clear'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-[0.65rem] font-mono text-slate-500 border border-slate-300 rounded bg-base/80 select-none">
            ESC
          </span>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div 
          id="search-results"
          className="absolute z-50 left-0 right-0 mt-3 bg-surface/98 backdrop-blur-xl border border-primary-500/50 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden max-h-[30rem] flex flex-col animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
        >
          {/* Header toolbar */}
          <div className="px-4 py-2.5 bg-base/90 border-b border-slate-300/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span>
                {results.length > 0
                  ? (lang === 'tr' ? `${results.length} DOĞRULANMIŞ REHBER BULUNDU` : `FOUND ${results.length} VERIFIED GUIDES`)
                  : (lang === 'tr' ? 'SONUÇ BULUNAMADI' : 'NO MATCHING GUIDES')}
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[0.65rem] text-slate-500">
              <span>↑↓ Gezin</span>
              <span>·</span>
              <CornerDownLeft className="w-3 h-3 inline" />
              <span>Seç</span>
            </span>
          </div>

          {/* Results list */}
          <div className="overflow-y-auto custom-scrollbar flex-1 divide-y divide-slate-300/40">
            {results.length > 0 ? (
              results.map((result, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <a
                    key={result.id}
                    href={result.url}
                    role="option"
                    aria-selected={isSelected}
                    className={`block px-5 py-3.5 transition-all group ${
                      isSelected 
                        ? 'bg-slate-800/90 border-l-4 border-l-primary-500 pl-4' 
                        : 'hover:bg-slate-800/50 border-l-4 border-l-transparent'
                    }`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className={`w-4 h-4 shrink-0 transition-colors ${
                          isSelected ? 'text-primary-400' : 'text-slate-500 group-hover:text-primary-400'
                        }`} />
                        <h4 className="font-bold text-slate-100 text-base sm:text-lg group-hover:text-primary-300 transition-colors truncate">
                          {result.title}
                        </h4>
                      </div>
                      
                      <span className="shrink-0 text-[0.65rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary-950/70 text-primary-400 border border-primary-800/50">
                        {result.section.replace(/-/g, ' ')}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed ml-6 group-hover:text-slate-300 transition-colors">
                      {result.description}
                    </p>

                    <div className="flex items-center justify-end mt-1 text-xs font-mono text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                      <span>{lang === 'tr' ? 'Rehbere Git' : 'Open guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="px-6 py-10 text-center">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-300 text-base font-medium mb-1">
                  {lang === 'tr' 
                    ? `"${query}" ile ilgili bir sonuç bulunamadı.` 
                    : `No results found for "${query}".`}
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {lang === 'tr'
                    ? 'İpucu: "oturma izni", "pmlp", "ehliyet", "ev kiralama", "doktor" gibi kelimeleri deneyebilirsiniz.'
                    : 'Tip: Try searching for "permit", "pmlp", "license", "housing", or "doctor".'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
