import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStrategyStore } from '@/store/strategy-store';
import { InputPanel } from '@/components/strategy/InputPanel';
import { ResultsDashboard } from '@/components/strategy/ResultsDashboard';
import { DeploymentRoadmap } from '@/components/strategy/DeploymentRoadmap';
import { MethodologyModal } from '@/components/strategy/MethodologyModal';
import { UseCasesCatalog } from '@/components/strategy/UseCasesCatalog';
import { PrintLayout } from '@/components/strategy/PrintLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RotateCcw, Building2, ChevronLeft, FileText, BookmarkCheck } from 'lucide-react';
export function HomePage() {
  const isAnalyzed = useStrategyStore(s => s.isAnalyzed);
  const reset = useStrategyStore(s => s.reset);
  const sector = useStrategyStore(s => s.inputs.sector);
  const maturity = useStrategyStore(s => s.inputs.maturity);
  const objective = useStrategyStore(s => s.inputs.objective);
  const baselineScenario = useStrategyStore(s => s.baselineScenario);
  const [printData, setPrintData] = useState({ name: '', logo: '' });
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const handlePrint = () => {
    setIsPrintDialogOpen(false);
    setTimeout(() => window.print(), 300);
  };
  return (
    <div className="min-h-screen bg-offWhite text-charcoal font-sans selection:bg-electricBlue/20">
      <PrintLayout firmName={printData.name} logoUrl={printData.logo} />
      <header className="border-b bg-charcoal text-white sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-electricBlue p-1.5 rounded">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight hidden sm:block">
              AECO <span className="font-normal text-electricBlue">AI Strategy Canvas</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {baselineScenario && (
              <Badge variant="outline" className="text-white border-white/20 gap-1 hidden sm:flex">
                <BookmarkCheck className="h-3 w-3 text-teal" /> Baseline Stored
              </Badge>
            )}
            <MethodologyModal />
            {isAnalyzed && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => reset(true)}
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 print:hidden">
        <AnimatePresence mode="wait">
          {!isAnalyzed ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                    Stop the AI Hype.
                    <div className="h-1" />
                    <span className="text-electricBlue">Plan with Precision.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    Custom-calibrate your firm's path to applied artificial intelligence.
                    Define parameters and generate a data-driven investment roadmap.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md hover:border-electricBlue/50 transition-all text-left group">
                        <div className="text-electricBlue font-bold mb-1 flex items-center gap-2">
                          20+ AECO Use Cases
                          <ChevronLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Library Explorer</div>
                      </button>
                    </DialogTrigger>
                    <UseCasesCatalog />
                  </Dialog>
                  <MethodologyModal trigger={
                    <button className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md hover:border-teal/50 transition-all text-left group">
                      <div className="text-teal font-bold mb-1 flex items-center gap-2">
                        Weighted ROI Logic
                        <ChevronLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Scoring Methodology</div>
                    </button>
                  } />
                </div>
              </div>
              <div className="lg:col-span-5">
                <InputPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b">
                <div className="space-y-2">
                  <Button variant="ghost" className="pl-0 h-auto hover:bg-transparent -ml-1 text-muted-foreground" onClick={() => reset(true)}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Config
                  </Button>
                  <h2 className="text-3xl font-display font-bold">Strategic Investment Outlook</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white border">{sector}</Badge>
                    <Badge variant="secondary" className="bg-white border text-electricBlue font-mono">Maturity: Level {maturity}</Badge>
                    <Badge className="bg-electricBlue hover:bg-electricBlue">{objective}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2 border-electricBlue/20 text-electricBlue hover:bg-electricBlue/5 shadow-sm">
                        <FileText className="h-4 w-4" />
                        Executive PDF
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Branded Executive Report</DialogTitle>
                        <DialogDescription>Add your firm's details for a professional printable summary.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="firm-name">Firm Name</Label>
                          <Input id="firm-name" value={printData.name} onChange={(e) => setPrintData({...printData, name: e.target.value})} placeholder="e.g. Autodesk Architecture" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="logo-url">Logo URL (Optional)</Label>
                          <Input id="logo-url" value={printData.logo} onChange={(e) => setPrintData({...printData, logo: e.target.value})} placeholder="https://..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handlePrint} className="bg-electricBlue w-full">Generate Pro Report</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="bg-slate-100 p-1 mb-8">
                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Strategic Radar</TabsTrigger>
                  <TabsTrigger value="roadmap" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Deployment Roadmap</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-0">
                  <ResultsDashboard />
                </TabsContent>
                <TabsContent value="roadmap" className="mt-0">
                  <DeploymentRoadmap />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-12 print:hidden">
        <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
          <span>Stephen Rowe's Autodesk AI Strategy Prototype</span>
          <span className="hidden sm:inline">PRO Version 1.2</span>
        </div>
      </footer>
    </div>
  );
}