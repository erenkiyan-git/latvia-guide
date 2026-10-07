import React from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-800 shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal">
        <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 font-semibold">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-950">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-zinc-900 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className={`px-6 py-4 text-zinc-400 ${cellIdx === 0 ? 'font-medium text-zinc-200' : ''}`}>
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
