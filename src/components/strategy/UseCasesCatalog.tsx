import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { AECO_USE_CASES, AICategory } from '@/data/aeco-use-cases';
import { Search, Boxes } from 'lucide-react';
export function UseCasesCatalog() {
  const [search, setSearch] = useState('');
  const filteredCases = AECO_USE_CASES.filter(uc => 
    uc.title.toLowerCase().includes(search.toLowerCase()) || 
    uc.category.toLowerCase().includes(search.toLowerCase()) ||
    uc.strategicTags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );
  const categories: AICategory[] = ['Design', 'Construction', 'Operations', 'Management'];
  return (
    <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-electricBlue" />
          AECO AI Use Case Library
        </DialogTitle>
        <DialogDescription>A comprehensive database of applied AI initiatives for the built environment.</DialogDescription>
      </DialogHeader>
      <div className="relative my-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by title, category, or objective..." 
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-8 pb-8">
          {categories.map(cat => {
            const items = filteredCases.filter(uc => uc.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b pb-1">{cat}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="p-4 rounded-xl border bg-accent/5 hover:bg-accent/10 transition-colors space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm leading-tight pr-2">{item.title}</h4>
                        <Badge variant="outline" className="text-[10px] font-mono shrink-0">ROI {item.baseROI}/10</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground/70">
                          <span>Complexity</span>
                          <span>{item.complexity}/10</span>
                        </div>
                        <Progress value={item.complexity * 10} className="h-1 bg-white" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.strategicTags.map(tag => (
                          <Badge key={tag} className="text-[9px] py-0 px-1.5 bg-electricBlue/10 text-electricBlue border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}