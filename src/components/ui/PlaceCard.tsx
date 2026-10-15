import { CATEGORIES, getPublicPlaces, type Place } from '../../lib/places';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import type { Localized } from '../../lib/places';

interface Props {
  place: Place;
  lang: 'en' | 'tr' | 'ru' | 'lv';
  dict: Record<string, string>;
}

function p(val: Localized | undefined, l: string) {
  if (!val) return '';
  return (val as any)[l] || val.en;
}

export default function PlaceCard({ place, lang, dict }: Props) {
  const cat = CATEGORIES[place.category] || CATEGORIES.immigration;
  const name = p(place.name, lang);
  const notes = p(place.notes, lang);
  const hours = p(place.openingHours, lang);

  // We can't render lucide icons dynamically easily in Astro without a map,
  // so we'll just use a colored dot here as a simple fallback or rely on the category chip icon later.
  
  return (
    <div 
      className="bg-white border border-slate-300 rounded-xl p-5 mb-4 hover:border-slate-400 hover:shadow-md transition-all shadow-sm"
      id={`place-${place.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-900 leading-tight">{name}</h3>
        <span 
          className="text-xs font-semibold px-2 py-1 rounded-md shrink-0 ml-3"
          style={{ backgroundColor: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40` }}
        >
          {dict[`map.cat.${place.category}`]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start text-slate-700">
          <MapPin className="w-5 h-5 text-slate-500 mr-3 shrink-0 mt-0.5" />
          <span>{place.address}, {place.city}</span>
        </div>
        
        {place.phone && (
          <div className="flex items-start text-slate-700">
            <Phone className="w-5 h-5 text-slate-500 mr-3 shrink-0 mt-0.5" />
            <a href={`tel:${place.phone.replace(/\s/g, '')}`} className="hover:text-primary-600 transition-colors font-medium">
              {place.phone}
            </a>
          </div>
        )}

        {hours && (
          <div className="flex items-start text-slate-700">
            <Clock className="w-5 h-5 text-slate-500 mr-3 shrink-0 mt-0.5" />
            <span className="whitespace-pre-line">{hours}</span>
          </div>
        )}
      </div>

      {notes && (
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
          {notes}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-200">
        <a 
          href={place.officialUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-1.5" />
          {dict['map.officialWebsite']}
        </a>
        
        <span className="text-slate-300 hidden sm:inline">•</span>

        <a 
          href={`https://www.openstreetmap.org/directions?route=%3B${place.lat}%2C${place.lng}#map=17/${place.lat}/${place.lng}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <Navigation className="w-4 h-4 mr-1.5" />
          {dict['map.directions']}
        </a>
      </div>
      
      {place.verified && (
        <div className="mt-4 text-xs text-slate-500 flex items-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
          {dict['map.officialSource']} · {dict['map.lastChecked']}: {place.lastChecked}
        </div>
      )}
    </div>
  );
}
