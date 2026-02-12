import React from 'react';
import { LearningProfile, StudyGuide } from '../types';
import { Button } from '../components/Button';
import { Trash2, FileText, Calendar, Sliders, CheckCircle, Type, LayoutGrid } from 'lucide-react';

interface ProfileProps {
  profile: LearningProfile;
  history: StudyGuide[];
  onResetQuiz: () => void;
  onLoadGuide: (guide: StudyGuide) => void;
  onDeleteGuide: (id: string) => void;
  updateProfile: (updates: Partial<LearningProfile>) => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  profile, 
  history, 
  onResetQuiz, 
  onLoadGuide,
  onDeleteGuide,
  updateProfile
}) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <h1 className="text-3xl font-bold font-display text-brand-black">Settings & History</h1>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Type className="w-5 h-5 text-brand-blue" />
          <h2 className="text-xl font-bold text-gray-800">Accessibility Settings</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button 
            onClick={() => updateProfile({ useAccessibleFont: !profile.useAccessibleFont })}
            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${profile.useAccessibleFont ? 'border-brand-blue bg-blue-50' : 'border-gray-100 bg-white'}`}
          >
            <span className="font-medium">Dyslexia-Friendly Font</span>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${profile.useAccessibleFont ? 'bg-brand-blue' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.useAccessibleFont ? 'left-5' : 'left-1'}`} />
            </div>
          </button>
          <button 
            onClick={() => updateProfile({ increasedSpacing: !profile.increasedSpacing })}
            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${profile.increasedSpacing ? 'border-brand-green bg-green-50' : 'border-gray-100 bg-white'}`}
          >
            <span className="font-medium">Increased Line Spacing</span>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${profile.increasedSpacing ? 'bg-brand-green' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.increasedSpacing ? 'left-5' : 'left-1'}`} />
            </div>
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-brand-blue" />
                <h2 className="text-xl font-bold text-gray-800">Learning Styles</h2>
             </div>
             <Button variant="outline" onClick={onResetQuiz} className="text-xs px-3 py-2 text-red-500 border-red-200">
                Reset Quiz
             </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-xs text-gray-400 uppercase font-bold">Visual Focus</span>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-brand-blue rounded-full" style={{ width: `${profile.visualPreference * 10}%` }}></div>
                    </div>
                </div>
             </div>
             <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-xs text-gray-400 uppercase font-bold">Hands-On Focus</span>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-brand-green rounded-full" style={{ width: `${profile.handsOnPreference * 10}%` }}></div>
                    </div>
                </div>
             </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <LayoutGrid className="w-5 h-5 text-brand-black" />
          <h2 className="text-2xl font-bold text-brand-black">Saved Guides</h2>
        </div>
        {history.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                <p>No guides saved yet. Let's learn something!</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {history.map((guide) => (
                    <div key={guide.id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-brand-blue transition-colors group">
                        <div className="flex-1 cursor-pointer" onClick={() => onLoadGuide(guide)}>
                            <h3 className="font-bold text-lg text-brand-black capitalize mb-1">{guide.topic}</h3>
                            <div className="flex items-center text-xs text-gray-400 gap-4">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(guide.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {guide.content.flashcards.length} cards</span>
                            </div>
                        </div>
                        <button onClick={() => onDeleteGuide(guide.id)} className="p-3 text-gray-300 hover:text-red-500 rounded-lg">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </section>
    </div>
  );
};