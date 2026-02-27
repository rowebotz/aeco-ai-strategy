import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, Minus, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ScenarioComparison() {
  const currentInputs = useStrategyStore(s => s.inputs);
  const currentResults = useStrategyStore(s => s.scoredCases);
  const baseline = useStrategyStore(s => s.baselineScenario);
  if (!baseline) return null;
  const baselineResults = baseline.results;
  const topCount = 5;
  const getDelta = (id: string) => {
    const current = currentResults.find(r => r.id === id);
    const prev = baselineResults.find(r => r.id === id);
    if (!current || !prev) return 0;
    return current.score - prev.score;
  };
  const DeltaBadge = ({ delta }: { delta: number }) => {
    if (delta > 0) return <Badge variant="secondary" className="bg-teal/10 text-teal border-none text-[10px] font-mono">+{delta}</Badge>;
    if (delta < 0) return <Badge variant="destructive" className="bg-red-100 text-red-600 border-none text-[10px] font-mono">{delta}</Badge>;
    return <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground opacity-50">0</Badge>;
  };
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-slate-50/50 border-dashed">
          <CardHeader className="pb-3">
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Scenario A (Baseline)</div>
            <CardTitle className="text-lg">Digital Maturity: Level {baseline.inputs.maturity}</CardTitle>
            <p className="text-xs text-muted-foreground">North Star: {baseline.inputs.objective}</p>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
                {baselineResults.slice(0, 3).map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
                    <span className="font-semibold text-charcoal">{i+1}. {item.title}</span>
                    <span className="font-mono font-bold">{item.score}</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-electricBlue/20 shadow-md">
          <CardHeader className="pb-3">
            <div className="text-[10px] uppercase tracking-widest font-bold text-electricBlue mb-1">Scenario B (Current)</div>
            <CardTitle className="text-lg">Digital Maturity: Level {currentInputs.maturity}</CardTitle>
            <p className="text-xs text-muted-foreground">North Star: {currentInputs.objective}</p>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
                {currentResults.slice(0, 3).map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-slate-50 rounded border text-xs">
                    <span className="font-semibold text-charcoal">{i+1}. {item.title}</span>
                    <div className="flex items-center gap-2">
                      <DeltaBadge delta={getDelta(item.id)} />
                      <span className="font-mono font-bold text-electricBlue">{item.score}</span>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="bg-charcoal text-white py-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-electricBlue" />
            Top 5 Initiative Impact Analysis
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="text-[10px] uppercase font-bold">Initiative</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-bold">Baseline</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-bold">Current</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-bold">Δ Delta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentResults.slice(0, 5).map((uc) => {
              const baseUc = baselineResults.find(b => b.id === uc.id);
              const delta = getDelta(uc.id);
              return (
                <TableRow key={uc.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-bold text-xs">{uc.title}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{baseUc?.score ?? 'N/A'}</TableCell>
                  <TableCell className="text-right font-mono font-bold text-electricBlue">{uc.score}</TableCell>
                  <TableCell className="text-right flex justify-end items-center pt-3">
                     <div className="flex items-center gap-1.5">
                       {delta > 0 ? <ArrowUpRight className="h-3 w-3 text-teal" /> : delta < 0 ? <ArrowDownRight className="h-3 w-3 text-red-500" /> : <Minus className="h-3 w-3 text-muted-foreground" />}
                       <span className={cn("font-mono text-xs font-bold", delta > 0 ? "text-teal" : delta < 0 ? "text-red-500" : "text-muted-foreground")}>
                         {delta > 0 ? `+${delta}` : delta}
                       </span>
                     </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}