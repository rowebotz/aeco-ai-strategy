import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, Percent, Layers, AlertCircle } from 'lucide-react';
interface MethodologyModalProps {
  trigger?: React.ReactNode;
}
export function MethodologyModal({ trigger }: MethodologyModalProps) {
  const data = [
    { name: 'Objective Alignment', value: 40, color: '#0078D4' },
    { name: 'Maturity Fit', value: 30, color: '#00A3A3' },
    { name: 'Base ROI', value: 30, color: '#1F1F23' },
  ];
  const content = (
    <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>The Priority Scoring Engine</DialogTitle>
        <DialogDescription>A transparent breakdown of the weighted scoring matrix.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-electricBlue/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-electricBlue" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Strategic Weighting (40%)</h4>
              <p className="text-xs text-muted-foreground">Points awarded for alignment with selected 'North Star' and revenue band requirements.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-teal/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-teal" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Digital Maturity Fit (30%)</h4>
              <p className="text-xs text-muted-foreground">High-complexity tools are penalized for low-maturity firms to ensure implementation success.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-charcoal/10 flex items-center justify-center">
              <Percent className="h-4 w-4 text-charcoal" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Base ROI Value (30%)</h4>
              <p className="text-xs text-muted-foreground">Underlying value potential based on cross-industry AECO performance benchmarks.</p>
            </div>
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-bold font-mono">WEIGHT</span>
            <span className="text-xs text-muted-foreground">DISTRIBUTION</span>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="bg-charcoal p-4 rounded-lg border border-white/10 shadow-inner">
          <h5 className="font-mono text-[10px] uppercase font-bold text-white/50 mb-2 tracking-widest">Logic Algorithm</h5>
          <code className="text-xs text-teal block break-all font-mono leading-relaxed">
            Score = (AlignmentBonus: 40) + ((10 - Complexity) * 3) + (BaseROI * 3) + (ScaleBonus: 10)
          </code>
        </div>
        <div className="space-y-2">
          <h5 className="text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-3 w-3" />
            Core Assumptions
          </h5>
          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
            <li>Calculations assume standard software-as-a-service licensing costs.</li>
            <li>ROI models are based on 12-month trailing data from AEC tech adoption.</li>
            <li>Complexity includes both technical integration and organizational process adjustment.</li>
            <li>Market fluctuation in hardware costs (LIDAR, Sensors) is not accounted for.</li>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
  return trigger ? (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {content}
    </Dialog>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white gap-2 h-auto py-1">
          <Info className="h-4 w-4" />
          Methodology
        </Button>
      </DialogTrigger>
      {content}
    </Dialog>
  );
}