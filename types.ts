export interface LearningProfile {
  visualPreference: number;
  handsOnPreference: number;
  stepByStepPreference: number;
  verbalPreference: number;
  needForRepetition: boolean;
  needWhyExplanations: boolean;
  sensoryPreference: 'silence' | 'minimal_text' | 'simple_layout' | 'standard';
  useAccessibleFont?: boolean;
  increasedSpacing?: boolean;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface StudyGuideStep {
  step: string;
  explanation: string;
  whyItMatters: string;
}

export interface StudyGuideContent {
  summary: string;
  visualBreakdown: string;
  diagramCode: string;
  steps: StudyGuideStep[];
  handsOnPractice: string[];
  memoryAnchors: string[];
  flashcards: Flashcard[];
  pepTalk: string;
  youtubeLink?: string;
}

export interface StudyGuide {
  id: string;
  topic: string;
  content: StudyGuideContent;
  createdAt: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'coach';
  text: string;
}

export type ViewState = 
  | 'HOME' 
  | 'QUIZ' 
  | 'RESULTS' 
  | 'TOPIC_SELECTOR' 
  | 'STUDY_GUIDE' 
  | 'FLASHCARDS' 
  | 'PROFILE'
  | 'INVESTOR'
  | 'COACH_CHAT'
  | 'PROGRESS';