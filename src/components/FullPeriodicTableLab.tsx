import React, { useState } from "react";
import {
  Search,
  Filter,
  Atom,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
  Zap,
  X,
  Maximize2,
} from "lucide-react";
import {
  ALL_118_ELEMENTS,
  CATEGORY_MAP,
  FullElement,
} from "../data/all118Elements";

export const FullPeriodicTableLab: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("Ru");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Find currently selected element (default Ruthenium Ru #44)
  const activeElement =
    ALL_118_ELEMENTS.find((e) => e.symbol === selectedSymbol) ||
    ALL_118_ELEMENTS[43]; // 44th element (index 43)

  const activeIndex = ALL_118_ELEMENTS.findIndex(
    (e) => e.symbol === activeElement.symbol
  );

  const handlePrev = () => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : ALL_118_ELEMENTS.length - 1;
    setSelectedSymbol(ALL_118_ELEMENTS[prevIdx].symbol);
  };

  const handleNext = () => {
    const nextIdx = activeIndex < ALL_118_ELEMENTS.length - 1 ? activeIndex + 1 : 0;
    setSelectedSymbol(ALL_118_ELEMENTS[nextIdx].symbol);
  };

  // Helper to retrieve element by atomic number
  const getElementByNum = (num: number): FullElement | undefined => {
    return ALL_118_ELEMENTS.find((e) => e.number === num);
  };

  // Filter elements based on search query
  const matchesSearch = (elem: FullElement): boolean => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      elem.symbol.toLowerCase().includes(q) ||
      elem.name.toLowerCase().includes(q) ||
      elem.number.toString().includes(q) ||
      elem.category.toLowerCase().includes(q)
    );
  };

  // Main 7 periods x 18 groups layout generator
  const renderMainGrid = () => {
    const rows = [];

    for (let p = 1; p <= 7; p++) {
      const cols = [];
      for (let g = 1; g <= 18; g++) {
        // Handle special placeholders for Lanthanides (Period 6, Group 3) & Actinides (Period 7, Group 3)
        if (p === 6 && g === 3) {
          cols.push(
            <div
              key="lanthanoid-placeholder"
              className="p-1 sm:p-2 rounded-lg border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col items-center justify-center text-[10px] sm:text-xs font-mono text-fuchsia-300 font-bold hover:bg-fuchsia-900/40 cursor-pointer transition-all min-h-[58px] sm:min-h-[68px]"
              title="Lanthanoids 57-71"
              onClick={() => setSelectedSymbol("La")}
            >
              <span className="text-[9px] text-fuchsia-400/80">57-71</span>
              <span className="text-[10px] hidden sm:inline text-fuchsia-200">Lanthanoids</span>
            </div>
          );
          continue;
        }

        if (p === 7 && g === 3) {
          cols.push(
            <div
              key="actinoid-placeholder"
              className="p-1 sm:p-2 rounded-lg border border-purple-500/40 bg-purple-950/20 flex flex-col items-center justify-center text-[10px] sm:text-xs font-mono text-purple-300 font-bold hover:bg-purple-900/40 cursor-pointer transition-all min-h-[58px] sm:min-h-[68px]"
              title="Actinoids 89-103"
              onClick={() => setSelectedSymbol("Ac")}
            >
              <span className="text-[9px] text-purple-400/80">89-103</span>
              <span className="text-[10px] hidden sm:inline text-purple-200">Actinoids</span>
            </div>
          );
          continue;
        }

        // Find element matching Period p & Group g (excluding lanthanides 57-71 & actinides 89-103)
        const elem = ALL_118_ELEMENTS.find(
          (e) =>
            e.period === p &&
            e.group === g &&
            !(e.number >= 57 && e.number <= 71) &&
            !(e.number >= 89 && e.number <= 103)
        );

        if (!elem) {
          // Empty slot in grid
          cols.push(<div key={`empty-${p}-${g}`} className="min-h-[58px] sm:min-h-[68px]" />);
        } else {
          cols.push(renderElementTile(elem));
        }
      }

      rows.push(
        <div key={`period-${p}`} className="grid grid-cols-18 gap-1.5 min-w-[980px]">
          {cols}
        </div>
      );
    }

    return rows;
  };

  // Render individual element tile
  const renderElementTile = (elem: FullElement) => {
    const isSelected = activeElement.symbol === elem.symbol;
    const cat = CATEGORY_MAP[elem.category] || CATEGORY_MAP.unknown;
    const isHighlighted = matchesSearch(elem);
    const isFilteredOut =
      activeCategoryFilter !== null && activeCategoryFilter !== elem.category;

    // Check if this tile should be rendered in enlarged Bohr mode in-place (like Ru in Image 1)
    if (isSelected) {
      return (
        <div
          key={elem.symbol}
          onClick={() => setSelectedSymbol(elem.symbol)}
          className={`relative p-1.5 sm:p-2.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-2xl z-20 overflow-hidden bg-[#090e18] ${
            cat.borderColor
          } ${cat.glowColor} ring-2 ring-cyan-400 scale-[1.03] min-h-[64px] sm:min-h-[72px]`}
        >
          {/* Subtle animated Bohr Orbit background in tile */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
            <div className="w-12 h-12 rounded-full border border-cyan-400 animate-spin" />
            <div className="absolute w-8 h-8 rounded-full border border-amber-400 animate-ping" />
          </div>

          <div className="flex items-start justify-between text-[9px] sm:text-[10px] font-mono leading-none z-10">
            <span className="font-extrabold text-white text-[10px] sm:text-xs">
              {elem.number}
            </span>
            {/* Shell numbers listed on the right */}
            <div className="flex flex-col text-[8px] sm:text-[9px] font-mono font-bold text-slate-300 leading-tight text-right">
              {elem.shells.map((s, idx) => (
                <span key={idx}>{s}</span>
              ))}
            </div>
          </div>

          <div className="text-center my-0.5 z-10">
            <span className={`text-base sm:text-xl font-black tracking-tight ${cat.color}`}>
              {elem.symbol}
            </span>
            <span className="block text-[8px] sm:text-[9px] font-medium text-slate-200 truncate max-w-[58px] sm:max-w-[70px] mx-auto leading-none mt-0.5">
              {elem.name}
            </span>
          </div>

          <div className="text-center text-[8px] sm:text-[9px] font-mono text-slate-300 z-10 leading-none">
            {elem.atomicMass}
          </div>
        </div>
      );
    }

    return (
      <div
        key={elem.symbol}
        onClick={() => setSelectedSymbol(elem.symbol)}
        className={`p-1 sm:p-1.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between hover:scale-105 shadow-sm min-h-[58px] sm:min-h-[68px] ${
          cat.bgColor
        } ${cat.borderColor} ${
          isFilteredOut || !isHighlighted ? "opacity-25 grayscale" : "opacity-100 hover:z-10"
        }`}
      >
        <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400 leading-none">
          <span>{elem.number}</span>
        </div>

        <div className="text-center my-0.5">
          <span className={`text-xs sm:text-base font-extrabold ${cat.color}`}>
            {elem.symbol}
          </span>
          <span className="block text-[7px] sm:text-[8px] font-medium text-slate-300 truncate max-w-[48px] sm:max-w-[62px] mx-auto leading-none">
            {elem.name}
          </span>
        </div>

        <div className="text-center text-[7px] sm:text-[8px] font-mono text-slate-400 leading-none">
          {elem.atomicMass}
        </div>
      </div>
    );
  };

  // Render Lanthanoids (57-71) row
  const renderLanthanoids = () => {
    const lanths = ALL_118_ELEMENTS.filter(
      (e) => e.number >= 57 && e.number <= 71
    );
    return (
      <div className="grid grid-cols-15 gap-1.5 min-w-[820px]">
        {lanths.map((e) => renderElementTile(e))}
      </div>
    );
  };

  // Render Actinoids (89-103) row
  const renderActinoids = () => {
    const acts = ALL_118_ELEMENTS.filter(
      (e) => e.number >= 89 && e.number <= 103
    );
    return (
      <div className="grid grid-cols-15 gap-1.5 min-w-[820px]">
        {acts.map((e) => renderElementTile(e))}
      </div>
    );
  };

  const activeCatObj =
    CATEGORY_MAP[activeElement.category] || CATEGORY_MAP.unknown;

  return (
    <div className="space-y-6 pb-20 relative">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Atom className="w-8 h-8 text-cyan-400 animate-spin" />
            <span>Complete 118-Element Periodic Table</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            All 118 elements organized by Periods 1–7 and Groups 1–18, featuring live electron shells and Bohr orbits.
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search symbol, name, #44..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Inspect {activeElement.symbol}</span>
          </button>
        </div>
      </div>

      {/* Category Legends Bar (Top Legend like Image 1 & 2) */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-wider mr-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>Categories:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {Object.values(CATEGORY_MAP).map((cat) => {
            const isActive = activeCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategoryFilter(isActive ? null : cat.id)
                }
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                  cat.bgColor
                } ${cat.borderColor} ${cat.color} ${
                  isActive ? "ring-2 ring-white scale-105 shadow-lg" : "hover:scale-105"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {activeCategoryFilter && (
            <button
              onClick={() => setActiveCategoryFilter(null)}
              className="px-2 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-[11px] font-bold border border-slate-700"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Main 18-Column Periodic Table Scroll Container */}
      <div className="overflow-x-auto pb-4 pt-1 rounded-2xl border border-slate-800/80 bg-[#060911] p-3 sm:p-5 shadow-2xl">
        <div className="space-y-1.5 min-w-[980px]">
          {/* Group Column Numbers (1 to 18) */}
          <div className="grid grid-cols-18 gap-1.5 text-center text-[10px] font-mono text-slate-500 font-bold pb-1 border-b border-slate-800/60">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Render All 7 Main Periods */}
          {renderMainGrid()}

          {/* Lanthanoids & Actinoids Section Below */}
          <div className="pt-6 mt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-2">
              <span className="text-fuchsia-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                Lanthanoids (Elements 57 - 71)
              </span>
              <span className="text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Actinoids (Elements 89 - 103)
              </span>
            </div>

            {/* Lanthanoid Row */}
            <div className="pl-[11%]">
              {renderLanthanoids()}
            </div>

            {/* Actinoid Row */}
            <div className="pl-[11%]">
              {renderActinoids()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Active Element Bar at Bottom */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-slate-950 border-2 ${activeCatObj.borderColor} flex items-center justify-center text-2xl font-black ${activeCatObj.color} shadow-lg`}>
            {activeElement.symbol}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">
                {activeElement.name}
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${activeCatObj.borderColor} ${activeCatObj.bgColor} ${activeCatObj.color}`}>
                {activeCatObj.label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
              <span>Atomic Number (Z) = <strong className="text-cyan-300">{activeElement.number}</strong></span>
              <span>•</span>
              <span>Atomic Mass = <strong className="text-amber-300">{activeElement.atomicMass} u</strong></span>
              <span>•</span>
              <span>Bohr Shells = <strong className="text-emerald-300">{activeElement.shells.join(", ")}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Atom className="w-4 h-4" />
            <span>View Full Bohr Orbit</span>
          </button>

          <button
            onClick={handleNext}
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal View for Selected Element Bohr Model */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080c14] border-2 border-cyan-500/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-slate-950 border-2 ${activeCatObj.borderColor} flex flex-col items-center justify-center shadow-xl`}>
                  <span className={`text-2xl font-black ${activeCatObj.color}`}>
                    {activeElement.symbol}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    #{activeElement.number}
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-white">
                    {activeElement.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-mono text-cyan-300 font-bold">
                      Z = {activeElement.number}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-amber-300 font-bold">
                      Mass = {activeElement.atomicMass} u
                    </span>
                    <span>•</span>
                    <span className={`uppercase font-semibold ${activeCatObj.color}`}>
                      {activeCatObj.label}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Revolving Bohr Atomic Orbit Graphics */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative space-y-3 min-h-[280px]">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Atom className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Revolving Bohr Shell Electrons</span>
              </span>

              {/* Animated Bohr Orbits */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Nucleus */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 border-2 border-white shadow-xl shadow-amber-500/40 z-10 flex flex-col items-center justify-center text-[9px] font-extrabold text-slate-950 leading-tight animate-pulse">
                  <span>+{activeElement.number}p</span>
                  <span className="opacity-80 text-[8px]">
                    {Math.round(parseFloat(activeElement.atomicMass) || activeElement.number * 2) - activeElement.number}n
                  </span>
                </div>

                {/* Shells */}
                {activeElement.shells.map((count, shellIdx) => {
                  const radius = 40 + shellIdx * 22;
                  const duration = 5 + shellIdx * 2.5;

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
                      {Array.from({ length: count }).map((_, eIdx) => {
                        const angle = (360 / count) * eIdx;
                        const rad = (angle * Math.PI) / 180;
                        const x = radius * Math.cos(rad);
                        const y = radius * Math.sin(rad);

                        return (
                          <div
                            key={eIdx}
                            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300 border border-white shadow-md shadow-cyan-400/80"
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
                    {activeElement.shells
                      .map((c, i) => `n=${i + 1} (${c} e⁻)`)
                      .join(" • ")}
                  </span>
                </div>
                {activeElement.configuration && (
                  <div className="text-[11px] text-slate-400">
                    Subshell Configuration:{" "}
                    <strong className="text-amber-300">
                      {activeElement.configuration}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Period:</span>
                <span className="text-cyan-300 font-bold text-sm">
                  Period {activeElement.period}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Group:</span>
                <span className="text-amber-300 font-bold text-sm">
                  Group {activeElement.group || "3 (f-block)"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Block:</span>
                <span className="text-emerald-300 font-bold text-sm uppercase">
                  {activeElement.block || "s/p/d/f"}-block
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Total Shells:</span>
                <span className="text-fuchsia-300 font-bold text-sm">
                  {activeElement.shells.length} Orbits
                </span>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Element</span>
              </button>

              <button
                onClick={handleNext}
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
