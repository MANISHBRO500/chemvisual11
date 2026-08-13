import React, { useState } from "react";
import {
  Table,
  Sparkles,
  Info,
  Layers,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Atom,
} from "lucide-react";
import { PERIODIC_ELEMENTS } from "../data/chemistryData";
import { PeriodicElement } from "../types/chemistry";

// Helper function to derive shell electron distribution (K, L, M, N...) from Atomic Number Z
function getShellConfiguration(z: number): number[] {
  if (z === 1) return [1];
  if (z === 2) return [2];
  if (z <= 10) return [2, z - 2];
  if (z <= 18) return [2, 8, z - 10];
  if (z === 19) return [2, 8, 8, 1];
  if (z === 20) return [2, 8, 8, 2];
  if (z === 24) return [2, 8, 13, 1]; // Cr exception
  if (z === 29) return [2, 8, 18, 1]; // Cu exception
  if (z <= 30) return [2, 8, z - 12, 2];
  return [2, 8, 18, Math.max(1, z - 28)];
}

export const PeriodicTableLab: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<PeriodicElement>(PERIODIC_ELEMENTS[0]);
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
  const [trendMode, setTrendMode] = useState<"block" | "radius" | "electronegativity" | "ionisation">("block");

  const currentIndex = PERIODIC_ELEMENTS.findIndex((e) => e.symbol === selectedElement.symbol);

  const handlePrevElement = () => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : PERIODIC_ELEMENTS.length - 1;
    setSelectedElement(PERIODIC_ELEMENTS[prevIdx]);
  };

  const handleNextElement = () => {
    const nextIdx = currentIndex < PERIODIC_ELEMENTS.length - 1 ? currentIndex + 1 : 0;
    setSelectedElement(PERIODIC_ELEMENTS[nextIdx]);
  };

  const getBlockColor = (block: string) => {
    switch (block) {
      case "s":
        return "bg-rose-950/80 border-rose-700/60 text-rose-300";
      case "p":
        return "bg-cyan-950/80 border-cyan-700/60 text-cyan-300";
      case "d":
        return "bg-amber-950/80 border-amber-700/60 text-amber-300";
      case "f":
        return "bg-purple-950/80 border-purple-700/60 text-purple-300";
      default:
        return "bg-slate-900 border-slate-800 text-slate-300";
    }
  };

  const shells = getShellConfiguration(selectedElement.number);

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Table className="w-8 h-8 text-cyan-400" />
            <span>Interactive Periodic Table & Bohr Atomic Lab</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Click any element square to enlarge and observe live electron revolving orbits, atomic mass, and nuclear charge.
          </p>
        </div>

        {/* Trend Overlays */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Trend View:
          </span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTrendMode("block")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendMode === "block"
                  ? "bg-cyan-500 text-slate-950 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              s,p,d,f Blocks
            </button>
            <button
              onClick={() => setTrendMode("electronegativity")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendMode === "electronegativity"
                  ? "bg-cyan-500 text-slate-950 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Electronegativity
            </button>
            <button
              onClick={() => setTrendMode("radius")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendMode === "radius"
                  ? "bg-cyan-500 text-slate-950 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Atomic Radius
            </button>
          </div>
        </div>
      </div>

      {/* Grid & Details Layout */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Periodic Grid (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 shadow-2xl space-y-4 overflow-x-auto">
          {/* Elements Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 min-w-[500px]">
            {PERIODIC_ELEMENTS.map((elem) => {
              const isSelected = selectedElement.symbol === elem.symbol;
              const blockStyle = getBlockColor(elem.block);

              return (
                <div
                  key={elem.symbol}
                  onClick={() => {
                    setSelectedElement(elem);
                    setIsEnlarged(true);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:scale-110 shadow-md ${blockStyle} ${
                    isSelected ? "ring-2 ring-cyan-400 scale-105 shadow-cyan-500/30" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] opacity-75 font-mono">
                    <span>{elem.number}</span>
                    <span className="uppercase">{elem.block}</span>
                  </div>

                  <div className="text-center my-1">
                    <span className="text-lg font-extrabold block leading-none">
                      {elem.symbol}
                    </span>
                    <span className="text-[9px] truncate block opacity-80 mt-0.5">
                      {elem.name}
                    </span>
                  </div>

                  <div className="text-[9px] text-center font-mono opacity-70">
                    {trendMode === "electronegativity"
                      ? elem.electronegativity || "N/A"
                      : trendMode === "radius"
                      ? `${elem.atomicRadius}pm`
                      : `${elem.atomicMass}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Block Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-950 border border-rose-700" />
              <span className="text-slate-300 font-semibold">s-Block</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-cyan-950 border border-cyan-700" />
              <span className="text-slate-300 font-semibold">p-Block</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-950 border border-amber-700" />
              <span className="text-slate-300 font-semibold">d-Block</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-purple-950 border border-purple-700" />
              <span className="text-slate-300 font-semibold">f-Block</span>
            </div>
          </div>
        </div>

        {/* Selected Element Drawer / Bohr Model Preview (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-cyan-400 font-mono font-bold block">
                  Atomic Number #{selectedElement.number}
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  {selectedElement.name}
                </h2>
              </div>
              <button
                onClick={() => setIsEnlarged(true)}
                className="w-14 h-14 rounded-2xl bg-cyan-950 border-2 border-cyan-500 flex items-center justify-center text-2xl font-extrabold text-cyan-300 shadow-lg hover:scale-105 transition-all"
                title="Click to enlarge view"
              >
                {selectedElement.symbol}
              </button>
            </div>

            {/* Orbit Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Bohr Shell Electrons:</span>
              <span className="text-cyan-300 font-mono font-bold">
                {shells.join(" , ")} (K, L, M...)
              </span>
            </div>

            {/* Spec Table */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Electronic Config:</span>
                <span className="text-cyan-300 font-mono font-bold">
                  {selectedElement.configuration}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Atomic Mass (A):</span>
                <span className="text-slate-200 font-semibold">{selectedElement.atomicMass} u</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Electronegativity:</span>
                <span className="text-amber-300 font-bold">
                  {selectedElement.electronegativity || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950">
                <span className="text-slate-400">Atomic Radius:</span>
                <span className="text-blue-300 font-bold">{selectedElement.atomicRadius} pm</span>
              </div>
            </div>

            <button
              onClick={() => setIsEnlarged(true)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <Atom className="w-4 h-4" />
              <span>Enlarge & View Bohr Electron Orbit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Element Modal with Revolving Bohr Electron Orbits */}
      {isEnlarged && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080c14] border-2 border-cyan-500/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-cyan-300 leading-none">
                      {selectedElement.symbol}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                      #{selectedElement.number}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-white">
                    {selectedElement.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-mono text-cyan-300 font-bold">
                      Z = {selectedElement.number}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-amber-300 font-bold">
                      Atomic Mass = {selectedElement.atomicMass} u
                    </span>
                    <span>•</span>
                    <span className="uppercase text-indigo-300 font-semibold">
                      {selectedElement.block}-Block
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEnlarged(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Revolving Bohr Atomic Orbit Animation Graphic */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative space-y-3 min-h-[260px]">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Atom className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Bohr Model: Revolving Electron Orbits</span>
              </span>

              {/* Animated SVG Bohr Orbits */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Nucleus */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 border-2 border-white shadow-xl shadow-amber-500/40 z-10 flex flex-col items-center justify-center text-[9px] font-extrabold text-slate-950 leading-tight animate-pulse">
                  <span>+{selectedElement.number}p</span>
                  <span className="opacity-80 text-[8px]">
                    {Math.round(parseFloat(selectedElement.atomicMass) || selectedElement.number * 2) - selectedElement.number}n
                  </span>
                </div>

                {/* Concentric Shell Orbits */}
                {shells.map((count, shellIdx) => {
                  const radius = 45 + shellIdx * 25; // 45px, 70px, 95px, 120px...
                  const duration = 6 + shellIdx * 3; // Orbit rotation speed

                  return (
                    <div
                      key={shellIdx}
                      className="absolute rounded-full border border-cyan-500/30 flex items-center justify-center pointer-events-none"
                      style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`,
                        animation: `spin ${duration}s linear infinite`,
                      }}
                    >
                      {/* Revolving Electrons along this shell */}
                      {Array.from({ length: count }).map((_, eIdx) => {
                        const angle = (360 / count) * eIdx;
                        const rad = (angle * Math.PI) / 180;
                        const x = radius * Math.cos(rad);
                        const y = radius * Math.sin(rad);

                        return (
                          <div
                            key={eIdx}
                            className="absolute w-3 h-3 rounded-full bg-cyan-300 border border-white shadow-md shadow-cyan-400/80"
                            style={{
                              transform: `translate(${x}px, ${y}px)`,
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="text-xs font-mono text-center text-slate-300 space-y-1">
                <div>
                  Shell Configuration:{" "}
                  <span className="text-cyan-300 font-bold">
                    {shells.map((c, i) => `n=${i + 1} (${c} e⁻)`).join(" • ")}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Electronic Configuration: <strong className="text-amber-300">{selectedElement.configuration}</strong>
                </div>
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">Electronegativity:</span>
                <span className="text-amber-300 font-bold text-sm">
                  {selectedElement.electronegativity || "N/A"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">Atomic Radius:</span>
                <span className="text-blue-300 font-bold text-sm">{selectedElement.atomicRadius} pm</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">Ionisation Energy:</span>
                <span className="text-rose-300 font-bold text-sm">{selectedElement.ionisationEnergy} kJ/mol</span>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={handlePrevElement}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Element</span>
              </button>

              <button
                onClick={handleNextElement}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <span>Next Element</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

