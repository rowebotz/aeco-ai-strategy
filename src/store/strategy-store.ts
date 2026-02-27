import { create } from 'zustand';
import { UserInputs, ScoredUseCase, calculatePriorities, RevenueBand } from '@/lib/scoring-engine';
import { AECO_USE_CASES, StrategicObjective } from '@/data/aeco-use-cases';
interface StrategyState {
  inputs: UserInputs;
  scoredCases: ScoredUseCase[];
  isAnalyzed: boolean;
  setInputs: (inputs: Partial<UserInputs>) => void;
  analyze: () => void;
  reset: () => void;
}
const defaultInputs: UserInputs = {
  sector: '',
  revenue: 'Medium',
  maturity: 3,
  objective: 'Operational Efficiency' as StrategicObjective,
  painPoints: []
};
export const useStrategyStore = create<StrategyState>((set, get) => ({
  inputs: defaultInputs,
  scoredCases: [],
  isAnalyzed: false,
  setInputs: (newInputs) => set((state) => ({
    inputs: { ...state.inputs, ...newInputs }
  })),
  analyze: () => {
    try {
      const { inputs } = get();
      const results = calculatePriorities(inputs, AECO_USE_CASES);
      set({ scoredCases: results, isAnalyzed: true });
    } catch (error) {
      console.error("Strategy Analysis Failed", error);
    }
  },
  reset: () => set({ inputs: defaultInputs, scoredCases: [], isAnalyzed: false })
}));