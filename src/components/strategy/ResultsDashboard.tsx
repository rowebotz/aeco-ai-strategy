import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, TrendingUp, Zap, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ResultsDashboard() {
  const scoredCases = useStrategyStore(s => s.scoredCases);
  const top3 = scoredCases.slice(0, 3);
  const chartData = scoredCases.slice(0, 8).map(c => ({
    name: c.title.length > 20 ? c.title.substring(0, 17) + '...' : c.title,
    fullTitle: c.title,
    score: c.score,
    roi: c.baseROI * 10
  }));
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((item, idx) => (
          <Card key={item.id} className={cn("relative overflow-hidden border-t-4", 
            idx === 0 ? "border-t-electricBlue" : "border-t-teal")}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="font-mono">{item.category}</Badge>
                {idx === 0 && <Trophy className="h-5 w-5 text-amber-500" />}
              </div>
              <CardTitle className="text-lg mt-2 leading-tight">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold font-mono text-charcoal">{item.score}</span>
                <span className="text-xs text-muted-foreground mb-1 uppercase tracking-tighter">Priority Score</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chart and Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Strategic Score Analysis</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10 }} />
                <Tooltip 
                   cursor={{ fill: 'rgba(0,120,212,0.05)' }}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? '#0078D4' : '#00A3A3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="bg-charcoal text-white">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest">Ranked Priority List</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[12px]">#</TableHead>
                <TableHead>Initiative</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoredCases.slice(0, 10).map((uc, i) => (
                <TableRow key={uc.id} className="group cursor-help">
                  <TableCell className="font-mono text-muted-foreground">{i + 1}</TableCell>
                  <TableCell>
                    <div className="font-medium text-charcoal">{uc.title}</div>
                    <div className="text-xs text-muted-foreground truncate w-40">{uc.category}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-teal font-medium">
                      <TrendingUp className="h-3 w-3" />
                      {uc.baseROI}/10
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-charcoal">{uc.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}