import { LearningProfile, StudyGuideContent } from "../types";

const getClientApiKey = (): string => {
  // Try to find the API key in client-side environment variables safely in browser
  const meta = import.meta as any;
  if (meta && meta.env) {
    return meta.env.VITE_GEMINI_API_KEY || meta.env.VITE_API_KEY || "";
  }
  return "";
};

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  console.log("Attempting to generate study guide via server API...");

  try {
    const response = await fetch("/api/generate-guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        profile,
        modification,
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    
    // Check if the response is successful and is JSON
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Successfully generated study guide via server API!");
      return data as StudyGuideContent;
    }

    if (contentType.includes("application/json")) {
      try {
        const errData = await response.json();
        if (errData && errData.error) {
          throw new Error(`Server Error: ${errData.error}`);
        }
      } catch (parseErr) {
        // Ignore parse error and fall back
      }
    }

    console.warn(
      `Server API responded with status ${response.status} (${contentType}). Falling back to client-side generation...`
    );
  } catch (err: any) {
    if (err.message && err.message.startsWith("Server Error:")) {
      throw err;
    }
    console.warn("Server API failed. Trying client-side fallback...", err);
  }

  // Fallback: Generate guide client-side safely via REST endpoint
  const clientApiKey = getClientApiKey();
  if (!clientApiKey) {
    throw new Error(
      "Unable to reach the server API, and no client-side API Key is configured. If you are hosting statically (e.g. on Netlify or Vercel), please set GEMINI_API_KEY or API_KEY in your deployment environment variables."
    );
  }

  console.log("Generating study guide client-side using browser-safe REST fetch...");

  try {
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

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${clientApiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              summary: { type: "STRING" },
              visualBreakdown: { type: "STRING" },
              diagramCode: { 
                type: "STRING", 
                description: "Syntactically valid Mermaid.js graph starting with 'graph TD' or 'flowchart TD'. Node names with spaces must be quoted, e.g. A[\"Label\"] --> B[\"Label\"]." 
              },
              steps: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    step: { type: "STRING" },
                    explanation: { type: "STRING" },
                    whyItMatters: { type: "STRING" },
                  },
                  required: ["step", "explanation", "whyItMatters"]
                }
              },
              handsOnPractice: { type: "ARRAY", items: { type: "STRING" } },
              memoryAnchors: { type: "ARRAY", items: { type: "STRING" } },
              flashcards: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: { front: { type: "STRING" }, back: { type: "STRING" } },
                  required: ["front", "back"]
                }
              },
              examTriggers: {
                type: "ARRAY",
                description: "List of high-yield keywords seen on exams, with their test clues and easy recall anchors.",
                items: {
                  type: "OBJECT",
                  properties: {
                    keyword: { type: "STRING", description: "The exam concept or keyword (e.g., 'Anomie' or 'Conflict Theory')." },
                    triggerPhrase: { type: "STRING", description: "Test question clues to look for (e.g., 'look for: normlessness, social change, breakdown of rules')." },
                    easyRecall: { type: "STRING", description: "Bite-sized visual/narrative recall association (e.g., 'Think: A-no-me = No Rules, lost in space.')." }
                  },
                  required: ["keyword", "triggerPhrase", "easyRecall"]
                }
              },
              pepTalk: { type: "STRING" },
              youtubeLink: { type: "STRING", description: "A relevant YouTube video URL for the topic." }
            },
            required: ["summary", "visualBreakdown", "diagramCode", "steps", "handsOnPractice", "memoryAnchors", "flashcards", "examTriggers", "pepTalk", "youtubeLink"]
          }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errText}`);
    }

    const resJson = await response.json();
    const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    const cleanJson = jsonMatch ? jsonMatch[1] : text;

    console.log("Successfully generated study guide client-side!");
    return JSON.parse(cleanJson) as StudyGuideContent;
  } catch (clientErr: any) {
    console.error("Client-side generation failed:", clientErr);
    throw new Error(
      clientErr.message || "Failed to generate study guide. Please check your connection and API Key."
    );
  }
};
