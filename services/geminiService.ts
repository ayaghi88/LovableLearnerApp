
import { GoogleGenAI, Type } from "@google/genai";
import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
  // Initialize the GenAI client with the mandatory named parameter.
  // Assume process.env.API_KEY is injected by Vercel/Vite.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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
    // gemini-3-pro-preview is selected for its superior reasoning in educational tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
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

    // Access the .text property directly as per GenerateContentResponse guidelines.
    const jsonString = response.text;
    if (!jsonString) throw new Error("The AI returned an empty response.");

    return JSON.parse(jsonString) as StudyGuideContent;
  } catch (error) {
    console.error("Error generating study guide:", error);
    throw error;
  }
};
