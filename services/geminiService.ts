import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined") throw new Error("MISSING_API_KEY");

  const ai = new GoogleGenAI({ apiKey });
  const profileString = JSON.stringify(profile, null, 2);
  
  const systemInstruction = `You are "Lovable Learner AI," a sensory-friendly educator specializing in neurodivergent education (ADHD, Autism, Dyslexia).
  Your tone must be encouraging, clear, and friendly. Avoid "walls of text."
  
  CONTENT RULES:
  1. Flashcards: Generate strictly between 10 and 20 high-quality flashcards.
  2. Hands-on Practice: Provide at least 3 concrete exercises using "Try this" phrasing.
  3. Memory Hacks: Include specific ND strategies like chunking, color coding, patterns, repetition, and visual associations.
  4. Logic: Always explain "WHY" a step matters if the profile requests it.
  5. Format: Valid JSON only. Use Mermaid graph TD for diagrams.
  
  TARGET AUDIENCE: Ages 8 to Adult (Simple but not childish).`;

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
          pepTalk: { type: Type.STRING }
        },
        required: ["summary", "visualBreakdown", "diagramCode", "steps", "handsOnPractice", "memoryAnchors", "flashcards", "pepTalk"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithCoach = async (topic: string, message: string, history: any[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the Lovable Learner AI Coach. The user is studying "${topic}". Answer their questions in a clear, encouraging, and ADHD-friendly way. Use bullet points and keep answers short.`
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};