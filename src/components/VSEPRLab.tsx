import React, { useState } from "react";
import {
  Zap,
  Box,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { VSEPR_CONFIGS } from "../data/chemistryData";
import { VSEPRDomainConfig } from "../types/chemistry";

export const VSEPRLab: React.FC = () => {
  const [totalDomains, setTotalDomains] = useState<number>(4);
  const [lonePairCount, setLonePairCount] = useState<number>(1);

  // Filter configurations matching domainsCount
  const matchingConfigs = VSEPR_CONFIGS.filter(
    (c) => c.domainsCount === totalDomains
  );

  const activeConfig: VSEPRDomainConfig =
    matchingConfigs.find((c) => c.lonePairs === lonePairCount) ||
    matchingConfigs[0] ||
    VSEPR_CONFIGS[0];

  const maxLonePairs = Math.max(...matchingConfigs.map((c) => c.lonePairs), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-cyan-400" />
            <span>VSEPR Molecular Geometry Simulator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Valence Shell Electron Pair Repulsion Theory • Simulate lone pair repulsions and shape distortions.
          </p>
        </div>

        {/* Domain Count Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Total Domains (Steric Number):
          </span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setTotalDomains(num);
                  setLonePairCount(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  totalDomains === num
                    ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                SN = {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Controls & Canvas (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 relative shadow-2xl space-y-6">
          {/* Slider Controls Bar */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Lone Pair Count (LP)
              </span>
              <span className="text-xs font-bold text-pink-400 bg-pink-950/80 px-2.5 py-0.5 rounded border border-pink-800/60">
                {lonePairCount} Lone Pair{lonePairCount !== 1 ? "s" : ""}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={maxLonePairs}
              value={lonePairCount}
              onChange={(e) => setLonePairCount(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>0 LP (Ideal Geometry)</span>
              <span>
                BP = {totalDomains - lonePairCount}, LP = {lonePairCount}
              </span>
              <span>{maxLonePairs} LP (Max Distortion)</span>
            </div>
          </div>

          {/* Geometry Visual Representation Card */}
          <div className="w-full h-[320px] rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden text-center space-y-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[2px] shadow-2xl shadow-cyan-500/20 animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-2">
                <Box className="w-8 h-8 text-cyan-400 mb-1" />
                <span className="text-xs font-extrabold text-white">
                  {activeConfig.molecularGeometry}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white">
                {activeConfig.molecularGeometry}
              </h2>
              <span className="text-xs text-amber-300 font-bold bg-amber-950/80 border border-amber-800/60 px-3 py-1 rounded-xl inline-block mt-2">
                Bond Angle: {activeConfig.actualBondAngle}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              Electron Pair Geometry: <strong className="text-cyan-300">{activeConfig.electronGeometry}</strong>
            </p>
          </div>

          {/* VSEPR Repulsion Order Formula Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-400 font-medium">Repulsion Strength Order:</span>
            <div className="flex items-center gap-2 font-bold font-mono text-cyan-300">
              <span className="text-pink-400">LP - LP</span>
              <span>&gt;</span>
              <span className="text-amber-300">LP - BP</span>
              <span>&gt;</span>
              <span className="text-blue-300">BP - BP</span>
            </div>
          </div>
        </div>

        {/* Specifications & Examples (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Configuration Matrix */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white">
              VSEPR Domain Analysis
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Steric Number (BP + LP):</span>
                <span className="text-cyan-300 font-extrabold">{totalDomains}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Bonding Pairs (BP):</span>
                <span className="text-blue-300 font-bold">{activeConfig.bondingPairs}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Lone Pairs (LP):</span>
                <span className="text-pink-400 font-bold">{activeConfig.lonePairs}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Electron Geometry:</span>
                <span className="text-indigo-300 font-bold">{activeConfig.electronGeometry}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Molecular Geometry:</span>
                <span className="text-amber-300 font-bold">{activeConfig.molecularGeometry}</span>
              </div>
            </div>
          </div>

          {/* Molecule Examples */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Matching Molecules</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {(activeConfig.exampleMolecules || []).map((ex, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-300 shadow-sm"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* JEE Repulsion Note */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>VSEPR Key Rule</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              {activeConfig.jeeExamNotes ||
                "In trigonal bipyramidal (SN = 5), lone pairs ALWAYS occupy equatorial positions to minimize 90° lone pair - bond pair repulsions!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
