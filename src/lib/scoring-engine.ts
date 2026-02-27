import { UseCase, StrategicObjective } from "@/data/aeco-use-cases";
export interface UserInputs {
  sector: string;
  revenue: string;
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
    // Strategic Alignment (Objective Match)
    if (uc.strategicTags.includes(inputs.objective)) {
      alignmentScore += 40;
      matchReason = `High alignment with your core goal of ${inputs.objective}. `;
    }
    // Maturity Fit logic
    // Firms with low maturity (1-2) are penalized for high complexity tools
    // Firms with high maturity (4-5) get a bonus for high complexity (competitive advantage)
    let feasibilityScore = (10 - uc.complexity) * 5; // Base feasibility
    const complexityGap = uc.complexity - (inputs.maturity * 2); 
    if (complexityGap > 2) {
      feasibilityScore -= 20; // Too complex for maturity
      matchReason += "Requires higher digital maturity than currently reported. ";
    } else if (inputs.maturity >= 4 && uc.complexity >= 7) {
      feasibilityScore += 15; // High maturity firms can handle complex high-reward tools
      matchReason += "Leverages your advanced digital capabilities. ";
    }
    // Revenue Factor (Simplification: Higher revenue firms value risk mitigation and large scale ROI more)
    const roiScore = uc.baseROI * 5;
    const totalScore = Math.min(100, Math.max(0, alignmentScore + feasibilityScore + roiScore));
    return {
      ...uc,
      score: totalScore,
      matchReason: matchReason.trim() || "General performance improvement across standard metrics.",
      alignment: alignmentScore,
      feasibility: feasibilityScore
    };
  }).sort((a, b) => b.score - a.score);
}