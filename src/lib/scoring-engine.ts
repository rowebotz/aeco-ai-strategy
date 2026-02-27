import { UseCase, StrategicObjective } from "@/data/aeco-use-cases";
export type RevenueBand = 'Low' | 'Medium' | 'High';
export interface UserInputs {
  sector: string;
  revenue: RevenueBand;
  maturity: number; // 1-5
  objective: StrategicObjective;
  painPoints: string[];
}
export interface ScoredUseCase extends UseCase {
  score: number;
  matchReason: string;
  alignment: number;
  feasibility: number;
}
export function calculatePriorities(inputs: UserInputs, useCases: UseCase[]): ScoredUseCase[] {
  return useCases.map(uc => {
    let alignmentScore = 0;
    let matchReason = "";
    // 1. Strategic Alignment (40 points max)
    if (uc.strategicTags.includes(inputs.objective)) {
      alignmentScore += 40;
      matchReason = `High alignment with your core goal of ${inputs.objective}. `;
    }
    // 2. Maturity & Complexity Fit (30 points base)
    // Complexity is 1-10. Maturity is 1-5 (scaled to 2-10).
    const scaledMaturity = inputs.maturity * 2;
    const complexityGap = uc.complexity - scaledMaturity;
    let feasibilityScore = (10 - uc.complexity) * 3; // Base feasibility (0-30)
    if (complexityGap > 3) {
      // Significant Penalty for low maturity firms attempting high complexity
      feasibilityScore -= 25;
      matchReason += "Current digital maturity creates high implementation risk. ";
    } else if (complexityGap > 0) {
      // Minor Penalty
      feasibilityScore -= 10;
      matchReason += "Will require significant process training. ";
    } else if (inputs.maturity >= 4 && uc.complexity >= 7) {
      // Bonus for high maturity firms tackling complex items (Competitive Advantage)
      feasibilityScore += 15;
      matchReason += "Leverages your advanced technical leadership. ";
    }
    // 3. Base ROI & Scale Factor (30 points base)
    let valueScore = uc.baseROI * 3;
    // Scale Bonus: High revenue firms value Risk Mitigation and Margin Expansion more due to scale of impact
    if (inputs.revenue === 'High') {
      if (uc.strategicTags.includes('Risk Mitigation') || uc.strategicTags.includes('Margin Expansion')) {
        valueScore += 10;
        matchReason += "High revenue scale amplifies potential savings/mitigation. ";
      }
    } else if (inputs.revenue === 'Low' && uc.complexity <= 4) {
      // Low revenue firms value quick wins (Low complexity)
      valueScore += 10;
      matchReason += "Ideal quick-win for your organization size. ";
    }
    const totalScore = Math.min(100, Math.max(0, alignmentScore + feasibilityScore + valueScore));
    return {
      ...uc,
      score: Math.round(totalScore),
      matchReason: matchReason.trim() || "Balanced tactical improvement.",
      alignment: alignmentScore,
      feasibility: feasibilityScore
    };
  }).sort((a, b) => b.score - a.score);
}