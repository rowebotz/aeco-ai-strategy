import { UseCase, StrategicObjective } from "@/data/aeco-use-cases";
export type RevenueBand = 'Low' | 'Medium' | 'High';
export interface UserInputs {
  sector: string;
  revenue: RevenueBand;
  maturity: number; // 1-5
  objective: StrategicObjective;
  painPoints: string[];
  painPointsText: string;
}
export interface ScoredUseCase extends UseCase {
  score: number;
  matchReason: string;
  alignment: number;
  feasibility: number;
  isPainMatch?: boolean;
}
// Global Industry Benchmarks
export const INDUSTRY_BENCHMARKS = {
  ENR_500_SCORE: 65,
  ENR_500_ROI: 7.2,
};
// Keyword to Use Case mapping for semantic boosting
const PAIN_KEYWORD_MAP: Record<string, string[]> = {
  'rfi': ['rfi-risk', 'tender-ai', 'legal-bot'],
  'clash': ['auto-code', 'lidar-bim', 'bim-cleaner'],
  'schedule': ['gen-sched', 'site-progress'],
  'carbon': ['carbon-calc', 'facade-ai'],
  'energy': ['energy-opt', 'smart-grid'],
  'maintenance': ['predictive-maint'],
  'safety': ['safety-monitoring'],
  'estimating': ['automated-est'],
  'tender': ['tender-ai'],
  'legal': ['legal-bot'],
  'design': ['gen-design', 'facade-ai'],
  'bim': ['bim-cleaner', 'lidar-bim', 'auto-code'],
  'progress': ['site-progress'],
  'equipment': ['fleet-fuel'],
  'waste': ['waste-sort']
};
export function calculatePriorities(inputs: UserInputs, useCases: UseCase[]): ScoredUseCase[] {
  const rawText = (inputs.painPointsText || "").toLowerCase();
  return useCases.map(uc => {
    let alignmentScore = 0;
    let matchReason = "";
    let isPainMatch = false;
    // 1. Strategic Alignment (40 points max)
    const tags = uc.strategicTags ?? [];
    if (tags.includes(inputs.objective)) {
      alignmentScore = 40;
      matchReason = `High alignment with your core goal of ${inputs.objective}. `;
    } else if (tags.length === 0) {
      matchReason = "Broad application initiative. ";
    }
    // 2. Keyword/Pain Point Boosting (New Strategic Feature)
    // Check if use case matches detected keywords in raw text input
    Object.entries(PAIN_KEYWORD_MAP).forEach(([keyword, ids]) => {
      if (rawText.includes(keyword) && ids.includes(uc.id)) {
        alignmentScore += 15;
        isPainMatch = true;
        matchReason = `Directly addresses your mentioned pain point: "${keyword}". ` + matchReason;
      }
    });
    // 3. Maturity & Complexity Fit (30 points max)
    const scaledMaturity = inputs.maturity * 2;
    const complexityGap = uc.complexity - scaledMaturity;
    let feasibilityScore = Math.max(0, (10 - uc.complexity) * 3);
    if (complexityGap > 3) {
      feasibilityScore -= 25;
      matchReason += "Current digital maturity creates high implementation risk. ";
    } else if (complexityGap > 0) {
      feasibilityScore -= 10;
      matchReason += "Will require significant process training. ";
    } else if (inputs.maturity >= 4 && uc.complexity >= 7) {
      feasibilityScore += 15;
      matchReason += "Leverages your advanced technical leadership. ";
    }
    feasibilityScore = Math.min(30, Math.max(-25, feasibilityScore));
    // 4. Base ROI & Scale Factor (30 points base + 10 points bonus)
    let valueScore = Math.min(30, uc.baseROI * 3);
    let scaleBonus = 0;
    if (inputs.revenue === 'High') {
      if (tags.includes('Risk Mitigation') || tags.includes('Margin Expansion')) {
        scaleBonus = 10;
        matchReason += "High revenue scale amplifies potential savings. ";
      }
    } else if (inputs.revenue === 'Low' && uc.complexity <= 4) {
      scaleBonus = 10;
      matchReason += "Ideal quick-win for your organization size. ";
    }
    const totalScore = alignmentScore + feasibilityScore + valueScore + scaleBonus;
    const clampedScore = Math.min(100, Math.max(0, totalScore));
    return {
      ...uc,
      score: Math.round(clampedScore),
      matchReason: matchReason.trim() || "Balanced tactical improvement.",
      alignment: alignmentScore,
      feasibility: feasibilityScore,
      isPainMatch
    };
  }).sort((a, b) => b.score - a.score);
}