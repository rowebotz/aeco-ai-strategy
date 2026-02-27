import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, ShieldCheck } from 'lucide-react';
export function DeploymentRoadmap() {
  const scoredCases = useStrategyStore(s => s.scoredCases);
  const phase1 = scoredCases.filter(c => c.complexity <= 4).slice(0, 3);
  const phase2 = scoredCases.filter(c => c.complexity > 4 && c.complexity <= 7).slice(0, 3);
  const phase3 = scoredCases.filter(c => c.complexity > 7).slice(0, 3);
  const phases = [
    { name: 'Phase 1: Quick Wins', icon: Zap, items: phase1, color: 'text-amber-500', desc: 'Low complexity, immediate operational impact.' },
    { name: 'Phase 2: Tactical Expansion', icon: Clock, items: phase2, color: 'text-electricBlue', desc: 'Integrated tools requiring process adjustment.' },
    { name: 'Phase 3: Strategic Transformation', icon: ShieldCheck, items: phase3, color: 'text-teal', desc: 'Complex, high-reward ecosystem changes.' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
      {phases.map((phase) => (
        <div key={phase.name} className="space-y-4">
          <div className="flex items-center gap-3 border-b pb-2">
            <phase.icon className={phase.color + " h-5 w-5"} />
            <div>
              <h3 className="font-bold text-charcoal">{phase.name}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{phase.desc}</p>
            </div>
          </div>
          <div className="space-y-3">
            {phase.items.length > 0 ? phase.items.map(item => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow bg-white/40">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-semibold text-charcoal leading-tight">{item.title}</h4>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1">{item.estimatedImplementationWeeks}w</Badge>
                </div>
                <div className="flex gap-2">
                   {item.strategicTags.slice(0, 1).map(t => (
                     <span key={t} className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">• {t}</span>
                   ))}
                </div>
              </Card>
            )) : (
              <p className="text-xs text-muted-foreground italic p-4 text-center border rounded-lg border-dashed">No initiatives recommended for this phase based on current profile.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}