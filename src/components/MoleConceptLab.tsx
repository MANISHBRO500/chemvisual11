import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  Scale,
  Zap,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  RotateCcw,
  Box,
  Layers,
} from "lucide-react";

// Standard Avogadro Constant
const NA = 6.02214076e23;
// Molar Gas Volume at STP (0°C, 1 atm) in Liters
const MOLAR_VOLUME_STP = 22.414;

interface ReactionPreset {
  id: string;
  name: string;
  equation: string;
  reactantA: { name: string; formula: string; molarMass: number; coeff: number; color: string };
  reactantB: { name: string; formula: string; molarMass: number; coeff: number; color: string };
  productC: { name: string; formula: string; molarMass: number; coeff: number; color: string };
  productD?: { name: string; formula: string; molarMass: number; coeff: number; color: string };
}

const REACTION_PRESETS: ReactionPreset[] = [
  {
    id: "nh3-synthesis",
    name: "Synthesis of Ammonia (Haber Process)",
    equation: "N₂ (g) + 3H₂ (g) → 2NH₃ (g)",
    reactantA: { name: "Nitrogen", formula: "N₂", molarMass: 28.013, coeff: 1, color: "#3b82f6" },
    reactantB: { name: "Hydrogen", formula: "H₂", molarMass: 2.016, coeff: 3, color: "#f43f5e" },
    productC: { name: "Ammonia", formula: "NH₃", molarMass: 17.031, coeff: 2, color: "#10b981" },
  },
  {
    id: "water-synthesis",
    name: "Synthesis of Water",
    equation: "2H₂ (g) + O₂ (g) → 2H₂O (l)",
    reactantA: { name: "Hydrogen", formula: "H₂", molarMass: 2.016, coeff: 2, color: "#f43f5e" },
    reactantB: { name: "Oxygen", formula: "O₂", molarMass: 31.999, coeff: 1, color: "#06b6d4" },
    productC: { name: "Water", formula: "H₂O", molarMass: 18.015, coeff: 2, color: "#38bdf8" },
  },
  {
    id: "methane-combustion",
    name: "Combustion of Methane",
    equation: "CH₄ (g) + 2O₂ (g) → CO₂ (g) + 2H₂O (g)",
    reactantA: { name: "Methane", formula: "CH₄", molarMass: 16.043, coeff: 1, color: "#8b5cf6" },
    reactantB: { name: "Oxygen", formula: "O₂", molarMass: 31.999, coeff: 2, color: "#06b6d4" },
    productC: { name: "Carbon Dioxide", formula: "CO₂", molarMass: 44.01, coeff: 1, color: "#f59e0b" },
    productD: { name: "Water Vapor", formula: "H₂O", molarMass: 18.015, coeff: 2, color: "#38bdf8" },
  },
  {
    id: "alcl3-reaction",
    name: "Synthesis of Aluminium Chloride",
    equation: "2Al (s) + 3Cl₂ (g) → 2AlCl₃ (s)",
    reactantA: { name: "Aluminium", formula: "Al", molarMass: 26.982, coeff: 2, color: "#94a3b8" },
    reactantB: { name: "Chlorine", formula: "Cl₂", molarMass: 70.906, coeff: 3, color: "#84cc16" },
    productC: { name: "Aluminium Chloride", formula: "AlCl₃", molarMass: 133.34, coeff: 2, color: "#eab308" },
  },
  {
    id: "caco3-decomposition",
    name: "Calcium Carbonate Neutralization with HCl",
    equation: "CaCO₃ (s) + 2HCl (aq) → CaCl₂ + H₂O + CO₂ (g)",
    reactantA: { name: "Calcium Carbonate", formula: "CaCO₃", molarMass: 100.09, coeff: 1, color: "#e2e8f0" },
    reactantB: { name: "Hydrochloric Acid", formula: "HCl", molarMass: 36.46, coeff: 2, color: "#ec4899" },
    productC: { name: "Calcium Chloride", formula: "CaCl₂", molarMass: 110.98, coeff: 1, color: "#a855f7" },
  },
];

interface CompoundPreset {
  name: string;
  formula: string;
  molarMass: number;
  elements: { symbol: string; count: number; atomicMass: number; color: string }[];
}

