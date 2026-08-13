import React, { useState, useEffect, useRef } from "react";
import {
  Thermometer,
  Zap,
  Box,
  Layers,
  Sparkles,
  Info,
  Flame,
  Snowflake,
  CheckCircle2,
  HelpCircle,
  Calculator,
  RotateCcw,
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

interface SubstanceConfig {
  name: string;
  formula: string;
  meltingPt: number; // in Celsius
  boilingPt: number; // in Celsius
  colorSolid: string;
  colorLiquid: string;
  colorGas: string;
}

const SUBSTANCES: SubstanceConfig[] = [
  {
    name: "Water",
    formula: "H₂O",
    meltingPt: 0,
    boilingPt: 100,
    colorSolid: "#818cf8",
    colorLiquid: "#38bdf8",
    colorGas: "#f43f5e",
  },
  {
    name: "Nitrogen",
    formula: "N₂",
    meltingPt: -210,
    boilingPt: -196,
    colorSolid: "#a855f7",
    colorLiquid: "#3b82f6",
    colorGas: "#10b981",
  },
  {
    name: "Ethanol",
    formula: "C₂H₅OH",
    meltingPt: -114,
    boilingPt: 78,
    colorSolid: "#6366f1",
    colorLiquid: "#06b6d4",
    colorGas: "#f59e0b",
  },
  {
    name: "Mercury",
    formula: "Hg",
    meltingPt: -39,
    boilingPt: 357,
    colorSolid: "#94a3b8",
    colorLiquid: "#cbd5e1",
    colorGas: "#eab308",
  },
  {
    name: "Oxygen",
    formula: "O₂",
    meltingPt: -218.8,
    boilingPt: -183,
    colorSolid: "#c084fc",
    colorLiquid: "#60a5fa",
    colorGas: "#fb7185",
  },
];

export const StatesOfMatterLab: React.FC<{ initialSubtab?: "states" | "substances" | "faulty" }> = ({
  initialSubtab = "states",
}) => {
  // Temperature in Celsius (-273.15 to 500°C)
  const [tempCelsius, setTempCelsius] = useState<number>(25);
  const [selectedSubstance, setSelectedSubstance] = useState<SubstanceConfig>(SUBSTANCES[0]);
  const [matterCategory, setMatterCategory] = useState<"states" | "substances" | "faulty">(initialSubtab);
  const [substanceType, setSubstanceType] = useState<"element" | "compound" | "homo_mixture" | "hetero_mixture">("element");

  // Keep matterCategory in sync if initialSubtab prop changes
  useEffect(() => {
    setMatterCategory(initialSubtab);
  }, [initialSubtab]);

  // Faulty Thermometer Simulator State
  const [lfpX, setLfpX] = useState<number>(5);     // Lower Fixed Point on scale X (Melting Ice)
  const [ufpX, setUfpX] = useState<number>(95);    // Upper Fixed Point on scale X (Steam Point)
  const [readX, setReadX] = useState<number>(41);   // Reading on scale X

  // True temperatures calculated from faulty thermometer equation: (T_X - LFP_X) / (UFP_X - LFP_X) = T_C / 100
  const denX = ufpX - lfpX === 0 ? 1 : ufpX - lfpX;
  const trueCelsius = +(((readX - lfpX) / denX) * 100).toFixed(2);
  const trueFahrenheit = +((trueCelsius * 9) / 5 + 32).toFixed(2);
  const trueKelvin = +(trueCelsius + 273.15).toFixed(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Temperature in Kelvin and Fahrenheit
  const safeTemp = isNaN(tempCelsius) ? 25 : tempCelsius;
  const tempKelvin = +(safeTemp + 273.15).toFixed(2);
  const tempFahrenheit = +((safeTemp * 9) / 5 + 32).toFixed(2);
  const tempRankine = +((safeTemp + 273.15) * 1.8).toFixed(2);

  // Phase Determination based on selected substance melting & boiling points
  let phase: "SOLID" | "LIQUID" | "GAS" | "PLASMA" = "LIQUID";
  if (safeTemp < selectedSubstance.meltingPt) {
    phase = "SOLID";
  } else if (safeTemp >= selectedSubstance.boilingPt && safeTemp < 2000) {
    phase = "GAS";
  } else if (safeTemp >= 2000) {
    phase = "PLASMA";
  } else {
    phase = "LIQUID";
  }

  // Initialize Particles
  const initParticles = (width: number, height: number) => {
    const count = 36;
    const newParticles: Particle[] = [];
    const cols = 6;

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const baseX = (width / (cols + 1)) * (col + 1);
      const baseY = height - 25 - row * 20;

      newParticles.push({
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        baseX,
        baseY,
      });
    }

    particlesRef.current = newParticles;
  };

  // Re-initialize particles when tab switches or component mounts
  useEffect(() => {
    if (matterCategory !== "states") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    initParticles(canvas.width || 340, canvas.height || 200);
  }, [matterCategory]);

  // Animation Loop for Particle Motion
  useEffect(() => {
    if (matterCategory !== "states") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width || 340;
      const height = canvas.height || 200;

      if (!particlesRef.current || particlesRef.current.length === 0) {
        initParticles(width, height);
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Container Box
      ctx.strokeStyle =
        phase === "SOLID"
          ? "#6366f1"
          : phase === "LIQUID"
          ? "#38bdf8"
          : phase === "GAS"
          ? "#f43f5e"
          : "#eab308";
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Absolute Kelvin temperature factor. Exactly 0 at Absolute Zero (0 Kelvin / -273.15°C)
      const kelvinVal = Math.max(0, safeTemp + 273.15);
      const tempFactor = kelvinVal / 298.15; // 1.0 at 25°C Room Temp

      particlesRef.current.forEach((p) => {
        if (kelvinVal <= 0.01) {
          // Absolute Zero: Particles are completely frozen motionless at lattice sites
          p.x = p.baseX;
          p.y = p.baseY;
          ctx.fillStyle = "#334155"; // Dull slate frozen
        } else if (phase === "SOLID") {
          // Solid: Vibrating around fixed lattice points, vibration proportional to temperature factor
          const vibrate = Math.min(6, 1.2 * tempFactor);
          p.x = p.baseX + (Math.random() - 0.5) * vibrate;
          p.y = p.baseY + (Math.random() - 0.5) * vibrate;
          ctx.fillStyle = selectedSubstance.colorSolid;
        } else if (phase === "LIQUID") {
          // Liquid: Fluid motion confined to bottom region
          p.x += p.vx * tempFactor * 1.2;
          p.y += p.vy * tempFactor * 0.8;

          // Liquid boundaries
          if (p.x < 22 || p.x > width - 22) p.vx *= -1;
          if (p.y < height / 2 || p.y > height - 22) p.vy *= -1;

          ctx.fillStyle = selectedSubstance.colorLiquid;
        } else if (phase === "GAS") {
          // Gas: High velocity random bouncing across full volume
          p.x += p.vx * Math.min(8, tempFactor * 2.5);
          p.y += p.vy * Math.min(8, tempFactor * 2.5);

          if (p.x < 22 || p.x > width - 22) p.vx *= -1;
          if (p.y < 22 || p.y > height - 22) p.vy *= -1;

          ctx.fillStyle = selectedSubstance.colorGas;
        } else {
          // Plasma: Ionized high energy glowing particles
          p.x += p.vx * 7;
          p.y += p.vy * 7;

          if (p.x < 22 || p.x > width - 22) p.vx *= -1;
          if (p.y < 22 || p.y > height - 22) p.vy *= -1;

          ctx.fillStyle = "#f59e0b";
        }

        // Draw particle sphere
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Particle Outer Glow
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [safeTemp, phase, selectedSubstance, matterCategory]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-cyan-400" />
            <span>States of Matter & Thermometer Lab</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore particulate kinetics in Solids, Liquids, and Gases with real-time temperature conversions, multi-substance phase transitions, and faulty thermometer calibration simulator.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMatterCategory("states")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              matterCategory === "states"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            States & Thermometer
          </button>
          <button
            onClick={() => setMatterCategory("faulty")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              matterCategory === "faulty"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Faulty Thermometer Calculator
          </button>
          <button
            onClick={() => setMatterCategory("substances")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              matterCategory === "substances"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pure Substances vs Mixtures
          </button>
        </div>
      </div>

      {matterCategory === "states" && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Main Controls & Thermometer Column (8 Columns) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 relative shadow-2xl space-y-6">
            {/* Substance Selector Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>Select Target Substance:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {SUBSTANCES.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      setSelectedSubstance(sub);
                      setTempCelsius(25);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedSubstance.name === sub.name
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {sub.name} ({sub.formula})
                  </button>
                ))}
              </div>
            </div>

            {/* Thermometer & Particle Visual */}
            <div className="grid sm:grid-cols-12 gap-6 items-center">
              {/* Thermometer Graphic */}
              <div className="sm:col-span-4 rounded-2xl bg-slate-950 border border-slate-800 p-5 flex flex-col items-center justify-between text-center space-y-4">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                  Interactive Thermometer
                </span>

                {/* Thermometer Tube Graphic */}
                <div className="relative w-14 h-60 bg-slate-900 border-2 border-slate-700 rounded-full flex flex-col justify-end p-1 items-center shadow-inner overflow-hidden">
                  {/* Tick Marks on Tube */}
                  <div className="absolute inset-y-4 left-1.5 flex flex-col justify-between text-[8px] font-mono text-slate-500 pointer-events-none">
                    <span>500°C</span>
                    <span>{selectedSubstance.boilingPt}°C (BP)</span>
                    <span>{selectedSubstance.meltingPt}°C (MP)</span>
                    <span>0 K (-273°C)</span>
                  </div>

                  {/* Mercury Fill Bar */}
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      tempCelsius >= selectedSubstance.boilingPt
                        ? "bg-gradient-to-t from-rose-600 via-amber-500 to-red-500"
                        : tempCelsius >= selectedSubstance.meltingPt
                        ? "bg-gradient-to-t from-blue-600 via-cyan-400 to-amber-400"
                        : "bg-gradient-to-t from-indigo-800 via-blue-600 to-cyan-300"
                    }`}
                    style={{
                      height: `${Math.min(
                        100,
                        Math.max(0, ((tempCelsius + 273.15) / 773.15) * 100)
                      )}%`,
                    }}
                  />
                  {/* Bulb at base */}
                  <div className="w-11 h-11 rounded-full bg-cyan-400 border-2 border-slate-900 absolute -bottom-1 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-slate-950 animate-pulse" />
                  </div>
                </div>

                {/* Temperature Readings in Multiple Scales */}
                <div className="space-y-1 font-mono text-center">
                  <div className="text-2xl font-black text-white">
                    {tempCelsius.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-cyan-300 font-bold">
                    {tempKelvin} K
                  </div>
                  <div className="text-xs text-amber-300 font-bold">
                    {tempFahrenheit}°F
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">
                    {tempRankine} °R
                  </div>
                </div>
              </div>

              {/* Particle Dynamics Canvas */}
              <div className="sm:col-span-8 rounded-2xl bg-slate-950 border border-slate-800 p-5 flex flex-col items-center justify-center relative space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-cyan-400" />
                    <span>Microscopic Particle Motion</span>
                  </span>
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full border ${
                      phase === "SOLID"
                        ? "bg-indigo-950 text-indigo-300 border-indigo-700/60"
                        : phase === "LIQUID"
                        ? "bg-blue-950 text-blue-300 border-blue-700/60"
                        : phase === "GAS"
                        ? "bg-rose-950 text-rose-300 border-rose-700/60 animate-pulse"
                        : "bg-amber-950 text-amber-300 border-amber-700/60 animate-pulse"
                    }`}
                  >
                    Phase: {phase}
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  width={340}
                  height={200}
                  className="rounded-xl bg-[#04070d] border border-slate-800/80 w-full"
                />

                <p className="text-[11px] text-slate-400 text-center font-mono">
                  {tempCelsius <= -273.15 && "Absolute Zero (0 K): All molecular thermal kinetic motion ceases!"}
                  {tempCelsius > -273.15 && phase === "SOLID" && `Solid ${selectedSubstance.name}: Particles vibrating in fixed crystal lattice.`}
                  {phase === "LIQUID" && `Liquid ${selectedSubstance.name}: Fluid flow slipping past adjacent molecules.`}
                  {phase === "GAS" && `Gas ${selectedSubstance.name}: High-speed random particle collisions.`}
                  {phase === "PLASMA" && `Plasma State: Superheated ionized gas particles.`}
                </p>
              </div>
            </div>

            {/* Temperature Slider & Direct Input Control */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-400" />
                  <span>Adjust Temperature (°C)</span>
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="-273.15"
                    max="500"
                    step="1"
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(parseFloat(e.target.value) || -273.15)}
                    className="w-24 bg-slate-950 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-400 text-right"
                  />
                  <span className="text-xs font-bold text-cyan-300">°C</span>
                </div>
              </div>

              <input
                type="range"
                min="-273"
                max="300"
                value={tempCelsius}
                onChange={(e) => setTempCelsius(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              {/* Temperature Preset Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <button
                  onClick={() => setTempCelsius(-273.15)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all font-semibold flex items-center gap-1 justify-center"
                >
                  <Snowflake className="w-3 h-3 text-indigo-400" />
                  0 K (-273.15°C)
                </button>
                <button
                  onClick={() => setTempCelsius(selectedSubstance.meltingPt)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all font-semibold flex items-center gap-1 justify-center"
                >
                  <Snowflake className="w-3 h-3 text-cyan-400" />
                  MP ({selectedSubstance.meltingPt}°C)
                </button>
                <button
                  onClick={() => setTempCelsius(25)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all font-semibold flex items-center gap-1 justify-center"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Room (25°C)
                </button>
                <button
                  onClick={() => setTempCelsius(selectedSubstance.boilingPt)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all font-semibold flex items-center gap-1 justify-center"
                >
                  <Flame className="w-3 h-3 text-rose-400" />
                  BP ({selectedSubstance.boilingPt}°C)
                </button>
              </div>
            </div>
          </div>

          {/* Theory & Formulas (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Temperature Conversion Scale Matrix</span>
              </h3>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Celsius to Kelvin:</span>
                  <span className="text-cyan-300 font-bold text-sm">T(K) = t(°C) + 273.15</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Celsius to Fahrenheit:</span>
                  <span className="text-amber-300 font-bold text-sm">t(°F) = (9/5) × t(°C) + 32</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Rankine Scale:</span>
                  <span className="text-emerald-300 font-bold text-sm">T(°R) = T(K) × 1.8</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-700/50 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Kinetic Molecular Theory</span>
              </div>
              <p className="text-xs text-indigo-100 font-medium leading-relaxed">
                Average Kinetic Energy of particles is directly proportional to Absolute Temperature (E_k = 1.5 · k_B · T). At Absolute Zero (0 K or -273.15°C), molecular motion strictly reaches zero!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAULTY THERMOMETER CALCULATOR VIEW */}
      {matterCategory === "faulty" && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-cyan-400" />
                  <span>Faulty Thermometer Calibration Simulator</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Solve JEE problems involving thermometers calibrated with incorrect lower (LFP) and upper (UFP) fixed points.
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {/* LFP Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Lower Fixed Point (LFP_X)
                </label>
                <span className="text-[10px] text-slate-400 block">Reading in melting ice:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={lfpX}
                    onChange={(e) => setLfpX(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 font-mono text-base font-bold"
                  />
                  <span className="text-xs font-bold text-slate-400">°X</span>
                </div>
              </div>

              {/* UFP Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Upper Fixed Point (UFP_X)
                </label>
                <span className="text-[10px] text-slate-400 block">Reading in boiling steam:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={ufpX}
                    onChange={(e) => setUfpX(parseFloat(e.target.value) || 100)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 font-mono text-base font-bold"
                  />
                  <span className="text-xs font-bold text-slate-400">°X</span>
                </div>
              </div>

              {/* Faulty Reading Input */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-2 shadow-lg shadow-cyan-500/5">
                <label className="text-xs font-bold text-cyan-300 block">
                  Faulty Reading (T_X)
                </label>
                <span className="text-[10px] text-cyan-400/80 block">Observed temperature:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={readX}
                    onChange={(e) => setReadX(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-cyan-500 rounded-xl px-3 py-2 text-cyan-300 font-mono text-xl font-black"
                  />
                  <span className="text-xs font-bold text-cyan-400">°X</span>
                </div>
              </div>
            </div>

            {/* Calculated True Temperature Output */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Calibrated True Temperature Output:
              </span>

              <div className="grid sm:grid-cols-3 gap-3 font-mono text-center">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs block">True Celsius Temperature</span>
                  <span className="text-2xl font-black text-cyan-300">{trueCelsius} °C</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs block">True Kelvin Temperature</span>
                  <span className="text-2xl font-black text-amber-300">{trueKelvin} K</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs block">True Fahrenheit Temperature</span>
                  <span className="text-2xl font-black text-emerald-300">{trueFahrenheit} °F</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-700/50 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Universal Scale Invariant Formula</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 space-y-1">
                <div>(T_X - LFP_X) / (UFP_X - LFP_X) = (T_C - 0) / 100</div>
              </div>
              <p className="text-xs text-cyan-100 font-medium leading-relaxed pt-1">
                The ratio of (Reading - LFP) to (UFP - LFP) is constant across ALL thermometric scales!
              </p>
            </div>
          </div>
        </div>
      )}

      {matterCategory === "substances" && (
        /* Pure Substances vs Mixtures Classification View */
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-6 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              <span>Classification of Matter: Pure Substances vs Mixtures</span>
            </h2>

            {/* Classification Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setSubstanceType("element")}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left space-y-1 ${
                  substanceType === "element"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="block text-sm">Element</span>
                <span className="text-[10px] opacity-75 block font-normal">Pure: Single type of atom (O₂, Au, Fe)</span>
              </button>

              <button
                onClick={() => setSubstanceType("compound")}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left space-y-1 ${
                  substanceType === "compound"
                    ? "bg-blue-500/20 text-blue-300 border-blue-500 shadow-lg shadow-blue-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="block text-sm">Compound</span>
                <span className="text-[10px] opacity-75 block font-normal">Pure: Fixed chemical ratio (H₂O, NaCl)</span>
              </button>

              <button
                onClick={() => setSubstanceType("homo_mixture")}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left space-y-1 ${
                  substanceType === "homo_mixture"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500 shadow-lg shadow-amber-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="block text-sm">Homogeneous</span>
                <span className="text-[10px] opacity-75 block font-normal">Mixture: Uniform phase (Air, Brass)</span>
              </button>

              <button
                onClick={() => setSubstanceType("hetero_mixture")}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left space-y-1 ${
                  substanceType === "hetero_mixture"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500 shadow-lg shadow-rose-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="block text-sm">Heterogeneous</span>
                <span className="text-[10px] opacity-75 block font-normal">Mixture: Distinct phases (Oil+H₂O)</span>
              </button>
            </div>

            {/* Substance Detail Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              {substanceType === "element" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-cyan-300">Elements (Pure Substance)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    An element consists of only one type of particle (atoms or homo-nuclear molecules). It cannot be broken down into simpler chemical constituents by ordinary chemical reactions.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-800 text-xs font-bold text-cyan-300">Oxygen (O₂)</span>
                    <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-800 text-xs font-bold text-cyan-300">Gold (Au)</span>
                    <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-800 text-xs font-bold text-cyan-300">Iron (Fe)</span>
                    <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-800 text-xs font-bold text-cyan-300">Helium (He)</span>
                  </div>
                </div>
              )}

              {substanceType === "compound" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-300">Compounds (Pure Substance)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When two or more atoms of different elements combine in a fixed mass ratio (Law of Definite Proportions), a compound is formed. Individual properties of constituent elements are completely transformed!
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-xl bg-blue-950 border border-blue-800 text-xs font-bold text-blue-300">Water (H₂O)</span>
                    <span className="px-3 py-1 rounded-xl bg-blue-950 border border-blue-800 text-xs font-bold text-blue-300">Sodium Chloride (NaCl)</span>
                    <span className="px-3 py-1 rounded-xl bg-blue-950 border border-blue-800 text-xs font-bold text-blue-300">Carbon Dioxide (CO₂)</span>
                  </div>
                </div>
              )}

              {substanceType === "homo_mixture" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-amber-300">Homogeneous Mixtures (Solutions)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Components mix completely and evenly throughout the entire volume with no visible boundary of separation. Variable composition physically separable by distillation/evaporation.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-800 text-xs font-bold text-amber-300">Air (N₂ + O₂ + Ar)</span>
                    <span className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-800 text-xs font-bold text-amber-300">Sugar Solution in Water</span>
                    <span className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-800 text-xs font-bold text-amber-300">Brass (Cu + Zn Alloy)</span>
                  </div>
                </div>
              )}

              {substanceType === "hetero_mixture" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-rose-300">Heterogeneous Mixtures</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Composition is not uniform throughout and different phases remain distinctly visible.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-950 border border-rose-800 text-xs font-bold text-rose-300">Oil + Water</span>
                    <span className="px-3 py-1 rounded-xl bg-rose-950 border border-rose-800 text-xs font-bold text-rose-300">Sand + Water</span>
                    <span className="px-3 py-1 rounded-xl bg-rose-950 border border-rose-800 text-xs font-bold text-rose-300">Iron Filings + Sulphur</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/50 space-y-2 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NCERT & JEE Key Rule</span>
              </div>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                Compounds can only be separated by chemical reactions, whereas Mixtures can be separated by simple physical methods (filtration, evaporation, fractional distillation).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
