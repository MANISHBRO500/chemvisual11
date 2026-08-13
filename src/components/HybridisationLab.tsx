import React, { useState } from "react";
import {
  Compass,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
  Box,
} from "lucide-react";
import { HYBRIDISATION_CONFIGS } from "../data/chemistryData";
import { HybridisationConfig } from "../types/chemistry";

export const HybridisationLab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<"sp" | "sp2" | "sp3" | "sp3d" | "sp3d2">("sp3");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const currentConfig: HybridisationConfig =
    HYBRIDISATION_CONFIGS.find((h) => h.type === selectedType) || HYBRIDISATION_CONFIGS[2];

  const handleStartAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentConfig.stepAnimation.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Compass className="w-8 h-8 text-cyan-400" />
            <span>Interactive Hybridisation Simulator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simulate intermixing of s, p, and d atomic orbitals to form degenerate hybrid lobes.
          </p>
        </div>

        {/* Type Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {HYBRIDISATION_CONFIGS.map((config) => (
            <button
              key={config.type}
              onClick={() => {
                setSelectedType(config.type);
                setActiveStep(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === config.type
                  ? "bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {config.type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage & Step Animation Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Orbital Mixing Visualizer Stage (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 relative shadow-2xl space-y-6">
          {/* Top Math Equation Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                Orbital Conservation Equation
              </span>
              <div className="text-base font-extrabold text-white font-mono mt-0.5">
                {currentConfig.sCount > 0 && `(${currentConfig.sCount}) s `}
                {currentConfig.pCount > 0 && `+ (${currentConfig.pCount}) p `}
                {currentConfig.dCount > 0 && `+ (${currentConfig.dCount}) d `}
                <span className="text-cyan-400">
                  = {currentConfig.sCount + currentConfig.pCount + currentConfig.dCount} {currentConfig.type} Hybrid Orbitals
                </span>
              </div>
            </div>

            <button
              onClick={handleStartAnimation}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAnimating ? "Mixing Orbitals..." : "Animate Orbital Mixing"}</span>
            </button>
          </div>

          {/* Visual Transformation Canvas */}
          <div className="w-full h-[320px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around p-6 relative overflow-hidden">
            {/* Unmixed Atomic Orbitals */}
            <div className="text-center space-y-3 z-10">
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Initial Atomic Orbitals
              </span>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-12 h-12 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xs shadow-lg shadow-cyan-500/20 animate-pulse">
                  2s
                </div>
                {Array.from({ length: currentConfig.pCount }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-16 rounded-full bg-blue-950 border-2 border-blue-400 flex items-center justify-center text-blue-300 font-bold text-xs"
                  >
                    2p
                  </div>
                ))}
                {Array.from({ length: currentConfig.dCount }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rotate-45 bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 font-bold text-xs"
                  >
                    3d
                  </div>
                ))}
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="flex flex-col items-center gap-1 z-10">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
                Hybridise
              </span>
              <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>

            {/* Resulting Degenerate Hybrid Lobes */}
            <div className="text-center space-y-3 z-10">
              <span className="text-xs font-bold text-cyan-300 block uppercase">
                {currentConfig.geometry} Geometry ({currentConfig.angle})
              </span>
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 opacity-20 animate-ping absolute" />
                <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex flex-col items-center justify-center p-2 shadow-2xl">
                  <Compass className="w-8 h-8 text-cyan-400 mb-1" />
                  <span className="text-xs font-extrabold text-white">
                    {currentConfig.sCount + currentConfig.pCount + currentConfig.dCount} {currentConfig.type}
                  </span>
                  <span className="text-[10px] text-cyan-300 font-semibold">
                    {currentConfig.angle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Walkthrough Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Step-by-Step Mixing Mechanism
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {currentConfig.stepAnimation.map((stepItem, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                        {stepItem.step}
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        {stepItem.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Specifications & Examples (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Hybridisation Details Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">
                {currentConfig.type} Hybridisation
              </h2>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-xl">
                {currentConfig.angle}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Spatial Geometry:</span>
                <span className="text-amber-300 font-bold">{currentConfig.geometry}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Orbitals Mixed:</span>
                <span className="text-cyan-300 font-semibold font-mono">
                  {currentConfig.orbitalsMixed.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Real Molecular Examples */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Textbook Molecular Examples</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {currentConfig.examples.map((ex, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-300 shadow-sm"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* JEE Key Takeaway */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>JEE Exam Rule</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              In {currentConfig.type} hybridisation, all {currentConfig.sCount + currentConfig.pCount + currentConfig.dCount} hybrid orbitals are completely equivalent in shape, size, and energy, pointing in directions that minimize repulsion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
