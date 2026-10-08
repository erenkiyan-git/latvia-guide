import { CATEGORIES, getPublicPlaces, type Place } from '../../lib/places';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import type { Localized } from '../../lib/places';

interface Props {
  place: Place;
  lang: 'en' | 'tr' | 'ru' | 'lv';
  t: (key: any) => string;
}

function p(val: Localized | undefined, l: string) {
  if (!val) return '';
  return (val as any)[l] || val.en;
}

export default function PlaceCard({ place, lang, t }: Props) {
  const cat = CATEGORIES[place.category] || CATEGORIES.immigration;
  const name = p(place.name, lang);
  const notes = p(place.notes, lang);
  const hours = p(place.openingHours, lang);

  // We can't render lucide icons dynamically easily in Astro without a map,
  // so we'll just use a colored dot here as a simple fallback or rely on the category chip icon later.
  
  return (
    <div 
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4 hover:border-zinc-700 transition-colors"
      id={`place-${place.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
        <span 
          className="text-xs font-semibold px-2 py-1 rounded-md shrink-0 ml-3"
          style={{ backgroundColor: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40` }}
        >
          {t(`map.cat.${place.category}`)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start text-zinc-300">
          <MapPin className="w-5 h-5 text-zinc-500 mr-3 shrink-0 mt-0.5" />
          <span>{place.address}, {place.city}</span>
        </div>
        
        {place.phone && (
          <div className="flex items-start text-zinc-300">
            <Phone className="w-5 h-5 text-zinc-500 mr-3 shrink-0 mt-0.5" />
            <a href={`tel:${place.phone.replace(/\s/g, '')}`} className="hover:text-primary-400 transition-colors">
              {place.phone}
            </a>
          </div>
        )}

        {hours && (
          <div className="flex items-start text-zinc-300">
            <Clock className="w-5 h-5 text-zinc-500 mr-3 shrink-0 mt-0.5" />
            <span className="whitespace-pre-line">{hours}</span>
          </div>
        )}
      </div>

      {notes && (
        <p className="text-sm text-zinc-400 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800 mb-4">
          {notes}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-zinc-800/50">
        <a 
          href={place.officialUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-1.5" />
          {t('map.officialWebsite')}
        </a>
        
        <span className="text-zinc-600 hidden sm:inline">•</span>

        <a 
          href={`https://www.openstreetmap.org/directions?route=%3B${place.lat}%2C${place.lng}#map=17/${place.lat}/${place.lng}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
        >
          <Navigation className="w-4 h-4 mr-1.5" />
          {t('map.directions')}
        </a>
      </div>
      
      {place.verified && (
        <div className="mt-4 text-xs text-zinc-500 flex items-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
          {t('map.officialSource')} · {t('map.lastChecked')}: {place.lastChecked}
        </div>
      )}
    </div>
  );
}
