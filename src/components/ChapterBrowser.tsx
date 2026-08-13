import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BookOpen,
  Box,
  Layers,
  Search,
  Zap,
  PenTool,
  HelpCircle,
  Filter,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CHAPTERS_DATA, ALL_TOPICS } from "../data/chemistryData";
import { DiagramTopic, PriorityLevel } from "../types/chemistry";
import { NavTab } from "./Navbar";

interface ChapterBrowserProps {
  onSelectTopic: (topicId: string) => void;
  onSelect3D?: (moleculeId: string) => void;
  setActiveTab?: (tab: NavTab) => void;
}

export const ChapterBrowser: React.FC<ChapterBrowserProps> = ({
  onSelectTopic,
  onSelect3D,
  setActiveTab,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const chapterList = useMemo(() => {
    return [
      { id: "all", label: `All Chapters (${ALL_TOPICS.length})` },
      ...CHAPTERS_DATA.map((ch) => ({ id: ch.id, label: `Ch ${ch.number}: ${ch.title}` })),
    ];
  }, []);

  const chapterNavRef = useRef<HTMLDivElement | null>(null);

  const currentChapterIndex = chapterList.findIndex((ch) => ch.id === selectedChapterId);

  const handlePrevChapter = () => {
    const prevIdx = currentChapterIndex > 0 ? currentChapterIndex - 1 : chapterList.length - 1;
    setSelectedChapterId(chapterList[prevIdx].id);
  };

  const handleNextChapter = () => {
    const nextIdx = currentChapterIndex < chapterList.length - 1 ? currentChapterIndex + 1 : 0;
    setSelectedChapterId(chapterList[nextIdx].id);
  };

  useEffect(() => {
    if (chapterNavRef.current) {
      const activeEl = chapterNavRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedChapterId]);

  const filteredTopics = useMemo(() => {
    return ALL_TOPICS.filter((topic) => {
      const matchesChapter =
        selectedChapterId === "all" || topic.chapterId === selectedChapterId;
      const matchesPriority =
        priorityFilter === "all" || topic.jeeMainPriority === priorityFilter;
      const matchesQuery =
        searchQuery === "" ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (topic.formula &&
          topic.formula.toLowerCase().includes(searchQuery.toLowerCase())) ||
        topic.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesChapter && matchesPriority && matchesQuery;
    });
  }, [selectedChapterId, priorityFilter, searchQuery]);

  const getPriorityBadgeClass = (priority: PriorityLevel) => {
    switch (priority) {
      case "VERY_HIGH":
        return "bg-rose-950/80 text-rose-300 border-rose-700/60";
      case "HIGH":
        return "bg-amber-950/80 text-amber-300 border-amber-700/60";
      case "MEDIUM":
        return "bg-blue-950/80 text-blue-300 border-blue-700/60";
      case "LOW":
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            <span>Class 11 Chapter Browser</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse 165+ Class 11 Inorganic Chemistry topics, 2D diagrams, 3D structures, and JEE priority cards.
          </p>
        </div>

        {/* Quick Quiz & Practice Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("practice")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500/50 text-xs font-semibold transition-all"
          >
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>Drawing Canvas</span>
          </button>
          <button
            onClick={() => setActiveTab("jee-revision")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-all"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>JEE Revision Notes</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Tabs with Left & Right Navigation Arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevChapter}
          title="Previous Chapter"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all shrink-0 group shadow-md"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div
          ref={chapterNavRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
        >
          {chapterList.map((ch) => {
            const isActive = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                data-active={isActive ? "true" : "false"}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {ch.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextChapter}
          title="Next Chapter"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all shrink-0 group shadow-md"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Search & Priority Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, formulas (e.g. B₂H₆, sp³)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <span className="text-xs text-slate-400 hidden sm:block">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 transition-all w-full sm:w-auto"
          >
            <option value="all">All Priorities</option>
            <option value="VERY_HIGH">VERY HIGH Priority</option>
            <option value="HIGH">HIGH Priority</option>
            <option value="MEDIUM">MEDIUM Priority</option>
            <option value="LOW">LOW Priority</option>
          </select>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No topics match your filter</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or priority filter settings.
          </p>
          <button
            onClick={() => {
              setSelectedChapterId("all");
              setPriorityFilter("all");
              setSearchQuery("");
            }}
            className="mt-2 text-xs text-cyan-400 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl space-y-4 hover:shadow-cyan-500/10"
            >
              <div className="space-y-3">
                {/* Topic Header & Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60">
                    Topic #{topic.topicNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${getPriorityBadgeClass(
                        topic.jeeMainPriority
                      )}`}
                    >
                      JEE: {topic.jeeMainPriority}
                    </span>
                  </div>
                </div>

                {/* Title & Formula */}
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {topic.title}
                  </h3>
                  {topic.formula && (
                    <span className="text-xs font-mono text-cyan-300 font-semibold mt-1 inline-block bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Formula: {topic.formula}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {topic.description}
                </p>

                {/* Hybridisation & Geometry specs if present */}
                {(topic.hybridisation || topic.geometry) && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1 text-slate-300">
                    {topic.hybridisation && (
                      <div>
                        <span className="text-slate-500 font-medium">Hybridisation: </span>
                        <span className="text-cyan-300 font-bold">{topic.hybridisation}</span>
                      </div>
                    )}
                    {topic.geometry && (
                      <div>
                        <span className="text-slate-500 font-medium">Geometry: </span>
                        <span className="text-amber-300 font-semibold">{topic.geometry}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topic.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectTopic(topic.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>2D Diagram</span>
                </button>

                {topic.has3DModel && (
                  <button
                    onClick={() => {
                      if (topic.modelType === "orbital") {
                        setActiveTab("orbital-lab");
                      } else if (topic.modelType === "vsepr") {
                        setActiveTab("vsepr-lab");
                      } else if (topic.modelType === "hybridisation") {
                        setActiveTab("hybridisation-lab");
                      } else {
                        setActiveTab("molecular-lab");
                      }
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-all"
                  >
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3D View</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
