
import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    console.error("Gemini API Key is missing or invalid in environment variables.");
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  const profileString = JSON.stringify(profile, null, 2);
  
  let userPrompt = `TOPIC: ${topic}\n\nLEARNING STYLE PROFILE:\n${profileString}`;
  
  if (modification) {
    userPrompt += `\n\nMODIFICATION REQUEST: ${modification}. Please focus specifically on this request while maintaining the neurodivergent-friendly format.`;
  }

  const systemInstruction = `You are "Lovable Learner AI," a sensory-friendly educator specializing in neurodivergent education (ADHD, Autism, Dyslexia).
  Generate a comprehensive study guide in valid JSON format for the requested topic.
  Keep descriptions clear, short, and use bullet points where helpful.
  Flashcards must have "front" and "back" keys.
  The diagram code must be a simple Mermaid.js graph TD string.`;

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
    
    // Clean up response text in case the model returns markdown code blocks despite responseMimeType
    jsonString = jsonString.trim();
    if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
    }

    if (!jsonString) {
      throw new Error("EMPTY_RESPONSE");
    }

    return JSON.parse(jsonString) as StudyGuideContent;
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};
