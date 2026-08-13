import React, { useRef, useState, useEffect } from "react";
import {
  PenTool,
  Eraser,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Brain,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { recordDrawingPractice } from "../services/progressService";
import { askAITeacher } from "../services/aiService";

export const PracticeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<"pen" | "eraser">("pen");
  const [penColor, setPenColor] = useState<string>("#38bdf8"); // Cyan
  const [selectedTarget, setSelectedTarget] = useState<string>("diborane");
  const [showCanonicalOverlay, setShowCanonicalOverlay] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const targets = [
    { id: "diborane", title: "Diborane B₂H₆ (Banana Bonds)", formula: "B₂H₆" },
    { id: "al2cl6", title: "Aluminium Chloride Dimer (Dative)", formula: "Al₂Cl₆" },
    { id: "pcl5", title: "Phosphorus Pentachloride (TBP)", formula: "PCl₅" },
    { id: "h2so4", title: "Sulphuric Acid Oxoacid", formula: "H₂SO₄" },
    { id: "hno3", title: "Nitric Acid Structure", formula: "HNO₃" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#080c14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
  }, [selectedTarget]);

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "eraser") {
      ctx.strokeStyle = "#080c14";
      ctx.lineWidth = 20;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#080c14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    setAiFeedback(null);
  };

  const handleAskAICritique = async () => {
    setIsAnalyzing(true);
    const targetObj = targets.find((t) => t.id === selectedTarget);
    recordDrawingPractice(targetObj?.title || "Chemical Structure");

    const res = await askAITeacher({
      prompt: `Review my hand-drawn diagram for ${targetObj?.title} (${targetObj?.formula}). Give specific feedback on whether I correctly drew terminal vs bridging bonds, formal charges, lone pairs, and bond angles.`,
      topic: targetObj?.title,
      level: "jee",
    });

    setAiFeedback(res.explanation);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <PenTool className="w-8 h-8 text-cyan-400" />
            <span>Interactive Drawing Practice Lab</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Practice drawing inorganic structures, banana bonds, and oxoacids for CBSE & JEE exam mastery.
          </p>
        </div>

        {/* Target Structure Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Target Structure:
          </span>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="bg-slate-900 border border-cyan-500/50 text-xs font-bold text-cyan-300 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-400 transition-all shadow-lg"
          >
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workbench */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Canvas & Controls (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-4 relative shadow-2xl space-y-4">
          {/* Tool Palette */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTool("pen")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  activeTool === "pen"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Pen</span>
              </button>

              <button
                onClick={() => setActiveTool("eraser")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  activeTool === "eraser"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>

              {/* Color Swatches */}
              <div className="flex items-center gap-1 ml-2 border-l border-slate-800 pl-2">
                {["#38bdf8", "#f59e0b", "#f43f5e", "#22c55e", "#ffffff"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setPenColor(c);
                      setActiveTool("pen");
                    }}
                    className={`w-5 h-5 rounded-full border border-slate-700 transition-transform ${
                      penColor === c ? "scale-125 border-white" : ""
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCanonicalOverlay(!showCanonicalOverlay)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  showCanonicalOverlay
                    ? "bg-amber-950 text-amber-300 border-amber-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {showCanonicalOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showCanonicalOverlay ? "Hide Reference" : "Show Reference"}</span>
              </button>

              <button
                onClick={clearCanvas}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Surface */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800">
            <canvas
              ref={canvasRef}
              width={750}
              height={420}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-[380px] sm:h-[420px] bg-[#080c14] cursor-crosshair block"
            />

            {/* Reference Overlay if enabled */}
            {showCanonicalOverlay && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Canonical Reference Guide
                </span>
                <p className="text-sm font-extrabold text-white">
                  Draw terminal 2c-2e B-H bonds in plane, and 2 curved bridging 3c-2e B-H-B banana bonds above/below plane.
                </p>
              </div>
            )}
          </div>

          {/* Action Trigger for AI Critique */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs text-slate-400">
              Finished drawing? Submit your sketch for AI Teacher critique.
            </span>
            <button
              onClick={handleAskAICritique}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <Brain className="w-4 h-4" />
              <span>{isAnalyzing ? "Analyzing Drawing..." : "AI Drawing Critique"}</span>
            </button>
          </div>
        </div>

        {/* AI Feedback & Drawing Tips (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* AI Feedback Output Card */}
          {aiFeedback && (
            <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-3 shadow-2xl animate-fade-in">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>AI Teacher Drawing Critique</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                {aiFeedback}
              </p>
            </div>
          )}

          {/* Drawing Checklist */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CBSE / JEE Drawing Checklist</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>Label central atom element symbol clearly (e.g. B, Al, P, S, N).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>Differentiate terminal bonds vs coordinate/dative dative arrows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>Include lone pairs on heteroatoms (e.g. Cl, O, N) for full marks.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
