import React from 'react';
import { Button } from '../components/Button';
import { LearningProfile } from '../types';
import { CheckCircle, Zap, Eye, Hand } from 'lucide-react';

interface ResultsProps {
  profile: LearningProfile;
  onContinue: () => void;
}

export const Results: React.FC<ResultsProps> = ({ profile, onContinue }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-8 space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-brand-green" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-black mb-4">
          Your Learning Profile is Ready!
        </h2>
        <p className="text-gray-600 text-lg">
          We've customized the AI to match exactly how your brain works best.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Eye className="text-brand-blue w-5 h-5" /> Visual Style
            </h3>
            <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue" style={{ width: `${profile.visualPreference * 10}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">
                    {profile.visualPreference > 7 ? "You prefer strong visuals and diagrams." : "You're okay with text, but visuals help."}
                </p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Hand className="text-brand-green w-5 h-5" /> Hands-On
            </h3>
            <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green" style={{ width: `${profile.handsOnPreference * 10}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">
                    {profile.handsOnPreference > 7 ? "You learn by doing and experimenting." : "You prefer observing first."}
                </p>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="text-yellow-500 w-5 h-5" /> Superpowers
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2 bg-purple-50 p-2 rounded text-purple-800 capitalize">
                    <span className="text-lg">🎂</span> {profile.ageRange} Level Teaching
                </li>
                {profile.needWhyExplanations && (
                    <li className="flex items-center gap-2 bg-yellow-50 p-2 rounded text-yellow-800">
                        <span className="text-lg">🤔</span> Needs the "WHY" behind concepts
                    </li>
                )}
                {profile.stepByStepPreference > 7 && (
                    <li className="flex items-center gap-2 bg-blue-50 p-2 rounded text-blue-800">
                        <span className="text-lg">🪜</span> Thrives on small, clear steps
                    </li>
                )}
                 {profile.sensoryPreference === 'simple_layout' && (
                    <li className="flex items-center gap-2 bg-gray-100 p-2 rounded text-gray-800">
                        <span className="text-lg">🧼</span> Prefers clean, minimal layouts
                    </li>
                )}
            </ul>
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onContinue} fullWidth className="text-lg py-4">
          Generate Study Guide
        </Button>
      </div>
    </div>
  );
};