const COMPOUND_PRESETS: CompoundPreset[] = [
  {
    name: "Water",
    formula: "H₂O",
    molarMass: 18.015,
    elements: [
      { symbol: "H", count: 2, atomicMass: 1.008, color: "#f3f4f6" },
      { symbol: "O", count: 1, atomicMass: 15.999, color: "#ef4444" },
    ],
  },
  {
    name: "Sulphuric Acid",
    formula: "H₂SO₄",
    molarMass: 98.079,
    elements: [
      { symbol: "H", count: 2, atomicMass: 1.008, color: "#f3f4f6" },
      { symbol: "S", count: 1, atomicMass: 32.06, color: "#eab308" },
      { symbol: "O", count: 4, atomicMass: 15.999, color: "#ef4444" },
    ],
  },
  {
    name: "Glucose",
    formula: "C₆H₁₂O₆",
    molarMass: 180.156,
    elements: [
      { symbol: "C", count: 6, atomicMass: 12.011, color: "#6b7280" },
      { symbol: "H", count: 12, atomicMass: 1.008, color: "#f3f4f6" },
      { symbol: "O", count: 6, atomicMass: 15.999, color: "#ef4444" },
    ],
  },
  {
    name: "Potassium Permanganate",
    formula: "KMnO₄",
    molarMass: 158.034,
    elements: [
      { symbol: "K", count: 1, atomicMass: 39.098, color: "#a855f7" },
      { symbol: "Mn", count: 1, atomicMass: 54.938, color: "#ec4899" },
      { symbol: "O", count: 4, atomicMass: 15.999, color: "#ef4444" },
    ],
  },
  {
    name: "Potassium Dichromate",
    formula: "K₂Cr₂O₇",
    molarMass: 294.185,
    elements: [
      { symbol: "K", count: 2, atomicMass: 39.098, color: "#a855f7" },
      { symbol: "Cr", count: 2, atomicMass: 51.996, color: "#f97316" },
      { symbol: "O", count: 7, atomicMass: 15.999, color: "#ef4444" },
    ],
  },
  {
    name: "Sodium Chloride",
    formula: "NaCl",
    molarMass: 58.44,
    elements: [
      { symbol: "Na", count: 1, atomicMass: 22.99, color: "#3b82f6" },
      { symbol: "Cl", count: 1, atomicMass: 35.45, color: "#84cc16" },
    ],
  },
  {
    name: "Urea",
    formula: "CO(NH₂)₂",
    molarMass: 60.06,
    elements: [
      { symbol: "C", count: 1, atomicMass: 12.011, color: "#6b7280" },
      { symbol: "O", count: 1, atomicMass: 15.999, color: "#ef4444" },
      { symbol: "N", count: 2, atomicMass: 14.007, color: "#3b82f6" },
      { symbol: "H", count: 4, atomicMass: 1.008, color: "#f3f4f6" },
    ],
  },
];

