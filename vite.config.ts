
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';

const VITE_LOG_FILE = path.join(process.cwd(), 'vite-requests.log');

function logViteRequest(message: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(VITE_LOG_FILE, `[${timestamp}] ${message}\n`);
}

// Clear log on start
try {
  fs.writeFileSync(VITE_LOG_FILE, 'Vite dev server starting...\n');
} catch (e) {}

function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        logViteRequest(`${req.method} ${req.url}`);
        if (req.url?.startsWith('/api/generate-guide') && req.method === 'POST') {
          logViteRequest("Matched POST /api/generate-guide in Vite plugin");
          try {
            let bodyStr = '';
            for await (const chunk of req) {
              bodyStr += chunk;
            }
            logViteRequest(`Read body string of length ${bodyStr.length}`);
            
            let parsedBody: any = {};
            try {
              parsedBody = JSON.parse(bodyStr);
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: "Invalid JSON body" }));
              return;
            }

            const { topic, profile, modification } = parsedBody;

            if (!topic || !profile) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: "Missing topic or profile" }));
              return;
            }

            const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: "API Key is missing on the server. Please ensure the API key is configured correctly in the environment." }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                }
              }
            });
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
              model: "gemini-3.5-flash",
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

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(cleanJson);
          } catch (e: any) {
            console.error("Vite Plugin API Error:", e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message || "Failed to generate study guide" }));
          }
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env search regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), apiPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)
    },
    server: {
      port: 3000
    }
  };
});
