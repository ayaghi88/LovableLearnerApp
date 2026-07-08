export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle health check route
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({ status: "ok", message: "Cloudflare custom worker is healthy!" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }

    // Handle study guide generator route
    if (url.pathname === "/api/generate-guide") {
      // CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          }
        });
      }

      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        });
      }

      try {
        const { topic, profile, modification } = await request.json();

        if (!topic || !profile) {
          return new Response(JSON.stringify({ error: "Missing topic or profile" }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          });
        }

        const apiKey = env.GEMINI_API_KEY || env.API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ 
            error: "API Key is missing on the server. Please ensure GEMINI_API_KEY is configured in your Cloudflare dashboard (under Settings -> Variables -> Environment Variables)." 
          }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          });
        }

        const profileString = JSON.stringify(profile, null, 2);

        const systemInstruction = `You are "Lovable Learner AI," a sensory-friendly educator specializing in neurodivergent education (ADHD, Autism, Dyslexia, Dyscalculia, Sensory Processing).
Your tone must be encouraging, clear, friendly, and non-overwhelming. Simple but not childish.

ADAPTATION RULES:
The user is in the "${profile.ageRange}" age group. You MUST tailor your language, examples, and complexity to be age-appropriate for a ${profile.ageRange}.
- Child: Use simple, everyday words. Avoid any complex jargon (if you must use a hard word, explain it in parentheses with a friendly example). Use high encouragement, playful analogies, and very basic steps.
- Teen: Use relatable examples, clear logic, clear explanations, and avoid being condescending.
- Adult: Use professional but clear language, practical real-world applications.
- Senior: Use clear, respectful language, patient explanations, and larger context.

NEURODIVERGENT PROFILES TO TARGET (If selected in profile):
${profile.neurodivergentType && profile.neurodivergentType.length > 0 
  ? `The learner has selected the following profiles: ${profile.neurodivergentType.join(', ')}. Customize your content according to these guidelines:
- ADHD: Use high-interest anchors, dynamic action exercises, and gamified or mystery-themed prompts to spark curiosity. Keep steps snappy.
- Autism: Provide absolute clarity, high logical structure, clear facts, and step-by-step progressions. Avoid vague or highly metaphorical phrases without explanation.
- Dyslexia: Keep explanation blocks concise. Focus heavily on simple, visual/spatial models, short sentences, and neat bullet lists.
- Dyscalculia: Focus on non-mathematical analogies, visual maps, storytelling, and conceptual links rather than numbers, equations, or formulas.
- Sensory: Use extremely calming, gentle, and reassuring tones. Break everything down to prevent information/cognitive overload.`
  : `Format instructions cleanly for general neurodivergent support (high structure, clear steps, and excellent visual/conceptual mapping).`
}

SUPERPOWERS TO LEVERAGE:
${profile.superpowers && profile.superpowers.length > 0 
  ? `The learner possesses these special superpowers: ${profile.superpowers.join(', ')}. Engage these strengths in your generated content!` 
  : `Leverage their active visual and hands-on learning channels.`
}

CONTENT RULES:
1. Flashcards: Generate strictly between 10 and 20 high-quality flashcards with highly digestible facts.
2. Hands-on Practice: Provide at least 3 concrete exercises using "Try this" phrasing that are fully adaptive to their learning style.
3. Memory Hacks: Include specific ND strategies like chunking, color coding, patterns, repetition, visual associations, and "explain it like a story" tips.
4. Logic: Always explain "WHY" a step matters if the profile requests it.
5. Format: Valid JSON only.
6. YouTube: Provide a YouTube search URL for the topic (e.g., https://www.youtube.com/results?search_query=...) that would be most helpful for this topic.
7. diagramCode: This MUST be syntactically valid, simple Mermaid.js code (starting with "graph TD" or "flowchart TD"). Do NOT output plain text, natural language description, or bullet lists here. Every node with spaces or special characters MUST be enclosed in quotes like: A["Individual Biography"] --> B["Social Context"]. Use double-headed arrows like A <--> B to show mutual influence. Keep it simple and clean so it renders successfully.
8. Exam Triggers: Generate 5 to 8 high-yield exam keywords or concepts. For each, describe the precise clues/phrases to look out for on a test, paired with a super simple, bite-sized recall anchor (like a visual, analogy, or micro-story) to immediately trigger the correct answer.

TARGET AUDIENCE: Ages 8 to Adult.`;

        let prompt = `TOPIC: ${topic}\n\nPROFILE:\n${profileString}`;
        if (modification) prompt += `\n\nUSER REQUEST: ${modification}`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                summary: { type: "string" },
                visualBreakdown: { type: "string" },
                diagramCode: { 
                  type: "string", 
                  description: "Syntactically valid Mermaid.js graph starting with 'graph TD' or 'flowchart TD'. Node names with spaces must be quoted, e.g. A[\"Label\"] --> B[\"Label\"]." 
                },
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      step: { type: "string" },
                      explanation: { type: "string" },
                      whyItMatters: { type: "string" },
                    },
                    required: ["step", "explanation", "whyItMatters"]
                  }
                },
                handsOnPractice: { type: "array", items: { type: "string" } },
                memoryAnchors: { type: "array", items: { type: "string" } },
                flashcards: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: { front: { type: "string" }, back: { type: "string" } },
                    required: ["front", "back"]
                  }
                },
                examTriggers: {
                  type: "array",
                  description: "List of high-yield keywords seen on exams, with their test clues and easy recall anchors.",
                  items: {
                    type: "object",
                    properties: {
                      keyword: { type: "string" },
                      triggerPhrase: { type: "string" },
                      easyRecall: { type: "string" }
                    },
                    required: ["keyword", "triggerPhrase", "easyRecall"]
                  }
                },
                pepTalk: { type: "string" },
                youtubeLink: { type: "string" }
              },
              required: [
                "summary", 
                "visualBreakdown", 
                "diagramCode", 
                "steps", 
                "handsOnPractice", 
                "memoryAnchors", 
                "flashcards", 
                "examTriggers", 
                "pepTalk", 
                "youtubeLink"
              ]
            }
          }
        };

        const apiResponse = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
          const errorText = await apiResponse.text();
          return new Response(JSON.stringify({ error: `Gemini API Error: ${errorText}` }), {
            status: apiResponse.status,
            headers: { 
              "Content-Type": "application/json", 
              "Access-Control-Allow-Origin": "*" 
            }
          });
        }

        const data = await apiResponse.json();
        const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        return new Response(textResponse, {
          status: 200,
          headers: { 
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*" 
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message || "Failed to parse or process request" }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*" 
          }
        });
      }
    }

    // Default: Fallback to serving static assets
    return env.ASSETS.fetch(request);
  }
};
