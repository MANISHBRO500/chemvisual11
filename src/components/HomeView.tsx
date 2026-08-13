import React from "react";
import {
  Atom,
  Box,
  Brain,
  Compass,
  FileText,
  Layers,
  PenTool,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { NavTab } from "./Navbar";
import { CHAPTERS_DATA } from "../data/chemistryData";

interface HomeViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectTopic: (topicId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectTopic,
}) => {
  const stats = [
    { label: "Interactive Diagrams", count: "150+", icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { label: "3D Molecular Models", count: "50+", icon: <Box className="w-5 h-5 text-blue-400" /> },
    { label: "Interactive Concepts", count: "20+", icon: <Compass className="w-5 h-5 text-indigo-400" /> },
    { label: "JEE Main/Adv Practice", count: "100%", icon: <Zap className="w-5 h-5 text-amber-400" /> },
  ];

  const featuredConcepts = [
    {
      id: "diborane",
      title: "Diborane B₂H₆ 3c-2e Banana Bonds",
      chapter: "p-Block Elements",
      tag: "JEE Main & Adv Priority",
      description: "Interactive 3D model showcasing electron-deficient bridging hydrogen banana bonds.",
      badgeColor: "bg-amber-900/60 text-amber-300 border-amber-700/50",
      action: () => setActiveTab("molecular-lab"),
    },
    {
      id: "orbitals-3d-shapes",
      title: "3D Atomic Orbitals & Nodal Surfaces",
      chapter: "Structure of Atom",
      tag: "Quantum Mechanics",
      description: "Visualise s, px, py, pz, dxy, dyz, dzx, dx²-y², dz² orbitals with 3D dot-density meshes.",
      badgeColor: "bg-cyan-900/60 text-cyan-300 border-cyan-700/50",
      action: () => setActiveTab("orbital-lab"),
    },
    {
      id: "vsepr-geometries",
      title: "VSEPR Domain Simulator",
      chapter: "Chemical Bonding",
      tag: "Core Geometry",
      description: "Explore 2 to 6 electron domains, lone pair repulsions, and compressed bond angles.",
      badgeColor: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50",
      action: () => setActiveTab("vsepr-lab"),
    },
    {
      id: "hybridisation-sim",
      title: "Hybridisation Simulator (sp to sp³d²)",
      chapter: "Chemical Bonding",
      tag: "Orbital Mixing",
      description: "Animate mixing of 2s, 2p, 3d atomic orbitals to form degenerate hybrid lobes.",
      badgeColor: "bg-purple-900/60 text-purple-300 border-purple-700/50",
      action: () => setActiveTab("hybridisation-lab"),
    },
    {
      id: "al2cl6",
      title: "Al₂Cl₆ Dative Bridge Dimer",
      chapter: "p-Block Elements",
      tag: "Coordinate Bonding",
      description: "Understand octet completion via Cl→Al coordinate bonds in vapor phase.",
      badgeColor: "bg-blue-900/60 text-blue-300 border-blue-700/50",
      action: () => onSelectTopic("al2cl6"),
    },
    {
      id: "carbon-allotropes",
      title: "Carbon Allotropes (Diamond, Graphite, C₆₀)",
      chapter: "p-Block Elements",
      tag: "3D Allotropes",
      description: "Rotate 3D Buckminsterfullerene soccer ball structure and graphite sheets.",
      badgeColor: "bg-emerald-900/60 text-emerald-300 border-emerald-700/50",
      action: () => onSelectTopic("carbon-allotropes"),
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1626] via-[#0b101d] to-[#080c14] border border-cyan-500/20 p-8 lg:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Inorganic Chemistry Lab for CBSE + JEE 2026/2027</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
            Understand Inorganic Chemistry in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">3D</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl">
            "See it. Rotate it. Understand it. Draw it."
          </p>

          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Stop memorizing flat textbook diagrams! ChemVisual 11 brings 150+ Class 11 CBSE and JEE Main/Advanced inorganic concepts to life with real 3D molecular models, atomic orbitals, VSEPR domain simulations, and step-by-step interactive diagram labs.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab("chapters")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Diagrams</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab("molecular-lab")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-sm transition-all hover:scale-105"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Open 3D Lab</span>
            </button>

            <button
              onClick={() => setActiveTab("jee-revision")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/50 text-amber-200 font-semibold text-sm transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Start JEE Revision</span>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-center gap-4 shadow-lg"
          >
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {stat.count}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Labs Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Interactive Science Labs
            </h2>
            <p className="text-xs text-slate-400">
              Choose an interactive simulator to explore core inorganic concepts hands-on
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveTab("molecular-lab")}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              3D Molecular Lab
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Rotate, zoom, and pan 3D ball-and-stick models for B₂H₆, Al₂Cl₆, PCl₅, SF₆, XeF₄, C₆₀, and oxoacids.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-cyan-400 font-semibold">
              <span>Launch 3D Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("orbital-lab")}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-700/50 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Atom className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              Orbital Lab
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Visualise 3D quantum mechanical atomic orbital shapes (s, p, d) with nodal planes, phases (+/-), and quantum numbers.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 font-semibold">
              <span>Launch Orbital Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("vsepr-lab")}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              VSEPR Lab
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Simulate lone pair - bond pair repulsions, domain arrangements (2 to 6), and geometry compression.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-indigo-400 font-semibold">
              <span>Launch VSEPR Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("practice")}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Drawing Practice
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Interactive digital canvas to draw B₂H₆, PCl₅, and oxoacid structures with canonical reference checks.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-amber-400 font-semibold">
              <span>Start Drawing</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Concepts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Featured JEE & CBSE Concepts
            </h2>
            <p className="text-xs text-slate-400">
              High-yield inorganic chemistry topics with interactive 3D visualizations and exam tips
            </p>
          </div>
          <button
            onClick={() => setActiveTab("chapters")}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View all 150+ topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredConcepts.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {item.chapter}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Interactive View</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter Overview Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Class 11 Chapters Overview
            </h2>
            <p className="text-xs text-slate-400">
              Complete NCERT & JEE Inorganic Chemistry syllabus divided into 7 structured chapters
            </p>
          </div>
          <button
            onClick={() => setActiveTab("chapters")}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Chapter Browser</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHAPTERS_DATA.map((ch) => (
            <div
              key={ch.id}
              onClick={() => setActiveTab("chapters")}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-cyan-400">
                  Chapter {ch.number}
                </span>
                <span className="text-[11px] text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                  {ch.jeeWeightage}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {ch.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {ch.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {ch.keyConcepts.slice(0, 3).map((kc, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50"
                  >
                    {kc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
