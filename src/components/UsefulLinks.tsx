import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Building2, 
  Train, 
  Home, 
  Briefcase, 
  Landmark, 
  HeartPulse, 
  BookOpen,
  Layers
} from 'lucide-react';

interface LocalizedText {
  en?: string;
  tr?: string;
  [key: string]: string | undefined;
}

interface LinkItem {
  title: string | LocalizedText;
  url: string;
  description: string | LocalizedText;
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
  lang?: string;
}

const CATEGORY_META: Record<string, { en: string; tr: string; icon: React.ComponentType<{ className?: string }> }> = {
  government: {
    en: 'Government & E-Services',
    tr: 'Devlet ve E-Hizmetler',
    icon: Building2
  },
  transport: {
    en: 'Transport & Mobility',
    tr: 'Ulaşım ve Mobilite',
    icon: Train
  },
  housing: {
    en: 'Housing & Utilities',
    tr: 'Konut ve Faturalar',
    icon: Home
  },
  jobs: {
    en: 'Jobs & Careers',
    tr: 'İş ve Kariyer',
    icon: Briefcase
  },
  banking: {
    en: 'Banking & Finance',
    tr: 'Bankacılık ve Finans',
    icon: Landmark
  },
  healthcare: {
    en: 'Healthcare & Emergencies',
    tr: 'Sağlık ve Acil Durum',
    icon: HeartPulse
  },
  language_culture: {
    en: 'Language, Integration & Culture',
    tr: 'Dil Eğitimi, Uyum ve Kültür',
    icon: BookOpen
  }
};

export function UsefulLinks({ data, filterLabel, lang = 'en' }: UsefulLinksProps) {
  const [officialOnly, setOfficialOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getText = (val: string | LocalizedText | undefined): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.en || Object.values(val)[0] || '';
  };

  const getCategoryTitle = (cat: string): string => {
    const meta = CATEGORY_META[cat];
    if (meta) {
      return lang === 'tr' ? meta.tr : meta.en;
    }
    return cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const categories = useMemo(() => {
    return ['all', ...data.map(g => g.category)];
  }, [data]);

  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return data
      .filter(group => activeCategory === 'all' || group.category === activeCategory)
      .map(group => {
        const filteredLinks = group.links.filter(link => {
          if (officialOnly && !link.isOfficial) return false;
          if (!q) return true;

          const title = getText(link.title).toLowerCase();
          const desc = getText(link.description).toLowerCase();
          const url = link.url.toLowerCase();
          const langs = link.languages.join(' ').toLowerCase();

          return title.includes(q) || desc.includes(q) || url.includes(q) || langs.includes(q);
        });

        return {
          ...group,
          links: filteredLinks
        };
      })
      .filter(group => group.links.length > 0);
  }, [data, activeCategory, officialOnly, searchQuery, lang]);

  const totalVisibleLinks = filteredGroups.reduce((acc, g) => acc + g.links.length, 0);

  return (
    <div className="space-y-8">
      {/* Controls & Search Toolbar */}
      <div className="bg-surface/90 backdrop-blur border border-slate-300 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Live Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'tr' ? 'Web sitelerinde ara...' : 'Search useful sites...'}
              className="w-full bg-base border border-slate-300 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>

          {/* Official Only Switch */}
          <label className="flex items-center gap-3 cursor-pointer self-start md:self-auto py-1 px-3 rounded-lg hover:bg-slate-100/50 transition-colors">
            <div className="relative inline-flex items-center">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={officialOnly}
                onChange={(e) => setOfficialOnly(e.target.checked)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${officialOnly ? 'bg-primary-600' : 'bg-slate-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${officialOnly ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="text-slate-700 text-sm font-medium select-none flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {filterLabel}
            </span>
          </label>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto gap-2 mt-4 pt-4 border-t border-slate-300/60 pb-2 sm:pb-0 hide-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const meta = CATEGORY_META[cat];
            const Icon = cat === 'all' ? Layers : meta?.icon || Layers;
            const label = cat === 'all' 
              ? (lang === 'tr' ? 'Tümü' : 'All') 
              : getCategoryTitle(cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-950/40 border border-primary-500'
                    : 'bg-base/70 text-slate-700 border border-slate-300 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Notice */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <span>
          {lang === 'tr' 
            ? `TOPLAM ${totalVisibleLinks} KAYNAK LİSTELENİYOR` 
            : `SHOWING ${totalVisibleLinks} VERIFIED RESOURCES`}
        </span>
        {officialOnly && (
          <span className="text-emerald-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            {lang === 'tr' ? 'SADECE RESMİ DEVLET KURUMLARI' : 'OFFICIAL GOVERNMENT BODIES ONLY'}
          </span>
        )}
      </div>

      {/* Categories & Links Grid */}
      {filteredGroups.length === 0 ? (
        <div className="hud-card p-12 text-center border-dashed border-slate-300">
          <p className="text-slate-600 text-base mb-2">
            {lang === 'tr' ? 'Aramanıza uygun web sitesi bulunamadı.' : 'No matching websites found for your search.'}
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); setOfficialOnly(false); }}
            className="text-xs font-mono text-primary-400 hover:text-primary-300 uppercase underline mt-2"
          >
            {lang === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredGroups.map((group) => {
            const meta = CATEGORY_META[group.category];
            const CategoryIcon = meta?.icon || Layers;
            const categoryTitle = getCategoryTitle(group.category);

            return (
              <section key={group.category} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-300/80 pb-3">
                  <div className="p-2 rounded-lg bg-primary-950/30 border border-primary-800/40 text-primary-400">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {categoryTitle}
                    </h2>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                      // {group.links.length} {lang === 'tr' ? 'Bağlantı' : 'Entries'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.links.map((link, idx) => {
                    const titleText = getText(link.title);
                    const descText = getText(link.description);

                    return (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hud-card hud-hover flex flex-col p-5 rounded-xl border border-slate-300 hover:border-primary-500/70 transition-all group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-2.5 gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-400 transition-colors leading-snug">
                            {titleText}
                          </h3>
                          {link.isOfficial && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 text-[0.65rem] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              Official
                            </span>
                          )}
                        </div>

                        <p className="text-slate-600 text-sm mb-5 flex-grow leading-relaxed">
                          {descText}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-300/50 mt-auto">
                          <div className="flex flex-wrap gap-1.5">
                            {link.languages.map((l) => (
                              <span 
                                key={l} 
                                className="text-[0.65rem] font-mono font-bold text-slate-600 bg-base/80 px-2 py-0.5 rounded border border-slate-300/80"
                              >
                                {l}
                              </span>
                            ))}
                          </div>

                          <span className="inline-flex items-center text-xs font-mono text-slate-500 group-hover:text-primary-400 transition-colors gap-1">
                            <span>Visit</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
