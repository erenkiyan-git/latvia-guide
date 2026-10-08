import { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, getPublicPlaces, getActiveCategories, pick, searchText, distanceKm } from '../../lib/places';
import PlaceCard from './PlaceCard';
import { Search, SlidersHorizontal, MapPin, AlertCircle } from 'lucide-react';

interface Props {
  lang: 'en' | 'tr' | 'ru' | 'lv';
  t: (key: any) => string;
}

export default function PlacesList({ lang, t }: Props) {
  const [places, setPlaces] = useState(getPublicPlaces());
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [locState, setLocState] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');

  const categories = useMemo(() => getActiveCategories(places), [places]);

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('category');
    const q = params.get('q');
    if (c && CATEGORIES[c as keyof typeof CATEGORIES]) setActiveCat(c);
    if (q) setQuery(q);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeCat) url.searchParams.set('category', activeCat);
    else url.searchParams.delete('category');
    
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    
    window.history.replaceState({}, '', url);
  }, [activeCat, query]);

  const filtered = useMemo(() => {
    let res = places;
    if (activeCat) {
      res = res.filter(p => p.category === activeCat);
    }
    if (query.trim()) {
      const terms = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ');
      res = res.filter(p => {
        const text = searchText(p, t(`map.cat.${p.category}`));
        return terms.every(t => text.includes(t));
      });
    }
    if (userLoc) {
      // Sort by distance
      res = [...res].sort((a, b) => {
        const da = distanceKm(userLoc.lat, userLoc.lng, a.lat, a.lng);
        const db = distanceKm(userLoc.lat, userLoc.lng, b.lat, b.lng);
        return da - db;
      });
    }
    return res;
  }, [places, activeCat, query, userLoc, t]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setLocState('error');
      return;
    }
    setLocState('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocState('idle');
      },
      (err) => {
        setLocState(err.code === err.PERMISSION_DENIED ? 'denied' : 'error');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[800px]">
      {/* Search and Filters */}
      <div className="bg-black/80 backdrop-blur border-b border-zinc-800 p-4 sticky top-0 z-20">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
            placeholder={t('map.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
          <button
            onClick={() => setActiveCat(null)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              activeCat === null 
                ? 'bg-zinc-200 text-black' 
                : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-500'
            }`}
          >
            {t('map.showAll')}
          </button>
          
          {categories.map(c => {
            const cat = CATEGORIES[c as keyof typeof CATEGORIES];
            const isActive = activeCat === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(isActive ? null : c)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors border`}
                style={{
                  backgroundColor: isActive ? `${cat.color}20` : '#18181b', // zinc-900
                  borderColor: isActive ? cat.color : '#3f3f46', // zinc-700
                  color: isActive ? cat.color : '#a1a1aa' // zinc-400
                }}
              >
                {t(`map.cat.${c}`)}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
          <span>{t('map.resultsCount').replace('{count}', filtered.length.toString())}</span>
          
          <button
            onClick={handleNearMe}
            disabled={locState === 'loading'}
            className={`flex items-center transition-colors ${
              userLoc 
                ? 'text-sky-400 hover:text-sky-300' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className={`w-4 h-4 mr-1.5 ${locState === 'loading' ? 'animate-pulse' : ''}`} />
            {locState === 'loading' ? t('map.nearMeLocating') : userLoc ? t('map.nearMeActive') : t('map.nearMe')}
          </button>
        </div>
        
        {locState === 'denied' && (
          <div className="mt-2 text-xs text-amber-500 flex items-start">
            <AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
            {t('map.nearMeDenied')}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-4 border border-zinc-800 border-dashed rounded-xl">
            <Search className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400">{t('map.noResults')}</p>
            <button 
              onClick={() => { setQuery(''); setActiveCat(null); }}
              className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
            >
              {t('map.reset')}
            </button>
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="relative">
              {userLoc && (
                <div className="absolute top-5 right-5 z-10 text-xs font-bold text-sky-400 bg-sky-950/80 px-2 py-1 rounded border border-sky-800">
                  {distanceKm(userLoc.lat, userLoc.lng, p.lat, p.lng).toFixed(1)} km
                </div>
              )}
              <PlaceCard place={p} lang={lang} t={t} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
