import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

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
    // Close on outside click
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
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
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
          className="w-full bg-surface border border-slate-300 text-slate-900 rounded-full py-4 pl-12 pr-6 text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-lg shadow-slate-200"
          aria-expanded={isOpen}
          role="combobox"
          aria-controls="search-results"
        />
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          id="search-results"
          className="absolute z-50 w-full mt-2 bg-surface border border-slate-300 rounded-2xl shadow-xl shadow-slate-200 overflow-hidden max-h-96 overflow-y-auto"
          role="listbox"
        >
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, idx) => (
                <a
                  key={result.id}
                  href={result.url}
                  role="option"
                  aria-selected={idx === selectedIndex}
                  className={`block px-5 py-3 hover:bg-slate-50 transition-colors ${
                    idx === selectedIndex ? 'bg-slate-50' : ''
                  }`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="font-bold text-slate-900 mb-1">{result.title}</div>
                  <div className="text-sm text-slate-500 truncate mb-1">{result.description}</div>
                  <div className="text-xs font-semibold text-primary-500 uppercase tracking-wider">
                    {result.section.replace(/-/g, ' ')}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-slate-500">
              No results found for "{query}". Try a different word.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
