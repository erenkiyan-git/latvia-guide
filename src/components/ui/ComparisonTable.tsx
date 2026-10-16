import React from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-300 shadow-sm not-prose custom-scrollbar bg-surface">
      <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal min-w-[600px] border-collapse">
        <thead className="bg-slate-100 border-b-2 border-primary-500/50 text-primary-400 font-semibold font-mono text-xs uppercase tracking-wider">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-5 py-3.5">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300/40 text-slate-200">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-200/40 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className={`px-5 py-3.5 ${cellIdx === 0 ? 'font-bold text-white' : 'text-slate-200'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;

