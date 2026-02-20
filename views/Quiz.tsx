import React, { useState } from 'react';
import { Button } from '../components/Button';
import { LearningProfile } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface QuizProps {
  onComplete: (profile: LearningProfile) => void;
}

const questions = [
  {
    id: 'age',
    text: "What is your age range?",
    options: [
      { label: "Child (8-12)", value: 'child' },
      { label: "Teen (13-19)", value: 'teen' },
      { label: "Adult (20-64)", value: 'adult' },
      { label: "Senior (65+)", value: 'senior' }
    ]
  },
  {
    id: 'visual',
    text: "When you learn something new, do you prefer:",
    options: [
      { label: "Seeing a diagram or picture", value: 'high' },
      { label: "Reading about it", value: 'low' },
      { label: "Listening to someone explain it", value: 'med' }
    ]
  },
  {
    id: 'hands_on',
    text: "How do you best understand how something works?",
    options: [
      { label: "Taking it apart or doing it myself", value: 'high' },
      { label: "Watching someone else do it", value: 'med' },
      { label: "Reading the instructions first", value: 'low' }
    ]
  },
  {
    id: 'why',
    text: "Does it bother you if you don't know WHY you are doing a step?",
    options: [
      { label: "Yes! It drives me crazy!", value: true },
      { label: "A little bit", value: true },
      { label: "No, I just follow instructions", value: false }
    ]
  },
  {
    id: 'sensory',
    text: "What kind of environment helps you focus?",
    options: [
      { label: "Complete silence and minimal distractions", value: 'silence' },
      { label: "Simple layouts, not too much text at once", value: 'simple_layout' },
      { label: "I can focus anywhere / Standard layout is fine", value: 'standard' }
    ]
  },
  {
    id: 'step_preference',
    text: "Do you get overwhelmed by big walls of text?",
    options: [
      { label: "Yes, break it down into tiny steps please!", value: 10 },
      { label: "Sometimes", value: 7 },
      { label: "I can handle paragraphs", value: 5 }
    ]
  }
];

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishQuiz({ ...answers, [questionId]: value });
    }
  };

  const finishQuiz = (finalAnswers: Record<string, any>) => {
    // Basic logic to map answers to profile
    const profile: LearningProfile = {
      visualPreference: finalAnswers['visual'] === 'high' ? 9 : 5,
      handsOnPreference: finalAnswers['hands_on'] === 'high' ? 9 : 5,
      stepByStepPreference: finalAnswers['step_preference'] || 8,
      verbalPreference: finalAnswers['visual'] === 'low' ? 8 : 4,
      needForRepetition: true, // Default high for ND usually
      needWhyExplanations: finalAnswers['why'] === true,
      sensoryPreference: finalAnswers['sensory'] || 'simple_layout',
      ageRange: finalAnswers['age'] || 'adult',
    };
    onComplete(profile);
  };

  const currentQ = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-brand-blue h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
        <h2 className="text-2xl font-bold font-display text-brand-black mb-8 leading-snug">
          {currentQ.text}
        </h2>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-brand-blue hover:bg-blue-50 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="font-medium text-lg text-gray-700 group-hover:text-brand-blue">
                {option.label}
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-brand-blue flex items-center justify-center">
                 <div className="w-3 h-3 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
