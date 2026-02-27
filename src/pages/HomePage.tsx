import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStrategyStore } from '@/store/strategy-store';
import { InputPanel } from '@/components/strategy/InputPanel';
import { ResultsDashboard } from '@/components/strategy/ResultsDashboard';
import { DeploymentRoadmap } from '@/components/strategy/DeploymentRoadmap';
import { MethodologyModal } from '@/components/strategy/MethodologyModal';
import { UseCasesCatalog } from '@/components/strategy/UseCasesCatalog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { RotateCcw, Building2, ChevronLeft, Download, FileText } from 'lucide-react';
export function HomePage() {
  const isAnalyzed = useStrategyStore(s => s.isAnalyzed);
  const reset = useStrategyStore(s => s.reset);
  const sector = useStrategyStore(s => s.inputs.sector);
  const maturity = useStrategyStore(s => s.inputs.maturity);
  const objective = useStrategyStore(s => s.inputs.objective);
  return (
    <div className="min-h-screen bg-offWhite text-charcoal font-sans">
      <header className="border-b bg-charcoal text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-electricBlue p-1.5 rounded">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight hidden sm:block">
              AECO <span className="font-normal text-electricBlue">AI Strategy Canvas</span>
            </h1>
            <h1 className="font-display font-bold text-lg sm:hidden">
              AECO <span className="text-electricBlue">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <MethodologyModal />
            {isAnalyzed && (
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
                    Stop the AI Hype. <br />
                    <span className="text-electricBlue">Plan with Precision.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    Custom-calibrate your firm's path to applied artificial intelligence.
                    Define your parameters and generate a data-driven investment roadmap.
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
                        <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Explore the library</div>
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
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">View the math</div>
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
                  <Button variant="ghost" className="pl-0 h-auto hover:bg-transparent -ml-1 text-muted-foreground" onClick={reset}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Config
                  </Button>
                  <h2 className="text-3xl font-display font-bold">Strategic Investment Outlook</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white border">{sector}</Badge>
                    <Badge variant="secondary" className="bg-white border text-electricBlue">Maturity: Level {maturity}</Badge>
                    <Badge className="bg-electricBlue hover:bg-electricBlue">{objective}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="bg-accent/50 p-1 mb-8">
                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-white shadow-sm">Strategic Radar</TabsTrigger>
                  <TabsTrigger value="roadmap" className="data-[state=active]:bg-white shadow-sm">Deployment Roadmap</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard">
                  <ResultsDashboard />
                </TabsContent>
                <TabsContent value="roadmap">
                  <DeploymentRoadmap />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground font-mono">
            © 2024 AECO AI Strategy Engine • INTERNAL PLANNING TOOL | <a href="https://digitalrowe.com" target="_blank" rel="noreferrer" className="underline hover:text-electricBlue">digitalrowe.com</a>
          </div>
          <div className="flex gap-8 text-xs uppercase font-bold tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-charcoal transition-colors">Documentation</a>
            <a href="#" className="hover:text-charcoal transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}