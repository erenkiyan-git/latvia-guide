import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentLang: string;
  activeLangs: string[];
  langLabels: Record<string, string>;
  navLinks: { href: string; label: string }[];
  logoText: string;
}

export default function Header({ currentLang, activeLangs, langLabels, navLinks, logoText }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSwitchUrl = (targetLang: string) => {
    if (typeof window === 'undefined') return `/${targetLang}/`;
    const pathname = window.location.pathname;
    const currentPrefix = `/${currentLang}/`;
    if (pathname.startsWith(currentPrefix)) {
      return pathname.replace(currentPrefix, `/${targetLang}/`);
    }
    return `/${targetLang}/`;
  };

  const handleLangClick = (targetLang: string) => {
    try {
      localStorage.setItem('preferred_lang', targetLang);
    } catch (e) {
      // ignore in incognito or restricted mode
    }
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-slate-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href={`/${currentLang}/`} className="text-xl font-bold text-slate-900 tracking-tight hover:text-primary-400 transition-colors">
          <span className="inline-block w-2 h-2 bg-primary-600 mr-2 align-middle shadow-[0_0_8px_rgba(196,52,63,0.9)]"></span>{logoText}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-slate-600 hover:text-primary-400 font-medium transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-surface text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={isLangOpen}
            >
              {langLabels[currentLang]}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {isLangOpen && (
              <ul className="absolute right-0 mt-2 w-36 bg-surface/98 backdrop-blur-xl rounded-xl border border-slate-300 py-1.5 z-50 shadow-2xl overflow-hidden">
                {activeLangs.map((lang) => (
                  <li key={lang}>
                    <a
                      href={getSwitchUrl(lang)}
                      onClick={() => handleLangClick(lang)}
                      className={`block px-4 py-2 text-sm ${
                        lang === currentLang
                          ? 'bg-primary-950/80 text-primary-300 border-l-2 border-primary-500 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      } transition-colors`}
                    >
                      {langLabels[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6 text-primary-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-b border-slate-300 bg-surface/98 backdrop-blur-2xl shadow-2xl z-50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-primary-300 hover:bg-slate-100/80 active:bg-slate-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 pb-2 border-t border-slate-300/70 mt-3">
              <p className="px-4 text-[0.7rem] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                // {currentLang === 'tr' ? 'DİL SEÇİMİ' : 'LANGUAGE'}
              </p>
              <div className="grid grid-cols-2 gap-2 px-1">
                {activeLangs.map((lang) => (
                  <a
                    key={lang}
                    href={getSwitchUrl(lang)}
                    onClick={() => handleLangClick(lang)}
                    className={`flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      lang === currentLang
                        ? 'bg-primary-950/80 text-primary-300 border-primary-500/70 shadow-sm'
                        : 'bg-base/60 text-slate-600 border-slate-300 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {langLabels[lang]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
