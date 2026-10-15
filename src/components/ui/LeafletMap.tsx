import { useState, useEffect, useRef } from 'react';
import type { Place } from '../../lib/places';
import { CATEGORIES } from '../../lib/places';
// We only import types here; the actual L is loaded from the global window object.
import type * as L from 'leaflet';
import { AlertTriangle } from 'lucide-react';

interface Props {
  places: Place[];
  userLoc: {lat: number, lng: number} | null;
  dict: Record<string, string>;
}

export default function LeafletMap({ places, userLoc, dict }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const lMap = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet dynamically
    const L = (window as any).L;
    if (!L) {
      setError(true);
      return;
    }

    try {
      // Init map
      if (!lMap.current) {
        lMap.current = L.map(mapRef.current, {
          zoomControl: false // Add bottom right instead
        }).setView([56.95, 24.10], 12); // Riga center

        L.control.zoom({ position: 'bottomright' }).addTo(lMap.current);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(lMap.current);
      }

      const map = lMap.current!;

      // Clear old markers
      Object.values(markersRef.current).forEach(m => m.remove());
      markersRef.current = {};

      const bounds = L.latLngBounds([]);

      // Add places
      places.forEach(p => {
        const cat = CATEGORIES[p.category] || CATEGORIES.immigration;
        
        const catName = dict[`map.cat.${p.category}`] || p.category;
        const html = `<div style="background-color: ${cat.color}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; border: 2px solid white; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: inline-block;">${catName}</div>`;

        // Simple HTML marker matching our dark theme
        const icon = L.divIcon({
          className: 'custom-marker',
          html: html,
          iconSize: undefined,
          iconAnchor: [0, 0] // Left-aligned
        });

        const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
        
        // When clicked, scroll the list to this place
        marker.on('click', () => {
          const el = document.getElementById(`place-${p.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.borderColor = cat.color;
            setTimeout(() => { el.style.borderColor = ''; }, 2000);
          }
        });

        markersRef.current[p.id] = marker;
        bounds.extend([p.lat, p.lng]);
      });

      // Add user location if present
      if (userLoc) {
        const uIcon = L.divIcon({
          className: 'user-marker',
          html: `<div style="background-color: #38bdf8; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(56,189,248,0.4);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        const m = L.marker([userLoc.lat, userLoc.lng], { icon: uIcon, zIndexOffset: 1000 }).addTo(map);
        markersRef.current['user'] = m;
        bounds.extend([userLoc.lat, userLoc.lng]);
      }

      // Fit bounds
      if (places.length > 0 || userLoc) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }

      setError(false);
    } catch (err) {
      console.error("Map initialization failed", err);
      setError(true);
    }

    // Cleanup is handled on unmount, but we keep the map instance alive while mounted
  }, [places, userLoc]);

  if (error) {
    return (
      <div className="w-full h-full bg-slate-50 border-l border-slate-300 flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-slate-500 max-w-sm">{dict['map.loadError']}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full z-0 bg-slate-100" />;
}
