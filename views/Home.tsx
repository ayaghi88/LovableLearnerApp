import React from 'react';
import { Button } from '../components/Button';
import { Brain, Sparkles, Eye, Layers, Anchor, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onStartQuiz: () => void;
  onStartLearning: () => void;
  hasProfile: boolean;
}

export const Home: React.FC<HomeProps> = ({ onStartQuiz, onStartLearning, hasProfile }) => {

  const handleFeatureClick = () => {
    if (hasProfile) {
      onStartLearning();
    } else {
      onStartQuiz();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in relative overflow-hidden md:overflow-visible pb-10">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-brand-green/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-brand-black mb-6">
          Lovable <span className="text-brand-blue">Learner</span>
        </h1>
        
        {/* Updated Hero Text */}
        <div className="space-y-4">
            <div className="inline-block bg-blue-50 border border-blue-100 text-brand-blue px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-2 shadow-sm">
                For Neurodivergent Minds
            </div>
            <p className="text-xl md:text-2xl text-gray-700 font-display leading-relaxed">
              The 1st app tailored to teach <span className="font-bold text-brand-black">ND people</span> according to their specific learning needs.
            </p>
            <p className="text-gray-500 text-lg">
              No walls of text. Just clear, visual, step-by-step learning.
            </p>
        </div>
      </div>

      <div className="grid gap-4 w-full max-w-md relative z-10 mt-4">
        {!hasProfile ? (
          <Button onClick={onStartQuiz} className="text-lg py-4 shadow-lg flex items-center justify-center gap-2">
            <Brain className="w-6 h-6" />
            Take Learning Style Quiz
          </Button>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-brand-green text-brand-green font-medium">
              ✨ You have a profile ready!
            </div>
            <Button onClick={onStartLearning} className="text-lg py-4 shadow-lg flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              Start Learning
            </Button>
             <Button variant="outline" onClick={onStartQuiz} className="text-sm">
              Retake Quiz
            </Button>
          </div>
        )}
      </div>

      {/* Feature Pills */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-500 w-full max-w-2xl relative z-10">
        <button 
          onClick={handleFeatureClick}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group bg-white/50 backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-white group-hover:bg-blue-50 rounded-full flex items-center justify-center shadow-sm mb-3 text-brand-blue transition-colors">
            <Eye className="w-6 h-6" />
          </div>
          <span className="font-semibold group-hover:text-brand-blue">Visual Guides</span>
        </button>
        
        <button 
          onClick={handleFeatureClick}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group bg-white/50 backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-white group-hover:bg-blue-50 rounded-full flex items-center justify-center shadow-sm mb-3 text-brand-blue transition-colors">
            <Layers className="w-6 h-6" />
          </div>
          <span className="font-semibold group-hover:text-brand-blue">Step-by-step</span>
        </button>

        <button 
          onClick={handleFeatureClick}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group col-span-2 md:col-span-1 bg-white/50 backdrop-blur-sm"
        >
          <div className="w-12 h-12 bg-white group-hover:bg-blue-50 rounded-full flex items-center justify-center shadow-sm mb-3 text-brand-blue transition-colors">
            <Anchor className="w-6 h-6" />
          </div>
          <span className="font-semibold group-hover:text-brand-blue">Memory Anchors</span>
        </button>
      </div>

      {/* Footer / Security Badge */}
      <div className="pt-8 relative z-10 flex flex-col items-center space-y-6 w-full max-w-md">
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-300 font-bold">
          <ShieldCheck className="w-3 h-3" />
          <span>Powered by Google Gemini</span>
        </div>
      </div>
    </div>
  );
};