export interface AIExplainRequest {
  prompt: string;
  topic?: string;
  level?: "simple" | "jee" | "advanced";
  drawingData?: string;
}

export interface AIExplainResponse {
  explanation: string;
  isFallback?: boolean;
  error?: string;
}

export async function askAITeacher(req: AIExplainRequest): Promise<AIExplainResponse> {
  try {
    const res = await fetch("/api/ai/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server responded with HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn("AI Teacher endpoint error:", err);
    return {
      explanation: `**Unable to connect to AI Teacher service.**

*Fallback Offline Explanation for "${req.prompt}":*
Inorganic chemistry relies on fundamental quantum mechanics, effective nuclear charge ($Z^*$), VSEPR pair repulsions, orbital symmetry, and electronic configurations. 

1. **Geometry**: Minimized electron pair repulsion determines shapes (e.g. $sp^3d^2$ octahedral vs $sp^3d$ TBP).
2. **Bonding**: Overlap of atomic orbitals of matching phase produces bonding $\\sigma$ and $\\pi$ MOs.
3. **JEE Tip**: Check for special structural features like 3c-2e banana bonds ($B_2H_6$), coordinate bridges ($Al_2Cl_6$), or lone pair compression ($NH_3$ $107^\\circ$, $H_2O$ $104.5^\\circ$).`,
      isFallback: true,
      error: err.message,
    };
  }
}
