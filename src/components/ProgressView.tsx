import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  Layers,
  PenTool,
  AlertTriangle,
  Flame,
  Award,
  Clock,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { getLocalProgress, saveLocalProgress } from "../services/progressService";
import { UserProgress } from "../types/chemistry";
import { CHAPTERS_DATA } from "../data/chemistryData";

interface ProgressViewProps {
  onNavigateTab?: (tab: any) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigateTab }) => {
  const [progress, setProgress] = useState<UserProgress>(getLocalProgress());

  useEffect(() => {
    setProgress(getLocalProgress());
  }, []);

  const totalChapters = CHAPTERS_DATA.length;
  const completedCount = progress.completedChapters.length;
  const chapterCompletionPercent = Math.round((completedCount / totalChapters) * 100);

  const totalQuizzesTaken = Object.keys(progress.quizScores).length;
  const avgQuizScore = totalQuizzesTaken > 0
    ? Math.round(
        (Object.values(progress.quizScores) as number[]).reduce((a, b) => a + b, 0) / totalQuizzesTaken
      )
    : 0;

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your local study progress?")) {
      const resetP: UserProgress = {
        completedChapters: [],
        viewedDiagrams: [],
        masteredDiagrams: [],
        quizScores: {},
        practiceDrawingsCount: 0,
        weakConcepts: [],
        recentActivity: [],
      };
      saveLocalProgress(resetP);
      setProgress(resetP);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Student Performance & Analytics</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Your Class 11 <span className="text-cyan-400">Inorganic Progress</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Track completed NCERT chapters, master 2D/3D diagrams, review quiz scores, and target weak concepts before the JEE Main & Advanced exams.
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Chapter Mastery</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {completedCount} / {totalChapters}
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full transition-all duration-500"
              style={{ width: `${chapterCompletionPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400">{chapterCompletionPercent}% Syllabus Covered</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Diagrams Viewed</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {progress.viewedDiagrams.length}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {progress.masteredDiagrams.length} Diagrams Mastered
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average Quiz Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">
            {avgQuizScore}%
          </div>
          <span className="text-[10px] text-slate-400">{totalQuizzesTaken} Quizzes Attempted</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Drawing Practice</span>
            <PenTool className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {progress.practiceDrawingsCount}
          </div>
          <span className="text-[10px] text-purple-300 font-semibold">Structures Drawn & Verified</span>
        </div>
      </div>

      {/* Chapter Breakdown & Weak Concepts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chapter Progress Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Chapter-wise Completion Status</span>
          </h2>

          <div className="space-y-3">
            {CHAPTERS_DATA.map((ch) => {
              const isCompleted = progress.completedChapters.includes(ch.id);
              const score = progress.quizScores[ch.id];

              return (
                <div
                  key={ch.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCompleted
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-700/50"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {ch.number}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{ch.title}</h4>
                      <p className="text-[11px] text-slate-400">{ch.jeeWeightage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {score !== undefined ? (
                      <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                        Quiz: {score}%
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Not Quiz'd</span>
                    )}

                    {isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => onNavigateTab && onNavigateTab("jee-revision")}
                        className="text-xs text-cyan-400 hover:underline font-semibold"
                      >
                        Study
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Concepts & Recent Activity */}
        <div className="space-y-6">
          {/* Weak Concepts Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Target Revision Areas</span>
            </h2>

            {progress.weakConcepts.length > 0 ? (
              <div className="space-y-2">
                {progress.weakConcepts.map((wc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200 font-medium flex items-center justify-between"
                  >
                    <span>{wc}</span>
                    <button
                      onClick={() => onNavigateTab && onNavigateTab("diagram-lab")}
                      className="text-[11px] text-rose-400 hover:underline font-semibold"
                    >
                      Revise
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No weak concepts identified yet. Keep attempting quizzes to discover focus topics!
              </p>
            )}
          </div>

          {/* Recent Activity Log */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Activity Feed</span>
            </h2>

            <div className="space-y-2.5">
              {progress.recentActivity.map((act, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-200 font-medium">{act.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleResetProgress}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/50 text-slate-400 hover:text-rose-300 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Progress Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
