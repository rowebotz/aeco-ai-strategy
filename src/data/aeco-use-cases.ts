export type AICategory = 'Design' | 'Construction' | 'Operations' | 'Management';
export type StrategicObjective = 'Risk Mitigation' | 'Margin Expansion' | 'Sustainability' | 'Operational Efficiency';
export interface UseCase {
  id: string;
  title: string;
  description: string;
  category: AICategory;
  baseROI: number; // 1-10
  complexity: number; // 1-10
  strategicTags: StrategicObjective[];
  estimatedImplementationWeeks: number;
}
export const AECO_USE_CASES: UseCase[] = [
  {
    id: 'gen-sched',
    title: 'Generative Schedule Optimization',
    description: 'AI-driven simulation of thousands of schedule permutations to find the optimal path with least risk.',
    category: 'Construction',
    baseROI: 9,
    complexity: 7,
    strategicTags: ['Margin Expansion', 'Risk Mitigation'],
    estimatedImplementationWeeks: 12
  },
  {
    id: 'rfi-risk',
    title: 'RFI Risk Prediction',
    description: 'Natural language processing of RFIs to flag potential litigation risks or schedule delays before they occur.',
    category: 'Management',
    baseROI: 7,
    complexity: 4,
    strategicTags: ['Risk Mitigation'],
    estimatedImplementationWeeks: 6
  },
  {
    id: 'auto-code',
    title: 'Automated Code Compliance',
    description: 'Real-time checking of BIM models against local building codes using geometric AI.',
    category: 'Design',
    baseROI: 8,
    complexity: 8,
    strategicTags: ['Operational Efficiency', 'Risk Mitigation'],
    estimatedImplementationWeeks: 20
  },
  {
    id: 'site-progress',
    title: 'Computer Vision Site Progress',
    description: 'Automated comparison of site photos/scans against BIM for real-time percent-complete tracking.',
    category: 'Construction',
    baseROI: 8,
    complexity: 6,
    strategicTags: ['Operational Efficiency', 'Margin Expansion'],
    estimatedImplementationWeeks: 10
  },
  {
    id: 'energy-opt',
    title: 'Operational Energy Optimization',
    description: 'Predictive modeling of building HVAC systems to reduce energy consumption based on occupancy data.',
    category: 'Operations',
    baseROI: 7,
    complexity: 5,
    strategicTags: ['Sustainability', 'Operational Efficiency'],
    estimatedImplementationWeeks: 16
  },
  {
    id: 'predictive-maint',
    title: 'Predictive Asset Maintenance',
    description: 'IoT sensor integration with AI to predict equipment failure before it occurs.',
    category: 'Operations',
    baseROI: 8,
    complexity: 6,
    strategicTags: ['Operational Efficiency', 'Risk Mitigation'],
    estimatedImplementationWeeks: 14
  },
  {
    id: 'automated-est',
    title: 'Automated Estimating & Takeoff',
    description: 'Using vision models to perform automated material takeoffs from 2D drawings.',
    category: 'Construction',
    baseROI: 9,
    complexity: 5,
    strategicTags: ['Margin Expansion', 'Operational Efficiency'],
    estimatedImplementationWeeks: 8
  },
  {
    id: 'safety-monitoring',
    title: 'AI Site Safety Monitoring',
    description: 'Real-time computer vision analysis of site safety violations (PPE, exclusion zones).',
    category: 'Construction',
    baseROI: 6,
    complexity: 7,
    strategicTags: ['Risk Mitigation'],
    estimatedImplementationWeeks: 8
  },
  {
    id: 'carbon-calc',
    title: 'Generative Carbon Accounting',
    description: 'AI-enabled material selection to minimize embodied carbon in structural designs.',
    category: 'Design',
    baseROI: 5,
    complexity: 6,
    strategicTags: ['Sustainability'],
    estimatedImplementationWeeks: 12
  },
  {
    id: 'tender-ai',
    title: 'AI Tender Analyzer',
    description: 'Automated scanning of bid documents to identify hidden risks or ambiguous clauses.',
    category: 'Management',
    baseROI: 7,
    complexity: 4,
    strategicTags: ['Risk Mitigation', 'Margin Expansion'],
    estimatedImplementationWeeks: 4
  }
];