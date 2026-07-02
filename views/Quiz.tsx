import React, { useState } from 'react';
import { Button } from '../components/Button';
import { LearningProfile } from '../types';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

interface QuizProps {
  onComplete: (profile: LearningProfile) => void;
}

interface QuizOption {
  label: string;
  childLabel?: string;
  value: any;
}

interface QuizQuestion {
  id: string;
  text: string;
  childText?: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'age',
    text: "What is your age range?",
    options: [
      { label: "Child (8-12 years old)", value: 'child' },
      { label: "Teen (13-19 years old)", value: 'teen' },
      { label: "Adult (20-64 years old)", value: 'adult' },
      { label: "Senior (65+ years old)", value: 'senior' }
    ]
  },
  {
    id: 'visual',
    text: "When you learn something new, how does your brain like to take in information?",
    childText: "How do you like to learn new things best? 🧠",
    options: [
      { label: "Seeing a diagram, map, picture, or video", childLabel: "🎨 Looking at bright pictures, colors, or maps", value: 'high' },
      { label: "Listening to explanations, audio, or podcasts", childLabel: "👂 Listening to someone talk or explain things to me", value: 'med' },
      { label: "Reading text, books, or articles", childLabel: "💬 Reading words or stories on a page", value: 'low' }
    ]
  },
  {
    id: 'hands_on',
    text: "How do you best understand how something works?",
    childText: "If you get a new buildable toy or game, what do you do first? 🧩",
    options: [
      { label: "Taking it apart, experimenting, or trying it myself", childLabel: "🧩 Just start playing and trying things right away!", value: 'high' },
      { label: "Watching a demonstration or observing someone else do it first", childLabel: "👀 Watch a friend or parent do a piece first", value: 'med' },
      { label: "Reading the directions, theory, or guidebook first", childLabel: "📖 Look at the instructions book step-by-step first", value: 'low' }
    ]
  },
  {
    id: 'why',
    text: "Do you struggle to stay engaged or memorize facts if you don't know the 'WHY' or purpose behind them?",
    childText: "Is it hard for you to remember school facts or math unless you know WHY they are important? 🤔",
    options: [
      { label: "Yes! I absolutely need to know the core purpose and why it works", childLabel: "🤔 Yes! I need to know the reason behind everything!", value: 'high' },
      { label: "Sometimes, knowing the reason makes it stick much better", childLabel: "🌟 Sometimes, if it is explained like a story, it helps", value: 'med' },
      { label: "No, I am comfortable following rules and memorizing facts as they are", childLabel: "👍 No, I am happy just following the rules", value: 'low' }
    ]
  },
  {
    id: 'sensory',
    text: "What kind of environment or layout helps your brain focus best?",
    childText: "Where is your favorite, happiest place to learn or read? 🤫",
    options: [
      { label: "Complete silence and minimal visual distractions", childLabel: "🤫 In a super quiet room with no noise or talking", value: 'silence' },
      { label: "Clean, simple layouts with spacious text and one section at a time", childLabel: "🧸 At a clean desk with only one simple thing in front of me", value: 'simple_layout' },
      { label: "Background sounds, rich colors, and highly interactive pages", childLabel: "🎶 With some music playing or cool colors around me", value: 'standard' }
    ]
  },
  {
    id: 'step_preference',
    text: "How do you feel when you are presented with a large page of text or instructions?",
    childText: "How do you feel when you see a big page full of crowded words? 🦕",
    options: [
      { label: "Overwhelmed! Please break it down into tiny, bite-sized tasks", childLabel: "🦕 Oh no, it's too much! Please give me tiny, short steps!", value: 10 },
      { label: "I like a mix of visual maps and brief explanations", childLabel: "🦁 It's okay if there are some pictures or clear colors to help", value: 7 },
      { label: "I prefer reading the full explanation at my own pace", childLabel: "🦅 I can read the whole page easily!", value: 5 }
    ]
  },
  {
    id: 'superpower',
    text: "Which of these describes your brain's greatest strength or learning superpower?",
    childText: "What is your brain's special superpower? 🚀",
    options: [
      { label: "⚡ Hyperfocus: I can deep-dive into things I love for hours!", childLabel: "🚀 Hyperfocus: I can zoom-in and build or read for hours when I love it!", value: 'hyperfocus' },
      { label: "🧩 Pattern Finder: I easily spot connections, rules, and structures", childLabel: "🧩 Pattern Finder: I am amazing at finding clues and connections!", value: 'pattern_finder' },
      { label: "🎨 Out-of-the-Box Thinker: I excel at creative ideas, analogies, and stories", childLabel: "🎨 Creative Creator: I think of awesome, unique, and fun ideas!", value: 'creative_thinker' },
      { label: "🔍 Detail Detective: I notice precise details and logical steps others miss", childLabel: "🔍 Detail Detective: I notice tiny things that other people miss!", value: 'detail_detective' }
    ]
  },
  {
    id: 'neurodiversity',
    text: "Do you identify with any of these learning styles or neurodivergent experiences? (Select all that apply or click Next)",
    childText: "Do any of these sound like how your brain works? (Pick any that fit, or click Next!) 🌈",
    multiSelect: true,
    options: [
      { label: "ADHD (I love high engagement, dynamic topics, and bite-sized steps)", childLabel: "⚡ ADHD (My brain runs super fast, and I love short, active, fun steps!)", value: 'ADHD' },
      { label: "Autism / Autistic (I love deep clarity, structured logical steps, and predictable flows)", childLabel: "🌟 Autism (I love knowing exactly what comes next, with clean and clear steps!)", value: 'Autism' },
      { label: "Dyslexia (I benefit from dyslexia-friendly fonts, spacious layouts, and visual maps)", childLabel: "📖 Dyslexia (I like reading with special fonts, big spaces, and visual maps!)", value: 'Dyslexia' },
      { label: "Dyscalculia (I learn best with non-mathematical analogies and visual diagrams)", childLabel: "🔢 Dyscalculia (I like learning with stories and pictures instead of just numbers!)", value: 'Dyscalculia' },
      { label: "Highly Sensitive / Sensory Sensitive (I need ultra-clean screens, quiet spaces, and gentle tones)", childLabel: "🌸 Sensory Sensitive (I like quiet places, simple layouts, and calm colors!)", value: 'Sensory' }
    ]
  }
];

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  const isChild = answers['age'] === 'child';
  const currentQ = quizQuestions[currentStep];

  const handleSingleAnswer = (questionId: string, value: any) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
    
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const toggleMultiSelectOption = (value: string) => {
    setSelectedMulti(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleNextMulti = () => {
    const updatedAnswers = { ...answers, [currentQ.id]: selectedMulti };
    setAnswers(updatedAnswers);
    
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Pre-populate multi-select if going back to a multi-select
      const prevQ = quizQuestions[currentStep - 1];
      if (prevQ.multiSelect) {
        setSelectedMulti(answers[prevQ.id] || []);
      }
    }
  };

  const finishQuiz = (finalAnswers: Record<string, any>) => {
    const age = finalAnswers['age'] || 'adult';
    const visualAns = finalAnswers['visual'] || 'med';
    const handsOnAns = finalAnswers['hands_on'] || 'med';
    const whyAns = finalAnswers['why'] || 'med';
    const sensoryAns = finalAnswers['sensory'] || 'simple_layout';
    const stepPref = finalAnswers['step_preference'] || 7;
    const selectedSuperpower = finalAnswers['superpower'] || 'hyperfocus';
    const selectedNDs: string[] = finalAnswers['neurodiversity'] || [];

    // Map answers to preferences accurately
    const visualPreference = visualAns === 'high' ? 9 : visualAns === 'med' ? 6 : 3;
    const handsOnPreference = handsOnAns === 'high' ? 9 : handsOnAns === 'med' ? 6 : 3;
    const verbalPreference = visualAns === 'low' ? 9 : visualAns === 'med' ? 6 : 3;
    
    // Auto-toggle accessibility parameters
    const useAccessibleFont = selectedNDs.includes('Dyslexia');
    const increasedSpacing = selectedNDs.includes('Dyslexia') || selectedNDs.includes('Sensory');

    // Build superpower tags based on responses and age range
    const superpowersList: string[] = [];
    if (selectedSuperpower === 'hyperfocus') {
      superpowersList.push(age === 'child' ? "🚀 Super Hyperfocus" : "⚡ Infinite Hyperfocus");
    } else if (selectedSuperpower === 'pattern_finder') {
      superpowersList.push(age === 'child' ? "🧩 Pattern Finder" : "🎯 Pattern Architect");
    } else if (selectedSuperpower === 'creative_thinker') {
      superpowersList.push(age === 'child' ? "🎨 Out-of-the-Box Creator" : "💡 Out-of-the-Box Innovator");
    } else if (selectedSuperpower === 'detail_detective') {
      superpowersList.push(age === 'child' ? "🔍 Detail Detective" : "🔬 Precision Detail Analyst");
    }

    if (whyAns === 'high') {
      superpowersList.push(age === 'child' ? "🤔 'Why' Investigator" : "🔍 Purpose-Driven Deep Learner");
    }
    if (stepPref === 10) {
      superpowersList.push(age === 'child' ? "🪜 Micro-Step Climber" : "📊 Micro-Step Master");
    }
    if (sensoryAns === 'silence') {
      superpowersList.push(age === 'child' ? "🤫 Quiet Focus Hero" : "🛡️ Zen Focus Shield");
    }

    const profile: LearningProfile = {
      visualPreference,
      handsOnPreference,
      stepByStepPreference: stepPref,
      verbalPreference,
      needForRepetition: true,
      needWhyExplanations: whyAns === 'high' || whyAns === 'med',
      sensoryPreference: sensoryAns,
      ageRange: age,
      useAccessibleFont,
      increasedSpacing,
      superpowers: superpowersList,
      neurodivergentType: selectedNDs
    };

    onComplete(profile);
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const questionText = isChild && currentQ.childText ? currentQ.childText : currentQ.text;

  return (
    <div className="max-w-xl mx-auto py-6 md:py-10">
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm font-semibold text-gray-500 mb-2">
          <button 
            onClick={handlePrevStep} 
            disabled={currentStep === 0}
            className={`flex items-center gap-1 transition-colors ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-brand-blue text-gray-600'}`}
          >
            <ArrowLeft className="w-4 h-4" /> {isChild ? "Go Back" : "Previous"}
          </button>
          <span>Question {currentStep + 1} of {quizQuestions.length}</span>
          <span className="text-brand-blue">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-brand-blue h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in relative overflow-hidden">
        {/* Subtle decorative elements for kids */}
        {isChild && (
          <div className="absolute top-2 right-2 text-yellow-400 opacity-60 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-bold font-display text-brand-black mb-6 leading-snug">
          {questionText}
        </h2>

        {!currentQ.multiSelect ? (
          <div className="space-y-3 md:space-y-4">
            {currentQ.options.map((option, idx) => {
              const optionLabel = isChild && option.childLabel ? option.childLabel : option.label;
              return (
                <button
                  key={idx}
                  onClick={() => handleSingleAnswer(currentQ.id, option.value)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-brand-blue hover:bg-blue-50/50 transition-all duration-200 group flex items-center justify-between"
                >
                  <span className="font-semibold text-base md:text-lg text-gray-700 group-hover:text-brand-blue">
                    {optionLabel}
                  </span>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-brand-blue flex items-center justify-center flex-shrink-0 ml-3">
                     <div className="w-3 h-3 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const optionLabel = isChild && option.childLabel ? option.childLabel : option.label;
                const isSelected = selectedMulti.includes(option.value);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleMultiSelectOption(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${isSelected ? 'border-brand-blue bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <span className={`font-semibold text-base md:text-lg ${isSelected ? 'text-brand-blue' : 'text-gray-700'}`}>
                      {optionLabel}
                    </span>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ml-3 ${isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-gray-300'}`}>
                       {isSelected && <Check className="w-4 h-4 stroke-[3px]" />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button onClick={handleNextMulti} className="flex items-center gap-2">
                {isChild ? "Finish!" : "Complete Quiz"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
