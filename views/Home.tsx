import React from 'react';
import { Button } from '../components/Button';
import { Brain, Sparkles, Eye, Layers, Anchor, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { Logo } from '../components/Logo';

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
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 animate-fade-in relative overflow-hidden md:overflow-visible pb-16">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-brand-green/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        <Logo size={120} className="mb-4" />
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

      <div className="grid gap-4 w-full max-w-md relative z-10">
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-500 w-full max-w-2xl relative z-10">
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

      {/* Support Section */}
      <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-blue-100 shadow-xl shadow-blue-500/5 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-brand-red animate-pulse">
            <Heart className="w-10 h-10 fill-brand-red" />
          </div>
          <h2 className="text-3xl font-bold font-display text-brand-black">Support Lovable Learner</h2>
          <div className="space-y-4 text-gray-600 font-medium max-w-lg leading-relaxed">
            <p className="text-brand-blue font-bold text-lg">Lovable Learner is free by choice.</p>
            <p>
              If this app helps you learn in a way that finally makes sense, you can support its future by becoming a GitHub Sponsor.
            </p>
            <p className="text-sm">
              Your support helps keep the platform accessible and growing — without ads or paywalls.
            </p>
          </div>
          <a 
            href="https://github.com/sponsors/ayaghi88" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 group inline-flex items-center gap-3 bg-brand-black text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.03] active:scale-95 transition-all"
          >
            Become a Sponsor
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
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