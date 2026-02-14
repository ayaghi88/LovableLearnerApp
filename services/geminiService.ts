
import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    console.error("Gemini API Key is missing!");
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  const profileString = JSON.stringify(profile, null, 2);
  
  let userPrompt = `TOPIC: ${topic}\n\nLEARNING STYLE PROFILE:\n${profileString}`;
  
  if (modification) {
    userPrompt += `\n\nMODIFICATION REQUEST: ${modification}. Please regenerate the guide focusing on this request.`;
  }

  const systemInstruction = `You are "Lovable Learner AI," a specialized educator for neurodivergent minds.
  
  Generate a personalized study guide for: ${topic}
  
  Format Requirements:
  - summary: 1-2 sentence high-level view.
  - visualBreakdown: text explanation of the visual diagram.
  - diagramCode: Mermaid.js diagram code (graph TD). Keep it clean. No markdown code blocks.
  - steps: breaking complex things into small chunks.
  - flashcards: front (term) and back (explanation).
  
  Tone: Sensory-friendly, clear, empathetic. Avoid large blocks of academic text. Use bullet points and steps.`;

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

    let jsonString = response.text || "";
    
    // Safety check: clean string if model mistakenly wrapped in markdown
    jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();

    if (!jsonString) throw new Error("EMPTY_RESPONSE");

    return JSON.parse(jsonString) as StudyGuideContent;
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};
