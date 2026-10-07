import React, { useState } from 'react';

interface LivingCostsCalculatorProps {
  labels: {
    housing: string;
    utilities: string;
    food: string;
    transport: string;
    entertainment: string;
    total: string;
    hints: Record<string, string[]>;
  };
}

export function LivingCostsCalculator({ labels }: LivingCostsCalculatorProps) {
  const [costs, setCosts] = useState({
    housing: 450,
    utilities: 150,
    food: 300,
    transport: 30,
    entertainment: 150
  });

  const total = Object.values(costs).reduce((acc, val) => acc + val, 0);

  const updateCost = (key: keyof typeof costs, value: number) => {
    setCosts(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xl shadow-black/20 mt-8 mb-16">
      <div className="space-y-10">
        
        {/* Housing */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold text-lg text-white">{labels.housing}</label>
            <span className="bg-primary-900/40 text-primary-400 font-mono font-bold px-3 py-1 rounded-lg border border-primary-900/50">
              {costs.housing} €
            </span>
          </div>
          <input 
            type="range" 
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            min="200" 
            max="1500" 
            step="50" 
            value={costs.housing}
            onChange={(e) => updateCost('housing', Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-2 font-medium">
            <span>{labels.hints.housing[0]}</span>
            <span>{labels.hints.housing[1]}</span>
          </div>
        </div>

        {/* Utilities */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold text-lg text-white">{labels.utilities}</label>
            <span className="bg-primary-900/40 text-primary-400 font-mono font-bold px-3 py-1 rounded-lg border border-primary-900/50">
              {costs.utilities} €
            </span>
          </div>
          <input 
            type="range" 
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            min="50" 
            max="400" 
            step="10" 
            value={costs.utilities}
            onChange={(e) => updateCost('utilities', Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-2 font-medium">
            <span>{labels.hints.utilities[0]}</span>
            <span>{labels.hints.utilities[1]}</span>
          </div>
        </div>

        {/* Food */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold text-lg text-white">{labels.food}</label>
            <span className="bg-primary-900/40 text-primary-400 font-mono font-bold px-3 py-1 rounded-lg border border-primary-900/50">
              {costs.food} €
            </span>
          </div>
          <input 
            type="range" 
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            min="150" 
            max="800" 
            step="25" 
            value={costs.food}
            onChange={(e) => updateCost('food', Number(e.target.value))}
          />
        </div>

        {/* Transport */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold text-lg text-white">{labels.transport}</label>
            <span className="bg-primary-900/40 text-primary-400 font-mono font-bold px-3 py-1 rounded-lg border border-primary-900/50">
              {costs.transport} €
            </span>
          </div>
          <input 
            type="range" 
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            min="0" 
            max="200" 
            step="10" 
            value={costs.transport}
            onChange={(e) => updateCost('transport', Number(e.target.value))}
          />
        </div>

        {/* Entertainment */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold text-lg text-white">{labels.entertainment}</label>
            <span className="bg-primary-900/40 text-primary-400 font-mono font-bold px-3 py-1 rounded-lg border border-primary-900/50">
              {costs.entertainment} €
            </span>
          </div>
          <input 
            type="range" 
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            min="50" 
            max="1000" 
            step="50" 
            value={costs.entertainment}
            onChange={(e) => updateCost('entertainment', Number(e.target.value))}
          />
        </div>

      </div>

      <div className="mt-10 pt-8 border-t border-zinc-800 border-dashed text-center">
        <div className="text-zinc-400 font-bold mb-4">{labels.total}</div>
        <div className="font-mono text-5xl sm:text-6xl font-extrabold text-primary-500 tracking-tight">
          €{total}
        </div>
      </div>
    </div>
  );
}
