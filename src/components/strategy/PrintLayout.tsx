import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStrategyStore } from '@/store/strategy-store';
import { ScoredUseCase } from '@/lib/scoring-engine';
interface PrintLayoutProps {
  firmName?: string;
  logoUrl?: string;
}
export function PrintLayout({ firmName, logoUrl }: PrintLayoutProps) {
  const scoredCases = useStrategyStore(useShallow(s => s.scoredCases));
  const inputs = useStrategyStore(s => s.inputs);
  const phases = {
    p1: scoredCases.filter(c => c.complexity <= 4).slice(0, 4),
    p2: scoredCases.filter(c => c.complexity > 4 && c.complexity <= 7).slice(0, 4),
    p3: scoredCases.filter(c => c.complexity > 7).slice(0, 4),
  };
  return (
    <div className="hidden print:block print:bg-white text-black p-12 max-w-4xl mx-auto space-y-12 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-black pb-8">
        <div className="space-y-2">
          {logoUrl && <img src={logoUrl} alt="Firm Logo" className="h-12 w-auto mb-4 object-contain" />}
          <h1 className="text-4xl font-bold tracking-tight">{firmName || 'AECO AI Strategy Report'}</h1>
          <p className="text-lg text-slate-600 font-mono">Confidential Strategic Assessment • {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right space-y-1">
          <div className="text-xs font-bold uppercase text-slate-500">Industry Sector</div>
          <div className="text-sm font-semibold">{inputs.sector}</div>
        </div>
      </div>
      {/* Page 1: Executive Summary */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold border-l-4 border-black pl-4">Executive Summary</h2>
        <div className="grid grid-cols-2 gap-12 bg-slate-50 p-6 rounded border">
          <div className="space-y-4">
            <h3 className="font-bold uppercase text-xs text-slate-500 tracking-widest">Firm Parameters</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Digital Maturity:</span> <span className="font-bold">Level {inputs.maturity}</span></div>
              <div className="flex justify-between"><span>Annual Revenue:</span> <span className="font-bold">{inputs.revenue} Band</span></div>
              <div className="flex justify-between"><span>Strategic North Star:</span> <span className="font-bold">{inputs.objective}</span></div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold uppercase text-xs text-slate-500 tracking-widest">Objective Statement</h3>
            <p className="text-sm leading-relaxed italic">
              Prioritizing AECO-specific AI investments to drive {inputs.objective.toLowerCase()} 
              within the {inputs.sector} ecosystem, optimized for Level {inputs.maturity} maturity capability.
            </p>
          </div>
        </div>
      </div>
      {/* Page 2: Top Initiatives */}
      <div className="space-y-8 pt-12">
        <h2 className="text-2xl font-bold border-l-4 border-black pl-4">Priority Investment Roadmap</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3 text-left text-xs uppercase font-bold">Initiative</th>
              <th className="border p-3 text-center text-xs uppercase font-bold">Rank</th>
              <th className="border p-3 text-center text-xs uppercase font-bold">Score</th>
              <th className="border p-3 text-center text-xs uppercase font-bold">ROI</th>
              <th className="border p-3 text-center text-xs uppercase font-bold">Weeks</th>
            </tr>
          </thead>
          <tbody>
            {scoredCases.slice(0, 10).map((uc, i) => (
              <tr key={uc.id}>
                <td className="border p-3 text-sm font-bold">{uc.title}</td>
                <td className="border p-3 text-center text-sm">{i + 1}</td>
                <td className="border p-3 text-center text-sm font-mono font-bold">{uc.score}</td>
                <td className="border p-3 text-center text-sm font-mono">{uc.baseROI}</td>
                <td className="border p-3 text-center text-sm font-mono">{uc.estimatedImplementationWeeks}w</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Page 3: Implementation Phases */}
      <div className="pt-12 space-y-8 break-before-page">
        <h2 className="text-2xl font-bold border-l-4 border-black pl-4">Phased Deployment Strategy</h2>
        <div className="grid grid-cols-1 gap-8">
          {[
            { title: 'Phase 1: Quick Wins', items: phases.p1 },
            { title: 'Phase 2: Tactical Expansion', items: phases.p2 },
            { title: 'Phase 3: Strategic Transformation', items: phases.p3 }
          ].map(p => (
            <div key={p.title} className="space-y-3">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-1">{p.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {p.items.map(item => (
                  <div key={item.id} className="p-3 border rounded-lg bg-white">
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-slate-500 truncate">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="pt-12 text-center text-[10px] text-slate-400 font-mono">
        AECO AI Strategy Canvas • Strategic Analysis Output • PRO REPORT
      </footer>
    </div>
  );
}