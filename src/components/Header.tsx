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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={isLangOpen}
            >
              {langLabels[currentLang]}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isLangOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-surface rounded-xl border border-slate-200 py-1 z-50 shadow-xl overflow-hidden">
                {activeLangs.map((lang) => (
                  <li key={lang}>
                    <a
                      href={getSwitchUrl(lang)}
                      onClick={() => handleLangClick(lang)}
                      className={`block px-4 py-2 text-sm ${
                        lang === currentLang
                          ? 'bg-primary-50 text-primary-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-surface absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:text-primary-400 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 pb-2 border-t border-slate-200 mt-2">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Language
              </p>
              <div className="flex flex-col gap-1 px-2">
                {activeLangs.map((lang) => (
                  <a
                    key={lang}
                    href={getSwitchUrl(lang)}
                    onClick={() => handleLangClick(lang)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                      lang === currentLang
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    } transition-colors`}
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
