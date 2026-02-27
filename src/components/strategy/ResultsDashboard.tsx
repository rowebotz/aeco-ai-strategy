import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Download, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function ResultsDashboard() {
  const scoredCases = useStrategyStore(useShallow(s => s.scoredCases));
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
    a.click();
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((item, idx) => (
          <Card key={item.id} className={cn("relative overflow-hidden border-t-4",
            idx === 0 ? "border-t-electricBlue shadow-lg scale-[1.02]" : "border-t-teal shadow-md")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="font-mono text-[10px]">{item.category}</Badge>
                {idx === 0 && <Trophy className="h-5 w-5 text-amber-500" />}
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
                    Complexity: {item.complexity}/10
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">Feasibility Rating</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic min-h-[40px] border-l-2 pl-3 border-electricBlue/20">
                "{item.matchReason}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Comparative Score Model</CardTitle>
          </CardHeader>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" aria-label="Strategy Score Bar Chart">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 10, fill: '#1F1F23', fontWeight: 600 }} />
                <Tooltip
                   cursor={{ fill: 'rgba(0,120,212,0.05)' }}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
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
                  <TableHead className="text-right text-[10px] uppercase font-bold">Comp</TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-bold">ROI</TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoredCases.slice(0, 10).map((uc, i) => (
                  <TableRow key={uc.id} className="group">
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <div className="font-bold text-xs text-charcoal">{uc.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">{uc.category} • {uc.estimatedImplementationWeeks}w</div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{uc.complexity}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-teal font-bold text-xs">
                        {uc.baseROI}
                      </div>
                    </TableCell>
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