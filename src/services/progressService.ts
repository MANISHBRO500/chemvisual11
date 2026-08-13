import { UserProgress } from "../types/chemistry";

const STORAGE_KEY = "chemvisual_11_user_progress";

const DEFAULT_PROGRESS: UserProgress = {
  completedChapters: ["structure-of-atom"],
  viewedDiagrams: ["rutherford-scattering", "bohr-energy-levels", "diborane", "vsepr-geometries"],
  masteredDiagrams: ["diborane", "vsepr-geometries"],
  quizScores: {
    "structure-of-atom": 85,
    "chemical-bonding": 90,
  },
  practiceDrawingsCount: 3,
  weakConcepts: ["Al2Cl6 Dative Bridge", "Oxoacids of Sulphur"],
  recentActivity: [
    { type: "diagram", title: "Diborane B₂H₆ 3c-2e Bonds", time: "10 mins ago" },
    { type: "quiz", title: "Chemical Bonding Mastery Quiz", time: "1 hour ago" },
    { type: "3d", title: "3D Orbital pz Visualisation", time: "Yesterday" },
  ],
};

export function getLocalProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Failed to read progress from localStorage", e);
  }
  return DEFAULT_PROGRESS;
}

export function saveLocalProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("Failed to save progress to localStorage", e);
  }
}

export function recordDiagramViewed(diagramId: string, diagramTitle: string): UserProgress {
  const p = getLocalProgress();
  if (!p.viewedDiagrams.includes(diagramId)) {
    p.viewedDiagrams.push(diagramId);
  }
  p.recentActivity.unshift({
    type: "diagram",
    title: diagramTitle,
    time: "Just now",
  });
  if (p.recentActivity.length > 10) p.recentActivity.pop();
  saveLocalProgress(p);
  syncWithBackend({ diagramId });
  return p;
}

export function recordQuizScore(chapterId: string, scorePercentage: number, chapterTitle: string): UserProgress {
  const p = getLocalProgress();
  p.quizScores[chapterId] = Math.max(p.quizScores[chapterId] || 0, scorePercentage);
  if (scorePercentage >= 80 && !p.completedChapters.includes(chapterId)) {
    p.completedChapters.push(chapterId);
  }
  p.recentActivity.unshift({
    type: "quiz",
    title: `${chapterTitle} Quiz (${scorePercentage}%)`,
    time: "Just now",
  });
  if (p.recentActivity.length > 10) p.recentActivity.pop();
  saveLocalProgress(p);
  syncWithBackend({ chapterId, quizScore: scorePercentage });
  return p;
}

export function recordDrawingPractice(structureTitle: string): UserProgress {
  const p = getLocalProgress();
  p.practiceDrawingsCount += 1;
  p.recentActivity.unshift({
    type: "practice",
    title: `Drew ${structureTitle}`,
    time: "Just now",
  });
  if (p.recentActivity.length > 10) p.recentActivity.pop();
  saveLocalProgress(p);
  return p;
}

async function syncWithBackend(payload: any) {
  try {
    await fetch("/api/progress/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Silent fail if offline or backend error
  }
}
