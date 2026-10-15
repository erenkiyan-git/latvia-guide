import React from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-300 shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal">
        <thead className="bg-surface border-b border-slate-300 text-slate-700 font-semibold">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-slate-50">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-surface transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className={`px-6 py-4 text-slate-600 ${cellIdx === 0 ? 'font-medium text-slate-700' : ''}`}>
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
