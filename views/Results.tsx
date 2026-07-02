import React from 'react';
import { Button } from '../components/Button';
import { LearningProfile } from '../types';
import { CheckCircle, Zap, Eye, Hand, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';

interface ResultsProps {
  profile: LearningProfile;
  onContinue: () => void;
}

export const Results: React.FC<ResultsProps> = ({ profile, onContinue }) => {
  const isChild = profile.ageRange === 'child';

  // Helper to get friendly names for ND styles
  const getNDBadgeInfo = (nd: string) => {
    switch (nd) {
      case 'ADHD':
        return { label: isChild ? "⚡ ADHD-Style Adventure" : "⚡ ADHD High-Engagement Mode", color: "bg-orange-50 text-orange-700 border-orange-100" };
      case 'Autism':
        return { label: isChild ? "🌟 Autistic Clarity & Structure" : "🌟 Autism logical Structure Map", color: "bg-blue-50 text-blue-700 border-blue-100" };
      case 'Dyslexia':
        return { label: isChild ? "📖 Dyslexia-Friendly Page Style" : "📖 Dyslexia-Friendly Typographic Layout", color: "bg-purple-50 text-purple-700 border-purple-100" };
      case 'Dyscalculia':
        return { label: isChild ? "🔢 Non-Math Picture Clues" : "🔢 Non-Mathematical Visual Analogy Core", color: "bg-green-50 text-green-700 border-green-100" };
      case 'Sensory':
        return { label: isChild ? "🌸 Calming Calm Space" : "🌸 Sensory-Safe Calm Mode", color: "bg-pink-50 text-pink-700 border-pink-100" };
      default:
        return { label: nd, color: "bg-gray-50 text-gray-700 border-gray-100" };
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-6 md:py-10 space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6 border border-green-100">
          <CheckCircle className="w-8 h-8 text-brand-green animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-black mb-3">
          {isChild ? "Your Learning Superpowers Are Live! 🚀" : "Your Learning Profile is Ready!"}
        </h2>
        <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
          {isChild 
            ? "We have turned on all your favorite ways to learn. Let's look at your special powers!" 
            : "We've customized the study engine to align perfectly with how your brain operates best."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        {/* Visual Preference Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-brand-blue">
                <Eye className="w-5 h-5" /> {isChild ? "🎨 Picture Power" : "Visual Style"}
            </h3>
            <div className="space-y-3">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue rounded-full" style={{ width: `${profile.visualPreference * 10}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    {profile.visualPreference > 7 
                      ? (isChild ? "Your brain loves maps, colors, and diagrams!" : "High preference for visual models, maps, and illustrations.") 
                      : (isChild ? "Pictures help you, but you like stories too!" : "Visual elements are active, balanced with clear explanations.")}
                </p>
            </div>
        </div>

        {/* Hands-On Preference Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-brand-green">
                <Hand className="w-5 h-5" /> {isChild ? "🧩 Hands-On Play" : "Hands-On Focus"}
            </h3>
            <div className="space-y-3">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green rounded-full" style={{ width: `${profile.handsOnPreference * 10}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    {profile.handsOnPreference > 7 
                      ? (isChild ? "You learn super fast when you play or experiment!" : "Learns best via direct trials, interactive exercises, and games.") 
                      : (isChild ? "You like watching first, then building!" : "Observational explorer. Likes a guided start before experimenting.")}
                </p>
            </div>
        </div>

        {/* Neurodivergent Types / Styles Section */}
        {profile.neurodivergentType && profile.neurodivergentType.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-600">
              <BrainCircuit className="w-5 h-5" /> {isChild ? "🌈 Your Happy Learning Styles" : "Activated Learning Profiles"}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {profile.neurodivergentType.map((nd, idx) => {
                const info = getNDBadgeInfo(nd);
                return (
                  <span 
                    key={idx} 
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border ${info.color}`}
                  >
                    {info.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Superpowers List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-600">
                <Zap className="w-5 h-5 text-yellow-500" /> {isChild ? "🚀 Your Activated Brain Superpowers!" : "Cognitive Superpowers"}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm font-semibold">
                <li className="flex items-center gap-2 bg-purple-50/50 border border-purple-100/50 p-2.5 rounded-xl text-purple-800 capitalize">
                    <span className="text-lg">🎂</span> {isChild ? "🎁 Made For Kids (8-12)" : `${profile.ageRange} Level Language`}
                </li>
                
                {profile.superpowers && profile.superpowers.length > 0 ? (
                  profile.superpowers.map((power, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100/50 p-2.5 rounded-xl text-indigo-800">
                      <span className="text-lg">✨</span> {power}
                    </li>
                  ))
                ) : (
                  <>
                    {profile.needWhyExplanations && (
                        <li className="flex items-center gap-2 bg-yellow-50/50 border border-yellow-100/50 p-2.5 rounded-xl text-yellow-800">
                            <span className="text-lg">🤔</span> {isChild ? "🤔 Loves to know 'Why!'" : "Needs the 'WHY' behind concepts"}
                        </li>
                    )}
                    {profile.stepByStepPreference > 7 && (
                        <li className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/50 p-2.5 rounded-xl text-blue-800">
                            <span className="text-lg">🪜</span> {isChild ? "🪜 Small, happy steps" : "Thrives on small, clear steps"}
                        </li>
                    )}
                    {profile.sensoryPreference === 'simple_layout' && (
                        <li className="flex items-center gap-2 bg-gray-50 border border-gray-150 p-2.5 rounded-xl text-gray-800">
                            <span className="text-lg">🧼</span> {isChild ? "🧼 Super neat layout" : "Prefers clean, minimal layouts"}
                        </li>
                    )}
                  </>
                )}
            </ul>
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onContinue} fullWidth className="text-lg py-4 flex items-center justify-center gap-2">
          {isChild ? "Let's Learn Something Cool! 🚀" : "Access Study Guide Engine"}
        </Button>
      </div>
    </div>
  );
};