export const MoleConceptLab: React.FC = () => {
  const [labMode, setLabMode] = useState<"converter" | "molar-mass" | "stoichiometry">("converter");

  // 1. Converter State
  const [selectedCompound, setSelectedCompound] = useState<CompoundPreset>(COMPOUND_PRESETS[0]);
  const [massInput, setMassInput] = useState<number>(18.015);
  const [molesInput, setMolesInput] = useState<number>(1);
  const [particlesInput, setParticlesInput] = useState<string>("6.022e23");
  const [volumeStpInput, setVolumeStpInput] = useState<number>(22.414);
  const [molarityInput, setMolarityInput] = useState<number>(1.0);
  const [solutionVolInput, setSolutionVolInput] = useState<number>(1.0); // 1 Liter

  // Handle Mass Change
  const handleMassChange = (val: number) => {
    setMassInput(val);
    const n = val / selectedCompound.molarMass;
    setMolesInput(+n.toFixed(4));
    setParticlesInput((n * NA).toExponential(3));
    setVolumeStpInput(+(n * MOLAR_VOLUME_STP).toFixed(2));
  };

  // Handle Moles Change
  const handleMolesChange = (n: number) => {
    setMolesInput(n);
    setMassInput(+(n * selectedCompound.molarMass).toFixed(3));
    setParticlesInput((n * NA).toExponential(3));
    setVolumeStpInput(+(n * MOLAR_VOLUME_STP).toFixed(2));
  };

  // Handle Volume STP Change
  const handleVolumeStpChange = (v: number) => {
    setVolumeStpInput(v);
    const n = v / MOLAR_VOLUME_STP;
    setMolesInput(+n.toFixed(4));
    setMassInput(+(n * selectedCompound.molarMass).toFixed(3));
    setParticlesInput((n * NA).toExponential(3));
  };

  // Switch Compound in Converter
  const handleCompoundSelect = (comp: CompoundPreset) => {
    setSelectedCompound(comp);
    setMassInput(comp.molarMass);
    setMolesInput(1);
    setParticlesInput(NA.toExponential(3));
    setVolumeStpInput(MOLAR_VOLUME_STP);
  };

  // 2. Stoichiometry & Limiting Reagent State
  const [selectedReaction, setSelectedReaction] = useState<ReactionPreset>(REACTION_PRESETS[0]);
  const [massA, setMassA] = useState<number>(28.013); // 1 mole of N2
  const [massB, setMassB] = useState<number>(10.0);   // ~5 moles of H2 (Excess H2)

  const molesA = massA / selectedReaction.reactantA.molarMass;
  const molesB = massB / selectedReaction.reactantB.molarMass;

  // Reaction ratio check: n_A / coeffA vs n_B / coeffB
  const ratioA = molesA / selectedReaction.reactantA.coeff;
  const ratioB = molesB / selectedReaction.reactantB.coeff;

  let limitingReagent: "A" | "B" | "equal" = "equal";
  if (Math.abs(ratioA - ratioB) > 0.0001) {
    limitingReagent = ratioA < ratioB ? "A" : "B";
  }

  // Calculate extent of reaction
  const extent = Math.min(ratioA, ratioB);

  // Moles consumed & product formed
  const molesAConsumed = extent * selectedReaction.reactantA.coeff;
  const molesBConsumed = extent * selectedReaction.reactantB.coeff;
  const molesCFormed = extent * selectedReaction.productC.coeff;
  const molesDFormed = selectedReaction.productD ? extent * selectedReaction.productD.coeff : 0;

  const molesARemaining = Math.max(0, molesA - molesAConsumed);
  const molesBRemaining = Math.max(0, molesB - molesBConsumed);

  const massCFormed = molesCFormed * selectedReaction.productC.molarMass;
  const massDFormed = selectedReaction.productD ? molesDFormed * selectedReaction.productD.molarMass : 0;

  // Particle Box Animation Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface VisParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      label: string;
      radius: number;
    }

    const particles: VisParticle[] = [];
    const width = canvas.width;
    const height = canvas.height;

    // Generate visual particles representing reactant remaining and products formed
    const numA = Math.min(18, Math.round(molesARemaining * 6));
    const numB = Math.min(18, Math.round(molesBRemaining * 6));
    const numC = Math.min(24, Math.round(molesCFormed * 8));

    for (let i = 0; i < numA; i++) {
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: selectedReaction.reactantA.color,
        label: selectedReaction.reactantA.formula,
        radius: 8,
      });
    }

    for (let i = 0; i < numB; i++) {
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        color: selectedReaction.reactantB.color,
        label: selectedReaction.reactantB.formula,
        radius: 6,
      });
    }

    for (let i = 0; i < numC; i++) {
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        color: selectedReaction.productC.color,
        label: selectedReaction.productC.formula,
        radius: 10,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Box border
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, width - 10, height - 10);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 15 || p.x > width - 15) p.vx *= -1;
        if (p.y < 15 || p.y > height - 15) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, p.x, p.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedReaction, massA, massB]);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Calculator className="w-8 h-8 text-cyan-400" />
            <span>Mole Concept, Molar Mass & Stoichiometry Lab</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Quantitative conversion wheel ($N_A = 6.022 \times 10^{23}$), molar mass composition analysis, and real-time limiting reagent stoichiometry visualizer.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setLabMode("converter")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labMode === "converter"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Mole Conversion Wheel
          </button>
          <button
            onClick={() => setLabMode("molar-mass")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labMode === "molar-mass"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Molar Mass & Composition
          </button>
          <button
            onClick={() => setLabMode("stoichiometry")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labMode === "stoichiometry"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Limiting Reagent & Yield
          </button>
        </div>
      </div>

      {/* MODE 1: MOLE CONVERSION WHEEL */}
      {labMode === "converter" && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Main Controls (8 Columns) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 space-y-6 shadow-2xl">
            {/* Compound Selector Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>Select Chemical Compound:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {COMPOUND_PRESETS.map((comp) => (
                  <button
                    key={comp.formula}
                    onClick={() => handleCompoundSelect(comp)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedCompound.formula === comp.formula
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {comp.name} ({comp.formula})
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Substance Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-cyan-400 font-semibold block">Target Substance</span>
                <span className="text-2xl font-black text-white">{selectedCompound.name}</span>
                <span className="text-sm font-mono text-cyan-300 ml-2">({selectedCompound.formula})</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400 block">Molar Mass (M)</span>
                <span className="text-xl font-bold text-amber-300">{selectedCompound.molarMass} g/mol</span>
              </div>
            </div>

            {/* Interactive Conversion Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Given Mass Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Given Mass (W) in Grams</span>
                  <span className="text-cyan-400 font-mono">W = n × M</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={massInput}
                    onChange={(e) => handleMassChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-lg font-bold focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs font-bold text-slate-400">g</span>
                </div>
              </div>

              {/* Number of Moles Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-2 shadow-lg shadow-cyan-500/5">
                <label className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                  <span>Number of Moles (n)</span>
                  <span className="text-cyan-400 font-mono">n = W / M</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={molesInput}
                    onChange={(e) => handleMolesChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-cyan-500 rounded-xl px-3.5 py-2 text-cyan-300 font-mono text-xl font-black focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs font-bold text-cyan-400">mol</span>
                </div>
              </div>

              {/* Particles Count Display */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Number of Particles (N)</span>
                  <span className="text-amber-400 font-mono">N = n × N_A</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={particlesInput}
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2 text-amber-300 font-mono text-base font-bold cursor-not-allowed"
                  />
                  <span className="text-[10px] font-bold text-slate-400">entities</span>
                </div>
              </div>

              {/* Gas Volume at STP */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Gas Volume at STP (V)</span>
                  <span className="text-emerald-400 font-mono">V = n × 22.4 L</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={volumeStpInput}
                    onChange={(e) => handleVolumeStpChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-emerald-300 font-mono text-lg font-bold focus:outline-none focus:border-emerald-400"
                  />
                  <span className="text-xs font-bold text-slate-400">Liters</span>
                </div>
              </div>
            </div>

            {/* Molarity & Solution Volume Calculator */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Solution Molarity (M) Calculation</span>
              </span>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Volume of Solution (V_sol):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.25"
                      min="0.1"
                      value={solutionVolInput}
                      onChange={(e) => setSolutionVolInput(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-sm font-bold"
                    />
                    <span className="text-xs text-slate-400 font-mono">L</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Molarity (M = n / V_sol):</span>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono font-bold text-lg">
                    {(molesInput / solutionVolInput).toFixed(3)} M (mol/L)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulas & JEE Tips Column (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Core Mole Formulas</span>
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Moles from Mass:</span>
                  <span className="text-cyan-300 font-bold text-sm">n = Given Mass (W) / Molar Mass (M)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Moles from Particles:</span>
                  <span className="text-amber-300 font-bold text-sm">n = N / 6.022 × 10²³</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Moles from Gas Volume at STP:</span>
                  <span className="text-emerald-300 font-bold text-sm">n = V (in Liters) / 22.4 L</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-700/50 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Avogadro's Hypothesis</span>
              </div>
              <p className="text-xs text-indigo-100 font-medium leading-relaxed">
                Equal volumes of all gases under identical conditions of temperature and pressure contain an equal number of molecules ($V \propto n$).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: MOLAR MASS BREAKDOWN */}
      {labMode === "molar-mass" && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-cyan-400" />
              <span>Molar Mass & Percentage Mass Composition</span>
            </h2>

            {/* Select Compound */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMPOUND_PRESETS.map((comp) => (
                <button
                  key={comp.formula}
                  onClick={() => setSelectedCompound(comp)}
                  className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                    selectedCompound.formula === comp.formula
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="block font-extrabold text-sm text-white">{comp.formula}</span>
                  <span className="text-[11px] opacity-80 block truncate">{comp.name}</span>
                </button>
              ))}
            </div>

            {/* Elemental Composition Cards */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-cyan-300">{selectedCompound.name}</h3>
                  <span className="text-xs font-mono text-slate-400">Formula: {selectedCompound.formula}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Molar Mass</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    {selectedCompound.molarMass} g/mol
                  </span>
                </div>
              </div>

              {/* Elements Table */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Constituent Elements Breakdown:
                </span>

                <div className="space-y-2">
                  {selectedCompound.elements.map((elem) => {
                    const elemMass = elem.count * elem.atomicMass;
                    const percent = ((elemMass / selectedCompound.molarMass) * 100).toFixed(2);

                    return (
                      <div
                        key={elem.symbol}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shadow-md"
                            style={{ backgroundColor: elem.color }}
                          >
                            {elem.symbol}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white">
                              {elem.count} × {elem.symbol} Atom(s)
                            </span>
                            <span className="text-xs text-slate-400 block font-mono">
                              Atomic Mass: {elem.atomicMass} u
                            </span>
                          </div>
                        </div>

                        {/* Mass Contribution & Percentage */}
                        <div className="text-right font-mono">
                          <span className="text-sm font-bold text-cyan-300">{elemMass.toFixed(3)} g/mol</span>
                          <span className="text-xs font-extrabold text-amber-400 block">
                            {percent}% of mass
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <span>Empirical vs Molecular Formula</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong>Empirical Formula:</strong> Expresses the simplest whole-number ratio of atoms present in a compound (e.g. CH₂O for Glucose).
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong>Molecular Formula:</strong> Shows the exact number of atoms of each element (n = Molar Mass / Empirical Mass).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: LIMITING REAGENT & STOICHIOMETRY */}
      {labMode === "stoichiometry" && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 space-y-6 shadow-2xl">
            {/* Reaction Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Chemical Reaction Equation:
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {REACTION_PRESETS.map((rxn) => (
                  <button
                    key={rxn.id}
                    onClick={() => {
                      setSelectedReaction(rxn);
                      setMassA(rxn.reactantA.molarMass * rxn.reactantA.coeff);
                      setMassB(rxn.reactantB.molarMass * rxn.reactantB.coeff);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
                      selectedReaction.id === rxn.id
                        ? "bg-cyan-500/20 border-cyan-500 shadow-md shadow-cyan-500/10"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-300 block">{rxn.name}</span>
                    <span className="text-xs font-mono font-bold text-cyan-300 block">{rxn.equation}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reactant Mass Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Reactant A Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedReaction.reactantA.color }} />
                    <span>Reactant A: {selectedReaction.reactantA.name}</span>
                  </span>
                  {limitingReagent === "A" && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700/60 animate-pulse">
                      LIMITING REAGENT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="0.1"
                    value={massA}
                    onChange={(e) => setMassA(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-base font-bold"
                  />
                  <span className="text-xs text-slate-400 font-bold">g</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Moles: <span className="text-cyan-300 font-bold">{molesA.toFixed(3)} mol</span> (n / coeff = {ratioA.toFixed(3)})
                </div>
              </div>

              {/* Reactant B Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedReaction.reactantB.color }} />
                    <span>Reactant B: {selectedReaction.reactantB.name}</span>
                  </span>
                  {limitingReagent === "B" && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700/60 animate-pulse">
                      LIMITING REAGENT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="0.1"
                    value={massB}
                    onChange={(e) => setMassB(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-base font-bold"
                  />
                  <span className="text-xs text-slate-400 font-bold">g</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Moles: <span className="text-cyan-300 font-bold">{molesB.toFixed(3)} mol</span> (n / coeff = {ratioB.toFixed(3)})
                </div>
              </div>
            </div>

            {/* Results Output Banner */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Reaction Outcome & Yield Calculations</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Limiting Reagent:</span>
                  <span className="text-rose-400 font-bold text-sm block">
                    {limitingReagent === "A"
                      ? selectedReaction.reactantA.formula
                      : limitingReagent === "B"
                      ? selectedReaction.reactantB.formula
                      : "Stochiometric Exact Ratio!"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Excess Reactant Remaining:</span>
                  <span className="text-amber-300 font-bold text-sm block">
                    {limitingReagent === "A"
                      ? `${(molesBRemaining * selectedReaction.reactantB.molarMass).toFixed(2)}g of ${selectedReaction.reactantB.formula}`
                      : limitingReagent === "B"
                      ? `${(molesARemaining * selectedReaction.reactantA.molarMass).toFixed(2)}g of ${selectedReaction.reactantA.formula}`
                      : "0g (Fully Consumed)"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Product Formed ({selectedReaction.productC.formula}):</span>
                  <span className="text-emerald-300 font-bold text-sm block">
                    {massCFormed.toFixed(2)} g ({molesCFormed.toFixed(3)} mol)
                  </span>
                </div>
              </div>

              {/* Visual Reaction Animation Canvas */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Post-Reaction Particle Mixture Visualizer:
                </span>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={180}
                  className="w-full rounded-xl bg-[#04070d] border border-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Limiting Reagent JEE Rule</span>
              </div>
              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                Divide the number of initial moles of each reactant by its stoichiometric coefficient in the balanced equation ($n_i / a_i$). The reactant with the <strong>SMALLEST</strong> ratio is the Limiting Reagent!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
