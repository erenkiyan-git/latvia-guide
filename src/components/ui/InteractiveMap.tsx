import { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, getPublicPlaces, getActiveCategories, pick, searchText, distanceKm } from '../../lib/places';
import PlaceCard from './PlaceCard';
import LeafletMap from './LeafletMap';
import { Search, SlidersHorizontal, MapPin, AlertCircle, List, Map as MapIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Props {
  lang: 'en' | 'tr' | 'ru' | 'lv';
  t: (key: any) => string;
}

export default function InteractiveMap({ lang, t }: Props) {
  const [places, setPlaces] = useState(getPublicPlaces());
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [locState, setLocState] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');
  
  // Mobile view toggle (list vs map)
  const [view, setView] = useState<'list' | 'map'>('list');

  // Same logic as PlacesList (lifted state up)
  const categories = useMemo(() => getActiveCategories(places), [places]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('category');
    const q = params.get('q');
    if (c && CATEGORIES[c as keyof typeof CATEGORIES]) setActiveCat(c);
    if (q) setQuery(q);
  }, []);

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
    if (activeCat) res = res.filter(p => p.category === activeCat);
    if (query.trim()) {
      const terms = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ');
      res = res.filter(p => {
        const text = searchText(p, t(`map.cat.${p.category}`));
        return terms.every(t => text.includes(t));
      });
    }
    if (userLoc) {
      res = [...res].sort((a, b) => distanceKm(userLoc.lat, userLoc.lng, a.lat, a.lng) - distanceKm(userLoc.lat, userLoc.lng, b.lat, b.lng));
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
      (pos) => { setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocState('idle'); },
      (err) => { setLocState(err.code === err.PERMISSION_DENIED ? 'denied' : 'error'); },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="flex flex-col h-[800px] max-h-[85vh] bg-black border border-zinc-800 rounded-2xl overflow-hidden relative shadow-2xl">
      
      {/* Mobile view toggle */}
      <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 p-1 rounded-full flex shadow-xl">
        <button 
          onClick={() => setView('list')}
          className={`flex items-center px-6 py-2 rounded-full text-sm font-bold transition-colors ${view === 'list' ? 'bg-primary-600 text-white' : 'text-zinc-400'}`}
        >
          <List className="w-4 h-4 mr-2" />
          {t('map.viewList')}
        </button>
        <button 
          onClick={() => setView('map')}
          className={`flex items-center px-6 py-2 rounded-full text-sm font-bold transition-colors ${view === 'map' ? 'bg-primary-600 text-white' : 'text-zinc-400'}`}
        >
          <MapIcon className="w-4 h-4 mr-2" />
          {t('map.viewMap')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        
        {/* Left pane: List (hidden on mobile if map is active) */}
        <div className={`w-full md:w-[40%] flex flex-col border-r border-zinc-800 bg-black ${view === 'map' ? 'hidden md:flex' : 'flex'}`}>
          {/* Search/Filters header */}
          <div className="p-4 border-b border-zinc-800 shrink-0">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-zinc-700 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                placeholder={t('map.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-nowrap md:flex-wrap items-center gap-2 mb-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500 shrink-0 hidden md:block" />
              <button
                onClick={() => setActiveCat(null)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors shrink-0 ${activeCat === null ? 'bg-zinc-200 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-500'}`}
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
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors border shrink-0`}
                    style={{
                      backgroundColor: isActive ? `${cat.color}20` : '#18181b',
                      borderColor: isActive ? cat.color : '#3f3f46',
                      color: isActive ? cat.color : '#a1a1aa'
                    }}
                  >
                    {t(`map.cat.${c}`)}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-2 text-sm text-zinc-400">
              <span>{t('map.resultsCount').replace('{count}', filtered.length.toString())}</span>
              <button
                onClick={handleNearMe}
                disabled={locState === 'loading'}
                className={`flex items-center transition-colors ${userLoc ? 'text-sky-400' : 'text-zinc-400 hover:text-white'}`}
              >
                <MapPin className={`w-4 h-4 mr-1.5 ${locState === 'loading' ? 'animate-pulse' : ''}`} />
                {locState === 'loading' ? t('map.nearMeLocating') : userLoc ? t('map.nearMeActive') : t('map.nearMe')}
              </button>
            </div>
            {locState === 'denied' && (
              <div className="mt-2 text-xs text-amber-500 flex items-start"><AlertCircle className="w-3 h-3 mr-1 shrink-0" />{t('map.nearMeDenied')}</div>
            )}
          </div>

          {/* List content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black pb-24 md:pb-4">
            {filtered.length === 0 ? (
              <div className="text-center py-12 px-4 border border-zinc-800 border-dashed rounded-xl">
                <Search className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">{t('map.noResults')}</p>
                <button onClick={() => { setQuery(''); setActiveCat(null); }} className="mt-4 text-primary-400 hover:text-primary-300 font-medium">{t('map.reset')}</button>
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

        {/* Right pane: Map (hidden on mobile if list is active) */}
        <div className={`w-full md:w-[60%] h-full ${view === 'list' ? 'hidden md:block' : 'block'}`}>
          <LeafletMap places={filtered} userLoc={userLoc} t={t} />
        </div>
        
      </div>
    </div>
  );
}
