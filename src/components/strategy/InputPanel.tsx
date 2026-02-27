import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StrategicObjective } from '@/data/aeco-use-cases';
import { RevenueBand } from '@/lib/scoring-engine';
import { Sparkles, BarChart2, Info, Save } from 'lucide-react';
export function InputPanel() {
  const sector = useStrategyStore(s => s.inputs.sector);
  const revenue = useStrategyStore(s => s.inputs.revenue);
  const maturity = useStrategyStore(s => s.inputs.maturity);
  const objective = useStrategyStore(s => s.inputs.objective);
  const painPointsText = useStrategyStore(s => s.inputs.painPointsText);
  const isAnalyzed = useStrategyStore(s => s.isAnalyzed);
  const setInputs = useStrategyStore(s => s.setInputs);
  const analyze = useStrategyStore(s => s.analyze);
  const snapshotBaseline = useStrategyStore(s => s.snapshotBaseline);
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
          <CardTitle className="flex items-center gap-2 text-charcoal font-display">
            <Sparkles className="h-5 w-5 text-electricBlue" />
            Strategy Configuration
          </CardTitle>
          <CardDescription>Calibrate the AI engine to your organization's specific profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector-select">Industry Segment</Label>
              <Select value={sector} onValueChange={(v) => setInputs({ sector: v })}>
                <SelectTrigger id="sector-select"><SelectValue placeholder="Select sector..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Architectural Firm">Architectural Firm</SelectItem>
                  <SelectItem value="Engineering / MEP">Engineering / MEP</SelectItem>
                  <SelectItem value="General Contractor">General Contractor</SelectItem>
                  <SelectItem value="Specialty Subcontractor">Specialty Subcontractor</SelectItem>
                  <SelectItem value="Owner / Operator">Owner / Operator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue-select">Revenue Band</Label>
              <Select value={revenue} onValueChange={(v: RevenueBand) => setInputs({ revenue: v })}>
                <SelectTrigger id="revenue-select"><SelectValue placeholder="Select revenue..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">$0 - $50M</SelectItem>
                  <SelectItem value="Medium">$50M - $500M</SelectItem>
                  <SelectItem value="High">$500M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">Digital Maturity <Info className="h-3 w-3 text-muted-foreground" /></Label>
              <span className="font-mono text-sm bg-electricBlue/10 text-electricBlue px-2 py-0.5 rounded font-bold">Level {maturity}</span>
            </div>
            <Slider value={[maturity]} onValueChange={([v]) => setInputs({ maturity: v })} max={5} min={1} step={1} />
            <div className="flex justify-between px-1">
              {maturityLabels.map((m) => <span key={m.level} className="text-[10px] font-bold text-muted-foreground">{m.label}</span>)}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Specific Workflow Pains</Label>
            <Textarea 
              placeholder="e.g. Too many RFIs, frequent clash detection delays, schedule drift on site..."
              className="resize-none h-20 text-sm"
              value={painPointsText}
              onChange={(e) => setInputs({ painPointsText: e.target.value })}
            />
            <p className="text-[10px] text-muted-foreground italic">Keywords like 'RFI' or 'Clash' will boost relevant AI initiatives.</p>
          </div>
          <div className="space-y-3">
            <Label>Strategic North Star</Label>
            <RadioGroup value={objective} onValueChange={(v) => setInputs({ objective: v as StrategicObjective })} className="grid grid-cols-1 gap-2">
              {objectives.map((obj) => (
                <div key={obj.label} className="flex items-center space-x-3 border rounded-lg p-2.5 hover:bg-white transition-colors cursor-pointer group has-[:checked]:border-electricBlue has-[:checked]:bg-electricBlue/5">
                  <RadioGroupItem value={obj.label} id={obj.label} />
                  <Label htmlFor={obj.label} className="flex-1 cursor-pointer text-xs font-medium">{obj.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={analyze} disabled={!sector} className="flex-1 bg-electricBlue hover:bg-electricBlue/90 h-11 text-sm font-semibold shadow-lg">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analyze Strategy
            </Button>
            {isAnalyzed && (
              <Button onClick={snapshotBaseline} variant="outline" size="icon" className="h-11 w-11 border-electricBlue/20 text-electricBlue hover:bg-electricBlue/5" title="Save as Baseline Scenario">
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}