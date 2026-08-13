import React, { useState } from "react";
import {
  FileText,
  Star,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { JEE_REVISION_CARDS, CHAPTER_QUIZZES, CHAPTERS_DATA } from "../data/chemistryData";
import { JEERevisionCard, QuizQuestion } from "../types/chemistry";
import { recordQuizScore } from "../services/progressService";

interface JEERevisionViewProps {
  onOpenDiagram?: (topicId: string) => void;
  onOpen3D?: (moleculeId: string) => void;
}

export const JEERevisionView: React.FC<JEERevisionViewProps> = ({
  onOpenDiagram,
  onOpen3D,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [activeQuizChapter, setActiveQuizChapter] = useState<string | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Filter revision cards
  const filteredCards = JEE_REVISION_CARDS.filter((card) => {
    if (selectedChapter !== "all" && card.chapterId !== selectedChapter) return false;
    if (selectedPriority !== "all" && card.priority !== selectedPriority) return false;
    return true;
  });

  // Start Chapter Quiz
  const startQuiz = (chapterId: string) => {
    setActiveQuizChapter(chapterId);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const currentQuestions: QuizQuestion[] = activeQuizChapter
    ? CHAPTER_QUIZZES[activeQuizChapter] || []
    : [];

  const handleOptionSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const q = currentQuestions[currentQuizIndex];
    if (q && selectedOption === q.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < currentQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      if (activeQuizChapter) {
        const total = currentQuestions.length;
        const finalScore = currentQuestions[currentQuizIndex]?.correctAnswer === selectedOption
          ? quizScore
          : quizScore;
        const percentage = Math.round((finalScore / total) * 100);
        const chapterObj = CHAPTERS_DATA.find((c) => c.id === activeQuizChapter);
        recordQuizScore(activeQuizChapter, percentage, chapterObj?.title || activeQuizChapter);
      }
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < count ? "text-amber-400 fill-amber-400" : "text-slate-700"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-600/30 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-600/40 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>JEE Main & JEE Advanced Revision Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          High-Yield <span className="text-amber-400">JEE Revision Cards</span> & Quizzes
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Condensed 30-second summaries, frequently tested JEE traps, star weightage ratings, and chapter-wise conceptual MCQs with step-by-step solution breakdowns.
        </p>

        {/* Filters */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">Chapter:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Chapters</option>
              {CHAPTERS_DATA.map((ch) => (
                <option key={ch.id} value={ch.id} className="bg-slate-900">
                  Ch {ch.number}: {ch.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="font-medium">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Priorities</option>
              <option value="VERY_HIGH" className="bg-slate-900">Very High Priority</option>
              <option value="HIGH" className="bg-slate-900">High Priority</option>
              <option value="MEDIUM" className="bg-slate-900">Medium Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Chapter Quiz Modal / Banner */}
      {activeQuizChapter && currentQuestions.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-700/50">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  JEE Concept Practice Quiz
                </h3>
                <p className="text-xs text-slate-400">
                  Question {currentQuizIndex + 1} of {currentQuestions.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveQuizChapter(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-800"
            >
              Close Quiz
            </button>
          </div>

          {!quizCompleted ? (
            <div className="space-y-6">
              {/* Question Box */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                    {currentQuestions[currentQuizIndex].type}
                  </span>
                  {currentQuestions[currentQuizIndex].jeeMainYear && (
                    <span className="text-xs text-amber-400 font-semibold">
                      {currentQuestions[currentQuizIndex].jeeMainYear}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {currentQuestions[currentQuizIndex].question}
                </p>
                {currentQuestions[currentQuizIndex].assertion && (
                  <div className="text-xs space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <p><strong>Assertion (A):</strong> {currentQuestions[currentQuizIndex].assertion}</p>
                    <p><strong>Reason (R):</strong> {currentQuestions[currentQuizIndex].reason}</p>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestions[currentQuizIndex].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestions[currentQuizIndex].correctAnswer;
                  let btnClass = "border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700";

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnClass = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-semibold";
                    } else if (isSelected) {
                      btnClass = "border-rose-500 bg-rose-950/60 text-rose-200 font-semibold";
                    }
                  } else if (isSelected) {
                    btnClass = "border-cyan-500 bg-cyan-950/60 text-cyan-200 font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between ${btnClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[11px] text-slate-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action & Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/50 space-y-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Explanation Breakdown:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQuestions[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    <span>{currentQuizIndex + 1 < currentQuestions.length ? "Next Question" : "Finish Quiz"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Score Summary */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-sm text-slate-300">
                You scored <span className="font-extrabold text-cyan-400">{quizScore}</span> out of{" "}
                <span className="font-extrabold text-white">{currentQuestions.length}</span> ({Math.round((quizScore / currentQuestions.length) * 100)}%)
              </p>
              <button
                onClick={() => setActiveQuizChapter(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Back to Revision Cards
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chapter Quiz Trigger Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Chapter-Wise JEE Practice Quizzes</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHAPTERS_DATA.map((ch) => {
            const hasQuiz = (CHAPTER_QUIZZES[ch.id] || []).length > 0;
            return (
              <div
                key={ch.id}
                onClick={() => hasQuiz && startQuiz(ch.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  hasQuiz
                    ? "bg-slate-900/80 border-slate-800 hover:border-amber-500/50 cursor-pointer group shadow-lg"
                    : "bg-slate-950/50 border-slate-900 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-400">Ch {ch.number}</span>
                  <span className="text-[10px] text-slate-400">
                    {(CHAPTER_QUIZZES[ch.id] || []).length} Questions
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {ch.title}
                </h4>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                  <span>Start Quiz</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JEE High-Yield Revision Cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>30-Second High-Yield Revision Cards ({filteredCards.length})</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {card.formulaOrStructure}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {card.topic}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50">
                    {card.priority.replace("_", " ")}
                  </span>
                </div>

                {/* Star Ratings */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 text-[10px] block">JEE Main</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {renderStars(card.jeeMainStars)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">JEE Adv</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {renderStars(card.jeeAdvStars)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">NCERT</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {renderStars(card.ncertStars)}
                    </div>
                  </div>
                </div>

                {/* 30 Sec Summary */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    30-Second Express Summary
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {card.summary30Sec}
                  </p>
                </div>

                {/* Frequently Tested Points */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Frequently Tested Exam Points:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {card.frequentlyTestedPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Traps */}
                <div className="space-y-2 p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Common Student Traps:
                  </span>
                  <ul className="space-y-1 text-xs text-rose-200">
                    {card.commonTraps.map((trap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">⚠️</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {card.keyDiagramDescription}
                </span>
                <button
                  onClick={() => onOpen3D && onOpen3D("diborane")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center gap-1"
                >
                  <span>Interactive 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
