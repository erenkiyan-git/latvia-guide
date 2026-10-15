import React from 'react';

interface SymbolProps {
  className?: string;
  size?: number;
}

/**
 * Auseklis (Morning Star)
 * Symbol of morning dawn, spiritual awakening, and protection against evil.
 */
export function AuseklisSymbol({ className = 'text-primary-500', size = 24 }: SymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Central 8-pointed geometric Auseklis star */}
      <path d="M24 2v44M2 24h44" strokeWidth="2" strokeOpacity="0.4" />
      <path d="M24 6 L28 16 L38 20 L28 24 L28 34 L24 28 L20 34 L20 24 L10 20 L20 16 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M24 4 L30 18 L44 24 L30 30 L24 44 L18 30 L4 24 L18 18 Z" />
      <path d="M12 12 L36 36M12 36 L36 12" strokeWidth="1.8" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * Jumis (Twin Spike / Abundance)
 * Ancient symbol of prosperity, double harvest, home blessing, and good luck.
 */
export function JumisSymbol({ className = 'text-primary-500', size = 24 }: SymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Jumis roof gable / crossed ears */}
      <path d="M8 40 L24 16 L40 40" />
      <path d="M24 16 L24 6" />
      <path d="M16 28 L10 22 L10 14 L18 14" />
      <path d="M32 28 L38 22 L38 14 L30 14" />
      <path d="M20 10 L24 4 L28 10" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Ūsiņš (Guardian of Travelers, Spring, Sun-Horses)
 * Patron deity of travelers, newcomers, horses, and spring light.
 */
export function UsinsSymbol({ className = 'text-primary-500', size = 24 }: SymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Ūsiņš key / sun chariot motif */}
      <path d="M12 24 L36 24" />
      <path d="M14 14 L24 6 L34 14" />
      <path d="M14 34 L24 42 L34 34" />
      <path d="M14 14 L14 34" />
      <path d="M34 14 L34 34" />
      <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * Māra (Māras krusts / Earth Mother Cross)
 * Symbol of material well-being, health, stability, and peaceful earth.
 */
