import { create } from 'zustand';
import { UserInputs, ScoredUseCase, calculatePriorities } from '@/lib/scoring-engine';
import { AECO_USE_CASES, StrategicObjective } from '@/data/aeco-use-cases';
interface StrategyState {
  inputs: UserInputs;
  scoredCases: ScoredUseCase[];
  isAnalyzed: boolean;
  // Comparison State
  comparisonMode: boolean;
  baselineScenario: { inputs: UserInputs; results: ScoredUseCase[] } | null;
  // Actions
  setInputs: (inputs: Partial<UserInputs>) => void;
  analyze: () => void;
  snapshotBaseline: () => void;
  setComparisonMode: (active: boolean) => void;
  reset: (preserveProfile?: boolean) => void;
}
const STORAGE_KEY = 'aeco-ai-strategy-v1';
const defaultInputs: UserInputs = {
  sector: '',
  revenue: 'Medium',
  maturity: 3,
  objective: 'Operational Efficiency' as StrategicObjective,
  painPoints: [],
  painPointsText: ''
};
const getPersistedData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
export const useStrategyStore = create<StrategyState>((set, get) => ({
  inputs: getPersistedData()?.inputs || defaultInputs,
  scoredCases: [],
  isAnalyzed: false,
  comparisonMode: false,
  baselineScenario: getPersistedData()?.baselineScenario || null,
  setInputs: (newInputs) => {
    const updatedInputs = { ...get().inputs, ...newInputs };
    set({ inputs: updatedInputs });
    // Persistence
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      inputs: updatedInputs,
      baselineScenario: get().baselineScenario
    }));
  },
  analyze: () => {
    try {
      const { inputs } = get();
      const results = calculatePriorities(inputs, AECO_USE_CASES);
      set({ scoredCases: results, isAnalyzed: true });
    } catch (error) {
      console.error("Strategy Analysis Failed", error);
    }
  },
  snapshotBaseline: () => {
    const { inputs, scoredCases } = get();
    const baseline = { inputs: { ...inputs }, results: [...scoredCases] };
    set({ baselineScenario: baseline });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      inputs: inputs,
      baselineScenario: baseline
    }));
  },
  setComparisonMode: (active) => set({ comparisonMode: active }),
  reset: (preserveProfile = false) => {
    const profile = preserveProfile ? { 
      sector: get().inputs.sector, 
      revenue: get().inputs.revenue, 
      maturity: get().inputs.maturity 
    } : {};
    const newInputs = { ...defaultInputs, ...profile };
    set({ 
      inputs: newInputs, 
      scoredCases: [], 
      isAnalyzed: false, 
      comparisonMode: false,
      baselineScenario: preserveProfile ? get().baselineScenario : null
    });
    localStorage.removeItem(STORAGE_KEY);
  }
}));