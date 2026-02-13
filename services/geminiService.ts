
import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("Gemini API Key is missing! Check your Netlify environment variables.");
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  const profileString = JSON.stringify(profile, null, 2);
  
  let userPrompt = `TOPIC: ${topic}\n\nLEARNING STYLE PROFILE:\n${profileString}`;
  
  if (modification) {
    userPrompt += `\n\nMODIFICATION REQUEST: ${modification}. Please regenerate the guide focusing on this request.`;
  }

  const systemInstruction = `You are "Lovable Learner AI," designed to teach neurodivergent learners using visual structure, step-by-step breakdowns, hands-on options, and clear explanations.

  Generate a personalized study guide based on the provided LEARNING STYLE and TOPIC.
  
  Tone: Warm, clear, friendly, non-academic, simple.
  Goal: Make the learner feel capable and supported.
  
  CRITICAL: 
  1. Flashcards must be populated with ACTUAL content related to the TOPIC. 
  2. Flashcards must use exact keys "front" and "back". 
  3. "front" is the question/term, "back" is the explanation.
  
  VISUALS:
  Generate a Mermaid.js diagram code (graph TD or mindmap) for 'diagramCode' that visually explains the concept. 
  Keep it simple. Do not wrap in markdown backticks.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
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
                required: ["step", "explanation", "whyItMatters"],
              },
            },
            handsOnPractice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            memoryAnchors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING },
                  back: { type: Type.STRING },
                },
                required: ["front", "back"],
              },
            },
            pepTalk: { type: Type.STRING },
          },
          required: ["summary", "visualBreakdown", "diagramCode", "steps", "handsOnPractice", "memoryAnchors", "flashcards", "pepTalk"],
        },
        temperature: 0.7,
      },
    });

    const jsonString = response.text;
    if (!jsonString) throw new Error("EMPTY_RESPONSE");

    return JSON.parse(jsonString) as StudyGuideContent;
  } catch (error: any) {
    console.error("Lovable Learner - Gemini Error:", error);
    throw error;
  }
};
