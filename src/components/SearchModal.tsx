import React, { useState } from "react";
import { Search, X, Layers, Box, Atom, Zap, ArrowRight } from "lucide-react";
import { ALL_TOPICS, MOLECULES_DATA, CHAPTERS_DATA } from "../data/chemistryData";
import { NavTab } from "./Navbar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
  onSelectMolecule: (moleculeId: string) => void;
  setActiveTab: (tab: NavTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectMolecule,
  setActiveTab,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const searchQuery = query.trim().toLowerCase();

  const matchingTopics = searchQuery
    ? ALL_TOPICS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery) ||
          (t.formula && t.formula.toLowerCase().includes(searchQuery)) ||
          t.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
          t.chapterTitle.toLowerCase().includes(searchQuery)
      ).slice(0, 8)
    : ALL_TOPICS.slice(0, 5);

  const matchingMolecules = searchQuery
    ? MOLECULES_DATA.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery) ||
          m.formula.toLowerCase().includes(searchQuery) ||
          m.hybridisation.toLowerCase().includes(searchQuery) ||
          m.geometry.toLowerCase().includes(searchQuery)
      ).slice(0, 5)
    : MOLECULES_DATA.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-0">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diagrams, formulas (B₂H₆, Al₂Cl₆), hybridisation (sp³d), or chapters..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 scrollbar-none">
          {/* Topics & Diagrams */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Diagram Topics ({matchingTopics.length})
            </span>
            <div className="space-y-2">
              {matchingTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    onSelectTopic(topic.id);
                    setActiveTab("diagram-lab");
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                        {topic.title}
                      </span>
                      {topic.formula && (
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                          {topic.formula}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{topic.chapterTitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* 3D Molecules */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-blue-400" />
              3D Molecular Models ({matchingMolecules.length})
            </span>
            <div className="grid sm:grid-cols-2 gap-2">
              {matchingMolecules.map((mol) => (
                <div
                  key={mol.id}
                  onClick={() => {
                    onSelectMolecule(mol.id);
                    setActiveTab("molecular-lab");
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-blue-300 block">
                      {mol.name} ({mol.formula})
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {mol.hybridisation} • {mol.geometry}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-center text-[11px] text-slate-500">
          Press <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded border border-slate-700">ESC</kbd> or click outside to close
        </div>
      </div>
    </div>
  );
};
