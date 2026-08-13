import React, { useState } from "react";
import {
  Layers,
  Box,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  PenTool,
  Brain,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ALL_TOPICS } from "../data/chemistryData";
import { DiagramTopic } from "../types/chemistry";
import { NavTab } from "./Navbar";
import { StatesOfMatterLab } from "./StatesOfMatterLab";
import { MoleConceptLab } from "./MoleConceptLab";

interface DiagramLabProps {
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpen3D?: (moleculeId: string) => void;
}

export const DiagramLab: React.FC<DiagramLabProps> = ({
  selectedTopicId,
  onSelectTopic,
  setActiveTab,
  onOpen3D,
}) => {
  const currentTopic =
    ALL_TOPICS.find((t) => t.id === selectedTopicId) || ALL_TOPICS[0];

  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [highlightBridgeOnly, setHighlightBridgeOnly] = useState<boolean>(false);

  const steps = currentTopic.steps || [
    {
      stepNumber: 1,
      title: "Observe Overall Structure",
      description: "Analyze the molecular connectivity, central atom, and spatial orientation.",
    },
    {
      stepNumber: 2,
      title: "Valence & Orbital Overlap",
      description: "Examine valence electron distribution and hybrid orbital overlap.",
    },
    {
      stepNumber: 3,
      title: "Special Bonding Features",
      description: "Identify any 3c-2e banana bonds, coordinate dative bridges, or lone pair compression.",
    },
  ];

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.7), 2.2));
  };

  const renderSVGDiagram = () => {
    switch (currentTopic.svgType || currentTopic.id) {
      case "rutherford":
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full text-white select-none">
            <rect width="800" height="450" fill="#080c14" />
            <defs>
              <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Gold Foil Target */}
            <rect x="440" y="80" width="12" height="290" fill="#fbbf24" rx="3" />
            <text x="446" y="60" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
              Gold Foil (0.0004 mm)
            </text>

            {/* Alpha Emitter Source Box */}
            <rect x="50" y="190" width="80" height="70" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="8" />
            <circle cx="90" cy="225" r="12" fill="#ef4444" />
            <text x="90" y="229" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              α
            </text>
            <text x="90" y="280" textAnchor="middle" fill="#94a3b8" fontSize="12">
              α-Particle Source (He²⁺)
            </text>

            {/* Collimator Lead Plate */}
            <rect x="180" y="120" width="10" height="80" fill="#475569" />
            <rect x="180" y="250" width="10" height="80" fill="#475569" />

            {/* Alpha Trajectories */}
            {/* Straight beam (>99.9%) */}
            <path d="M 130 225 L 440 225 L 720 225" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6,4" />
            {/* Small deflection */}
            <path d="M 130 225 L 440 220 L 680 120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
            <path d="M 130 225 L 440 230 L 680 330" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Large angle deflection */}
            <path d="M 130 225 L 440 215 L 280 80" stroke="#ef4444" strokeWidth="2.5" />

            {/* Zinc Sulphide Detector Screen Ring */}
            <path d="M 300 70 A 220 220 0 0 1 700 225 A 220 220 0 0 1 300 380" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="8,6" />
            <text x="710" y="230" fill="#22c55e" fontSize="12" fontWeight="bold">
              ZnS Fluorescent Screen
            </text>

            {/* Dense Gold Nuclei */}
            <circle cx="446" cy="150" r="10" fill="#f59e0b" />
            <circle cx="446" cy="225" r="12" fill="url(#goldGlow)" />
            <circle cx="446" cy="225" r="6" fill="#ef4444" />
            <circle cx="446" cy="300" r="10" fill="#f59e0b" />

            {showLabels && (
              <>
                <text x="480" y="215" fill="#f87171" fontSize="12" fontWeight="bold">
                  Dense Positive Nuclei (+Ze)
                </text>
                <text x="560" y="110" fill="#38bdf8" fontSize="11">
                  Deflected α-particle (Coulomb Repulsion)
                </text>
                <text x="560" y="245" fill="#38bdf8" fontSize="11">
                  Un-deflected Beam (&gt;99.9%)
                </text>
              </>
            )}
          </svg>
        );

      case "bohr-levels":
      case "hydrogen-spectrum":
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full text-white select-none">
            <rect width="800" height="450" fill="#080c14" />
            {/* Energy Axis */}
            <line x1="80" y1="400" x2="80" y2="50" stroke="#64748b" strokeWidth="2" />
            <polygon points="75,55 80,40 85,55" fill="#64748b" />
            <text x="50" y="220" fill="#94a3b8" fontSize="12" transform="rotate(-90, 50, 220)">
              Energy (E_n = -13.6 / n² eV)
            </text>

            {/* Energy Level Horizontal Lines */}
            {/* n = 1 */}
            <line x1="120" y1="380" x2="720" y2="380" stroke="#f43f5e" strokeWidth="3" />
            <text x="730" y="385" fill="#f43f5e" fontSize="12" fontWeight="bold">
              n = 1 (E₁ = -13.6 eV)
            </text>

            {/* n = 2 */}
            <line x1="120" y1="260" x2="720" y2="260" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="730" y="265" fill="#38bdf8" fontSize="12" fontWeight="bold">
              n = 2 (E₂ = -3.4 eV)
            </text>

            {/* n = 3 */}
            <line x1="120" y1="180" x2="720" y2="180" stroke="#a855f7" strokeWidth="2" />
            <text x="730" y="185" fill="#a855f7" fontSize="12" fontWeight="bold">
              n = 3 (E₃ = -1.51 eV)
            </text>

            {/* n = 4 */}
            <line x1="120" y1="130" x2="720" y2="130" stroke="#10b981" strokeWidth="2" />
            <text x="730" y="135" fill="#10b981" fontSize="12" fontWeight="bold">
              n = 4 (E₄ = -0.85 eV)
            </text>

            {/* n = ∞ */}
            <line x1="120" y1="60" x2="720" y2="60" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="730" y="65" fill="#e2e8f0" fontSize="12" fontWeight="bold">
              n = ∞ (E_∞ = 0 eV)
            </text>

            {/* Transitions - Lyman Series (ends at n=1) */}
            <path d="M 200 260 L 200 380" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 230 180 L 230 380" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 260 130 L 260 380" stroke="#f43f5e" strokeWidth="2" />
            <text x="230" y="415" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="bold">
              Lyman Series (UV)
            </text>

            {/* Transitions - Balmer Series (ends at n=2) */}
            <path d="M 400 180 L 400 260" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 430 130 L 430 260" stroke="#38bdf8" strokeWidth="2" />
            <text x="415" y="295" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
              Balmer Series (Visible)
            </text>

            {/* Transitions - Paschen Series (ends at n=3) */}
            <path d="M 600 130 L 600 180" stroke="#a855f7" strokeWidth="2" />
            <text x="600" y="210" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">
              Paschen (Infrared)
            </text>
          </svg>
        );

      case "b2h6":
      default:
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full text-white select-none">
            <rect width="800" height="450" fill="#080c14" />

            {/* 3c-2e Banana Bond Clouds */}
            <path
              d="M 260 225 Q 400 110 540 225 Q 400 170 260 225 Z"
              fill={highlightBridgeOnly ? "#38bdf8" : "#0284c7"}
              fillOpacity="0.45"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <path
              d="M 260 225 Q 400 340 540 225 Q 400 280 260 225 Z"
              fill={highlightBridgeOnly ? "#38bdf8" : "#0284c7"}
              fillOpacity="0.45"
              stroke="#38bdf8"
              strokeWidth="2"
            />

            {/* Terminal B-H Bonds */}
            <line x1="260" y1="225" x2="160" y2="130" stroke="#f59e0b" strokeWidth="4" />
            <line x1="260" y1="225" x2="160" y2="320" stroke="#f59e0b" strokeWidth="4" />
            <line x1="540" y1="225" x2="640" y2="130" stroke="#f59e0b" strokeWidth="4" />
            <line x1="540" y1="225" x2="640" y2="320" stroke="#f59e0b" strokeWidth="4" />

            {/* Boron Atom 1 */}
            <circle cx="260" cy="225" r="30" fill="#d97706" stroke="#f59e0b" strokeWidth="3" />
            <text x="260" y="231" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
              B
            </text>

            {/* Boron Atom 2 */}
            <circle cx="540" cy="225" r="30" fill="#d97706" stroke="#f59e0b" strokeWidth="3" />
            <text x="540" y="231" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
              B
            </text>

            {/* Terminal Hydrogens */}
            <circle cx="160" cy="130" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
            <text x="160" y="135" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              H
            </text>

            <circle cx="160" cy="320" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
            <text x="160" y="325" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              H
            </text>

            <circle cx="640" cy="130" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
            <text x="640" y="135" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              H
            </text>

            <circle cx="640" cy="320" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
            <text x="640" y="325" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
              H
            </text>

            {/* Bridging Hydrogens */}
            <circle cx="400" cy="140" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
            <text x="400" y="145" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
              H_b
            </text>

            <circle cx="400" cy="310" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
            <text x="400" y="315" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
              H_b
            </text>

            {showLabels && (
              <>
                <text x="400" y="70" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  3-Centre-2-Electron (3c-2e) B-H-B Banana Bond
                </text>
                <text x="100" y="225" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
                  Terminal 2c-2e B-H Bonds (In Plane)
                </text>
              </>
            )}
          </svg>
        );
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Bar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <span>{currentTopic.chapterTitle}</span>
            <span>•</span>
            <span className="text-slate-400">Topic #{currentTopic.topicNumber}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{currentTopic.title}</span>
            {currentTopic.formula && (
              <span className="text-lg font-mono text-cyan-300 bg-slate-900 border border-slate-700 px-3 py-1 rounded-xl">
                {currentTopic.formula}
              </span>
            )}
          </h1>
        </div>

        {/* Quick Switch Actions & Topic Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 shadow-sm">
            <span className="text-slate-400 font-semibold hidden sm:inline">Select Topic:</span>
            <select
              value={currentTopic.id}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer max-w-[200px] sm:max-w-[280px] truncate"
            >
              {ALL_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id} className="bg-slate-900 text-slate-100">
                  #{topic.topicNumber} {topic.title}
                </option>
              ))}
            </select>
          </div>

          {currentTopic.has3DModel && (
            <button
              onClick={() => {
                if (currentTopic.modelType === "orbital") {
                  setActiveTab("orbital-lab");
                } else if (currentTopic.modelType === "vsepr") {
                  setActiveTab("vsepr-lab");
                } else if (currentTopic.modelType === "hybridisation") {
                  setActiveTab("hybridisation-lab");
                } else {
                  if (onOpen3D) {
                    onOpen3D(currentTopic.moleculeId || currentTopic.id);
                  }
                  setActiveTab("molecular-lab");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20"
            >
              <Box className="w-4 h-4" />
              <span>Open 3D Model</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("practice")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>Practice Drawing</span>
          </button>

          <button
            onClick={() => setActiveTab("ai-teacher")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 hover:text-white text-xs font-semibold transition-all"
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* Specialized Lab Views or Standard SVG Diagram View */}
      {currentTopic.svgType === "states-of-matter" || currentTopic.id === "states-of-matter-thermometer" ? (
        <StatesOfMatterLab initialSubtab="states" />
      ) : currentTopic.svgType === "classification" || currentTopic.id === "classification-of-matter" ? (
        <StatesOfMatterLab initialSubtab="substances" />
      ) : currentTopic.svgType === "mole-concept" || currentTopic.id === "mole-concept-stoichiometry" ? (
        <MoleConceptLab />
      ) : (
        /* Main Interactive Canvas Section */
        <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Interactive SVG Diagram Viewport (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-4 relative shadow-2xl overflow-hidden group">
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  showLabels
                    ? "bg-cyan-950 text-cyan-300 border-cyan-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showLabels ? "Labels Visible" : "Labels Hidden"}</span>
              </button>

              <button
                onClick={() => setHighlightBridgeOnly(!highlightBridgeOnly)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  highlightBridgeOnly
                    ? "bg-amber-950 text-amber-300 border-amber-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Highlight Special Bonds</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleZoom(-0.15)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-cyan-400 px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.15)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all ml-1 border-l border-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Container with Zoom Transform */}
          <div
            className="w-full h-[380px] sm:h-[450px] flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {renderSVGDiagram()}
          </div>

          {/* Interactive Step-by-Step Walkthrough Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-300 font-extrabold text-xs">
                {currentStepIndex + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {steps[currentStepIndex].title}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {steps[currentStepIndex].description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-mono px-1">
                {currentStepIndex + 1} / {steps.length}
              </span>
              <button
                disabled={currentStepIndex === steps.length - 1}
                onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Chemistry Explanation Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Why it Matters Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>Why It Matters</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {currentTopic.whyItMatters}
            </p>
          </div>

          {/* Key Points Checklist */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Concept Takeaways</span>
            </h3>
            <ul className="space-y-2">
              {currentTopic.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/50 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Common Exam Traps</span>
            </div>
            <ul className="space-y-1.5">
              {currentTopic.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="text-xs text-rose-200/90 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* JEE Exam Tip */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>JEE Pro Tip</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              {currentTopic.examTip}
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
