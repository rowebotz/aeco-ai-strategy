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
    // Ensure uc.strategicTags is handled gracefully even if undefined or empty
    const tags = uc.strategicTags ?? [];
    if (tags.includes(inputs.objective)) {
      alignmentScore = 40;
      matchReason = `High alignment with your core goal of ${inputs.objective}. `;
    } else if (tags.length === 0) {
      matchReason = "Broad application initiative. ";
    }
    // 2. Maturity & Complexity Fit (30 points max)
    // Complexity is 1-10. Maturity is 1-5 (scaled to 2-10).
    const scaledMaturity = inputs.maturity * 2;
    const complexityGap = uc.complexity - scaledMaturity;
    // Base feasibility: scale 10-complexity (range 0-9) to 0-30 points
    let feasibilityScore = Math.max(0, (10 - uc.complexity) * 3); 
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
    // Clamp component to its reasonable range contribution
    feasibilityScore = Math.min(30, Math.max(-25, feasibilityScore));
    // 3. Base ROI & Scale Factor (30 points base + 10 points bonus)
    let valueScore = Math.min(30, uc.baseROI * 3);
    // Scale Bonus
    let scaleBonus = 0;
    if (inputs.revenue === 'High') {
      if (tags.includes('Risk Mitigation') || tags.includes('Margin Expansion')) {
        scaleBonus = 10;
        matchReason += "High revenue scale amplifies potential savings/mitigation. ";
      }
    } else if (inputs.revenue === 'Low' && uc.complexity <= 4) {
      // Low revenue firms value quick wins (Low complexity)
      scaleBonus = 10;
      matchReason += "Ideal quick-win for your organization size. ";
    }
    // Calculate total and clamp to executive 0-100 range
    const totalScore = alignmentScore + feasibilityScore + valueScore + scaleBonus;
    const clampedScore = Math.min(100, Math.max(0, totalScore));
    return {
      ...uc,
      score: Math.round(clampedScore),
      matchReason: matchReason.trim() || "Balanced tactical improvement.",
      alignment: alignmentScore,
      feasibility: feasibilityScore
    };
  }).sort((a, b) => b.score - a.score);
}