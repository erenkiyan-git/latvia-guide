import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Printer, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

interface ChecklistProps {
  groups: ChecklistGroup[];
  pageTitle: string;
  pageDesc: string;
  resetText: string;
  printText: string;
}

const STORAGE_KEY = 'latviaguide_checklist';

export function Checklist({ groups, pageTitle, pageDesc, resetText, printText }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const totalItems = groups.reduce((acc, group) => acc + group.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  const toggleItem = (id: string) => {
    const newState = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your progress?')) {
      setCheckedItems({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {}
    }
  };

  if (!isLoaded) {
    return <div className="animate-pulse h-96 bg-surface rounded-xl"></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header (Hidden when printing) */}
      <div className="text-center mb-12 print:hidden">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{pageTitle}</h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{pageDesc}</p>
        
        <div className="max-w-2xl mx-auto bg-surface border border-slate-300 rounded-2xl p-5 sm:p-8 mb-8 text-left shadow-lg">
          <div className="flex justify-between text-sm font-medium mb-3">
            <span className="text-slate-700">Progress: <strong className="text-slate-900 ml-1 text-base">{progressPercentage}%</strong></span>
            <span className="text-slate-500">{completedItems} / {totalItems} completed</span>
          </div>
          <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-300/50 mb-6">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {resetText}
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              {printText}
            </Button>
          </div>
        </div>
      </div>

      {/* Print Only Header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-gray-600 border-b border-gray-300 pb-4">{pageDesc}</p>
      </div>

      {/* Checklist Content */}
      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.id} className="print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-primary-500 mb-6 border-b border-slate-300 pb-3 print:text-black print:border-gray-300">
              {group.title}
            </h2>
            <div className="space-y-4">
              {group.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                
                return (
                  <label 
                    key={item.id} 
                    className={`
                      group flex gap-3.5 sm:gap-4 p-3.5 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden
                      print:border-none print:border-b print:border-gray-200 print:rounded-none print:p-2 print:gap-3
                      ${isChecked 
                        ? 'bg-emerald-50 border-emerald-200 print:opacity-100' 
                        : 'bg-surface border-slate-300 hover:border-primary-700 hover:bg-slate-100/80 print:bg-transparent print:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex-shrink-0 relative pt-0.5 print:hidden">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                      />
                      <div className={`
                        w-6 h-6 rounded-md border-2 transition-colors flex items-center justify-center
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white
                        ${isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'bg-slate-50 border-slate-300 group-hover:border-primary-600 text-transparent'
                        }
                      `}>
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Print Checkbox */}
                    <div className="hidden print:block w-6 h-6 border-2 border-gray-400 rounded-sm mt-0.5 flex-shrink-0">
                      {isChecked && <div className="text-center leading-none mt-1">✓</div>}
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className={`text-base sm:text-lg font-bold mb-1 transition-colors print:text-black ${isChecked ? 'text-slate-500 line-through print:no-underline print:text-gray-700' : 'text-slate-800'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mb-3 print:text-gray-600 print:mb-0 ${isChecked ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                      
                      {item.link && (
                        <a 
                          href={item.link} 
                          onClick={(e) => e.stopPropagation()} // Prevent toggling when clicking link
                          className="inline-flex items-center text-sm font-semibold text-primary-500 hover:text-primary-400 print:hidden relative z-10"
                        >
                          Read guide <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
