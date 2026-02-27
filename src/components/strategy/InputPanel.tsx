import React from 'react';
import { useStrategyStore } from '@/store/strategy-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StrategicObjective } from '@/data/aeco-use-cases';
import { Sparkles, BarChart2 } from 'lucide-react';
export function InputPanel() {
  const inputs = useStrategyStore(s => s.inputs);
  const setInputs = useStrategyStore(s => s.setInputs);
  const analyze = useStrategyStore(s => s.analyze);
  const objectives: StrategicObjective[] = ['Risk Mitigation', 'Margin Expansion', 'Sustainability', 'Operational Efficiency'];
  return (
    <Card className="border-none bg-white/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-charcoal">
          <Sparkles className="h-5 w-5 text-electricBlue" />
          Firm Profile
        </CardTitle>
        <CardDescription>Configure your firm parameters to calibrate the AI prioritization engine.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label>Industry Segment</Label>
          <Select value={inputs.sector} onValueChange={(v) => setInputs({ sector: v })}>
            <SelectTrigger>
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
          <div className="flex justify-between items-center">
            <Label>Digital Maturity</Label>
            <span className="font-mono text-sm bg-accent px-2 py-0.5 rounded">Level {inputs.maturity}</span>
          </div>
          <Slider 
            value={[inputs.maturity]} 
            onValueChange={([v]) => setInputs({ maturity: v })} 
            max={5} 
            min={1} 
            step={1} 
          />
          <div className="flex justify-between text-2xs text-muted-foreground uppercase tracking-wider">
            <span>Traditional</span>
            <span>Digital Leader</span>
          </div>
        </div>
        <div className="space-y-4">
          <Label>Strategic North Star</Label>
          <RadioGroup 
            value={inputs.objective} 
            onValueChange={(v) => setInputs({ objective: v as StrategicObjective })}
            className="grid grid-cols-1 gap-3"
          >
            {objectives.map((obj) => (
              <div key={obj} className="flex items-center space-x-3 space-y-0 border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                <RadioGroupItem value={obj} id={obj} />
                <Label htmlFor={obj} className="flex-1 cursor-pointer font-medium">{obj}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button 
          onClick={analyze} 
          className="w-full bg-electricBlue hover:bg-electricBlue/90 h-12 text-base font-semibold shadow-lg"
        >
          <BarChart2 className="mr-2 h-5 w-5" />
          Analyze Strategy
        </Button>
      </CardContent>
    </Card>
  );
}