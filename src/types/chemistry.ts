export type PriorityLevel = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW";

export interface DiagramTopic {
  id: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  formula?: string;
  topicNumber: number;
  difficulty: "Easy" | "Medium" | "Hard";
  jeeMainPriority: PriorityLevel;
  jeeAdvancedPriority: PriorityLevel;
  ncertPriority: PriorityLevel;
  tags: string[];
  description: string;
  whyItMatters: string;
  howItWorks: string[];
  keyPoints: string[];
  commonMistakes: string[];
  examTip: string;
  has3DModel?: boolean;
  modelType?: "molecule" | "orbital" | "vsepr" | "hybridisation" | "svg";
  moleculeId?: string;
  hybridisation?: string;
  geometry?: string;
  bondAngles?: string;
  svgType?: string;
  steps?: {
    stepNumber: number;
    title: string;
    description: string;
    highlightTarget?: string;
  }[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  topicsCount: number;
  jeeWeightage: string;
  keyConcepts: string[];
  topics: DiagramTopic[];
}

export interface MoleculeAtom {
  id: string;
  element: string; // 'B', 'H', 'Al', 'Cl', 'C', 'O', 'N', 'P', 'S', 'F', 'Xe', etc.
  position: [number, number, number]; // [x, y, z]
  label?: string;
  isBridge?: boolean;
  color?: string;
  radius?: number;
}

export interface MoleculeBond {
  from: string; // atom id
  to: string; // atom id
  type: "single" | "double" | "triple" | "3c-2e" | "hydrogen" | "dative" | "partial";
  order?: number;
  label?: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  chapterId: string;
  hybridisation: string;
  geometry: string;
  bondAngles: string;
  dipoleMoment: string;
  magneticCharacter?: string;
  description: string;
  jeeTips: string;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
  lonePairs?: {
    atomId: string;
    offset: [number, number, number];
  }[];
  structuralDetails?: {
    title: string;
    content: string;
  }[];
}

export interface OrbitalData {
  id: string;
  name: string;
  type: "s" | "px" | "py" | "pz" | "dxy" | "dyz" | "dzx" | "dx2-y2" | "dz2";
  quantumN: number;
  quantumL: number;
  quantumM: number | string;
  nodalPlanes: number;
  radialNodes: number;
  angularNodes: number;
  shapeDescription: string;
  electronDensityInfo: string;
  jeeNotes: string;
}

export interface VSEPRDomainConfig {
  domainsCount: number;
  bondingPairs: number;
  lonePairs: number;
  electronGeometry: string;
  molecularGeometry: string;
  idealBondAngle: string;
  actualBondAngle: string;
  exampleMolecules: string[];
  repulsionExplanation: string;
  jeeExamNotes: string;
}

export interface HybridisationConfig {
  type: "sp" | "sp2" | "sp3" | "sp3d" | "sp3d2";
  sCount: number;
  pCount: number;
  dCount: number;
  angle: string;
  geometry: string;
  orbitalsMixed: string[];
  examples: string[];
  stepAnimation: {
    step: number;
    title: string;
    description: string;
  }[];
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: "alkali" | "alkaline" | "transition" | "post-transition" | "metalloid" | "nonmetal" | "halogen" | "noble" | "lanthanide" | "actinide";
  group: number;
  period: number;
  block: "s" | "p" | "d" | "f";
  configuration: string;
  atomicRadius: number; // in pm
  ionicRadius?: string;
  ionisationEnergy: number; // in kJ/mol
  electronegativity: number; // Pauling scale
  electronGainEnthalpy?: number; // in kJ/mol
  commonOxidationStates: string;
  description: string;
  jeeTrends: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  question: string;
  type: "mcq" | "assertion-reason" | "diagram-id";
  options: string[];
  correctAnswer: number;
  assertion?: string;
  reason?: string;
  explanation: string;
  formula?: string;
  jeeMainYear?: string;
}

export interface JEERevisionCard {
  id: string;
  chapterId: string;
  topic: string;
  formulaOrStructure: string;
  priority: PriorityLevel;
  jeeMainStars: number;
  jeeAdvStars: number;
  ncertStars: number;
  summary30Sec: string;
  frequentlyTestedPoints: string[];
  commonTraps: string[];
  keyDiagramDescription: string;
}

export interface UserProgress {
  completedChapters: string[];
  viewedDiagrams: string[];
  masteredDiagrams: string[];
  quizScores: Record<string, number>;
  practiceDrawingsCount: number;
  weakConcepts: string[];
  recentActivity: {
    type: "diagram" | "quiz" | "3d" | "practice";
    title: string;
    time: string;
  }[];
}
