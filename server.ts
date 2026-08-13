import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI with provided key:", err);
  }
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Chemistry Teacher Endpoint
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { prompt, topic, level = "jee", drawingData } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!process.env.GEMINI_API_KEY || !aiClient) {
      // Graceful offline fallback response when API key is not configured
      const fallbackExplanations: Record<string, string> = {
        default: `[Offline AI Mode - ChemVisual 11 Assistant]
        
**Topic:** ${topic || "Class 11 Inorganic Chemistry"}

**Question:** ${prompt}

**Key Concept Explanation (${level.toUpperCase()} Level):**
Inorganic chemistry relies on fundamental principles of atomic structure, electron configuration, orbital overlap, electrostatic attraction, and quantum mechanical behavior.

1. **VSEPR & Geometry:** Repulsion between valence shell electron pairs (bond pairs and lone pairs) minimizes energy and dictates molecular geometry (e.g., Lone Pair - Lone Pair repulsion > Lone Pair - Bond Pair > Bond Pair - Bond Pair).
2. **Hybridisation:** Atomic orbitals of similar energy mix to form degenerate hybrid orbitals directed in space to maximize bond strength (e.g., sp³ hybridisation yields tetrahedral angles of 109.5° unless compressed by lone pairs as in NH₃ [107°] or H₂O [104.5°]).
3. **Special Bonding:** Electron-deficient molecules like Diborane (B₂H₆) achieve stability via 3-centre-2-electron (3c-2e) "banana bonds" between boron and bridging hydrogen atoms.

*Tip: Connect your Gemini API Key in Settings > Secrets for real-time live AI responses powered by Gemini 3.6 Flash!*`,
      };

      return res.json({
        explanation: fallbackExplanations.default,
        isFallback: true,
      });
    }

    const systemInstruction = `You are "ChemVisual 11 AI Teacher", an expert CBSE & JEE (Main + Advanced) Inorganic Chemistry Tutor.
Your explanations are highly clear, structured, scientifically rigorous, and focused on Class 11 CBSE NCERT and JEE syllabus.

Target Depth:
- "simple": Easy to digest, intuitive, 8th-10th grade bridge to 11th.
- "jee": Focused on JEE Main / NCERT core, high-yield facts, common exam traps, exceptions, molecular geometry, oxidation states, and formulas.
- "advanced": JEE Advanced level, molecular orbital theory diagrams, crystal field, ligand field concepts, thermodynamic vs kinetic controls, resonance structures.

Use clean Markdown formatting. Use bold text for key terms. Break explanations into bullet points, key rules, exceptions, and "JEE Exam Tip".`;

    let contentPrompt = `User Question: ${prompt}`;
    if (topic) {
      contentPrompt += `\nTopic Context: ${topic}`;
    }
    if (drawingData) {
      contentPrompt += `\nUser provided a drawn structure input description or data. Evaluate the structure correctness if relevant.`;
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contentPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const explanation = response.text || "No explanation generated.";
    return res.json({ explanation, isFallback: false });
  } catch (error: any) {
    console.error("AI Explain Endpoint Error:", error);
    return res.status(500).json({
      error: "Error generating explanation.",
      details: error.message || String(error),
    });
  }
});

// In-memory progress tracking fallback endpoint
const userProgressStore = {
  completedChapters: ["structure-of-atom"],
  viewedDiagrams: ["diborane", "vsepr-shapes", "bohr-model"],
  masteredDiagrams: ["diborane"],
  quizScores: { "structure-of-atom": 85, "chemical-bonding": 90 },
  practiceDrawings: 4,
  weakConcepts: ["Oxoacids of Sulphur", "3c-2e bonding in Al2Cl6"],
  recentActivity: [
    { type: "diagram", title: "Diborane B2H6", time: "10 mins ago" },
    { type: "quiz", title: "Chemical Bonding MCQ", score: "90%", time: "1 hour ago" },
  ],
};

app.get("/api/progress", (req, res) => {
  res.json(userProgressStore);
});

app.post("/api/progress/update", (req, res) => {
  const { diagramId, chapterId, quizScore, weakConcept } = req.body;
  if (diagramId && !userProgressStore.viewedDiagrams.includes(diagramId)) {
    userProgressStore.viewedDiagrams.push(diagramId);
  }
  if (chapterId && quizScore !== undefined) {
    userProgressStore.quizScores[chapterId] = quizScore;
  }
  if (weakConcept && !userProgressStore.weakConcepts.includes(weakConcept)) {
    userProgressStore.weakConcepts.push(weakConcept);
  }
  res.json({ success: true, progress: userProgressStore });
});

// Setup Vite Development Middleware or Production Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ChemVisual 11 Server running on http://localhost:${PORT}`);
  });
}

startServer();
