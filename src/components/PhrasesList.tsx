import React, { useState } from 'react';
import { Copy, Check, Volume2 } from 'lucide-react';

interface Phrase {
  latvian: string;
  pronunciation: string;
  translations: Record<string, string>;
}

interface PhraseGroup {
  situation: string;
  phrases: Phrase[];
}

interface PhrasesListProps {
  data: PhraseGroup[];
  lang: string;
}

export function PhrasesList({ data, lang }: PhrasesListProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const formatSituation = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className="space-y-16">
      {data.map((group, idx) => (
        <section key={idx}>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-2">
            {formatSituation(group.situation)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.phrases.map((phrase, pIdx) => {
              const isCopied = copiedText === phrase.latvian;
              
              return (
                <div key={pIdx} className="flex justify-between items-center p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                  <div className="flex-grow pr-4">
                    <h3 className="text-xl font-bold text-primary-400 mb-1 leading-tight">{phrase.latvian}</h3>
                    <p className="text-zinc-500 text-sm mb-2 font-medium flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" /> 
                      {phrase.pronunciation}
                    </p>
                    <p className="text-zinc-200 text-base">{phrase.translations[lang] || phrase.translations['en']}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(phrase.latvian)}
                    className={`flex-shrink-0 p-2.5 rounded-lg transition-all ${
                      isCopied 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600 hover:bg-zinc-800'
                    }`}
                    aria-label="Copy to clipboard"
                  >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
