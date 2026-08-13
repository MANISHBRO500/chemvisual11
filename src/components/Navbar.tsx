import React, { useRef, useEffect } from "react";
import {
  Atom,
  BookOpen,
  Box,
  Brain,
  Compass,
  FileText,
  Layers,
  LayoutDashboard,
  PenTool,
  Sparkles,
  Table,
  Grid,
  Zap,
  Search,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

export type NavTab =
  | "home"
  | "chapters"
  | "diagram-lab"
  | "molecular-lab"
  | "orbital-lab"
  | "hybridisation-lab"
  | "vsepr-lab"
  | "full-periodic"
  | "periodic-table"
  | "practice"
  | "jee-revision"
  | "ai-teacher"
  | "progress";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  theme = "dark",
  onToggleTheme,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "home", label: "Home", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "chapters", label: "Chapters", icon: <BookOpen className="w-4 h-4" /> },
    { id: "diagram-lab", label: "Diagram Lab", icon: <Layers className="w-4 h-4" /> },
    { id: "molecular-lab", label: "3D Lab", icon: <Box className="w-4 h-4" />, badge: "3D" },
    { id: "orbital-lab", label: "Orbital Lab", icon: <Atom className="w-4 h-4" /> },
    { id: "hybridisation-lab", label: "Hybridisation", icon: <Compass className="w-4 h-4" /> },
    { id: "vsepr-lab", label: "VSEPR Lab", icon: <Zap className="w-4 h-4" /> },
    { id: "full-periodic", label: "All Elements", icon: <Grid className="w-4 h-4 text-emerald-400" />, badge: "118" },
    { id: "periodic-table", label: "Periodic Table Lab", icon: <Table className="w-4 h-4" /> },
    { id: "practice", label: "Practice", icon: <PenTool className="w-4 h-4" /> },
    { id: "jee-revision", label: "JEE Revision", icon: <FileText className="w-4 h-4" />, badge: "JEE" },
    { id: "ai-teacher", label: "AI Teacher", icon: <Brain className="w-4 h-4 text-cyan-400" /> },
    { id: "progress", label: "Progress", icon: <Sparkles className="w-4 h-4" /> },
  ];

  const mobileNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "chapters", label: "Chapters", icon: <BookOpen className="w-5 h-5" /> },
    { id: "molecular-lab", label: "3D Lab", icon: <Box className="w-5 h-5" /> },
    { id: "practice", label: "Practice", icon: <PenTool className="w-5 h-5" /> },
    { id: "ai-teacher", label: "AI", icon: <Brain className="w-5 h-5" /> },
  ];

  const navRef = useRef<HTMLElement | null>(null);

  const currentIndex = navItems.findIndex((item) => item.id === activeTab);

  const handlePrevTab = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
    setActiveTab(navItems[prevIndex].id);
  };

  const handleNextTab = () => {
    const nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
    setActiveTab(navItems[nextIndex].id);
  };

  // Scroll active tab into view when activeTab changes
  useEffect(() => {
    if (navRef.current) {
      const activeEl = navRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeTab]);

  return (
    <>
      {/* Top Navbar for Desktop/Laptop/Tablet */}
      <header className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080c14] rounded-[10.5px] flex items-center justify-center">
                <Atom className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  ChemVisual<span className="text-cyan-400">11</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 px-2 py-0.5 rounded-full">
                  CBSE + JEE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Class 11 Inorganic Chemistry Interactive Diagram Lab
              </p>
            </div>
          </div>

          {/* Quick Search Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all text-xs font-medium shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search diagrams, formulas (e.g. B₂H₆, sp³)...</span>
              <span className="sm:hidden">Search...</span>
              <kbd className="hidden md:inline-block ml-2 px-1.5 py-0.5 text-[10px] text-slate-400 bg-slate-800 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button (Light/Dark Mode) */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} UI Mode`}
                className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-amber-400 hover:text-amber-300 hover:border-amber-500/50 transition-all text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline text-slate-200">Light UI</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span className="hidden sm:inline text-slate-800">Dark UI</span>
                  </>
                )}
              </button>
            )}

            {/* AI Teacher Quick Action */}
            <button
              onClick={() => setActiveTab("ai-teacher")}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Brain className="w-4 h-4" />
              <span>Ask AI Teacher</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Links with Left/Right Arrows */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-800/60 hidden md:flex items-center gap-1.5">
          {/* Previous Tab Arrow Button */}
          <button
            onClick={handlePrevTab}
            title="Move to Previous Tab"
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shrink-0 flex items-center justify-center shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Navigation Links Scrollable Area */}
          <nav
            ref={navRef}
            className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 scroll-smooth"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap relative ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold uppercase bg-blue-900/80 text-blue-200 px-1.5 py-0.2 rounded border border-blue-700/50">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Next Tab Arrow Button */}
          <button
            onClick={handleNextTab}
            title="Move to Next Tab"
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shrink-0 flex items-center justify-center shadow-sm group"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar with Left/Right Arrows */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080c14]/95 backdrop-blur-lg border-t border-slate-800 px-3 py-1.5 flex justify-between items-center gap-1">
        <button
          onClick={handlePrevTab}
          title="Previous Tab"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:text-cyan-400 shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-around flex-1">
          {mobileNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
                  isActive ? "text-cyan-400 font-semibold" : "text-slate-400"
                }`}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextTab}
          title="Next Tab"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:text-cyan-400 shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </>
  );
};