export function MaraSymbol({ className = 'text-primary-500', size = 24 }: SymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Māra's cross of crosses */}
      <path d="M10 10 L38 38M10 38 L38 10" />
      <path d="M6 14 L14 6" />
      <path d="M34 6 L42 14" />
      <path d="M6 34 L14 42" />
      <path d="M34 42 L42 34" />
      <rect x="20" y="20" width="8" height="8" transform="rotate(45 24 24)" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * Laima (Laimas slotiņa / Destiny & Good Fortune)
 * Fir-needle or branching broom of Laima, goddess of destiny and fortune.
 */
export function LaimaSymbol({ className = 'text-primary-500', size = 24 }: SymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4 L24 44" />
      <path d="M24 12 L14 20M24 12 L34 20" />
      <path d="M24 22 L12 32M24 22 L36 32" />
      <path d="M24 32 L10 42M24 32 L38 42" />
      <circle cx="24" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Authentic ethnic ribbon divider (Lielvārdes josta inspired)
 * Combining ancient symbols into a subtle geometric ornamental border.
 */
export function LatvianSymbolBand({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-4 overflow-hidden ${className}`}>
      {/* Background glow and gradient line */}
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-300/60"></div>
      </div>
      
      {/* Symbols pill */}
      <div className="relative inline-flex items-center gap-4 sm:gap-6 px-6 py-2 rounded-full bg-surface/90 backdrop-blur border border-primary-500/30 shadow-lg shadow-black/40 text-primary-400">
        <span className="text-[0.65rem] font-mono tracking-widest text-slate-500 uppercase hidden sm:inline">
          LATVIJAS SPĒKA ZĪMES
        </span>
        <div className="flex items-center gap-3 sm:gap-4">
          <div title="Auseklis - Rīta zvaigzne & Aizsardzība (Morning Star & Protection)" className="hover:scale-125 transition-transform cursor-help">
            <AuseklisSymbol size={18} className="text-primary-400" />
          </div>
          <div title="Ūsiņš - Ceļotāju sargs & Gaisma (Guardian of Travelers & Light)" className="hover:scale-125 transition-transform cursor-help">
            <UsinsSymbol size={18} className="text-primary-400" />
          </div>
          <div title="Jumis - Labklājība & Svētība (Prosperity & Abundance)" className="hover:scale-125 transition-transform cursor-help">
            <JumisSymbol size={18} className="text-primary-400" />
          </div>
          <div title="Laima - Liktenis & Veiksme (Destiny & Good Fortune)" className="hover:scale-125 transition-transform cursor-help">
            <LaimaSymbol size={18} className="text-primary-400" />
          </div>
          <div title="Māra - Zemes māte & Veselība (Earth Mother & Health)" className="hover:scale-125 transition-transform cursor-help">
            <MaraSymbol size={18} className="text-primary-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Cultural Symbols strip with explanatory cards for newcomers.
 */
export function LatvianCultureStrip({ lang = 'en' }: { lang?: string }) {
  const symbols = [
    {
      name: 'Auseklis',
      symbol: AuseklisSymbol,
      meaning: lang === 'tr' 
        ? 'Sabah Yıldızı · Işık ve manevi uyanışın, kötü niyetlerden korunmanın kadim simgesi.' 
        : 'Morning Star · Ancient symbol of dawn, spiritual awakening, and protection against adversity.'
    },
    {
      name: 'Ūsiņš',
      symbol: UsinsSymbol,
      meaning: lang === 'tr' 
        ? 'Gezginlerin Koruyucusu · Yeni bir ülkeye gelenlerin, yolcuların ve bahar ışığının koruyucusu.' 
        : 'Guardian of Travelers · Protector of newcomers, journeys, and the awakening of spring light.'
    },
    {
      name: 'Jumis',
      symbol: JumisSymbol,
      meaning: lang === 'tr' 
        ? 'Bereket ve Bolluk · Çift başak motifi; refah, başarı, verimli emek ve ev huzuru.' 
        : 'Prosperity & Abundance · Crossed ear motif; wealth, flourishing business, and blessing.'
    },
    {
      name: 'Laima',
      symbol: LaimaSymbol,
      meaning: lang === 'tr' 
        ? 'Kader ve Şans · Doğru yolu seçme, hayatta uğur, esenlik ve adalet tanrıçasının süpürgesi.' 
        : 'Destiny & Fortune · Auspicious choices, good luck, happiness, and clean paths ahead.'
    }
  ];

  return (
    <div className="my-12">
      <div className="text-center mb-6">
        <p className="hud-label mb-2">// BALTIC HERITAGE · LATVIEŠU SPĒKA ZĪMES</p>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
          {lang === 'tr' ? "Letonya'nın Kadim Güç Sembolleri" : "Latvia's Ancient Sacred Signs"}
        </h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-1">
          {lang === 'tr'
            ? "Yüzyıllardır Leton geleneksel dokumalarında (Lielvārdes josta) ve kültüründe yaşatılan koruyucu ve rehber işaretler."
            : "Guiding cultural emblems woven into traditional Latvian textiles for centuries to bless travelers and homes."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {symbols.map((item) => {
          const Icon = item.symbol;
          return (
            <div 
              key={item.name} 
              className="hud-card hud-hover p-4 rounded-xl border border-slate-300 hover:border-primary-500/60 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-base flex items-center justify-center border border-primary-500/30 mb-3 group-hover:scale-110 group-hover:border-primary-500 transition-all shadow-sm">
                <Icon size={24} className="text-primary-400 group-hover:text-primary-300 transition-colors" />
              </div>
              <h4 className="font-mono font-bold text-sm text-slate-100 tracking-wider uppercase mb-1">
                {item.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.meaning}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
