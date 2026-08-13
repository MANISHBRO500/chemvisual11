import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { ChapterBrowser } from "./components/ChapterBrowser";
import { DiagramLab } from "./components/DiagramLab";
import { MolecularLab3D } from "./components/MolecularLab3D";
import { OrbitalLab3D } from "./components/OrbitalLab3D";
import { HybridisationLab } from "./components/HybridisationLab";
import { VSEPRLab } from "./components/VSEPRLab";
import { PeriodicTableLab } from "./components/PeriodicTableLab";
import { FullPeriodicTableLab } from "./components/FullPeriodicTableLab";
import { PracticeCanvas } from "./components/PracticeCanvas";
import { JEERevisionView } from "./components/JEERevisionView";
import { AITeacherView } from "./components/AITeacherView";
import { ProgressView } from "./components/ProgressView";
import { SearchModal } from "./components/SearchModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("diborane");
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>("diborane");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("chemvisual_theme") as "dark" | "light") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("chemvisual_theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Keyboard shortcut Cmd+K / Ctrl+K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab("diagram-lab");
  };

  const handleSelectMolecule = (moleculeId: string) => {
    setSelectedMoleculeId(moleculeId);
    setActiveTab("molecular-lab");
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === "light"
          ? "bg-slate-50 text-slate-900 selection:bg-cyan-400 selection:text-slate-950"
          : "bg-[#060911] text-slate-100 selection:bg-cyan-500 selection:text-black"
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectMolecule={handleSelectMolecule}
        setActiveTab={setActiveTab}
      />

      {/* Main Container View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {activeTab === "home" && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {activeTab === "chapters" && (
          <ChapterBrowser
            onSelectTopic={handleSelectTopic}
            onSelect3D={handleSelectMolecule}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "diagram-lab" && (
          <DiagramLab
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
            onOpen3D={handleSelectMolecule}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "molecular-lab" && (
          <MolecularLab3D
            selectedMoleculeId={selectedMoleculeId}
            onSelectMolecule={setSelectedMoleculeId}
          />
        )}

        {activeTab === "orbital-lab" && <OrbitalLab3D />}

        {activeTab === "hybridisation-lab" && <HybridisationLab />}

        {activeTab === "vsepr-lab" && <VSEPRLab />}

        {activeTab === "full-periodic" && <FullPeriodicTableLab />}

        {activeTab === "periodic-table" && <PeriodicTableLab />}

        {activeTab === "practice" && <PracticeCanvas />}

        {activeTab === "jee-revision" && (
          <JEERevisionView
            onOpenDiagram={handleSelectTopic}
            onOpen3D={handleSelectMolecule}
          />
        )}

        {activeTab === "ai-teacher" && <AITeacherView />}

        {activeTab === "progress" && (
          <ProgressView onNavigateTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060c] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            <strong className="text-slate-300">ChemVisual 11</strong> — CBSE + JEE Main/Advanced Class 11 Inorganic Chemistry Interactive Diagram Lab
          </p>
          <p className="text-slate-600">
            Designed for 3D Molecular, VSEPR & Hybridisation Conceptual Mastery
          </p>
        </div>
      </footer>
    </div>
  );
}
