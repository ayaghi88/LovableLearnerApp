import { LearningProfile, StudyGuideContent } from "../types";

export const generateStudyGuide = async (
  topic: string,
  profile: LearningProfile,
  modification?: string
): Promise<StudyGuideContent> => {
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data as StudyGuideContent;
  } catch (e: any) {
    console.error("API Call Error:", e);
    throw new Error(e.message || "Failed to generate study guide. Please check your connection.");
  }
};
