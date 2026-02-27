import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label as RechartsLabel } from 'recharts';
import { Trophy, Download, Activity, ArrowRightLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { INDUSTRY_BENCHMARKS } from '@/lib/scoring-engine';
import { ScenarioComparison } from './ScenarioComparison';
export function ResultsDashboard() {
  const scoredCases = useStrategyStore(useShallow(s => s.scoredCases));
  const baselineScenario = useStrategyStore(s => s.baselineScenario);
  const comparisonMode = useStrategyStore(s => s.comparisonMode);
  const setComparisonMode = useStrategyStore(s => s.setComparisonMode);
  if (comparisonMode && baselineScenario) {
    return <ScenarioComparison />;
  }
  const top3 = scoredCases.slice(0, 3);
  const chartData = scoredCases.slice(0, 8).map(c => ({
    name: c.title.length > 20 ? c.title.substring(0, 17) + '...' : c.title,
    fullTitle: c.title,
    score: c.score,
    roi: c.baseROI * 10
  }));
  const handleExportCSV = () => {
    const headers = "Rank,Title,Category,Score,ROI,Complexity,Implementation Weeks\n";
    const rows = scoredCases.slice(0, 10).map((c, i) =>
      `${i+1},"${c.title}","${c.category}",${c.score},${c.baseROI},${c.complexity},${c.estimatedImplementationWeeks}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AECO-AI-Strategy-Export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="bg-slate-50">Industry Benchmark: {INDUSTRY_BENCHMARKS.ENR_500_SCORE} pts</Badge>
          <span className="text-muted-foreground text-xs font-mono">(ENR 500 Average)</span>
        </div>
        {baselineScenario && (
          <Button 
            size="sm" 
            variant={comparisonMode ? "default" : "outline"}
            className="gap-2"
            onClick={() => setComparisonMode(!comparisonMode)}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Comparison Mode
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((item, idx) => (
          <Card key={item.id} className={cn("relative overflow-hidden border-t-4",
            idx === 0 ? "border-t-electricBlue shadow-lg scale-[1.02]" : "border-t-teal shadow-md")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="font-mono text-[10px]">{item.category}</Badge>
                {item.isPainMatch && <Sparkles className="h-4 w-4 text-electricBlue animate-pulse" />}
              </div>
              <CardTitle className="text-lg mt-2 leading-tight h-14 overflow-hidden">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-mono text-charcoal">{item.score}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Priority Score</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-teal font-bold text-sm">
                    <Activity className="h-3 w-3" />
                    Comp: {item.complexity}/10
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">Feasibility</div>
                </div>
              </div>
              <p className={cn("text-xs leading-relaxed min-h-[40px] border-l-2 pl-3", 
                item.isPainMatch ? "border-teal text-charcoal font-medium bg-teal/5 py-1" : "border-electricBlue/20 text-muted-foreground italic")}>
                "{item.matchReason}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Priority Visualization</CardTitle>
          </CardHeader>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: '#1F1F23', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(31, 31, 35, 0.03)' }} />
                <ReferenceLine x={INDUSTRY_BENCHMARKS.ENR_500_SCORE} stroke="#F58220" strokeDasharray="5 5" strokeWidth={2}>
                   <RechartsLabel value="ENR 500 AVG" position="top" fill="#F58220" fontSize={10} fontWeight="bold" />
                </ReferenceLine>
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? '#0078D4' : '#00A3A3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="overflow-hidden flex flex-col">
          <CardHeader className="bg-charcoal text-white flex flex-row items-center justify-between py-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-widest">Ranked Priority Matrix</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-white/70 hover:text-white" onClick={handleExportCSV}>
              <Download className="h-3 w-3 mr-1" /> CSV
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[12px]">#</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold">Initiative</TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-bold">ROI</TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoredCases.slice(0, 10).map((uc, i) => (
                  <TableRow key={uc.id} className={cn("group transition-colors", uc.isPainMatch ? "bg-teal/5" : "hover:bg-slate-50")}>
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <div className="font-bold text-xs text-charcoal flex items-center gap-1">
                        {uc.title}
                        {uc.isPainMatch && <Sparkles className="h-2 w-2 text-teal" />}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">{uc.category} • {uc.estimatedImplementationWeeks}w</div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-teal font-bold">{uc.baseROI}</TableCell>
                    <TableCell className="text-right font-mono font-bold text-electricBlue">{uc.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}