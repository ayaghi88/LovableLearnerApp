import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

// Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly
export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure it is set in the environment.");
  }

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
  6. YouTube: Use your internal search tool (Google Search) to find one high-quality, relevant YouTube educational video link for this specific topic.
  
  TARGET AUDIENCE: Ages 8 to Adult.`;

  let prompt = `TOPIC: ${topic}\n\nPROFILE:\n${profileString}`;
  if (modification) prompt += `\n\nUSER REQUEST: ${modification}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            visualBreakdown: { type: Type.STRING },
            diagramCode: { type: Type.STRING },
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
    
    return JSON.parse(cleanJson);
  } catch (e: any) {
    console.error("Gemini API Error:", e);
    throw new Error(e.message || "Failed to generate study guide");
  }
};

export const chatWithCoach = async (topic: string, message: string, history: any[], profile?: LearningProfile): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) return "I'm sorry, I need an API key to help you.";

  const ai = new GoogleGenAI({ apiKey });
  const ageContext = profile ? ` The user is in the "${profile.ageRange}" age group, so adapt your language accordingly.` : '';
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the Lovable Learner AI Coach. The user is studying "${topic}".${ageContext} Answer their questions in a clear, encouraging, and ADHD-friendly way. Use bullet points and keep answers short. Tone: Friendly mentor.`
    }
  });
  const response = await chat.sendMessage({ message });
  // response.text is a property
  return response.text || "I'm sorry, I couldn't generate a response.";
};
