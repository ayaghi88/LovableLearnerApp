import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const LOG_FILE = path.join(process.cwd(), "server.log");

function logToFile(message: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Clear log on start
  fs.writeFileSync(LOG_FILE, `Server starting up on port ${PORT}...\n`);

  app.use((req, res, next) => {
    logToFile(`${req.method} ${req.url}`);
    next();
  });

  app.use(express.json());

  // API route for generating study guide
  app.post("/api/generate-guide", async (req, res) => {
    logToFile("Received request on /api/generate-guide");
    try {
      const { topic, profile, modification } = req.body;
      if (!topic || !profile) {
        logToFile("Error: Missing topic or profile");
        return res.status(400).json({ error: "Missing topic or profile" });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        logToFile("Error: API Key is missing");
        return res.status(500).json({ error: "API Key is missing on the server. Please ensure the API key is configured correctly in the environment." });
      }

      logToFile(`Generating study guide for topic: ${topic}`);
      const ai = new GoogleGenAI({ apiKey });
      const profileString = JSON.stringify(profile, null, 2);

      const systemInstruction = `You are "Lovable Learner AI," a sensory-friendly educator specializing in neurodivergent education (ADHD, Autism, Dyslexia, Dyscalculia).
Your tone must be encouraging, clear, friendly, and non-overwhelming. Simple but not childish.

ADAPTATION RULE:
The user is in the "${profile.ageRange}" age group. You MUST tailor your language, examples, and complexity to be age-appropriate for a ${profile.ageRange}.
- Child: Use simple analogies, playful language, and very basic steps.
- Teen: Use relatable examples, clear logic, and avoid being condescending.
- Adult: Use professional but clear language, practical real-world applications.
- Senior: Use clear, respectful language, patient explanations, and larger context.

CONTENT RULES:
1. Flashcards: Generate strictly between 10 and 20 high-quality flashcards.
2. Hands-on Practice: Provide at least 3 concrete exercises using "Try this" phrasing. Avoid complex math unless the topic specifically requires it.
3. Memory Hacks: Include specific ND strategies like chunking, color coding, patterns, repetition, visual associations, and "explain it like a story" tips.
4. Logic: Always explain "WHY" a step matters if the profile requests it.
5. Format: Valid JSON only.
6. YouTube: Provide a YouTube search URL for the topic (e.g., https://www.youtube.com/results?search_query=...) that would be most helpful for this topic.
7. diagramCode: This MUST be syntactically valid, simple Mermaid.js code (starting with "graph TD" or "flowchart TD"). Do NOT output plain text, natural language description, or bullet lists here. Every node with spaces or special characters MUST be enclosed in quotes like: A["Individual Biography"] --> B["Social Context"]. Use double-headed arrows like A <--> B to show mutual influence. Keep it simple and clean so it renders successfully.

TARGET AUDIENCE: Ages 8 to Adult.`;

      let prompt = `TOPIC: ${topic}\n\nPROFILE:\n${profileString}`;
      if (modification) prompt += `\n\nUSER REQUEST: ${modification}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              visualBreakdown: { type: Type.STRING },
              diagramCode: { 
                type: Type.STRING, 
                description: "Syntactically valid Mermaid.js graph starting with 'graph TD' or 'flowchart TD'. Node names with spaces must be quoted, e.g. A[\"Label\"] --> B[\"Label\"]." 
              },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING },
                  },
                  required: ["step", "explanation", "whyItMatters"]
                }
              },
              handsOnPractice: { type: Type.ARRAY, items: { type: Type.STRING } },
              memoryAnchors: { type: Type.ARRAY, items: { type: Type.STRING } },
              flashcards: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { front: { type: Type.STRING }, back: { type: Type.STRING } },
                  required: ["front", "back"]
                }
              },
              pepTalk: { type: Type.STRING },
              youtubeLink: { type: Type.STRING, description: "A relevant YouTube video URL for the topic." }
            },
            required: ["summary", "visualBreakdown", "diagramCode", "steps", "handsOnPractice", "memoryAnchors", "flashcards", "pepTalk", "youtubeLink"]
          }
        }
      });

      const text = response.text || '{}';
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
      const cleanJson = jsonMatch ? jsonMatch[1] : text;

      logToFile("Success: Guide generated successfully");
      res.json(JSON.parse(cleanJson));
    } catch (e: any) {
      logToFile(`Error generating guide: ${e.message}`);
      console.error("Server Gemini API Error:", e);
      res.status(500).json({ error: e.message || "Failed to generate study guide" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
