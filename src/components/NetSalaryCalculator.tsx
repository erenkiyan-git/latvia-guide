import React, { useState } from 'react';

interface NetSalaryCalculatorProps {
  labels: {
    gross: string;
    dependents: string;
    estimatedDeductions: string;
    social: string;
    income: string;
    net: string;
  };
}

export function NetSalaryCalculator({ labels }: NetSalaryCalculatorProps) {
  const [gross, setGross] = useState<number | ''>('');
  const [dependents, setDependents] = useState<number>(0);

  const formatCurr = (val: number) => `€${Math.max(0, val).toFixed(2)}`;

  const calculate = () => {
    const g = Number(gross) || 0;
    const dep = Number(dependents) || 0;
    
    // 1. Social Tax (VSAOI): 10.5% for employees
    const socialTax = g * 0.105;
    
    // 2. Dependents allowance (€250 per dependent)
    const depAllowance = dep * 250;
    
    // 3. Taxable base
    let taxableBase = g - socialTax - depAllowance;
    if (taxableBase < 0) taxableBase = 0;
    
    // 4. Income Tax (IIN)
    // 20% up to €1667, 23% from €1667 to €6500
    let incomeTax = 0;
    if (taxableBase <= 1667) {
      incomeTax = taxableBase * 0.20;
    } else {
      incomeTax = (1667 * 0.20) + ((taxableBase - 1667) * 0.23);
    }
    
    // 5. Net Salary
    let net = g - socialTax - incomeTax;
    if (net < 0) net = 0;

    return { socialTax, incomeTax, net };
  };

  const { socialTax, incomeTax, net } = calculate();

  return (
    <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200 mt-8 mb-16">
      <div className="space-y-6">
        <div>
          <label htmlFor="gross-salary" className="block text-slate-700 font-semibold mb-2">{labels.gross}</label>
          <input 
            type="number" 
            id="gross-salary" 
            value={gross}
            onChange={(e) => setGross(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl py-3 px-4 text-xl font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
            placeholder="e.g. 1500" 
            min="0" 
            step="10" 
          />
        </div>

        <div>
          <label htmlFor="dependents" className="block text-slate-700 font-semibold mb-2">{labels.dependents}</label>
          <input 
            type="number" 
            id="dependents" 
            value={dependents}
            onChange={(e) => setDependents(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl py-3 px-4 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
            min="0" 
            max="10" 
            step="1" 
          />
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-300 border-dashed">
        <h3 className="text-slate-500 font-semibold mb-6 uppercase tracking-wider text-sm">{labels.estimatedDeductions}</h3>
        
        <div className="space-y-4 mb-8 text-lg">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">{labels.social}</span>
            <span className="font-mono font-bold text-rose-500">-{formatCurr(socialTax)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">{labels.income}</span>
            <span className="font-mono font-bold text-rose-500">-{formatCurr(incomeTax)}</span>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xl text-slate-700 font-bold">{labels.net}</span>
            <span className="font-mono text-4xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight">{formatCurr(net)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
