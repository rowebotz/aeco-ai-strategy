import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StrategicObjective } from '@/data/aeco-use-cases';
import { RevenueBand } from '@/lib/scoring-engine';
import { Sparkles, BarChart2, Info } from 'lucide-react';
export function InputPanel() {
  const sector = useStrategyStore(s => s.inputs.sector);
  const revenue = useStrategyStore(s => s.inputs.revenue);
  const maturity = useStrategyStore(s => s.inputs.maturity);
  const objective = useStrategyStore(s => s.inputs.objective);
  const setInputs = useStrategyStore(s => s.setInputs);
  const analyze = useStrategyStore(s => s.analyze);
  const objectives: { label: StrategicObjective; description: string }[] = [
    { label: 'Risk Mitigation', description: 'Reduce litigation exposure and construction delay claims.' },
    { label: 'Margin Expansion', description: 'Protect profitability against rising material and labor costs.' },
    { label: 'Sustainability', description: 'Optimize energy use and minimize embodied carbon.' },
    { label: 'Operational Efficiency', description: 'Automate repetitive tasks and streamline communications.' },
  ];
  const maturityLabels = [
    { level: 1, label: 'Traditional', sub: 'Manual workflows' },
    { level: 3, label: 'Emerging', sub: 'Standardized BIM' },
    { level: 5, label: 'Leader', sub: 'Active AI/ML' }
  ];
  return (
    <TooltipProvider>
      <Card className="border-none bg-white/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-charcoal">
            <Sparkles className="h-5 w-5 text-electricBlue" />
            Firm Profile
          </CardTitle>
          <CardDescription>Calibrate the AI engine to your organization's specific scale and digital capability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="sector-select">Industry Segment</Label>
            <Select value={sector} onValueChange={(v) => setInputs({ sector: v })}>
              <SelectTrigger id="sector-select" aria-label="Select your industry segment">
                <SelectValue placeholder="Select sector..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Architectural Firm">Architectural Firm</SelectItem>
                <SelectItem value="Engineering / MEP">Engineering / MEP</SelectItem>
                <SelectItem value="General Contractor">General Contractor</SelectItem>
                <SelectItem value="Specialty Subcontractor">Specialty Subcontractor</SelectItem>
                <SelectItem value="Owner / Operator">Owner / Operator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label htmlFor="revenue-select">Revenue Band (Annual)</Label>
            <Select value={revenue} onValueChange={(v: RevenueBand) => setInputs({ revenue: v })}>
              <SelectTrigger id="revenue-select" aria-label="Select annual revenue band">
                <SelectValue placeholder="Select revenue..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">$0 - $50M</SelectItem>
                <SelectItem value="Medium">$50M - $500M</SelectItem>
                <SelectItem value="High">$500M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                Digital Maturity
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    A higher score increases the weight of complex AI tools.
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="font-mono text-sm bg-electricBlue/10 text-electricBlue px-2 py-0.5 rounded font-bold">Level {maturity}</span>
            </div>
            <Slider
              value={[maturity]}
              onValueChange={([v]) => setInputs({ maturity: v })}
              max={5}
              min={1}
              step={1}
              aria-label="Digital maturity slider"
            />
            <div className="flex justify-between px-1">
              {maturityLabels.map((m) => (
                <div key={m.level} className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-charcoal">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label>Strategic North Star</Label>
            <RadioGroup
              value={objective}
              onValueChange={(v) => setInputs({ objective: v as StrategicObjective })}
              className="grid grid-cols-1 gap-3"
            >
              {objectives.map((obj) => (
                <Tooltip key={obj.label}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-white transition-colors cursor-pointer group has-[:checked]:border-electricBlue has-[:checked]:bg-electricBlue/5">
                      <RadioGroupItem value={obj.label} id={obj.label} />
                      <Label htmlFor={obj.label} className="flex-1 cursor-pointer font-medium">{obj.label}</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {obj.description}
                  </TooltipContent>
                </Tooltip>
              ))}
            </RadioGroup>
          </div>
          <Button
            onClick={analyze}
            disabled={!sector}
            className="w-full bg-electricBlue hover:bg-electricBlue/90 h-12 text-base font-semibold shadow-lg transition-transform active:scale-[0.98]"
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Analyze Strategy
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}