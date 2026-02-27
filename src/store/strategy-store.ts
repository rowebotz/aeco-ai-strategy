import { create } from 'zustand';
import { UserInputs, ScoredUseCase, calculatePriorities } from '@/lib/scoring-engine';
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
  revenue: '',
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
    const { inputs } = get();
    const results = calculatePriorities(inputs, AECO_USE_CASES);
    set({ scoredCases: results, isAnalyzed: true });
  },
  reset: () => set({ inputs: defaultInputs, scoredCases: [], isAnalyzed: false })
}));