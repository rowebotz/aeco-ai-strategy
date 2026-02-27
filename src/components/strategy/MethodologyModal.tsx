import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Calculator, Percent, Layers } from 'lucide-react';
export function MethodologyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-charcoal gap-2">
          <Info className="h-4 w-4" />
          Methodology
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>The Priority Scoring Engine</DialogTitle>
          <DialogDescription>A breakdown of the math behind the AECO AI Strategy recommendations.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-accent flex items-center justify-center">
              <Calculator className="h-5 w-5 text-electricBlue" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">Strategic Weighting (40%)</h4>
              <p className="text-sm text-muted-foreground">Initiatives that directly solve your chosen 'North Star' objective receive a significant point boost. We prioritize what matters to your business goals first.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-accent flex items-center justify-center">
              <Layers className="h-5 w-5 text-teal" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">Digital Maturity Fit (30%)</h4>
              <p className="text-sm text-muted-foreground">Complex AI tools (high complexity score) are penalized for low-maturity firms to ensure feasibility, while high-maturity firms receive a 'Digital Leader' bonus for tackling complex problems.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-accent flex items-center justify-center">
              <Percent className="h-5 w-5 text-charcoal" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">Base Value & ROI (30%)</h4>
              <p className="text-sm text-muted-foreground">Each use case has an underlying base ROI based on industry benchmarks. This ensures that even if a tool aligns with your goal, it only ranks high if it delivers measurable value.</p>
            </div>
          </div>
          <div className="bg-accent/30 p-4 rounded-lg border">
            <h5 className="font-mono text-xs uppercase font-bold mb-2">Math Equation</h5>
            <code className="text-sm text-charcoal">Score = (ObjectiveMatch ? 40 : 0) + ((10 - Complexity) * 5) + (BaseROI * 5)</code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}